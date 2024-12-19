'use client';

import { CssBaseline } from '@mui/material';
import { useEffect, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
// Internal app
import theme from '@/theme/theme-default';
import { RootLayout } from '@/interfaces';
import { handleRefresh } from '@/utils/constans';

/**
 * Provider setting material ui theme
 *
 * @param children - Children element.
 */
export default function MuiProvider({ children }: Readonly<RootLayout>): JSX.Element {
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
    [handleBeforeUnload]
  );

  useEffect(() => {
    if (handleRefresh === 'ON') {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [handleKeyDown, handleBeforeUnload]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
