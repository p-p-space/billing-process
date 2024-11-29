import { getRequestConfig } from 'next-intl/server';
// Internal app
import { getAppLang } from './services';

export default getRequestConfig(async () => {
  const locale = await getAppLang();
  const messages = {
    ...(await import(`../../dictionary/bt/app.json`)).default,
    ...(await import(`../../dictionary/bt/${locale}/carousel.json`)).default,
    ...(await import(`../../dictionary/bt/${locale}/common.json`)).default,
    ...(await import(`../../dictionary/bt/${locale}/purchase.json`)).default,
    ...(await import(`../../dictionary/bt/${locale}/head.json`)).default,
    ...(await import(`../../dictionary/bt/${locale}/menu.json`)).default,
    ...(await import(`../../dictionary/bt/${locale}/password.json`)).default,
    ...(await import(`../../dictionary/bt/${locale}/signin.json`)).default,
    ...(await import(`../../dictionary/bt/${locale}/validation.json`)).default,
    ...(await import(`../../dictionary/bt/${locale}/profile.json`)).default,
  };

  return {
    locale,
    messages,
  };
});
