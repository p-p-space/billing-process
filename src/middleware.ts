import { type NextRequest, NextResponse } from 'next/server';
// Internal app
import { cookieLang, langCookieName, availableValueCookie } from './i18n';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const lang = request.cookies.get(langCookieName)?.value;
  const cookieValue = await availableValueCookie(lang);

  response.cookies.set({
    ...cookieLang,
    value: cookieValue,
  });

  return response;
}
