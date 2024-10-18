'use client';

import { useTranslations } from 'next-intl';
// Internal app
import { FormCreatePassword } from '@/components';

export default function Page() {
  const t = useTranslations('Password');
  const onSubmit = () => console.log('hola');

  return (
    <>
      <h2 className="text-2xl text-center lg:text-start mb-6 ">{t('pass-create')}</h2>
      <FormCreatePassword onSubmit={onSubmit} />
    </>
  );
}
