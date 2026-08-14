'use client';

import { useState, useEffect } from 'react';
import { User, Task, TaskStatus } from '@/types';
import { loginAsGuest, fetchTasks, createTask, updateTask, deleteTask } from '@/lib/api';
import Navbar from '@/components/Navbar';
import TaskCard from '@/components/TaskCard';
import { Plus, UserCheck } from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('guest_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      loadTasks(parsed.userId);
    }
  }, []);

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const userData = await loginAsGuest();
      setUser(userData);
      localStorage.setItem('guest_user', JSON.stringify(userData));
      await loadTasks(userData.userId);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('guest_user');
    setUser(null);
    setTasks([]);
  };

  const loadTasks = async (userId: string) => {
    try {
      const data = await fetchTasks(userId);
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !user) return;

    try {
      const newTask = await createTask({
        title,
        description,
        status: 'TODO',
        userId: user.userId,
      });
      setTasks([newTask, ...tasks]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    try {
      const updated = await updateTask(id, { status });
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userName={user?.name} onLogout={handleLogout} />

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6">
        {!user ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="p-4 rounded-full bg-blue-500/10 text-blue-600 mb-4">
              <UserCheck size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome to Task Manager</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
              Log in as a guest to create, manage, and track your tasks effortlessly.
            </p>
            <button
              onClick={handleGuestLogin}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Continue as Guest'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column: Create Task Form */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm sticky top-20">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Plus size={20} /> Create New Task
                </h2>
                <form onSubmit={handleCreateTask} className="flex flex-col gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Task Title"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Task Details..."
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm transition mt-2"
                  >
                    Add Task
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Task List Columns */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(['TODO', 'IN_PROGRESS', 'COMPLETED'] as TaskStatus[]).map((colStatus) => {
                const columnTasks = tasks.filter((t) => t.status === colStatus);
                return (
                  <div key={colStatus} className="flex flex-col gap-3">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {colStatus.replace('_', ' ')}
                      </h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        {columnTasks.length}
                      </span>
                    </div>
                    {columnTasks.map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDeleteTask}
                      />
                    ))}
                    {columnTasks.length === 0 && (
                      <div className="p-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl text-center text-xs text-gray-400">
                        No tasks
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}