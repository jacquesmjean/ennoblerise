import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'fr', 'es'];
const defaultLocale = 'en';

function detectLocale(request: NextRequest): string {
  const cookie = request.cookies.get('er-locale')?.value;
  if (cookie && locales.includes(cookie)) return cookie;
  const header = request.headers.get('accept-language') ?? '';
  for (const part of header.split(',')) {
    const code = part.split(';')[0].trim().slice(0, 2).toLowerCase();
    if (locales.includes(code)) return code;
  }
  return defaultLocale;
}

const legacyRedirects: Record<string, string> = {
  '/home-4587': '/',
  '/about-us': '/about',
  '/contact-us': '/contact',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Legacy GoHighLevel URLs → new structure (301)
  if (legacyRedirects[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = legacyRedirects[pathname];
    return NextResponse.redirect(url, 301);
  }
  if (pathname.startsWith('/blog/b/')) {
    const slug = pathname.slice('/blog/b/'.length).toLowerCase();
    const url = request.nextUrl.clone();
    url.pathname = `/blog/${slug}`;
    return NextResponse.redirect(url, 301);
  }

  // Skip internals, portal, api, and files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/portal') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (!hasLocale) {
    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  const current = pathname.split('/')[1];
  if (locales.includes(current)) {
    response.cookies.set('er-locale', current, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|portal|.*\\..*).*)'],
};
