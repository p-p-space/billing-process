import { getAppLang } from '@/services/lang';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  const locale = await getAppLang();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
