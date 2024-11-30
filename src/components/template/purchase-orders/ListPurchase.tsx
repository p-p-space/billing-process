'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
//Internal app
import { useNavbarStore } from '@/store';
import CardPurchase from './CardPurchase';

export default function ListPurchase() {
  const { push } = useRouter();

  const t = useTranslations('purchase');

  const setNavbarObject = useNavbarStore((state) => state.setNavbarObject);

  useEffect(() => {
    setNavbarObject({
      title: t('order-title'),
      description: t('order-description'),
      image: '/images/users.png',
      actions: [{ label: t('order-new'), onClick: () => push('/purchase/new-purchase-order') }],
    });
  }, [push, setNavbarObject, t]);

  return (
    <Box>
      <h1>Filter</h1>

      <Box sx={{ maxWidth: 1372, display: 'flex', flexWrap: 'wrap', gap: 3, width: '100%', justifyContent: 'center' }}>
        {Array.from({ length: 11 }).map(() => (
          <CardPurchase key={crypto.randomUUID()} />
        ))}
      </Box>
    </Box>
  );
}
