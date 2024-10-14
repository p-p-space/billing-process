const locales = ['en', 'es'];
import { NextResponse, NextRequest } from 'next/server';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) {
    return 'en';
  }

  return 'en';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) return;

  const newPathname = pathname.split('/').slice(2).join('/') || '/signin';
  const locale = getLocale(request);

  request.nextUrl.pathname = `/${locale}/${newPathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
