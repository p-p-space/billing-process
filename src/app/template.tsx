'use client';

import { useLocale } from 'next-intl';
// Internal app
import { RootLayout } from '@/interfaces';
import { langs, setAppLang } from '@/i18n';

export default function Template({ children }: Readonly<RootLayout>) {
  const currentLang = useLocale();
  const nextLang = langs.filter((lang) => lang !== currentLang)[0];

  const changeLanguage = () => {
    setAppLang(nextLang);
  };

  return (
    <>
      {children}
      <button onClick={changeLanguage}>language {currentLang}</button>
    </>
  );
}
