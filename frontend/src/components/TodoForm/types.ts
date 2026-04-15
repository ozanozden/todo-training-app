import { TodoFormData } from '@/types/todo';

export type TodoFormProps = {
  onSubmit: (id: string, todoData: TodoFormData) => void;
  initialValues?: {
    title: string;
    description: string;
    id?: string;
  };
  ctaTitle: string;
};
