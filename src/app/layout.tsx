import type { Metadata } from 'next';
import 'remixicon/fonts/remixicon.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
//Internal app
import { RootLayout } from '@/interfaces';
import { ClientProvider, GlobalError, MuiProvider, GlobalSuccess, Lang } from '@/components';

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

export default async function RootLayoutMain({ children }: Readonly<RootLayout>) {
  const lang = await getLocale();

  const messages = await getMessages();

  return (
    <html lang={lang}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppRouterCacheProvider>
            <MuiProvider>
              <ClientProvider>{children}</ClientProvider>
              <GlobalError />
              <GlobalSuccess />
              <Lang />
            </MuiProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
