import { getRequestConfig } from 'next-intl/server';
// Internal app
import { getAppLang } from './servI18n';
import { defaultTenant } from '@/constans';
import { messagesHandle } from './messagesHandle';

/**
 * Request configuration to fetch language messages.
 * @returns {Promise<{locale: Lang, messages: LangData}>} - The locale and corresponding messages.
 */
export default getRequestConfig(async () => {
  const { locale, tenant } = await getAppLang();
  const langData = await messagesHandle(locale, tenant);

  const defaultMessages = await Promise.all(
    langData.default.map(async (file) => {
      const messages = await import(`../../dictionary/${defaultTenant}/${file}.json`);
      return messages.default;
    })
  );

  let tenantMessages = [];
  if (langData.tenant && langData.tenant.length > 0) {
    tenantMessages = await Promise.all(
      langData.tenant.map(async (file) => {
        const messages = await import(`../../dictionary/${tenant}/${file}.json`);
        return messages.default;
      })
    );
  }

  const combinedMessages = defaultMessages.reduce((acc, messages) => ({ ...acc, ...messages }), {});
  tenantMessages.forEach((messages) => {
    Object.keys(messages).forEach((key) => {
      if (combinedMessages[key]) {
        combinedMessages[key] = { ...combinedMessages[key], ...messages[key] };
      } else {
        combinedMessages[key] = messages[key];
      }
    });
  });

  return {
    locale,
    messages: combinedMessages,
  };
});
