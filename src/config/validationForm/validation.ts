import * as yup from 'yup';
//Internal app
import { validationRules } from './rules';
import { Field, ValidationShape } from '@/interfaces';

/**
 * Generates a yup validation schema based on an array of form fields.
 *
 * @param fields - Name or names of the fields.
 * @returns an array with field name(s).
 */
export const getSchema = (fields: Field[]): yup.ObjectSchema<ValidationShape> => {
  const shape = fields.reduce<ValidationShape>((acc, field) => {
    if (typeof field === 'string') {
      acc[field] = validationRules[field];
    } else if (typeof field === 'object') {
      const key = Object.keys(field)[0];
      const subFields = field[key];
      acc[key] = yup.array().of(
        yup.object().shape(
          subFields.reduce<ValidationShape>((subAcc, subField) => {
            subAcc[subField] = validationRules[subField];
            return subAcc;
          }, {})
        )
      );
    }
    return acc;
  }, {});
  return yup.object().shape(shape);
};
