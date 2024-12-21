import { type NextRequest, NextResponse } from 'next/server';
// Internal app
import { cookieValues } from './utils';
import { apiPaths } from './utils/constans';
import { langCookieName, availableValueCookie } from './i18n';
import { customerRequest, getOauthBearer, oauthToken } from './handlers';

export async function middleware(request: NextRequest) {
  const responseNext = NextResponse.next();
  const { cookies, nextUrl } = request;

  if (nextUrl.pathname.startsWith(apiPaths.servPath)) {
    if (!oauthToken.bearer) {
      await getOauthBearer();
    }

    const responseApi = await customerRequest(request);

    return responseApi;
  } else {
    const lang = cookies.get(langCookieName)?.value;
    const cookieValue = await availableValueCookie(lang);
    const { cookieContent } = cookieValues({ name: langCookieName, value: cookieValue });

    responseNext.cookies.set(cookieContent);
  }

  return responseNext;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|pwa|fonts).*)'],
};
