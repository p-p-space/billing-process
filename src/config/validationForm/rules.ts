import * as yup from 'yup';
//Internal app
import { regularExpressions } from './regex';
import { ValidationRule } from '@/interfaces';

/**
 * Regular expressions
 * @label Reack Hook Form - {@link https://react-hook-form.com/docs/useform}
 * @label Yup - {@link https://www.npmjs.com/package/yup}
 */
export const validationRules: ValidationRule = {
  email: yup
    .string()
    .required('Validation.required')
    .test('emailValid', 'Validation.email', (value) => regularExpressions.emailValid?.test(value))
    .min(7, 'Validation.min-7')
    .max(256, 'Validation.max-256'),
  password: yup.string().required('Validation.required'),
  newPassword: yup.string().required('Validation.required'),
  currentNewPassword: yup
    .string()
    .required('Validation.required')
    .oneOf([yup.ref('newPassword')], 'Validation.pass-match'),
};
