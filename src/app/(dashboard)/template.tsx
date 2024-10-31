'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
//Internal app
import { useMenuStore } from '@/store';
import { RootLayout } from '@/interfaces';
import { Navbar, Sidebar } from '@/components';

export default function Template({ children }: Readonly<RootLayout>): JSX.Element {
  const drawerWidth = 280;

  const { drawerStatus, setDrawerStatus } = useMenuStore();

  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setDrawerStatus(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setDrawerStatus(!drawerStatus);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar
        open={drawerStatus}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        drawerWidth={drawerWidth}
      />
      <Box component="main" sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Navbar handleDrawerToggle={handleDrawerToggle} />
        <Box sx={{ p: 2, maxWidth: 1600, mx: 'auto' }}>{children}</Box>
      </Box>
    </Box>
  );
}
