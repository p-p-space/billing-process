import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Internal app
import { availableLang } from './i18n';
import { availableTenant, cookieValues } from './utils';
import { tenantPrefix, defaultTenant } from './constans/appConstans';
import { handleCustomerRequest, handleSession } from './middlewares';
import { apiPaths, apiSrc, headersKey, langCookieName, tenantCookieName } from './constans';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { cookies, nextUrl, url, headers } = request;
  const { pathname } = nextUrl;

  if (pathname === '/') {
    const rootRedirectURL = new URL(`/${tenantPrefix}${defaultTenant}/signin`, url).toString();
    return NextResponse.redirect(rootRedirectURL);
  }

  if (!pathname.startsWith(apiSrc)) {
    const tenantUri = headers.get(headersKey.appTenant) ?? url.split('/')[3];
    const tenant = availableTenant(tenantUri);

    if (!tenantUri.includes(tenant)) {
      const refreshedURL = new URL(`/${tenantPrefix}${tenant}/signin`, url).toString();

      return NextResponse.redirect(refreshedURL);
    }

    await handleSession(headers, tenant, response);

    const lagnCookie = cookies.get(langCookieName)?.value;
    const lagn = await availableLang(lagnCookie);
    const cookieLang = cookieValues({ name: langCookieName, value: lagn });
    const cookietenant = cookieValues({
      name: tenantCookieName,
      value: tenant,
      sameSite: 'strict',
    });

    response.cookies.set(cookieLang);
    response.cookies.set(cookietenant);
  }

  if (apiPaths.apiSearch.exec(pathname)) {
    const responseApi = await handleCustomerRequest(request);

    return responseApi;
  }

  return response;
}

export const config = {
  matcher: [
    `/t-:tenant/:path*`,
    '/api/v:version/:path*',
    '/',
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|pwa|fonts).*)',
  ],
};
