export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  userId: string;
  createdAt: string;
}

export interface User {
  userId: string;
  name: string;
  isGuest: boolean;
}