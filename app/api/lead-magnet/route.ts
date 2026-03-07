import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const salonSize = String(formData.get('salonSize') || '').trim();
  const source = String(formData.get('source') || '').trim();

  if (!name || !email || !salonSize) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const referer = request.headers.get('referer') || 'https://www.aiinsider.it.com/uk/avtomatizaciya-salonu-krasy';
  const redirectUrl = new URL(referer);
  redirectUrl.searchParams.set('leadMagnet', 'success');

  console.info('[lead-magnet][mock]', { name, email, salonSize, source });

  return NextResponse.redirect(redirectUrl, 303);
}
