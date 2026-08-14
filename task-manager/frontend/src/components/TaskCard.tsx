'use client';

import { Task, TaskStatus } from '@/types';
import { Trash2, CheckCircle2, Clock, Circle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const statusColors = {
    TODO: 'border-l-amber-500',
    IN_PROGRESS: 'border-l-blue-500',
    COMPLETED: 'border-l-green-500',
  };

  return (
    <div className={`p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm border-l-4 ${statusColors[task.status]} flex flex-col justify-between gap-3 transition hover:shadow-md`}>
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{task.description}</p>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
        <div className="flex gap-1.5">
          <button
            onClick={() => onStatusChange(task._id, 'TODO')}
            className={`p-1 rounded ${task.status === 'TODO' ? 'text-amber-500 bg-amber-500/10' : 'text-gray-400 hover:text-gray-600'}`}
            title="Mark To-Do"
          >
            <Circle size={16} />
          </button>
          <button
            onClick={() => onStatusChange(task._id, 'IN_PROGRESS')}
            className={`p-1 rounded ${task.status === 'IN_PROGRESS' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-gray-600'}`}
            title="Mark In-Progress"
          >
            <Clock size={16} />
          </button>
          <button
            onClick={() => onStatusChange(task._id, 'COMPLETED')}
            className={`p-1 rounded ${task.status === 'COMPLETED' ? 'text-green-500 bg-green-500/10' : 'text-gray-400 hover:text-gray-600'}`}
            title="Mark Completed"
          >
            <CheckCircle2 size={16} />
          </button>
        </div>

        <button
          onClick={() => onDelete(task._id)}
          className="text-gray-400 hover:text-red-500 transition p-1"
          title="Delete Task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}