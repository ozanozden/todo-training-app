import { TodoFormData } from '@/types/todo';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm: (id: string, todo: TodoFormData) => void;
  confirmText: string; // "Save", "Add", "Delete", etc.
}
