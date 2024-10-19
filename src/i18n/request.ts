import { getRequestConfig } from 'next-intl/server';
// Internal app
import { getAppLang } from './services';

export default getRequestConfig(async () => {
  const locale = await getAppLang();
  const messages = {
    ...(await import(`../../dictionary/app.json`)).default,
    ...(await import(`../../dictionary/${locale}/carousel.json`)).default,
    ...(await import(`../../dictionary/${locale}/common.json`)).default,
    ...(await import(`../../dictionary/${locale}/head.json`)).default,
    ...(await import(`../../dictionary/${locale}/password.json`)).default,
    ...(await import(`../../dictionary/${locale}/signin.json`)).default,
  };

  return {
    locale,
    messages,
  };
});
