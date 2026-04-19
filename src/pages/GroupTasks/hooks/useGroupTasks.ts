import { useEffect, useMemo, useState } from 'react';
import type { Task, TaskStatus } from '../types';
import { taskService } from '../services/task.service';

const generateId = () => Date.now().toString();

const normalize = (text: string) => text.toLowerCase().trim();

const isOverdue = (deadline: string) =>
  new Date(deadline).getTime() < Date.now();

export const useGroupTasks = (currentUserName: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');

  const fetchTasks = async () => {
    setLoading(true);
    const data = await taskService.getTasks();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (
    task: Omit<Task, 'id' | 'createdAt' | 'createdBy'>
  ) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date().toISOString(),
      createdBy: currentUserName || 'Khách',
    };

    await taskService.createTask(newTask);
    fetchTasks();
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    await taskService.updateTask(id, updates);
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await taskService.deleteTask(id);
    fetchTasks();
  };

  /* =========================
     DERIVED DATA
  ========================= */

  const sortedTasks = useMemo(() => {
    return [...tasks].sort(
      (a, b) =>
        new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return sortedTasks.filter((task) => {
      const matchesSearch = normalize(task.title).includes(normalize(search));
      const matchesStatus =
        statusFilter === 'all' || task.status === statusFilter;
      const matchesAssignee =
        assigneeFilter === 'all' || task.assignee === assigneeFilter;

      return matchesSearch && matchesStatus && matchesAssignee;
    });
  }, [sortedTasks, search, statusFilter, assigneeFilter]);

  const assignedToMeTasks = useMemo(
    () => tasks.filter((t) => t.assignee === currentUserName),
    [tasks, currentUserName]
  );

  const assignees = useMemo(() => {
    const unique = Array.from(new Set(tasks.map((t) => t.assignee)));

    if (currentUserName && !unique.includes(currentUserName)) {
      unique.unshift(currentUserName);
    }

    return unique.sort();
  }, [tasks, currentUserName]);

  /* =========================
     STATS
  ========================= */

  const totalCount = tasks.length;

  const completedCount = tasks.filter(
    (t) => t.status === 'Đã xong'
  ).length;

  const overdueCount = tasks.filter(
    (t) => isOverdue(t.deadline) && t.status !== 'Đã xong'
  ).length;

  const completionPercent =
    totalCount === 0
      ? 0
      : Math.round((completedCount / totalCount) * 100);

  /* =========================
     RETURN
  ========================= */

  return {
    tasks,
    filteredTasks,
    assignedToMeTasks,

    // CRUD
    addTask,
    updateTask,
    deleteTask,

    // UI state
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    assigneeFilter,
    setAssigneeFilter,

    // data
    assignees,

    // stats
    totalCount,
    completedCount,
    overdueCount,
    completionPercent,
  };
};