import { Todo } from '@/types/todo';

export type TodoListProps = {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (todo: Todo) => void;
};
