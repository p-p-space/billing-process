//Internal app
import { Lang } from '@/interfaces';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const langCookieName = 'app_lang';
export const langs = ['en', 'es'] as const;
export const defaultLang: Lang = 'en';
export const cookieLang: ResponseCookie = {
  name: '',
  value: '',
  path: '/',
  sameSite: 'lax',
  httpOnly: true,
  expires: Date.now() + 6 * 30 * 24 * 60 * 60 * 1000,
};
