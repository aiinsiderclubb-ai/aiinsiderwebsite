import { NextRequest, NextResponse } from 'next/server';
import { buildConversionPayload, extractUtmFromUrl, getRequestContext, safeString } from '@/app/lib/forms/payload';
import { validateForm, normalizePhone } from '@/app/lib/forms/validation';
import type { ConversionFormType, ConversionLocale, ConversionPageType, ConversionVertical, SubmitResponse } from '@/app/lib/forms/types';
import { submitLeadToOps } from '@/app/lib/leads/submit';

function asEnum<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  if (typeof value !== 'string') return fallback;
  const v = value.trim() as T;
  return (allowed as readonly string[]).includes(v) ? v : fallback;
}

const LOCALES = ['uk', 'en'] as const satisfies readonly ConversionLocale[];
const VERTICALS = ['beauty', 'flowers', 'general', 'real_estate', 'ecommerce'] as const satisfies readonly ConversionVertical[];
const PAGE_TYPES = ['pillar', 'blog_article', 'blog_list', 'service', 'home', 'other'] as const satisfies readonly ConversionPageType[];
const FORM_TYPES = ['lead-magnet', 'audit-request', 'contact', 'booking', 'chat-lead'] as const satisfies readonly ConversionFormType[];
const CTA_TYPES = ['checklist', 'roi', 'audit', 'generic'] as const;
const CTA_VARIANTS = ['primary', 'secondary', 'unknown'] as const;

export async function POST(request: NextRequest) {
  let body: any = null;
  try {
    body = await request.json();
  } catch {
    const res: SubmitResponse = { ok: false, error: 'validation_error', message: 'Invalid JSON body.' };
    return NextResponse.json(res, { status: 400 });
  }

  const formType = asEnum(body?.formType, FORM_TYPES, 'contact');
  const locale = asEnum(body?.locale, LOCALES, 'uk');
  const vertical = asEnum(body?.vertical, VERTICALS, 'general');
  const pageType = asEnum(body?.pageType, PAGE_TYPES, 'other');

  const slug = safeString(body?.slug, 180);
  const sourceSection = safeString(body?.sourceSection, 64);
  const ctaType = asEnum(body?.ctaType, CTA_TYPES, 'generic');
  const ctaVariant = asEnum(body?.ctaVariant, CTA_VARIANTS, 'unknown');

  const lead = (body?.lead && typeof body.lead === 'object') ? { ...body.lead } : {};

  // Normalize commonly used fields
  if (typeof lead.phone === 'string') lead.phone = normalizePhone(lead.phone);
  if (typeof lead.monthlyBookings === 'string' || typeof lead.monthlyBookings === 'number') {
    const n = Number(lead.monthlyBookings);
    lead.monthlyBookings = Number.isFinite(n) ? n : lead.monthlyBookings;
  }

  const validation = validateForm(formType, lead);
  if (!validation.ok) {
    const res: SubmitResponse = { ok: false, error: 'validation_error', message: validation.message, fields: validation.fields };
    return NextResponse.json(res, { status: 400 });
  }

  const referer = request.headers.get('referer') || undefined;
  const pageUrl = referer ? (() => { try { return new URL(referer); } catch { return null; } })() : null;
  const utm = pageUrl ? extractUtmFromUrl(pageUrl) : undefined;

  const page = {
    path: pageUrl?.pathname,
    url: pageUrl?.toString(),
    referer,
  };

  const payload = buildConversionPayload({
    formType,
    attribution: {
      locale,
      vertical,
      pageType,
      slug,
      sourceSection,
      ctaType,
      ctaVariant,
    },
    lead,
    page,
    utm,
    context: getRequestContext(request),
  });

  try {
    const result = await submitLeadToOps(payload);
    if (!result.ok) {
      const out: SubmitResponse =
        result.error === 'config_error'
          ? { ok: false, error: 'config_error', message: 'Webhook URL is not configured.' }
          : { ok: false, error: 'webhook_error', message: 'Webhook request failed.' };
      return NextResponse.json(out, { status: result.error === 'config_error' ? 500 : 502 });
    }
    const out: SubmitResponse = { ok: true };
    return NextResponse.json(out, { status: 200 });
  } catch {
    const out: SubmitResponse = { ok: false, error: 'webhook_error', message: 'Failed to submit lead.' };
    return NextResponse.json(out, { status: 500 });
  }
}

