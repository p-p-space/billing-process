'use client';

import Image from 'next/image';
import { Typography, AppBar, Toolbar, IconButton, Box, useTheme, Grid2, Button } from '@mui/material';
//Internal app
import UserInfo from './UserInfo';
import { useNavbarStore } from '@/store';
import { DrawerToggleProps } from '@/interfaces';

export default function Navbar(props: Readonly<DrawerToggleProps>): JSX.Element {
  const { handleDrawerToggle } = props;

  const navbarObject = useNavbarStore((state) => state.navbarObject);

  const theme = useTheme();

  return (
    <AppBar
      position="relative"
      sx={{
        borderBottom: `10px solid ${theme.palette.primary.dark}`,
        background:
          'linear-gradient(60deg, rgba(104, 54, 197, 1) 4%, rgba(129, 66, 245, 1) 55%, rgba(104, 54, 197, 1) 100%);',
        pt: 2,
        height: 'fit-content',
      }}
    >
      <Toolbar sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={handleDrawerToggle} sx={{ display: { xs: 'flex', md: 'none' }, color: 'white' }}>
              <i className="ri-menu-2-line"></i>
            </IconButton>
            <Typography variant="h5" fontWeight={500} color="white">
              {navbarObject?.title}
            </Typography>
          </Box>
          <UserInfo />
        </Box>

        {navbarObject !== null && (
          <Grid2 container spacing={3} alignItems="center">
            <Grid2 size={{ xs: 12, md: 7 }}>
              {navbarObject?.description && (
                <Typography sx={{ display: { xs: 'none', md: 'block' }, color: 'white' }}>
                  {navbarObject.description}
                </Typography>
              )}
              {navbarObject?.actions && (
                <Button
                  onClick={navbarObject.actions[0].onClick}
                  variant="outlined"
                  sx={{ color: 'white', '&:hover': { color: 'inherit' }, my: 2 }}
                >
                  {navbarObject.actions[0].label}
                </Button>
              )}
            </Grid2>

            {navbarObject?.image && (
              <Grid2 size={{ md: 5 }} sx={{ height: 154, display: { xs: 'none', md: 'flex' } }}>
                <Image
                  src={navbarObject?.image}
                  alt="hero"
                  width={290}
                  height={154}
                  style={{ bottom: 0, position: 'relative' }}
                  priority
                />
              </Grid2>
            )}
          </Grid2>
        )}
      </Toolbar>
    </AppBar>
  );
}
