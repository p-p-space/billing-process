'use client';

import { Controller } from 'react-hook-form';
//Internal app
import { TextInputProps } from '@/interfaces';

export default function InputText({ name, control, label }: TextInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="!mt-0">
          <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </label>
          <div className="mt-2">
            <input
              id={name}
              {...field}
              value={field.value as string | number | readonly string[] | undefined}
              type="text"
              className={`input-custom no-focus ${error ? 'border-red-500' : ''}`}
            />
            <div className="h-6">{error && <p className="text-xs text-red-600">{error.message}</p>}</div>
          </div>
        </div>
      )}
    />
  );
}
