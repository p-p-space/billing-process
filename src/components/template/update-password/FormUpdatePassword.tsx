'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Box, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { getSchema } from '@/config';
import { InputPass } from '@/components';
import { useNavbarStore, useUiStore } from '@/store';

export default function FormUpdatePassword() {
  const t = useTranslations();

  const setModalSuccess = useUiStore((state) => state.setModalSuccess);

  const setNavbarObject = useNavbarStore((state) => state.setNavbarObject);

  const schema = getSchema(['password', 'newPassword', 'currentNewPassword']);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
      currentNewPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: object) => {
    console.log(data);

    setModalSuccess({
      title: t('password.pass-update'),
      description: t('password.pass-success'),
    });
  };

  useEffect(() => {
    setNavbarObject({ title: t('password.pass-update') });
  }, [setNavbarObject, t]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <InputPass name="password" label={t('password.pass-current')} control={control} />

      <InputPass name="newPassword" label={t('password.pass-new')} control={control} />

      <InputPass name="currentNewPassword" label={t('password.pass-repeat')} control={control} />

      <Button variant="contained" type="submit" disabled={false} fullWidth>
        {t('common.update')}
      </Button>
    </Box>
  );
}
