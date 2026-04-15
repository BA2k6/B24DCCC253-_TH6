import type { Task } from '../types';

/**
 * Key lưu trữ trong localStorage
 */
const STORAGE_KEY = 'GROUP_TASKS_DB';

/**
 * Giả lập delay giống API thật
 */
const sleep = (ms = 200) => new Promise((res) => setTimeout(res, ms));

/* =========================
   FIXED DATABASE (HARD CODE)
========================= */

const FIXED_DB: Task[] = [
  {
    id: '1',
    title: 'Thiết kế UI Dashboard',
    assignee: 'An',
    priority: 'Cao',
    deadline: '2026-04-20',
    status: 'Chưa làm',
    createdBy: 'Admin',
    createdAt: '2026-04-10',
  },
  {
    id: '2',
    title: 'Xây dựng API',
    assignee: 'Bình',
    priority: 'Cao',
    deadline: '2026-04-18',
    status: 'Đang làm',
    createdBy: 'Admin',
    createdAt: '2026-04-10',
  },
  {
    id: '3',
    title: 'Test hệ thống',
    assignee: 'Cường',
    priority: 'Trung bình',
    deadline: '2026-04-15',
    status: 'Đã xong',
    createdBy: 'Admin',
    createdAt: '2026-04-09',
  },
  {
    id: '4',
    title: 'Fix bug login',
    assignee: 'Dũng',
    priority: 'Cao',
    deadline: '2026-04-14',
    status: 'Đang làm',
    createdBy: 'Admin',
    createdAt: '2026-04-09',
  },
  {
    id: '5',
    title: 'Tối ưu hiệu năng',
    assignee: 'An',
    priority: 'Thấp',
    deadline: '2026-04-22',
    status: 'Chưa làm',
    createdBy: 'Admin',
    createdAt: '2026-04-11',
  },
  {
    id: '6',
    title: 'Viết tài liệu',
    assignee: 'Bình',
    priority: 'Trung bình',
    deadline: '2026-04-13', // 🔥 quá hạn
    status: 'Chưa làm',
    createdBy: 'Admin',
    createdAt: '2026-04-08',
  },
];

/**
 * Seed cố định (chỉ chạy 1 lần)
 */
const ensureSeedData = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(FIXED_DB));
  }
};

/* =========================
   DB CORE
========================= */

const getDB = (): Task[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const setDB = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

/* =========================
   SERVICE
========================= */

export const taskService = {
  /**
   * Lấy danh sách task
   */
  async getTasks(): Promise<Task[]> {
    ensureSeedData();
    await sleep();
    return getDB();
  },

  /**
   * Tạo task mới
   */
  async createTask(task: Task): Promise<Task> {
    await sleep();

    const tasks = getDB();
    tasks.unshift(task);

    setDB(tasks);
    return task;
  },

  /**
   * Cập nhật task
   */
  async updateTask(id: string, updates: Partial<Task>): Promise<void> {
    await sleep();

    const tasks = getDB().map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );

    setDB(tasks);
  },

  /**
   * Xóa task
   */
  async deleteTask(id: string): Promise<void> {
    await sleep();

    const tasks = getDB().filter((t) => t.id !== id);
    setDB(tasks);
  },

  /**
   * Reset DB về dữ liệu gốc
   */
  reset(): void {
    setDB(FIXED_DB);
  },
};