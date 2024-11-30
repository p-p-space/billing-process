'use client';

import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, InputAdornment, FormLabel, OutlinedInput } from '@mui/material';
//Internal app
import { TextFieldProps } from '@/interfaces';

function InputMUI(props: Readonly<TextFieldProps>): JSX.Element {
  const { name, label, labelError, type, optional, error, value, onChange, ...restProps } = props;

  const t = useTranslations('validation');

  const textLabel = label ?? t(`${name}`);

  return (
    <FormControl variant="outlined" error={!!error} sx={{ mb: 1 }} fullWidth>
      <FormLabel htmlFor={name}>{textLabel}</FormLabel>
      <OutlinedInput
        id={name}
        type={type ?? 'text'}
        aria-describedby={`${name}-helperText`}
        error={!!error}
        value={value}
        onChange={onChange}
        endAdornment={optional ? <InputAdornment position="end">{t('optional')}</InputAdornment> : ''}
        {...restProps}
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
