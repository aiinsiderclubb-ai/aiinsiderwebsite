import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const name = String(formData.get('name') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const salonSize = String(formData.get('salonSize') || '').trim();
  const monthlyBookings = String(formData.get('monthlyBookings') || '').trim();
  const source = String(formData.get('source') || '').trim();

  if (!name || !phone || !salonSize || !monthlyBookings) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const referer = request.headers.get('referer') || 'https://www.aiinsider.it.com/uk/avtomatizaciya-salonu-krasy';
  const redirectUrl = new URL(referer);
  redirectUrl.searchParams.set('audit', 'success');

  console.info('[audit-request][mock]', {
    name,
    phone,
    salonSize,
    monthlyBookings: Number(monthlyBookings),
    source,
  });

  return NextResponse.redirect(redirectUrl, 303);
}
