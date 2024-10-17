import React from 'react';
import { Metadata } from 'next';
//Internal app
import { RootLayout } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Create password',
  description: '...',
};

export default function CreatePasswordlayout({ children }: RootLayout) {
  return <>{children}</>;
}
