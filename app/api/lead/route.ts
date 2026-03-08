import { NextRequest, NextResponse } from 'next/server';
import { buildConversionPayload, extractUtmFromUrl, getRequestContext, safeString } from '@/app/lib/forms/payload';
import { validateForm } from '@/app/lib/forms/validation';
import type { ConversionFormType, ConversionLocale, ConversionPageType, ConversionVertical, SubmitResponse } from '@/app/lib/forms/types';
import { submitLeadToOps } from '@/app/lib/leads/submit';

export interface LeadData {
  name: string;
  business: string;
  contact: string;
  industry: string;
  source: string;
  timestamp: string;
}

function asEnum<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  if (typeof value !== 'string') return fallback;
  const v = value.trim() as T;
  return (allowed as readonly string[]).includes(v) ? v : fallback;
}

const LOCALES = ['uk', 'en'] as const satisfies readonly ConversionLocale[];
const VERTICALS = ['beauty', 'flowers', 'general', 'real_estate', 'ecommerce'] as const satisfies readonly ConversionVertical[];
const PAGE_TYPES = ['pillar', 'blog_article', 'blog_list', 'service', 'home', 'other'] as const satisfies readonly ConversionPageType[];
const FORM_TYPES = ['lead-magnet', 'audit-request', 'contact', 'booking', 'chat-lead'] as const satisfies readonly ConversionFormType[];

export async function POST(request: NextRequest) {
  try {
    const body: any = await request.json();

    const formType = asEnum(body?.formType, FORM_TYPES, 'chat-lead');
    const locale = asEnum(body?.locale, LOCALES, 'uk');
    const vertical = asEnum(body?.vertical, VERTICALS, 'general');
    const pageType = asEnum(body?.pageType, PAGE_TYPES, 'other');

    const slug = safeString(body?.slug, 180);
    const sourceSection = safeString(body?.sourceSection, 64);
    const ctaType = safeString(body?.ctaType, 32) as any;
    const ctaVariant = safeString(body?.ctaVariant, 32) as any;

    const lead: Record<string, unknown> = {
      name: safeString(body?.name, 120),
      business: safeString(body?.business, 160),
      contact: safeString(body?.contact, 200),
      industry: safeString(body?.industry, 80),
      source: safeString(body?.source, 80) || 'site',
      message: safeString(body?.message, 1200),
    };

    const validation = validateForm(formType, lead);
    if (!validation.ok) {
      const res: SubmitResponse = { ok: false, error: 'validation_error', message: validation.message, fields: validation.fields };
      return NextResponse.json(res, { status: 400 });
    }

    const referer = request.headers.get('referer') || undefined;
    const pageUrl = referer ? (() => { try { return new URL(referer); } catch { return null; } })() : null;
    const utm = pageUrl ? extractUtmFromUrl(pageUrl) : undefined;

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
      page: {
        path: pageUrl?.pathname,
        url: pageUrl?.toString(),
        referer,
      },
      utm,
      context: getRequestContext(request),
    });

    const result = await submitLeadToOps(payload);
    if (!result.ok) {
      const res: SubmitResponse =
        result.error === 'config_error'
          ? { ok: false, error: 'config_error', message: 'Webhook URL is not configured.' }
          : { ok: false, error: 'webhook_error', message: 'Webhook request failed.' };
      return NextResponse.json(res, { status: result.error === 'config_error' ? 500 : 502 });
    }

    const res: SubmitResponse = { ok: true };
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error('Lead API Error:', error);
    return NextResponse.json(
      { ok: false, error: 'webhook_error', message: 'Failed to capture lead.' } satisfies SubmitResponse,
      { status: 500 }
    );
  }
}

