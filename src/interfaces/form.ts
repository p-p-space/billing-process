/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control } from 'react-hook-form';

/**
 * Props for the TextInput component.
 *
 * @typeParam name: string
 * @typeParam control: any;
 * @typeParam label: string;
 *
 */

export interface TextInputProps {
  name: string;
  control: Control<any>;
  label: string;
}
