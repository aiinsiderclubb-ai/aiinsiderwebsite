import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ['en', 'uk'] as const;

function isAdminPath(pathname: string) {
  return (
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname === '/api/admin' ||
    pathname.startsWith('/api/admin/')
  );
}

function hasLocalePrefix(pathname: string) {
  return SUPPORTED_LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

function unauthorized() {
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="AI Insider Admin"',
    },
  });
}

function forbid() {
  return new NextResponse('Admin auth is not configured', { status: 403 });
}

function checkBasicAuth(request: NextRequest) {
  const user = (process.env.ADMIN_BASIC_AUTH_USER || '').trim();
  const pass = (process.env.ADMIN_BASIC_AUTH_PASSWORD || '').trim();
  if (!user || !pass) return forbid();

  const header = request.headers.get('authorization');
  if (!header || !header.startsWith('Basic ')) return unauthorized();

  try {
    const decoded = atob(header.slice('Basic '.length));
    const idx = decoded.indexOf(':');
    const u = idx >= 0 ? decoded.slice(0, idx) : decoded;
    const p = idx >= 0 ? decoded.slice(idx + 1) : '';
    if (u === user && p === pass) return null;
    return unauthorized();
  } catch {
    return unauthorized();
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect internal admin routes (do NOT localize them)
  if (isAdminPath(pathname)) {
    const authResult = checkBasicAuth(request);
    if (authResult) return authResult;
    return NextResponse.next();
  }

  // Skip Next internals, API routes and public files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/icon.svg' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Already localized
  if (hasLocalePrefix(pathname)) {
    const requestHeaders = new Headers(request.headers);
    const locale = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'uk';
    requestHeaders.set('x-aiinsider-lang', locale);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Default locale (can be extended to detect by Accept-Language)
  const defaultLocale = 'uk';

  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/((?!_next).*)'],
};

