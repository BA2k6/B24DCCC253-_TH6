export type TaskStatus = 'Chưa làm' | 'Đang làm' | 'Đã xong';
export type TaskPriority = 'Thấp' | 'Trung bình' | 'Cao';

export interface Task {
	id: string;
	title: string;
	assignee: string;
	priority: TaskPriority;
	deadline: string;
	status: TaskStatus;
	createdBy: string;
	createdAt: string;
}
