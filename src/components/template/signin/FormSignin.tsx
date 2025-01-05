'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, Button } from '@mui/material';
//Internal app
import { getSchema } from '@/config';
import { useBrowserRequest } from '@/hooks';
import { InputPass, InputText } from '@/components';
import type { RequestBody, RequestContent } from '@/interfaces';

export default function FormSignin() {
  const t = useTranslations('signin');
  const { push } = useRouter();
  const schema = getSchema(['email', 'password']);
  const { createBrowserRequest } = useBrowserRequest();

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
      push('companies');
    },
  });

  const handleLogin = (loginData: RequestBody) => {
    const dataLogin: RequestContent = {
      pathUrl: '/prueba',
      method: 'post',
      dataRequest: loginData,
    };

    mutate(dataLogin);
  };

  const noFound = () => {
    const noFound: RequestContent = {
      pathUrl: '/debit',
      method: 'post',
      dataRequest: {
        cardNumber: '1234567890123456',
        expirationDate: '12/22',
        cvv: '  123',
      },
    };

    mutate(noFound);
  };

  const getSuccess = () => {
    const dataGet: RequestContent = {
      pathUrl: '/onboarding/validate?consultantCode=000650714&countryCode=PE',
      method: 'get',
    };

    mutate(dataGet);
  };

  const getFail = () => {
    const dataGet: RequestContent = {
      pathUrl: '/onboarding/validate?consultantCode=650714&countryCode=PE',
      method: 'get',
    };

    mutate(dataGet);
  };

  const postSuccess = () => {
    const dataPOst: RequestContent = {
      pathUrl: '/users/credentials',
      method: 'post',
      dataRequest: {
        userId: 'b2da31b6-15d6-4fd7-bbb4-4485bb9dba7e',
        password: '+JxyYGdP0ZMs8ZM33cn/PQ==',
      },
    };

    mutate(dataPOst);
  };

  const postFail = () => {
    const dataPOst: RequestContent = {
      pathUrl: '/users/credentials',
      method: 'post',
      dataRequest: {
        userId: 'b2da31b6-15d6-4fd7-bbb4-2585bb9dba7e',
        password: '+JxyYGdP0ZMs8ZM33cn/PQ==',
      },
    };

    mutate(dataPOst);
  };

  return (
    <>
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

      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={noFound}>
        No found
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={getSuccess}>
        GET success
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={getFail}>
        GET fail
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={postSuccess}>
        POST success
      </Button>
      <Button variant="contained" type="button" disabled={false} fullWidth sx={{ mb: 3 }} onClick={postFail}>
        POST fail
      </Button>
    </>
  );
}
