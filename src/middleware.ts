import { type NextRequest, NextResponse } from 'next/server';
import { cookieLang, defaultLang, type Lang, langs } from './i18n/config';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const lang = request.cookies.get(cookieLang);

  if (!lang || !langs.includes(lang.value as Lang)) {
    response.cookies.set({
      name: cookieLang,
      value: defaultLang,
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
      expires: Date.now() + 6 * 30 * 24 * 60 * 60 * 1000,
    });
  }

  return response;
}
