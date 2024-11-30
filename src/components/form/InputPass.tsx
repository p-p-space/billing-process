'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, InputAdornment, FormLabel, OutlinedInput, IconButton } from '@mui/material';
//Internal app
import { TextFieldProps } from '@/interfaces';

function InputMUI(props: Readonly<TextFieldProps>): JSX.Element {
  const { name, label, labelError, error, value, onChange, inputProperties } = props;

  const [passwordShown, setPasswordShown] = useState(false);

  const t = useTranslations('validation');

  const textLabel = label ?? t(`${name}`);

  return (
    <FormControl variant="outlined" error={!!error} sx={{ mb: 1 }} fullWidth>
      <FormLabel htmlFor={name}>{textLabel}</FormLabel>
      <OutlinedInput
        id={name}
        type={passwordShown ? 'text' : 'password'}
        aria-describedby={`${name}-helperText`}
        error={!!error}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setPasswordShown((state) => !state)}
              size="small"
              edge="end"
            >
              {passwordShown ? <i className="ri-eye-close-line"></i> : <i className="ri-eye-line"></i>}
            </IconButton>
          </InputAdornment>
        }
        {...inputProperties}
      />
      <FormHelperText sx={{ height: '20px' }} id={`${name}-helperText`}>
        {error ? t(`${error.message}`) : labelError || ''}
      </FormHelperText>
    </FormControl>
  );
}

export default function InputText(props: Readonly<TextFieldProps>) {
  const { name, control, onChange, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputMUI
              name={name}
              value={field.value}
              onChange={(e) => {
                field.onChange(e);
                if (onChange) {
                  onChange(e);
                }
              }}
              error={error}
              {...restProps}
            />
          )}
        />
      ) : (
        <InputMUI name={name} onChange={onChange} />
      )}
    </>
  );
}
