import { type NextRequest, NextResponse } from 'next/server';
// Internal app
import { cookieValues, customerRequest } from './utils';
import { langCookieName, availableValueCookie } from './i18n';

export async function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request;

  if (nextUrl.pathname.startsWith('/api/v0')) {
    const response = await customerRequest(request);

    return response;
  } else {
    const response = NextResponse.next();
    const lang = cookies.get(langCookieName)?.value;
    const cookieValue = await availableValueCookie(lang);
    const { cookieContent } = cookieValues({ name: langCookieName, value: cookieValue });

    response.cookies.set(cookieContent);
    return response;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|pwa|fonts).*)'],
};
