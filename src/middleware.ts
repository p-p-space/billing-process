import { type NextRequest, NextResponse } from 'next/server';
// Internal app
import { cookieLang, langCookieName, availableValueCookie } from './i18n';

export async function middleware(request: NextRequest) {
  const { cookies, nextUrl, url } = request;
  const response = NextResponse.next();

  if (nextUrl.pathname.startsWith('/api')) {
    console.log(url);
  } else {
    const lang = cookies.get(langCookieName)?.value;
    const cookieValue = await availableValueCookie(lang);

    response.cookies.set({
      ...cookieLang,
      name: langCookieName,
      value: cookieValue,
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|pwa|fonts|api).*)'],
};
