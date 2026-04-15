import { ModalProps } from '@/components/Modal/types';
import styles from './Modal.module.css';
import Text from '@/components/Text/Text';
import { TextVariant } from '@/components/Text/types';
import { useEffect } from 'react';
import { FocusTrap } from 'focus-trap-react';

export default function Modal({ isOpen, children, onClose, title, onConfirm, confirmText }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <FocusTrap
        focusTrapOptions={{
          clickOutsideDeactivates: true,
        }}
      >
        <div className={styles.modalWindow} onClick={e => e.stopPropagation()}>
          <Text className={styles.modalTitle} variant={TextVariant.TITLE2}>
            {title}
          </Text>
          {children}
        </div>
      </FocusTrap>
    </div>
  );
}
