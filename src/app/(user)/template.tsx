'use client';

import Image from 'next/image';
import { Box, Grid2 } from '@mui/material/';
//Internal App
import logo from '%/images/logo.svg';
import { Slider } from '@/components';

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Grid2 container spacing={3} height="100vh">
      <Grid2 size={{ lg: 7 }} display={{ xs: 'none', lg: 'flex' }} alignItems="center" justifyContent="center">
        <Box sx={{ p: 3, display: 'block', position: 'absolute', top: 2, left: 2 }}>
          <Image src={logo} width={176} height={40} style={{ margin: 'auto' }} alt={`Picture of the author`} priority />
        </Box>
        <Slider />
      </Grid2>

      <Grid2
        size={{ lg: 5 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          bgcolor: 'white',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 320 }}>
          <Box sx={{ p: 3, display: { xs: 'block', md: 'none' }, textAlign: 'center' }}>
            <Image
              src={logo}
              width={176}
              height={40}
              style={{ margin: 'auto' }}
              alt={`Picture of the author`}
              priority
            />
          </Box>
          {children}
        </Box>
      </Grid2>
    </Grid2>
  );
}
