'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Tooltip, IconButton } from '@mui/material';
// Internal app
import logoEs from '%/images/lang/es.png';
import logoEn from '%/images/lang/en.png';
import { langs, setAppLang } from '@/i18n';

export default function Lang() {
  const currentLang = useLocale();
  const nextLang = langs.filter((lang) => lang !== currentLang)[0];

  const changeLanguage = () => {
    setAppLang(nextLang);
  };

  return (
    <Tooltip title={nextLang} placement="left">
      <IconButton onClick={changeLanguage} sx={{ p: 0, position: 'fixed', bottom: 8, right: 8 }}>
        <Image src={nextLang === 'en' ? logoEn : logoEs} width={20} height={20} alt={nextLang} priority />
      </IconButton>
    </Tooltip>
  );
}
