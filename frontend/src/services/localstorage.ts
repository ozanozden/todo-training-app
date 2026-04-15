import { Todo, TodoFormData } from '@/types/todo';

const STORAGE_KEY = 'todos';

export function getTodos(): Todo[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored) as Todo[];
  } catch (error) {
    console.error('Error reading todos from localStorage:', error);
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function addTodo(todoFormData: TodoFormData): Todo {
  const todos = getTodos();

  const newTodo = {
    id: crypto.randomUUID(),
    title: todoFormData.title,
    description: todoFormData.description,
    done: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as Todo;

  todos.push(newTodo);
  saveTodos(todos);

  return newTodo;
}

export function updateTodo(id: string, updates: Partial<Todo>): Todo {
  const todos = getTodos();
  const index = todos.findIndex(todo => todo.id === id);

  if (index === -1) {
    throw new Error('Todo not found');
  }
  const updatedTodo = {
    ...todos[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  todos[index] = updatedTodo;
  saveTodos(todos);

  return updatedTodo;
}

export function deleteTodo(id: string): void {
  const todos = getTodos();
  const filtered = todos.filter(todo => todo.id !== id);
  saveTodos(filtered);
}

export function toggleTodo(id: string): Todo {
  const todos = getTodos();
  const todoIndex = todos.findIndex(t => t.id === id);

  const updatedTodo = {
    ...todos[todoIndex],
    done: !todos[todoIndex].done,
    updatedAt: new Date().toISOString(),
  };

  todos[todoIndex] = updatedTodo;
  saveTodos(todos);

  return updatedTodo;
}
