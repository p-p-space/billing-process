// src/components/form/InputPassword.tsx
'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
//Internal app
import { TextInputProps } from '@/interfaces/form';

export default function InputPassword({ name, control, label }: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const textLabel = label ?? t(`form.${name}_label`);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="!mt-0">
          <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </label>
          <div className="mt-2 relative">
            <input
              id={name}
              {...field}
              type={showPassword ? 'text' : 'password'}
              className={`input-custom no-focus ${error ? 'border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center h-14 leading-5"
            >
              {showPassword ? <i className="ri-eye-close-line"></i> : <i className="ri-eye-line"></i>}
            </button>
            {/* {error && <p className="mt-2 text-sm text-red-600">{t(`validation.${error.message}`)}</p>} */}
            <div className="h-6">{error && <p className="text-xs text-red-600">{error.message}</p>}</div>
          </div>
        </div>
      )}
    />
  );
}
