import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowUpDown } from 'lucide-react';

interface SortOption {
  value: string;
  label: string;
  direction: 'asc' | 'desc';
}

interface SortOptionsProps {
  value: SortOption;
  onChange: (option: SortOption) => void;
  options: SortOption[];
}

export const SortOptions: React.FC<SortOptionsProps> = ({
  value,
  onChange,
  options
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium
                 rounded-lg bg-white/80 dark:bg-gray-800/80 shadow-sm
                 border border-gray-200/80 dark:border-gray-700/50
                 text-gray-700 dark:text-gray-300
                 hover:shadow-md transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
      >
        <ArrowUpDown className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
        <span>{value.label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 
                      shadow-lg rounded-lg z-50 border border-gray-200 dark:border-gray-700
                      origin-top-right animate-slideDown">
          {options.map((option) => (
            <button
              key={`${option.value}-${option.direction}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm
                        ${value.value === option.value && value.direction === option.direction
                          ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};