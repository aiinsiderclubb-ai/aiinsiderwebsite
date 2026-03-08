import { NextRequest, NextResponse } from 'next/server';
import { buildConversionPayload, extractUtmFromUrl, getRequestContext, safeString } from '@/app/lib/forms/payload';
import { validateForm } from '@/app/lib/forms/validation';
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
  const email = String(formData.get('email') || '').trim();
  const salonSize = String(formData.get('salonSize') || '').trim();

  const redirectUrl = safeReturnUrl(request);

  const lead = { name, email, salonSize };
  const validation = validateForm('lead-magnet', lead);
  if (!validation.ok) {
    redirectUrl.searchParams.set('leadMagnet', 'error');
    return NextResponse.redirect(redirectUrl, 303);
  }

  const ctaType = safeString(formData.get('ctaType'), 32) as any;
  const ctaVariant = safeString(formData.get('ctaVariant'), 32) as any;
  const sourceSection = 'lead-magnet';

  const payload = buildConversionPayload({
    formType: 'lead-magnet',
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
      redirectUrl.searchParams.set('leadMagnet', 'error');
      return NextResponse.redirect(redirectUrl, 303);
    }

    redirectUrl.searchParams.set('leadMagnet', 'success');
    return NextResponse.redirect(redirectUrl, 303);
  } catch {
    redirectUrl.searchParams.set('leadMagnet', 'error');
    return NextResponse.redirect(redirectUrl, 303);
  }
}
