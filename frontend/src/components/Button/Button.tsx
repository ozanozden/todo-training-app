import styles from './Button.module.css';
import { ButtonProps, ButtonSize, ButtonVariant } from '@/components/Button/types';
import clsx from 'clsx';

export default function Button({
  type,
  onClick,
  children,
  href,
  disabled = false,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MEDIUM,
  className,
}: ButtonProps) {
  const Element = href ? 'a' : 'button';

  const elementProps = href
    ? { href, onClick } // <a> tag props
    : { type, onClick, disabled }; // <button> tag props

  return (
    <Element {...elementProps} className={clsx(styles.button, className, styles[variant], styles[size])}>
      {children}
    </Element>
  );
}
