'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { getSchema } from '@/config';
import { InputPass, InputText } from '@/components';

interface FormProps {
  onSubmit: () => void;
}

export default function FormSignin(props: FormProps) {
  const t = useTranslations('Signin');
  const { onSubmit } = props;

  const schema = getSchema(['email', 'password']);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <InputText name="email" control={control} label={t('email')} />

      <InputPass name="password" control={control} label={t('password')} />

      <div>
        <button type="submit" className="flex w-full justify-center btn-primary">
          {t('login')}
        </button>
      </div>
    </form>
  );
}
