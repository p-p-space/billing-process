import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal app
import { handleCustomerRequest } from './services';
import { availableLang, langCookieName } from './i18n';
import { availableTenant, cookieValues } from './utils';
import { apiPaths, apiSrc, appCookieName } from './constans';

export async function middleware(request: NextRequest) {
  const { cookies, nextUrl, url } = request;

  if (!nextUrl.pathname.startsWith(apiSrc)) {
    const responsePages = NextResponse.next();
    const lang = cookies.get(langCookieName)?.value;
    const lagnValue = await availableLang(lang);
    const tenantUrl = url.split('/')[3];
    const tenantValue = availableTenant(tenantUrl);
    const { cookieContent: cookieLang } = cookieValues({ name: langCookieName, value: lagnValue });
    const { cookieContent: cookietenant } = cookieValues({ name: appCookieName, value: tenantValue });

    responsePages.cookies.set(cookieLang);
    responsePages.cookies.set(cookietenant);

    return responsePages;
  }

  if (
    !nextUrl.pathname.startsWith(apiPaths.appAPiV1) &&
    !nextUrl.pathname.startsWith('/api/all') &&
    nextUrl.pathname !== '/api/healthcheck'
  ) {
    console.log('middleware', nextUrl.pathname);
    const responseApi = await handleCustomerRequest(request);

    return responseApi;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|pwa|fonts).*)'],
};
