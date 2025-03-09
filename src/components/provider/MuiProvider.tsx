'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CircularProgress, CssBaseline } from '@mui/material';
// Internal app
import { useTenantStore } from '@/store';
import { createTenantTheme } from '@/theme-ui';
import type { ChildrenProps, TenantSettProps } from '@/interfaces';

/**
 * Provider setting material ui theme
 *
 * @param children - Children element.
 * @param themeVars - Variables to create the theme.
 */
export default function MuiProvider({ children, themeVars, tenantSett }: ChildrenProps & TenantSettProps) {
  const theme = createTenantTheme(themeVars);
  const [isHydrated, setIsHydrated] = useState(true);

  const setTenantSett = useTenantStore((state) => state.setTenantSett);

  useEffect(() => {
    setTenantSett(tenantSett);
    setIsHydrated(false);
  }, [setTenantSett, tenantSett]);

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
