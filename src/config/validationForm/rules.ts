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
    .email('Please enter a valid email')
    .required('Enter an email')
    .min(7, 'Must have at least 7 characters')
    .max(256, 'Must have a maximum of 256 characters')
    .test('emailValid', 'Please enter a valid email', (value) => regularExpressions.emailValid?.test(value)),
  password: yup.string().required('Enter a password'),
  newPassword: yup.string().required('Enter a new password'),
  currentNewPassword: yup
    .string()
    .required('Enter a new password')
    .oneOf([yup.ref('newPassword')], 'Passwords do not match'),
};
