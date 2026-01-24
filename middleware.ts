import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ['en', 'uk'] as const;

function hasLocalePrefix(pathname: string) {
  return SUPPORTED_LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

