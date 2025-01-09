'use client';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
// Internal app
import { createTenantTheme } from '@/theme-ui';
import type { ChildrenProps, ThemeProps } from '@/interfaces';

/**
 * Provider setting material ui theme
 *
 * @param children - Children element.
 * @param themeVars - Variables to create the theme.
 */
export default function MuiProvider({ children, themeVars }: ChildrenProps & ThemeProps) {
  const theme = createTenantTheme(themeVars);
  const [isHydrated, setIsHydrated] = useState(true);

  useEffect(() => {
    setIsHydrated(false);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {isHydrated ? (
        <Box sx={{ alignItems: 'center', display: 'flex', height: '100vh', width: '100%', justifyContent: 'center' }}>
          <CircularProgress size="5rem" sx={{ color: 'primary.main' }} thickness={2} disableShrink />
        </Box>
      ) : (
        <>
          <CssBaseline />
          {children}
        </>
      )}
    </ThemeProvider>
  );
}
