import { useEffect, useMemo, useState } from 'react';
import type { Task, TaskStatus } from '../types';

const STORAGE_KEY = 'groupTasks';

const getStoredTasks = (): Task[] => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw) as Task[];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
};

const saveTasks = (tasks: Task[]) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const useGroupTasks = (currentUserName: string) => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [search, setSearch] = useState('');
	const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
	const [assigneeFilter, setAssigneeFilter] = useState<string>('all');

	useEffect(() => {
		setTasks(getStoredTasks());
	}, []);

	useEffect(() => {
		saveTasks(tasks);
	}, [tasks]);

	const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'createdBy'>) => {
		const nextTask: Task = {
			...task,
			id: `${Date.now()}`,
			createdAt: new Date().toISOString(),
			createdBy: currentUserName || 'Khách',
		};
		setTasks((prev) => [nextTask, ...prev]);
	};

	const updateTask = (id: string, updates: Partial<Task>) => {
		setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)));
	};

	const deleteTask = (id: string) => {
		setTasks((prev) => prev.filter((task) => task.id !== id));
	};

	const filteredTasks = useMemo(() => {
		return tasks.filter((task) => {
			const matchesSearch = task.title.toLowerCase().includes(search.trim().toLowerCase());
			const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
			const matchesAssignee = assigneeFilter === 'all' || task.assignee === assigneeFilter;
			return matchesSearch && matchesStatus && matchesAssignee;
		});
	}, [tasks, search, statusFilter, assigneeFilter]);

	const assignedToMeTasks = useMemo(() => {
		return tasks.filter((task) => task.assignee === currentUserName);
	}, [tasks, currentUserName]);

	const assignees = useMemo(() => {
		const unique = Array.from(new Set(tasks.map((task) => task.assignee))).filter(Boolean);
		if (currentUserName && !unique.includes(currentUserName)) {
			unique.unshift(currentUserName);
		}
		return unique.sort((a, b) => a.localeCompare(b));
	}, [tasks, currentUserName]);

	const totalCount = tasks.length;
	const completedCount = tasks.filter((task) => task.status === 'Đã xong').length;

	return {
		tasks,
		filteredTasks,
		assignedToMeTasks,
		addTask,
		updateTask,
		deleteTask,
		search,
		setSearch,
		statusFilter,
		setStatusFilter,
		assigneeFilter,
		setAssigneeFilter,
		assignees,
		totalCount,
		completedCount,
	};
};
