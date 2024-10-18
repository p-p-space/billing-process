'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { getSchema } from '@/config';
import { InputPass } from '@/components';

interface FormProps {
  onSubmit: () => void;
}

export default function FormCreatePassword(props: FormProps) {
  const t = useTranslations();
  const { onSubmit } = props;

  const schema = getSchema(['newPassword', 'currentNewPassword']);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      newPassword: '',
      currentNewPassword: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <InputPass name="newPassword" control={control} label={t('Password.pass-new')} />

      <InputPass name="currentNewPassword" control={control} label={t('Password.pass-repeat')} />

      <div>
        <button type="submit" className="flex w-full justify-center btn-primary">
          {t('Common.create')}
        </button>
      </div>
    </form>
  );
}
