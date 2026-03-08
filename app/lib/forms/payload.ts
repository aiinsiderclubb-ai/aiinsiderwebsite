import type { NextRequest } from 'next/server';
import type { ConversionAttribution, ConversionFormType, ConversionPayload, PageInfo, UTMParams } from './types';

const UTM_KEYS: Array<keyof UTMParams> = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

export function getRequestContext(req: NextRequest) {
  const userAgent = req.headers.get('user-agent') || '';
  const forwardedFor = req.headers.get('x-forwarded-for') || '';
  const ip = forwardedFor.split(',')[0]?.trim();
  return { ip, userAgent };
}

export function extractUtmFromUrl(url: URL): UTMParams {
  const utm: UTMParams = {};
  UTM_KEYS.forEach((k) => {
    const v = url.searchParams.get(k);
    if (v) utm[k] = v;
  });
  return utm;
}

export function safeString(v: unknown, maxLen: number) {
  if (typeof v !== 'string') return undefined;
  const s = v.trim();
  if (!s) return undefined;
  return s.length > maxLen ? s.slice(0, maxLen) : s;
}

export function buildTelegramMessage(input: {
  formType: ConversionFormType;
  attribution: ConversionAttribution;
  lead: Record<string, unknown>;
  page: PageInfo;
  utm?: UTMParams;
}) {
  const head = `New ${input.formType} submission`;
  const meta = [
    `Locale: ${input.attribution.locale}`,
    `Vertical: ${input.attribution.vertical}`,
    `PageType: ${input.attribution.pageType}`,
    input.attribution.slug ? `Slug: ${input.attribution.slug}` : null,
    input.attribution.sourceSection ? `Source section: ${input.attribution.sourceSection}` : null,
    input.attribution.ctaType ? `CTA type: ${input.attribution.ctaType}` : null,
    input.attribution.ctaVariant ? `CTA variant: ${input.attribution.ctaVariant}` : null,
    input.page.path ? `Path: ${input.page.path}` : null,
    Object.keys(input.utm || {}).length ? `UTM: ${JSON.stringify(input.utm)}` : null,
  ].filter(Boolean);

  // Include a compact lead block (non-PII heavy)
  const leadLines = Object.entries(input.lead)
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .slice(0, 12)
    .map(([k, v]) => `${k}: ${String(v)}`);

  return [head, ...meta, '', ...leadLines].join('\n');
}

export function buildConversionPayload(input: {
  formType: ConversionFormType;
  attribution: ConversionAttribution;
  lead: Record<string, unknown>;
  page: PageInfo;
  utm?: UTMParams;
  context: { ip?: string; userAgent?: string };
}) : ConversionPayload {
  const telegramMessage = buildTelegramMessage({
    formType: input.formType,
    attribution: input.attribution,
    lead: input.lead,
    page: input.page,
    utm: input.utm,
  });

  return {
    schemaVersion: '2026-03-08',
    submittedAt: new Date().toISOString(),
    form: { type: input.formType },
    attribution: input.attribution,
    page: input.page,
    utm: input.utm,
    lead: input.lead,
    context: input.context,
    telegram: { message: telegramMessage },
  };
}

