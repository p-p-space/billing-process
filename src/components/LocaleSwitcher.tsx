'use client';

import { langs } from '@/i18n/config';
import { setAppLang } from '@/services/lang';
import { useLocale } from 'next-intl';
import { HiMiniLanguage } from 'react-icons/hi2';

export default function LocaleSwitcher() {
  const lang = useLocale();
  const nextLang = langs.filter((currentLang) => lang !== currentLang)[0];

  const changeLanguage = () => {
    setAppLang(nextLang);
  };

  return (
    <span
      className="flex items-center gap-2 hover:underline hover:underline-offset-4 cursor-pointer"
      onClick={changeLanguage}
    >
      <HiMiniLanguage />
      {nextLang}
    </span>
  );
}
