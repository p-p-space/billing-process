'use server';

// Internal app
import { appCookieName } from '@/constans';
import type { AllowedTenants, Lang } from '@/interfaces';
import { langCookieName, defaultLang, langs } from './';
import { cookieValues, createCookie, readCookie } from '@/utils';

/**
 * Gets the application language from cookies.
 * @returns {Promise<{ locale: Lang, tenant: AllowedTenants }>} An object containing the application language and tenant.
 */
export async function getAppLang(): Promise<{ locale: Lang; tenant: AllowedTenants }> {
  const lang = await readCookie(langCookieName);
  const locale = await availableLang(lang);
  const tenant = (await readCookie(appCookieName)) as AllowedTenants;

  return { locale, tenant };
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
export async function availableLang(value: string | undefined): Promise<Lang> {
  const cookieValue = value && langs.includes(value as Lang) ? value : defaultLang;

  return cookieValue as Lang;
}
