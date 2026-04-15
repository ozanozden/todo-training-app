import { InputProps, InputVariant } from '@/components/Input/types';
import styles from './Input.module.css';
import clsx from 'clsx';

export default function Input({
  label,
  type = 'text',
  variant = InputVariant.OUTLINED,
  placeholder,
  defaultValue,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  className,
  name,
  id,
}: InputProps) {
  // Generate ID if not provided (for label accessibility)
  const inputId = id || name || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={clsx(styles.inputWrapper, className)}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(styles.input, styles[variant], error && styles.error, disabled && styles.disabled)}
        disabled={disabled}
        required={required}
        onBlur={onBlur}
        name={name}
        id={inputId}
        defaultValue={defaultValue}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
