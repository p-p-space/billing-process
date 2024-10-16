import React from 'react';
import { Metadata } from 'next';
//Internal app
import { RootLayout } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Signin',
  description: '...',
};

export default function Signinlayout({ children }: RootLayout) {
  return <>{children}</>;
}
