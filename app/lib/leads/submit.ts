import type { ConversionPayload } from '@/app/lib/forms/types';
import { postToWebhook, resolveWebhookUrl } from '@/app/lib/forms/webhook';
import { createLeadSubmission, recordLeadDeliveryResult, type LeadDeliveryStatus } from '@/app/lib/leads/store';

const MAX_WEBHOOK_SNIPPET = 2000;

function truncateSnippet(text: string | null | undefined) {
  if (!text) return null;
  const clean = text.replace(/\u0000/g, '');
  return clean.length > MAX_WEBHOOK_SNIPPET ? clean.slice(0, MAX_WEBHOOK_SNIPPET) : clean;
}

function safeHeader(res: Response, name: string) {
  const v = res.headers.get(name);
  return v ? v.slice(0, 200) : null;
}

function getRequestId(res: Response) {
  return (
    safeHeader(res, 'x-request-id') ||
    safeHeader(res, 'x-vercel-id') ||
    safeHeader(res, 'x-n8n-execution-id') ||
    safeHeader(res, 'x-n8n-workflow-id')
  );
}

export async function submitLeadToOps(payload: ConversionPayload): Promise<{
  leadId: string;
  status: LeadDeliveryStatus;
  ok: boolean;
  webhookStatus: number | null;
  error: 'config_error' | 'webhook_error' | null;
}> {
  const leadId = await createLeadSubmission(payload);

  const webhookUrl = resolveWebhookUrl({
    vertical: payload.attribution.vertical,
    formType: payload.form.type,
  });

  if (!webhookUrl) {
    await recordLeadDeliveryResult({
      id: leadId,
      status: 'failed',
      incrementAttempt: false,
      webhook: {
        ok: false,
        status: null,
        durationMs: null,
        responseSnippet: null,
        error: 'Webhook URL is not configured.',
        contentType: null,
        requestId: null,
      },
    });
    return { leadId, status: 'failed', ok: false, webhookStatus: null, error: 'config_error' };
  }

  const started = Date.now();
  try {
    const res = await postToWebhook({ webhookUrl, payload });
    const durationMs = Date.now() - started;
    const body = await res.text().catch(() => '');
    const responseSnippet = truncateSnippet(body);
    const ok = res.ok;
    const status: LeadDeliveryStatus = ok ? 'delivered' : 'failed';

    await recordLeadDeliveryResult({
      id: leadId,
      status,
      incrementAttempt: true,
      webhook: {
        ok,
        status: res.status ?? null,
        durationMs,
        responseSnippet,
        error: ok ? null : 'Webhook responded with non-2xx.',
        contentType: safeHeader(res, 'content-type'),
        requestId: getRequestId(res),
      },
    });

    return { leadId, status, ok, webhookStatus: res.status ?? null, error: ok ? null : 'webhook_error' };
  } catch (e) {
    const durationMs = Date.now() - started;
    await recordLeadDeliveryResult({
      id: leadId,
      status: 'failed',
      incrementAttempt: true,
      webhook: {
        ok: false,
        status: null,
        durationMs,
        responseSnippet: null,
        error: e instanceof Error ? e.message : 'Webhook request failed.',
        contentType: null,
        requestId: null,
      },
    });
    return { leadId, status: 'failed', ok: false, webhookStatus: null, error: 'webhook_error' };
  }
}

