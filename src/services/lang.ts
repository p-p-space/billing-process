'use server';

import { cookieLang, defaultLang, type Lang } from '@/i18n/config';
import { cookies } from 'next/headers';

export async function getAppLang() {
  const lang = cookies().get(cookieLang)?.value;

  return lang || defaultLang;
}

export async function setAppLang(lang: Lang) {
  cookies().set(cookieLang, lang);
}
