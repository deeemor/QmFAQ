import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 rounded-full transition-colors duration-200 ease-in-out 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                dark:focus:ring-offset-gray-900 dark:focus:ring-indigo-400
                hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600" />
      )}
    </button>
  );
};