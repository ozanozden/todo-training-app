import { TodoListProps } from '@/components/TodoList/types';
import TodoItem from '@/components/TodoItem/TodoItem';
import styles from './TodoList.module.css';

export default function TodoList({ todos, toggleTodo, deleteTodo, editTodo }: TodoListProps) {
  return (
    <div className={styles.todoList}>
      {todos.map(todo => (
        <TodoItem todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} key={todo.id} />
      ))}
    </div>
  );
}
