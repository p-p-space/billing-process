import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
//Internal app
import { RootLayout } from '@/interfaces';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('signin');

  return {
    title: t('signin'),
  };
}

export default function Signinlayout({ children }: Readonly<RootLayout>) {
  return <>{children}</>;
}
