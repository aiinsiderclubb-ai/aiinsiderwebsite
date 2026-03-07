import { NextRequest, NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SALON_SIZES = new Set(['1-2', '3-7', '8-15', '15+']);

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

  // Server-side attribution (do not trust client hidden fields)
  const source = 'beauty-pillar';
  const formType = 'lead-magnet';
  const locale = 'uk';

  const errors: string[] = [];
  if (!name || name.length < 2) errors.push('name');
  if (!EMAIL_RE.test(email)) errors.push('email');
  if (!SALON_SIZES.has(salonSize)) errors.push('salonSize');

  if (errors.length > 0) {
    redirectUrl.searchParams.set('leadMagnet', 'error');
    return NextResponse.redirect(redirectUrl, 303);
  }

  const webhookUrl = process.env.N8N_LEAD_MAGNET_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    redirectUrl.searchParams.set('leadMagnet', 'error');
    return NextResponse.redirect(redirectUrl, 303);
  }

  // Extract UTM params from the return URL (if present)
  const utm: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
    const v = redirectUrl.searchParams.get(k);
    if (v) utm[k] = v;
  });

  const userAgent = request.headers.get('user-agent') || '';
  const forwardedFor = request.headers.get('x-forwarded-for') || '';
  const ip = forwardedFor.split(',')[0]?.trim();

  const telegramMessage = [
    'New lead magnet request (Beauty pillar)',
    `Name: ${name}`,
    `Email: ${email}`,
    `Salon size: ${salonSize}`,
    `Page: ${redirectUrl.pathname}`,
    Object.keys(utm).length ? `UTM: ${JSON.stringify(utm)}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const payload = {
    source,
    formType,
    locale,
    submittedAt: new Date().toISOString(),
    page: {
      path: redirectUrl.pathname,
      url: redirectUrl.toString(),
    },
    lead: {
      name,
      email,
      salonSize,
    },
    utm,
    context: {
      ip,
      userAgent,
    },
    telegram: {
      message: telegramMessage,
    },
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeout);

    if (!res.ok) {
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
