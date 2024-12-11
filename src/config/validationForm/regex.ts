//Internal app
import { RegularExpressions } from '@/interfaces';

/**
 * Regular expressions
 * @label Tool for validating regular expressions - {@link https://regexr.com/}
 */
export const regularExpressions: Partial<RegularExpressions> = {
  numeric: /^\d+$/,
  emailValid: /^[a-z\d][\wñÑ\-.]+@[a-z\d]+\.[a-z]{2,6}$/i,
};
