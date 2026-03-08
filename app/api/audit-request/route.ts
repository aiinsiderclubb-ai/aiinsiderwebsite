import { NextRequest, NextResponse } from 'next/server';
import { buildConversionPayload, extractUtmFromUrl, getRequestContext, safeString } from '@/app/lib/forms/payload';
import { normalizePhone, validateForm } from '@/app/lib/forms/validation';
import { submitLeadToOps } from '@/app/lib/leads/submit';

function safeReturnUrl(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const referer = request.headers.get('referer');
  const fallback = new URL('/uk/avtomatizaciya-salonu-krasy', origin);

  if (!referer) return fallback;
  try {
    const url = new URL(referer);
    if (url.origin !== origin) return fallback;
    return url;
  } catch {
    return fallback;
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const name = String(formData.get('name') || '').trim();
  const phoneRaw = String(formData.get('phone') || '').trim();
  const phone = normalizePhone(phoneRaw);
  const salonSize = String(formData.get('salonSize') || '').trim();
  const monthlyBookings = String(formData.get('monthlyBookings') || '').trim();

  const redirectUrl = safeReturnUrl(request);

  const bookingsNum = Number(monthlyBookings);
  const lead = { name, phone, salonSize, monthlyBookings: bookingsNum };
  const validation = validateForm('audit-request', lead);
  if (!validation.ok) {
    redirectUrl.searchParams.set('audit', 'error');
    return NextResponse.redirect(redirectUrl, 303);
  }

  const ctaType = safeString(formData.get('ctaType'), 32) as any;
  const ctaVariant = safeString(formData.get('ctaVariant'), 32) as any;
  const sourceSection = 'audit';

  const payload = buildConversionPayload({
    formType: 'audit-request',
    attribution: {
      locale: 'uk',
      vertical: 'beauty',
      pageType: 'pillar',
      slug: redirectUrl.pathname,
      sourceSection,
      ctaType,
      ctaVariant,
    },
    lead,
    page: {
      path: redirectUrl.pathname,
      url: redirectUrl.toString(),
      referer: request.headers.get('referer') || undefined,
    },
    utm: extractUtmFromUrl(redirectUrl),
    context: getRequestContext(request),
  });

  try {
    const result = await submitLeadToOps(payload);
    if (!result.ok) {
      redirectUrl.searchParams.set('audit', 'error');
      return NextResponse.redirect(redirectUrl, 303);
    }

    redirectUrl.searchParams.set('audit', 'success');
    return NextResponse.redirect(redirectUrl, 303);
  } catch {
    redirectUrl.searchParams.set('audit', 'error');
    return NextResponse.redirect(redirectUrl, 303);
  }
}
