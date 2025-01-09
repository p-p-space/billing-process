import { Metadata } from 'next';
//Internal app
import type { ChildrenProps } from '@/interfaces';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('purchase');

  return {
    title: {
      template: ` %s | ${t('purc-title')}`,
      default: t('purc-title'),
    },
    description: t('purc-description'),
  };
}

export default function PurchaseOrderlayout({ children }: ChildrenProps) {
  return <>{children}</>;
}
