import { useEffect, useState } from 'react';
import type { Todo } from '../types';

interface UseTodoList {
  todos: Todo[];
  text: string;
  setText: (v: string) => void;
  add: () => void;
  toggle: (id: number) => void;
  remove: (id: number) => void;
  update: (id: number, text: string) => void;
}

export function useTodoList(): UseTodoList {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>('');

  // load 1 lần
  useEffect(() => {
    const data = localStorage.getItem('todos');
    if (data) setTodos(JSON.parse(data) as Todo[]);
  }, []);

  // ✅ lưu mỗi khi todos thay đổi
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const add = () => {
    if (!text.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, done: false },
    ]);
    setText('');
  };

  const toggle = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const remove = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const update = (id: number, newText: string) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      )
    );
  };

  return { todos, text, setText, add, toggle, remove, update };
}