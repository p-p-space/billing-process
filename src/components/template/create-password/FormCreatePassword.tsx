'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { getSchema } from '@/config';
import { InputPass } from '@/components';

interface FormProps {
  onSubmit: () => void;
}

export default function FormCreatePassword(props: FormProps) {
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
      <InputPass name="newPassword" control={control} label="New password" />

      <InputPass name="currentNewPassword" control={control} label="Repeat new password" />

      <div>
        <button type="submit" className="flex w-full justify-center btn-primary">
          Log in
        </button>
      </div>
    </form>
  );
}
