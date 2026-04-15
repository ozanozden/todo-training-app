'use client';
import { useState } from 'react';
import { Todo, TodoFormData } from '@/types/todo';
import { addTodo, deleteTodo, getTodos, toggleTodo, updateTodo } from '@/services/localstorage';
import TodoForm from '@/components/TodoForm/TodoForm';
import TodoList from '@/components/TodoList/TodoList';
import Modal from '@/components/Modal/Modal';
import { useModal } from '@/hooks/useModal';
import Button from '@/components/Button/Button';
import { ButtonSize, ButtonVariant } from '@/components/Button/types';
import styles from './page.module.css';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(() => getTodos());
  const addModal = useModal();
  const editModal = useModal<Todo>();
  const deleteModal = useModal<string>();

  function handleAddTodo(id: string, todo: TodoFormData) {
    const newTodoItem = addTodo(todo);
    setTodos(prev => [...prev, newTodoItem]);
  }

  function handleDeleteTodo(id: string) {
    if (confirm('Are you sure you want to delete this todo?')) {
      deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    }
  }

  function handleToggleDone(id: string) {
    const toggledTodo: Todo = toggleTodo(id);
    setTodos(prev => prev.map(t => (t.id === id ? toggledTodo : t)));
  }

  function handleUpdateTodo(id: string, todo: TodoFormData) {
    const updatedTodo = updateTodo(id, todo);
    setTodos(prev => prev.map(t => (t.id === updatedTodo.id ? updatedTodo : t)));
    editModal.close();
  }

  return (
    <div>
      <Button
        variant={ButtonVariant.PRIMARY}
        size={ButtonSize.LARGE}
        className={styles.addNewTodoButton}
        onClick={addModal.open}
      >
        Add new Todo
      </Button>

      <TodoList todos={todos} toggleTodo={handleToggleDone} deleteTodo={handleDeleteTodo} editTodo={editModal.open} />

      <Modal
        isOpen={addModal.isOpen}
        onClose={addModal.close}
        title="Add New Todo"
        confirmText="Add"
        onConfirm={handleAddTodo}
      >
        <TodoForm onSubmit={handleAddTodo} ctaTitle="Add" />
      </Modal>

      <Modal
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        title="Edit Todo"
        confirmText="Save"
        onConfirm={handleUpdateTodo}
      >
        {editModal.data && ( // ← The saved todo is here!
          <TodoForm
            key={editModal.data.id}
            onSubmit={handleUpdateTodo}
            initialValues={{
              id: editModal.data.id,
              title: editModal.data.title,
              description: editModal.data.description,
            }}
            ctaTitle="Update"
          />
        )}
      </Modal>
      {/*
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        title="Delete Todo?"
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
      >
        <p>Are you sure?</p>
      </Modal>*/}
    </div>
  );
}
