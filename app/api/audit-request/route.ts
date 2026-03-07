import { NextRequest, NextResponse } from 'next/server';

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

function normalizePhone(raw: string) {
  return raw.replace(/[^\d+]/g, '').slice(0, 20);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const name = String(formData.get('name') || '').trim();
  const phoneRaw = String(formData.get('phone') || '').trim();
  const phone = normalizePhone(phoneRaw);
  const salonSize = String(formData.get('salonSize') || '').trim();
  const monthlyBookings = String(formData.get('monthlyBookings') || '').trim();

  const redirectUrl = safeReturnUrl(request);

  // Server-side attribution (do not trust client hidden fields)
  const source = 'beauty-pillar';
  const formType = 'audit-request';
  const locale = 'uk';

  const bookingsNum = Number(monthlyBookings);
  const errors: string[] = [];
  if (!name || name.length < 2) errors.push('name');
  if (!phone || phone.length < 8) errors.push('phone');
  if (!SALON_SIZES.has(salonSize)) errors.push('salonSize');
  if (!Number.isFinite(bookingsNum) || bookingsNum < 1) errors.push('monthlyBookings');

  if (errors.length > 0) {
    redirectUrl.searchParams.set('audit', 'error');
    return NextResponse.redirect(redirectUrl, 303);
  }

  const webhookUrl = process.env.N8N_AUDIT_REQUEST_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    redirectUrl.searchParams.set('audit', 'error');
    return NextResponse.redirect(redirectUrl, 303);
  }

  const utm: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
    const v = redirectUrl.searchParams.get(k);
    if (v) utm[k] = v;
  });

  const userAgent = request.headers.get('user-agent') || '';
  const forwardedFor = request.headers.get('x-forwarded-for') || '';
  const ip = forwardedFor.split(',')[0]?.trim();

  const telegramMessage = [
    'New audit request (Beauty pillar)',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Salon size: ${salonSize}`,
    `Monthly bookings: ${bookingsNum}`,
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
      phone,
      salonSize,
      monthlyBookings: bookingsNum,
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
