import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import 'remixicon/fonts/remixicon.css';
import { NextIntlClientProvider } from 'next-intl';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
//Internal app
import { tenantPrefix } from '@/constans';
import { availableTenant } from '@/utils';
import { assetSetts } from '@/tenants/tenantSettings';
import { tenantMuiTheme } from '@/tenants/settingsManage';
import type { ChildrenProps, ParamsProps } from '@/interfaces';
import { ClientProvider, GlobalError, GlobalSuccess, Lang, LoadingScreen, MuiProvider } from '@/components';

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
  const { tenant: tenantUri } = await params;
  const tenant = availableTenant(tenantUri);

  if (!tenantUri.includes(tenantPrefix)) {
    redirect(`/${tenantPrefix}${tenant}/signin`);
  }

  const lang = await getLocale();
  const messages = await getMessages();
  const { tenantTheme, ...tenantSett } = await assetSetts();
  const tenantfeatures = { tenant, tenantUri, ...tenantSett };
  const themeVars = await tenantMuiTheme(tenantTheme);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body style={{ margin: 0 }}>
        <NextIntlClientProvider messages={messages}>
          <InitColorSchemeScript attribute="class" />
          <AppRouterCacheProvider>
            <MuiProvider themeVars={themeVars} tenantSett={{ ...tenantfeatures }}>
              <LoadingScreen />
              <GlobalError />
              <GlobalSuccess />
              <Lang />
              <ClientProvider>{children}</ClientProvider>
            </MuiProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
