import type { ConversionPayload, ConversionFormType } from '@/app/lib/forms/types';

export type LeadPriority = 'high' | 'medium' | 'low';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function s(v: unknown) {
  return typeof v === 'string' ? v.trim() : '';
}

function n(v: unknown) {
  const num = typeof v === 'number' ? v : Number(s(v));
  return Number.isFinite(num) ? num : NaN;
}

function hasValue(v: unknown) {
  const str = s(v);
  return Boolean(str);
}

function baseScoreByFormType(formType: ConversionFormType): number {
  const map: Record<ConversionFormType, number> = {
    booking: 85,
    'audit-request': 75,
    contact: 60,
    'lead-magnet': 45,
    'chat-lead': 35,
  };
  return map[formType] ?? 40;
}

export function scoreToPriority(score: number): LeadPriority {
  if (score >= 75) return 'high';
  if (score >= 55) return 'medium';
  return 'low';
}

/**
 * Reusable heuristic scoring (0..100).
 * Focus: "sales follow-up value", not "webhook delivery health".
 */
export function computeLeadScore(payload: ConversionPayload): number {
  const lead = (payload?.lead && typeof payload.lead === 'object') ? payload.lead : {};
  const utm = payload?.utm || {};

  let score = baseScoreByFormType(payload.form.type);

  // Contactability + completeness
  if (hasValue((lead as any).email)) score += 10;
  if (hasValue((lead as any).phone)) score += 10;
  if (hasValue((lead as any).contact)) score += 8;
  if (hasValue((lead as any).company) || hasValue((lead as any).business)) score += 5;
  if (s((lead as any).message).length >= 80) score += 5;

  // UTM presence: small boost for attributed inbound/paid
  if (hasValue((utm as any).utm_source)) score += 2;
  if (['cpc', 'ppc', 'paid', 'paid_social'].includes(s((utm as any).utm_medium).toLowerCase())) score += 3;

  // Vertical-specific enrichment (kept generic, safe for future verticals)
  if (payload.attribution.vertical === 'beauty') {
    const salonSize = s((lead as any).salonSize);
    if (salonSize === '15+') score += 10;
    else if (salonSize === '8-15') score += 8;
    else if (salonSize === '3-7') score += 5;
    else if (salonSize === '1-2') score += 2;

    const monthlyBookings = n((lead as any).monthlyBookings);
    if (Number.isFinite(monthlyBookings)) {
      if (monthlyBookings >= 150) score += 10;
      else if (monthlyBookings >= 80) score += 7;
      else if (monthlyBookings >= 30) score += 4;
    }
  }

  return clamp(Math.round(score), 0, 100);
}

