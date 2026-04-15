export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
  TEXT = 'text',
}

export enum ButtonSize {
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  href?: string; // If provided, renders as <a> tag
}
