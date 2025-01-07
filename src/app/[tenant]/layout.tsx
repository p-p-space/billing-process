import type { Metadata } from 'next';
import 'remixicon/fonts/remixicon.css';
import { NextIntlClientProvider } from 'next-intl';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
//Internal app
import type { ChildrenProps, ParamsProps } from '@/interfaces';
import { selectSettings, selectTheme } from '@/tenants/tenantOptions';
import { ClientProvider, GlobalError, MuiProvider, GlobalSuccess, Lang, LoadingScreen } from '@/components';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('head');

  return {
    title: {
      template: ` %s | ${t('title')}`,
      default: t('title'),
    },
    description: t('description'),
  };
}

export default async function RootLayoutMain({ children, params }: ChildrenProps & ParamsProps) {
  const { tenant } = await params;
  const lang = await getLocale();
  const messages = await getMessages();
  const settings = await selectSettings(tenant);
  const themeVars = await selectTheme(settings.tenantTheme);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <InitColorSchemeScript attribute="class" />
          <AppRouterCacheProvider>
            <MuiProvider themeVars={themeVars}>
              <ClientProvider>{children}</ClientProvider>
              <GlobalError />
              <GlobalSuccess />
              <Lang />
              <LoadingScreen />
            </MuiProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
