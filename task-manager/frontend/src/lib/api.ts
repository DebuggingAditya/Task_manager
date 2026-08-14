import axios from 'axios';
import { Task, TaskStatus } from '@/types';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
});

export const loginAsGuest = async () => {
  const res = await API.post('/auth/guest');
  return res.data;
};

export const fetchTasks = async (userId: string): Promise<Task[]> => {
  const res = await API.get(`/tasks?userId=${userId}`);
  return res.data;
};

export const createTask = async (data: { title: string; description?: string; status: TaskStatus; userId: string }): Promise<Task> => {
  const res = await API.post('/tasks', data);
  return res.data;
};

export const updateTask = async (id: string, data: Partial<Task>): Promise<Task> => {
  const res = await API.patch(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await API.delete(`/tasks/${id}`);
};