import { Metadata } from 'next';
//Internal app
import { RootLayout } from '@/interfaces';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('profile');

  return {
    title: {
      template: ` %s | ${t('prof-title')}`,
      default: t('prof-title'),
    },
    description: t('prof-title'),
  };
}

export default function Profilelayout({ children }: Readonly<RootLayout>) {
  return <>{children}</>;
}
