'use client';

import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
//Internal app
import { RootLayout } from '@/interfaces';

export default function ClientProvider({ children }: Readonly<RootLayout>): JSX.Element {
  const [isHydrated, setIsHydrated] = useState<boolean>(true);

  useEffect(() => {
    setIsHydrated(false);
  }, []);

  if (isHydrated)
    return (
      <Box sx={{ alignItems: 'center', display: 'flex', height: '100vh', width: '100%', justifyContent: 'center' }}>
        <CircularProgress size="5rem" sx={{ color: 'primary.main' }} thickness={2} disableShrink />
      </Box>
    );

  return <Container>{children}</Container>;
}
