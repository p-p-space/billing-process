import * as yup from 'yup';
//Internal app
import { regularExpressions } from './regex';

/**
 * Function used to validate the creation of the password.
 * @param msg - Mandatory field message.
 */
export function passwordValidation(msg: string) {
  return yup
    .string()
    .required(msg)
    .test('Invalid password', 'The password must be numeric', (value) => regularExpressions.numeric?.test(value));
}
