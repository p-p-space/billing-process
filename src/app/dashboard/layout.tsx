import type { Metadata } from 'next';
//Internal app
import { RootLayout } from '@/interfaces';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: '...',
};

export default function Dashboardlayout({ children }: RootLayout) {
  return <>{children}</>;
}
