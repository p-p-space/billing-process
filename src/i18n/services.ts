'use server';

// Internal app
import type { Lang } from '@/interfaces';
import { cookieValues, createCookie, readCookie } from '@/utils';
import { langCookieName, defaultLang, langs } from './language';

/**
 * Gets the application language from cookies.
 * @returns {Promise<{ locale: Lang }>} An object containing the application language.
 */
export async function getAppLang(): Promise<{ locale: Lang }> {
  const lang = await readCookie(langCookieName);
  const locale = await availableValueCookie(lang);

  return { locale };
}

/**
 * Sets the application language and creates a cookie with the language value.
 * @param {Lang} lang - The language to set.
 * @returns {Promise<void>}
 */
export async function setAppLang(lang: Lang): Promise<void> {
  const { cookieContent } = cookieValues({ name: langCookieName, value: lang });

  await createCookie(cookieContent);
}

/**
 * Checks if the cookie value is an available language.
 * @param {string | undefined} value - The cookie value.
 * @returns {Promise<Lang>} The valid language or the default language.
 */
export async function availableValueCookie(value: string | undefined): Promise<Lang> {
  const cookieValue = value && langs.includes(value as Lang) ? value : defaultLang;

  return cookieValue as Lang;
}
