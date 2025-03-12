'use client';

import { Container } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//Internal app
import { toggles } from '@/constans';
import type { ChildrenProps } from '@/interfaces';

const queryClient = new QueryClient();

export default function ClientProvider({ children }: ChildrenProps) {
  const { handleRefresh } = toggles;

  const handleBeforeUnload = useCallback(() => {
    // TODO: Implement logout browserAxios.get('/logout');
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (handleRefresh === 'ON') {
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
    [handleBeforeUnload, handleRefresh]
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
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
    </QueryClientProvider>
  );
}
