import React from 'react';
import { Control, ErrorOption } from 'react-hook-form';
import { OutlinedInputProps, SxProps } from '@mui/material';
import { DateView, DesktopDatePickerProps } from '@mui/x-date-pickers';

/**
 * Form global variables
 *
 * @property name - The name of the form field
 * @property label - The label for the form field (Optional)
 * @property labelError - The error label for the form field (Optional)
 * @property error - The error state of the form field (Optional)
 * @property value - The value of the form field (Optional)
 * @property onChange - The change event handler for the form field (Optional)
 * @property type - The type of the form field (Optional)
 * @property control - The control object for the form field (Optional)
 * @property disabled - The disabled state of the form field (Optional)
 * @property readOnly - The read-only state of the form field (Optional)
 * @property sx - The style properties for the form field (Optional)
 */
export interface FormMUIProps {
  name: string;
  label?: string;
  labelError?: string | React.ReactNode;
  error?: ErrorOption;
  value?: string | number | boolean | null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  control?: Control;
  disabled?: boolean;
  readOnly?: boolean;
  sx?: SxProps;
}

/**
 * TextField input properties
 *
 * @property optional - Indicates if the field is optional (Optional)
 * @property additionalInfo - Indicates if additional information is provided (Optional)
 * @property colorText - The color of the text (Optional)
 * @property endAdornment - The end adornment for the text field (Optional)
 * @property inputProperties - The input properties for the text field (Optional)
 */
export interface TextFieldProps extends FormMUIProps {
  optional?: boolean;
  additionalInfo?: boolean;
  colorText?: string;
  endAdornment?: React.ReactNode;
  inputProperties?: OutlinedInputProps;
}

/**
 * Input options properties
 *
 * @property options - The options for the input
 * @property onClick - The click event handler for the input (Optional)
 * @property disableClearable - Indicates if the clearable option is disabled (Optional)
 */
export interface InputOptionsProps extends FormMUIProps {
  options: { value: string; text: string }[];
  onClick?: () => void;
  disableClearable?: boolean;
}

/**
 * DatePicker input properties
 *
 * @property views - The views for the date picker (Optional)
 * @property format - The format for the date picker (Optional)
 * @property datePickerProps - The properties for the date picker (Optional)
 */
export interface InputDatePickerProps extends FormMUIProps {
  views?: DateView[];
  format?: string;
  datePickerProps?: DesktopDatePickerProps<unknown>;
}

/**
 * Checkbox input properties
 *
 * @property onClick - The click event handler for the checkbox (Optional)
 * @property checked - The checked state of the checkbox (Optional)
 * @property disabled - The disabled state of the checkbox (Optional)
 * @property labelHandle - The label handle for the checkbox (Optional)
 * @property sx - The style properties for the checkbox (Optional)
 * @property mtError - The margin top for the error message (Optional)
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
 * Fields for the update password form
 *
 * @property newPassword - The new password
 * @property newPasswordConfirm - Confirmation of the new password
 */
export interface UpdatePasswordFormFields {
  newPassword: string;
  newPasswordConfirm: string;
}

/**
 * Fields for the change password form
 *
 * @property currentPassword - The current user password
 * @property newPassword - The new password
 * @property newPasswordConfirm - Confirmation of the new password
 */
export interface ChangePasswordFormFields {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

/**
 * Fields for the MFA form
 *
 * @property confirmationCode - The confirmation code sent to the user's email
 */
export interface MfaFormFields {
  confirmationCode: string;
}
