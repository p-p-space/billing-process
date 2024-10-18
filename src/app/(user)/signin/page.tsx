'use client';

import { useTranslations } from 'next-intl';
// Internal app
import { FormSignin } from '@/components';

export default function Page() {
  const t = useTranslations('Signin');
  const onSubmit = () => console.log('hola');

  return (
    <>
      <h2 className="text-2xl text-center lg:text-start mb-6 ">{t('signin')}</h2>
      <FormSignin onSubmit={onSubmit} />
    </>
  );
}
