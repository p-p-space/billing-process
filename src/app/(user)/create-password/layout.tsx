import React from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
//Internal app
import { RootLayout } from '@/interfaces';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Password');

  return {
    title: t('pass-create'),
  };
}

export default function CreatePasswordlayout({ children }: RootLayout) {
  return <>{children}</>;
}
