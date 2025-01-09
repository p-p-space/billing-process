import { Metadata } from 'next';
//Internal app
import type { ChildrenProps } from '@/interfaces';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('password');

  return {
    title: {
      template: ` %s | ${t('pass-update')}`,
      default: t('pass-update'),
    },
    description: t('pass-description'),
  };
}

export default function UpdatePasswordlayout({ children }: ChildrenProps) {
  return <>{children}</>;
}
