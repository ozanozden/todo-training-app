import { CheckboxProps } from '@/components/CheckBox/types';
import styles from './CheckBox.module.css';

export default function CheckBox({ checked, onChange, label, disabled, className }: CheckboxProps) {
  return (
    <label className={styles.checkboxContainer}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} className={styles.hiddenInput} />
      <span className={styles.customCheckbox}>{checked && <span className={styles.checkmark}>✓</span>}</span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
