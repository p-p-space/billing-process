//Internal app
import { RegularExpressions } from '@/interfaces';

/**
 * Regular expressions
 * @label Tool for validating regular expressions - {@link https://regexr.com/}
 */
export const regularExpressions: Partial<RegularExpressions> = {
  numeric: /^[0-9]+$/,
  emailValid: /^[^@]{2,64}@[^_@]+\.[a-zA-Z]{2,}$/,
};
