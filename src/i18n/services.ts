'use server';
import { cookies } from 'next/headers';
// Internal app
import { Lang } from '@/interfaces';
import { cookieLang, defaultLang } from './language';

export async function getAppLang() {
  const lang = cookies().get(cookieLang)?.value;

  return lang || defaultLang;
}

export async function setAppLang(lang: Lang) {
  cookies().set(cookieLang, lang);
}
