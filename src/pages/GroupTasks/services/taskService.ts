import type { Task } from '../types';

const KEY = 'GROUP_TASKS_DB';

const sleep = (ms = 300) => new Promise(res => setTimeout(res, ms));

const getDB = (): Task[] => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

const setDB = (tasks: Task[]) => {
  localStorage.setItem(KEY, JSON.stringify(tasks));
};

export const taskService = {
  async getTasks() {
    await sleep();
    return getDB();
  },

  async createTask(task: Task) {
    await sleep();
    const tasks = getDB();
    tasks.push(task);
    setDB(tasks);
    return task;
  },

  async updateTask(id: string, update: Partial<Task>) {
    await sleep();
    const tasks = getDB().map(t => (t.id === id ? { ...t, ...update } : t));
    setDB(tasks);
  },

  async deleteTask(id: string) {
    await sleep();
    const tasks = getDB().filter(t => t.id !== id);
    setDB(tasks);
  },
};