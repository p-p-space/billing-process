import { getRequestConfig } from 'next-intl/server';
// Internal app
import { getAppLang } from './services';

export default getRequestConfig(async () => {
  const locale = await getAppLang();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
