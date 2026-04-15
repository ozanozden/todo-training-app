import styles from './TodoItem.module.css';
import Text from '@/components/Text/Text';
import { TextTag, TextVariant } from '@/components/Text/types';
import { useState } from 'react';
import clsx from 'clsx';
import Button from '@/components/Button/Button';
import { ButtonSize, ButtonVariant } from '@/components/Button/types';
import CheckBox from '@/components/CheckBox/CheckBox';
import { TodoItemProps } from '@/components/TodoItem/types';

export default function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }: TodoItemProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  function onExpandDescription() {
    setIsDescriptionExpanded(prev => !prev);
  }

  return (
    <div className={styles.todoItemCard}>
      <div className={styles.todoItem}>
        <CheckBox checked={todo.done} onChange={() => toggleTodo(todo.id)}></CheckBox>
        <Text variant={TextVariant.TITLE2} tag={TextTag.H3}>
          {todo.title}
        </Text>
        <div className={styles.todoItemAction}>
          <Button onClick={() => editTodo(todo)} variant={ButtonVariant.DANGER} size={ButtonSize.MEDIUM}>
            Edit
          </Button>
          <Button onClick={() => deleteTodo(todo.id)} variant={ButtonVariant.PRIMARY} size={ButtonSize.MEDIUM}>
            Delete
          </Button>
        </div>
      </div>
      <div onClick={onExpandDescription}>
        <Text
          tag={TextTag.P}
          variant={TextVariant.CAPTION}
          className={clsx(styles.description, isDescriptionExpanded && styles.expanded)}
        >
          {todo.description}
        </Text>
      </div>
    </div>
  );
}
