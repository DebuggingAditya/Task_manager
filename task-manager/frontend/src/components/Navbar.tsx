'use client';

import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  userName?: string;
  onLogout?: () => void;
}

export default function Navbar({ userName, onLogout }: NavbarProps) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          TaskManager
        </h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {userName && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {userName}
              </span>
              <button
                onClick={onLogout}
                className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 px-2.5 py-1.5 rounded-md hover:bg-red-500/20 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}