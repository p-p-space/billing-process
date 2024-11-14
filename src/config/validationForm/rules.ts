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
    .required('required')
    .test('emailValid', 'email', (value) => regularExpressions.emailValid?.test(value))
    .min(7, 'min-7')
    .max(256, 'max-256'),
  password: yup.string().required('required'),
  newPassword: yup.string().required('required'),
  currentNewPassword: yup
    .string()
    .required('required')
    .oneOf([yup.ref('newPassword')], 'pass-match'),
  phone: yup.string().required('required').min(7, 'min-7'),
  address: yup.string().required('required').max(256, 'max-256'),
};
