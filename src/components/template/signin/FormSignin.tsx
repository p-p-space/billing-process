'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Button } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { InputPass, InputText } from '@/components';

export default function FormSignin() {
  const t = useTranslations('signin');

  const schema = getSchema(['email', 'password']);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h2" sx={{ mb: 4, fontWeight: 500 }}>
        {t('signin')}
      </Typography>

      <InputText name="email" label={t('email')} control={control} />

      <InputPass name="password" label={t('password')} control={control} />

      <Button variant="contained" type="submit" disabled={false} fullWidth sx={{ mb: 3 }}>
        {t('login')}
      </Button>
    </Box>
  );
}
