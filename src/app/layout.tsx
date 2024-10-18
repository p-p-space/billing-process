import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
//Internal app
import './globals.css';
import { RootLayout } from '@/interfaces';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Head');

  return {
    title: {
      template: ` %s | ${t('title')}`,
      default: t('title'),
    },
    description: t('description'),
    // icons: {
    //   icon: '/vercel.ico',
    // },
  };
}

export default async function RootLayoutMain({ children }: Readonly<RootLayout>) {
  const lang = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={lang}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="bg-white min-h-screen w-full color-text">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
