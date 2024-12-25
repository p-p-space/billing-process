import { type NextRequest, NextResponse } from 'next/server';
// Internal app
import { cookieValues } from './utils';
import { apiPaths } from './utils/constans';
import { handleCustomerRequest } from './services';
import { langCookieName, availableValueCookie } from './i18n';

export async function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request;

  if (nextUrl.pathname.startsWith(apiPaths.servPath)) {
    const responseApi = await handleCustomerRequest(request);

    return responseApi;
  } else {
    const responsePages = NextResponse.next();
    const lang = cookies.get(langCookieName)?.value;
    const cookieValue = await availableValueCookie(lang);
    const { cookieContent } = cookieValues({ name: langCookieName, value: cookieValue });

    responsePages.cookies.set(cookieContent);

    return responsePages;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|pwa|fonts).*)'],
};
