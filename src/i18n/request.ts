import { getRequestConfig } from 'next-intl/server';
// Internal app
import { getAppLang } from './servI18n';
import { defaultTenant, headersKey } from '@/constans';
import { createHttpConfig, manageRequest } from '@/libs/axios';
import type { Lang, LangData, LangFiles, RequestAxios } from '@/interfaces';

/**
 * Request configuration to fetch language messages.
 * @returns {Promise<{locale: Lang, messages: LangData}>} - The locale and corresponding messages.
 */
export default getRequestConfig(async () => {
  const { locale, tenant } = await getAppLang();
  const dataRequest = { locale, tenant };

  const httpConfig = createHttpConfig();
  httpConfig.headers[headersKey.appTenant] = tenant;

  const requestConfig: RequestAxios = {
    method: 'post',
    pathUrl: '/language',
    dataRequest,
    httpConfig,
  };
  const requestType = 'application';

  const { data, status } = await manageRequest(requestConfig, requestType);

  if (status !== 200) {
    console.error(data);
  }

  const { messages } = await loadDataLang(data.language, locale, tenant);

  return {
    locale,
    messages,
  };
});

/**
 * Loads language data for the application and tenant.
 * @param {LangFiles} language - Language files.
 * @param {Lang} locale - Locale language.
 * @param {string} tenant - Tenant identifier.
 * @returns {Promise<{messages: LangData}>} - Combined language messages.
 */
async function loadDataLang(language: LangFiles, locale: Lang, tenant: string): Promise<{ messages: LangData }> {
  let messages: LangData = {};

  for (const lang of language.default) {
    let appLang: LangData = {};
    let tenantLang: LangData = {};
    const langName = lang.replace(`${locale}/`, '');

    // Import application language data
    appLang = (await import(`../../dictionary/${defaultTenant}/${lang}.json`)).default;

    // Import tenant language data if it exists
    if (language.tenant.indexOf(lang) !== -1) {
      tenantLang = (await import(`../../dictionary/${tenant}/${lang}.json`)).default;
    }

    // Combine application and tenant messages
    messages = { ...messages, [langName]: { ...appLang[langName], ...tenantLang[langName] } };
  }

  return { messages };
}
