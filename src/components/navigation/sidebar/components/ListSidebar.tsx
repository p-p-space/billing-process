'use client';

import Image from 'next/image';
import { Box } from '@mui/material';
//Internal app
import logo from '%/images/logo.svg';
import SectionSidebar from './SectionSidebar';

export default function ListSidebar(): JSX.Element {
  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', height: 108 }}>
        <Image src={logo} width={176} height={40} style={{ margin: 'auto' }} alt="Picture of the author" priority />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
        <SectionSidebar />
      </Box>
    </>
  );
}
