'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
//Internal app
import { menu } from './menu';
import ItemsSidebar from './ItemsSidebar';

export default function SectionSidebar(): JSX.Element {
  const t = useTranslations('menu');

  const { push } = useRouter();

  const { main, user } = menu[0];

  return (
    <List
      sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
    >
      <Box>
        <Typography fontWeight={700} mb={3} textTransform="uppercase">
          {t('menu')}
        </Typography>
        <Box sx={{ width: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <ItemsSidebar data={main} />
        </Box>
        <Typography fontWeight={700} my={3} textTransform="uppercase">
          {t('config-support')}
        </Typography>
        <Box sx={{ width: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <ItemsSidebar data={user} />
        </Box>
      </Box>

      <Box>
        <Divider sx={{ borderColor: 'primary.main' }} />

        <ListItem disablePadding sx={{ display: 'flex' }}>
          <ListItemButton
            onClick={() => {
              push('/signin');
            }}
            sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <ListItemIcon sx={{ minWidth: 'auto', fontSize: 24 }}>
              <i className="ri-logout-circle-r-line"></i>
            </ListItemIcon>
            <ListItemText primary={t('log-out')} primaryTypographyProps={{ fontWeight: 500 }} />
          </ListItemButton>
        </ListItem>
      </Box>
    </List>
  );
}
