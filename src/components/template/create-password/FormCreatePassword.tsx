'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Button } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { InputPass } from '@/components';

export default function FormCreatePassword() {
  const t = useTranslations('password');

  const schema = getSchema(['newPassword', 'currentNewPassword']);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      newPassword: '',
      currentNewPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h2" sx={{ mb: 4, fontWeight: 500 }}>
        {t('pass-create')}
      </Typography>

      <InputPass name="newPassword" label={t('pass-new')} control={control} />

      <InputPass name="currentNewPassword" label={t('pass-repeat')} control={control} />

      <Button variant="contained" type="submit" disabled={false} fullWidth sx={{ mb: 3 }}>
        {t('login')}
      </Button>
    </Box>
  );
}
