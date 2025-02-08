import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal app
import { availableLang } from './i18n';
import { handleCustomerRequest } from './services';
import { availableTenant, cookieValues } from './utils';
import { apiPaths, apiSrc, langCookieName, tenantCookieName } from './constans';

export async function middleware(request: NextRequest) {
  const { cookies, nextUrl, url } = request;
  const { pathname } = nextUrl;

  if (!pathname.startsWith(apiSrc)) {
    const responsePages = NextResponse.next();
    const lang = cookies.get(langCookieName)?.value;
    const lagnValue = await availableLang(lang);
    const tenantUrl = url.split('/')[3];
    const tenantValue = availableTenant(tenantUrl);
    const cookieLang = cookieValues({ name: langCookieName, value: lagnValue });
    const cookietenant = cookieValues({
      name: tenantCookieName,
      value: tenantValue,
      sameSite: 'strict',
    });

    responsePages.cookies.set(cookieLang);
    responsePages.cookies.set(cookietenant);

    return responsePages;
  }

  if (apiPaths.apiSearch.exec(pathname)) {
    const responseApi = await handleCustomerRequest(request);

    return responseApi;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|pwa|fonts).*)'],
};
