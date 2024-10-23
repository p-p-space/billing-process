//Internal app
import { RegularExpressions } from '@/interfaces';

/**
 * Regular expressions
 * @label Tool for validating regular expressions - {@link https://regexr.com/}
 */
export const regularExpressions: Partial<RegularExpressions> = {
  numeric: /^[0-9]+$/,
  emailValid: /^[a-z\d][\w\ñ\Ñ\-\.]+@[a-z\d]+\.[a-z]{2,6}$/i,
};
