'use server';

import { cookies } from 'next/headers';
// Internal app
import { Lang } from '@/interfaces';
import { cookieLang, langCookieName, defaultLang, langs } from './language';

export async function getAppLang() {
  const cookieStore = await cookies();
  const lang = cookieStore.get(langCookieName)?.value;
  const cookieValue = await availableValueCookie(lang);

  return cookieValue;
}

export async function setAppLang(lang: Lang) {
  const cookieStore = await cookies();

  cookieStore.set({
    ...cookieLang,
    name: langCookieName,
    value: lang,
  });
}

export async function availableValueCookie(value: string | undefined): Promise<Lang> {
  const cookieValue = value && langs.includes(value as Lang) ? value : defaultLang;

  return cookieValue as Lang;
}
