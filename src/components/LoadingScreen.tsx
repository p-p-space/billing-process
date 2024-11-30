'use client';

import { Backdrop, CircularProgress } from '@mui/material';
//Internal App
import { useUiStore } from '@/store';

export default function LoadingScreen() {
  const loadingScreen = useUiStore((state) => state.loadingScreen);

  return (
    <Backdrop open={loadingScreen} sx={{ background: 'rgba(255,255,255,.7)', zIndex: 99999 }}>
      <CircularProgress />
    </Backdrop>
  );
}
