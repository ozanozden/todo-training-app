import { ChangeEventHandler } from 'react';
export enum InputVariant {
  OUTLINED = 'outlined',
  FILLED = 'filled',
}

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'hidden';

export type InputProps = {
  label: string;
  type?: InputType;
  variant?: InputVariant;
  defaultValue?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  error?: string; // Error message
  disabled?: boolean;
  required?: boolean;
  className?: string;
  name?: string; // Important for forms
  id?: string;
};
