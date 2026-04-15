import { TodoFormData } from '@/types/todo';
import { useActionState } from 'react';
import { TodoFormProps } from '@/components/TodoForm/types';
import Button from '@/components/Button/Button';
import { ButtonSize, ButtonVariant } from '@/components/Button/types';
import styles from './TodoForm.module.css';
import Input from '@/components/Input/Input';
import { isMobile } from '@/utils/device';

export default function TodoForm({ onSubmit, initialValues, ctaTitle = 'Submit' }: TodoFormProps) {
  const title = initialValues?.title || '';
  const description = initialValues?.description || '';
  const isMobileDevice = isMobile();

  async function addTodoAction(prevState: any, formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const id = formData.get('id') as string | '';

    const newTodoData: TodoFormData = {
      title,
      description,
    };

    onSubmit(id, newTodoData);

    return { message: 'Todo added successfully!' };
  }

  const [state, formAction, isPending] = useActionState(addTodoAction, { message: '' });

  return (
    <form action={formAction} className={styles.todoForm}>
      {initialValues?.id && <Input type="hidden" name="id" defaultValue={initialValues.id} label={initialValues.id} />}
      <Input label="title" required placeholder="a task that you want to finish" name="title" defaultValue={title} />
      <Input
        label="description"
        placeholder="describe your Todo if you want..."
        name="description"
        defaultValue={description}
      />
      <Button
        disabled={isPending}
        type="submit"
        variant={ButtonVariant.PRIMARY}
        size={isMobileDevice ? ButtonSize.MEDIUM : ButtonSize.LARGE}
      >
        {ctaTitle}
      </Button>
    </form>
  );
}
