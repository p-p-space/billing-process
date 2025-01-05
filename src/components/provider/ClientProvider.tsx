'use client';
import { Container } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//Internal app
import { toggles } from '@/utils/constans';
import type { RootLayout } from '@/interfaces';

const queryClient = new QueryClient();

export default function ClientProvider({ children }: Readonly<RootLayout>) {
  const handleBeforeUnload = useCallback(() => {
    // TODO: Implement logout browserAxios.get('/logout');
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (toggles.handleRefresh === 'ON') {
        const keyRegex = /^r$/i;
        const keyEvent = keyRegex.test(event.key);
        const isF5 = event.key === 'F5';
        const isCtrlR = event.ctrlKey && keyEvent;
        const isMetaR = event.metaKey && keyEvent;

        if (isF5 || isCtrlR || isMetaR) {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        }
      }
    },
    [handleBeforeUnload]
  );

  useEffect(() => {
    if (toggles.handleRefresh === 'ON') {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [handleKeyDown, handleBeforeUnload]);

  return (
    <QueryClientProvider client={queryClient}>
      <Container>{children}</Container>;
    </QueryClientProvider>
  );
}
