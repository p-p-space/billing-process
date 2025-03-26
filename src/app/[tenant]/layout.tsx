import type { Metadata } from 'next';
import 'remixicon/fonts/remixicon.css';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
//Internal app
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

export default async function Tenantlayout({ children, params }: ChildrenProps & ParamsProps) {
  const { tenant: tenantUri } = await params;
  const tenant = availableTenant(tenantUri);
  const { tenantAllowed, tenantTheme, ...tenantSett } = await assetSetts();

  if (!tenantAllowed.includes(tenantUri)) {
    return redirect(`/${tenantAllowed[0]}/signin`);
  }

  const tenantfeatures = { tenant, tenantUri, ...tenantSett };
  const themeVars = await tenantMuiTheme(tenantTheme);

  return (
    <MuiProvider themeVars={themeVars} tenantSett={{ ...tenantfeatures }}>
      <LoadingScreen />
      <GlobalError />
      <GlobalSuccess />
      <Lang />
      <ClientProvider>{children}</ClientProvider>
    </MuiProvider>
  );
}
