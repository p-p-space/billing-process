import { type NextRequest, NextResponse } from 'next/server';
// Internal app
import { apiPaths, AppCookieName } from './constants';
import { handleCustomerRequest } from './services';
import { langCookieName, availableLang } from './i18n';
import { availableTenant, cookieValues } from './utils';

export async function middleware(request: NextRequest) {
  const { cookies, nextUrl, url } = request;

  if (nextUrl.pathname.startsWith(apiPaths.servPath)) {
    const responseApi = await handleCustomerRequest(request);

    return responseApi;
  } else {
    const responsePages = NextResponse.next();
    const lang = cookies.get(langCookieName)?.value;
    const lagnValue = await availableLang(lang);
    const tenantUrl = url.split('/')[3];
    const tenantValue = availableTenant(tenantUrl);
    const { cookieContent: cookieLang } = cookieValues({ name: langCookieName, value: lagnValue });
    const { cookieContent: cookietenant } = cookieValues({ name: AppCookieName, value: tenantValue });

    responsePages.cookies.set(cookieLang);
    responsePages.cookies.set(cookietenant);

    return responsePages;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|pwa|fonts).*)'],
};
