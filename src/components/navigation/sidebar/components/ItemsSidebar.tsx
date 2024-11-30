'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
//Internal app
import { useMenuStore } from '@/store';

export default function ItemsSidebar({
  data,
}: {
  data: Array<{ id: string; url: string; enable: boolean; icon: string }>;
}): JSX.Element {
  const t = useTranslations('menu');

  const currentItem = useMenuStore((state) => state.currentItem);

  const setCurrentItem = useMenuStore((state) => state.setCurrentItem);

  const setDrawerStatus = useMenuStore((state) => state.setDrawerStatus);

  return (
    <>
      {data.map((menu: { id: string; url: string; enable: boolean; icon: string }, i: number) => {
        const currentItemMenu = currentItem === menu.id;

        return (
          <ListItem
            key={i}
            disablePadding
            sx={{ display: menu.enable ? 'flex' : 'none' }}
            onClick={() => {
              setCurrentItem(menu.id);
              setDrawerStatus(false);
            }}
          >
            <ListItemButton
              disabled={currentItemMenu}
              component={Link}
              href={`${menu.url}`}
              selected={currentItemMenu}
              sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <ListItemIcon sx={{ minWidth: 'auto', fontSize: 24 }}>
                <i className={menu.icon}></i>
              </ListItemIcon>
              <ListItemText primary={t(menu.id)} primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </>
  );
}
