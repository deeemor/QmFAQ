import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  onSearchChange 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleClear = () => {
    onSearchChange('');
    // Focus back on the input after clearing
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`relative rounded-xl overflow-hidden group
                   transition-all duration-300 ease-in-out
                   ${isFocused 
                     ? 'ring-2 ring-indigo-500 dark:ring-indigo-400 shadow-lg' 
                     : 'shadow-sm hover:shadow border border-gray-200/80 dark:border-gray-700/50'}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 to-purple-50/30
                    dark:from-indigo-900/10 dark:to-purple-900/10
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    
      <div className="flex items-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
        <div className={`flex items-center justify-center w-12 h-12 transition-all duration-300
                       ${isFocused ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
          <Search className={`h-5 w-5 transition-all duration-300 transform
                           ${isFocused ? 'scale-110' : 'scale-100'}`} />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search FAQs..."
          className="flex-1 bg-transparent p-3 pl-0 text-gray-700 dark:text-gray-300
                    placeholder:text-gray-500 dark:placeholder:text-gray-500
                    focus:outline-none focus:ring-0 border-none"
        />
        
        {searchTerm && (
          <button
            onClick={handleClear}
            className="flex items-center justify-center w-12 h-12 text-gray-500 dark:text-gray-400
                     hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};