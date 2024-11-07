import React from 'react';
import { Control } from 'react-hook-form';
import { DateView, DesktopDatePickerProps } from '@mui/x-date-pickers';
import { InputProps, OutlinedInputProps, SxProps } from '@mui/material';

/**
 * Form global variables
 *
 * @typeParam name: string
 * @typeParam label (Optional): string
 * @typeParam labelError (Optional): string
 * @typeParam error (Optional): any
 * @typeParam value (Optional): any
 * @typeParam onChange (Optional): (...e: any[]) => void
 * @typeParam type (Optional): string
 * @typeParam control (Optional): any
 * @typeParam disabled (Optional): boolean
 * @typeParam readOnly (Optional): boolean
 * @typeParam inputProps (Optional): any
 */
export interface FormMUIProps {
  name: string;
  label?: string;
  labelError?: string | React.ReactNode;
  error?: string | boolean;
  value?: string | number | boolean | null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  control?: Control;
  disabled?: boolean;
  readOnly?: boolean;
  sx?: SxProps;
  inputProps?: InputProps;
}

/**
 * TextField input
 *
 * @typeParam optional (Optional): boolean
 * @typeParam additionalInfo (Optional): boolean
 * @typeParam colorText (Optional): string
 */
export interface TextFieldProps extends FormMUIProps {
  optional?: boolean;
  additionalInfo?: boolean;
  colorText?: string;
  endAdornment?: React.ReactNode;
  inputProperties?: OutlinedInputProps;
}

/**
 * DatePicker input
 *
 * @typeParam onClick (Optional): (e: any) => void;
 * @typeParam disableClearable (Optional): boolean;
 * @typeParam options: {
 *
 * value: string
 *
 * text: string
 *
 * }[]
 */
export interface InputOptionsProps extends FormMUIProps {
  options: { value: string; text: string }[];
  onClick?: () => void;
  disableClearable?: boolean;
}

/**
 * DatePicker input
 *
 * @typeParam views (Optional): DateView[]
 * @typeParam format (Optional): string
 */
export interface InputDatePickerProps extends FormMUIProps {
  views?: DateView[];
  format?: string;
  datePickerProps?: DesktopDatePickerProps<unknown>;
}

/**
 * Checkbox input
 *
 * @typeParam onClick (Optional): (...e: any[]) => void
 * @typeParam checked (Optional): boolean
 * @typeParam disabled (Optional): boolean
 * @typeParam labelHandle (Optional): boolean | string
 * @typeParam sx (Optional): SxProps
 * @typeParam mtError (Optional): number
 */
export interface InputCheckProps extends FormMUIProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  checked?: boolean;
  disabled?: boolean;
  labelHandle?: React.ReactNode | string;
  sx?: SxProps;
  mtError?: number;
}

/**
 * Fields for the login form
 *
 * @property email - The user's email address
 * @property password - The user's password
 */
export interface LoginFormFields {
  email: string;
  password: string;
}

/**
 * Fields for the new password form
 *
 * @property confirmationCode - The code sent to the user's email for confirmation
 * @property newPassword - The new password the user wants to set
 * @property confirmNewPassword - Confirmation of the new password
 */
export interface NewPasswordFormFields {
  confirmationCode: string;
  newPassword: string;
  confirmNewPassword: string;
}

/**
 * Fields for the login form
 *
 * @property newPassword - New Password
 * @property newPasswordConfirm - New password confirm
 */
export interface UpdatePasswordFormFields {
  newPassword: string;
  newPasswordConfirm: string;
}

/**
 * Fields for the login form
 *
 * @property currentPassword - Current user password
 * @property newPassword - New Password
 * @property newPasswordConfirm - New password confirm
 */
export interface ChangePasswordFormFields {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

/**
 * Fields for the Mfa form
 *
 * @property confirmationCode - The user's email address
 */
export interface MfaFormFields {
  confirmationCode: string;
}
