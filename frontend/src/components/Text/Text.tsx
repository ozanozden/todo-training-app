import { TextProps, TextVariant } from '@/components/Text/types';
import styles from './Text.module.css';
import clsx from 'clsx';

export default function Text({ variant = TextVariant.BODY, tag, className, children }: TextProps) {
  const Tag = tag || 'span';

  return <Tag className={clsx(styles[variant], className)}>{children}</Tag>;
}
