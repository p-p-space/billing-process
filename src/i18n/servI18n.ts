'use server';

// Internal App
import type { Lang, Tenant } from '@/interfaces';
import { availableTenant, cookieValues, setCookie, readCookie } from '@/utils';
import { appSettings, defaultLang, langCookieName, tenantCookieName } from '@/constans';

/**
 * Gets the application language from cookies.
 * @returns {Promise<{ locale: Lang, tenant: Tenant }>} An object containing the application language and tenant.
 */
export async function getAppLang(): Promise<{ locale: Lang; tenant: Tenant }> {
  const lagnValue = await readCookie(langCookieName);
  const locale = await availableLang(lagnValue);
  const tenantValue = await readCookie(tenantCookieName);
  const tenant = availableTenant(tenantValue);

  return { locale, tenant };
}

/**
 * Sets the application language and creates a cookie with the language value.
 * @param {Lang} lang - The language to set.
 * @returns {Promise<void>}
 */
export async function setAppLang(lang: Lang): Promise<void> {
  const cookieLang = cookieValues({ name: langCookieName, value: lang });

  await setCookie(cookieLang);
}

/**
 * Checks if the cookie value is an available language.
 * @param {string | undefined} value - The cookie value.
 * @returns {Promise<Lang>} The valid language or the default language.
 */
export async function availableLang(value: string | undefined): Promise<Lang> {
  const { availableLangs } = appSettings;
  const cookieValue = value && availableLangs.includes(value as Lang) ? value : defaultLang;

  return cookieValue as Lang;
}
