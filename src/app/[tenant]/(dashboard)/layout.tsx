import { Metadata } from 'next';
import { redirect } from 'next/navigation';
//Internal app
import { getSessAttr } from '@/libs/redis';
import { getTranslations } from 'next-intl/server';
import { ChildrenProps, ParamsProps } from '@/interfaces';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('head');

  return {
    title: {
      template: ` %s | ${t('dashboard')}`,
      default: t('dashboard'),
    },
  };
}

export default async function Dashboardlayout({ children, params }: ChildrenProps & ParamsProps) {
  const { tenant: tenantUri } = await params;
  const logged = await getSessAttr('logged');

  if (!logged) {
    redirect(`/${tenantUri}/signin`);
  }

  return <>{children}</>;
}
