'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Button } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { createBrowserRequest } from '@/services';
import { InputPass, InputText } from '@/components';
import type { RequestBody, RequestContent } from '@/interfaces';

export default function FormSignin() {
  const t = useTranslations('signin');
  const { push } = useRouter();
  const schema = getSchema(['email', 'password']);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: createBrowserRequest,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      console.log(data);
      push('signin');
    },
  });

  const handleLogin = (loginData: RequestBody) => {
    const dataLogin: RequestContent = {
      // pathUrl: '/onboarding/validate?consultantCode=000650714&countryCode=PE',
      // method: 'get',

      // pathUrl: '/users/credentials',
      // method: 'post',
      // dataRequest: {
      //   userId: 'b2da31b6-15d6-4fd7-bbb4-4485bb9dba7e',
      //   password: '+JxyYGdP0ZMs8ZM33cn/PQ==',
      // },

      pathUrl: '/prueba',
      method: 'post',
      dataRequest: loginData,
    };

    mutate(dataLogin);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleLogin)}>
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
