import type { LeadDeliveryStatus } from '@/app/lib/leads/store';
import { getLeadSubmission, recordLeadDeliveryResult } from '@/app/lib/leads/store';
import { postToWebhook, resolveWebhookUrl } from '@/app/lib/forms/webhook';

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

export async function retryLeadSubmission(id: string): Promise<{
  ok: boolean;
  status: LeadDeliveryStatus;
  webhookStatus: number | null;
}> {
  const existing = await getLeadSubmission(id);
  if (!existing) return { ok: false, status: 'failed', webhookStatus: null };
  if (existing.status !== 'failed') {
    return { ok: true, status: existing.status, webhookStatus: existing.webhook.status ?? null };
  }

  const payload = existing.payload;
  const webhookUrl = resolveWebhookUrl({
    vertical: payload.attribution.vertical,
    formType: payload.form.type,
  });

  if (!webhookUrl) {
    await recordLeadDeliveryResult({
      id,
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
    return { ok: false, status: 'failed', webhookStatus: null };
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
      id,
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

    return { ok, status, webhookStatus: res.status ?? null };
  } catch (e) {
    const durationMs = Date.now() - started;
    await recordLeadDeliveryResult({
      id,
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
    return { ok: false, status: 'failed', webhookStatus: null };
  }
}

