'use client';
import { Box, CircularProgress, CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
// Internal app
import theme from '@/theme/theme-default';
import type { ChildrenProps, ThemeProps } from '@/interfaces';

/**
 * Provider setting material ui theme
 *
 * @param children - Children element.
 */
export default function MuiProvider({ children, TenantTheme }: ChildrenProps & ThemeProps) {
  console.log({ TenantTheme });
  const [isHydrated, setIsHydrated] = useState(true);

  useEffect(() => {
    setIsHydrated(false);
  }, []);

  if (isHydrated) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ alignItems: 'center', display: 'flex', height: '100vh', width: '100%', justifyContent: 'center' }}>
          <CircularProgress size="5rem" sx={{ color: 'primary.main' }} thickness={2} disableShrink />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
