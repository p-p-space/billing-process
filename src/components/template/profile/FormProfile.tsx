'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Box, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { getSchema } from '@/config';
import { InputText } from '@/components';
import { useNavbarStore, useUiStore } from '@/store';

export default function FormProfile() {
  const t = useTranslations();

  const [editProfile, setEditProfile] = useState(false);

  const setModalSuccess = useUiStore((state) => state.setModalSuccess);

  const setNavbarObject = useNavbarStore((state) => state.setNavbarObject);

  const schema = getSchema(['phone', 'email', 'address']);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone: '3505773994',
      email: 'admin@gmail.com',
      address: 'Caracas, Venezuela',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: object) => {
    console.log(data);

    setModalSuccess({
      title: t('profile.prof-title'),
      description: t('profile.prof-description'),
    });
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (editProfile) {
      handleSubmit(onSubmit)();
      setEditProfile(false);
    } else {
      setEditProfile(true);
    }
  };

  useEffect(() => {
    setNavbarObject({ title: t('profile.prof-title') });
  }, [setNavbarObject, t]);

  return (
    <Box>
      <InputText name="phone" label={t('profile.prof-phone')} control={control} readOnly={!editProfile} />

      <InputText name="email" label={t('profile.prof-email')} control={control} readOnly={!editProfile} />

      <InputText name="address" label={t('profile.prof-address')} control={control} readOnly={!editProfile} />

      <Button
        variant="contained"
        type={editProfile ? 'submit' : 'button'}
        disabled={false}
        startIcon={<i className="ri-pencil-line"></i>}
        onClick={handleEdit}
      >
        {editProfile ? t('common.save') : t('common.edit')}
      </Button>
    </Box>
  );
}
