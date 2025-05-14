import React from 'react';
import { Tag } from 'lucide-react';

interface CategoryFilterProps {
  categories: Record<string, number>;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  // Extract entries and sort by count descending
  const sortedCategories = Object.entries(categories)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Tag className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Tag</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200
                    transform hover:scale-105
                    ${!selectedCategory
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-sm'
                    }`}
        >
          All
        </button>
        
        {sortedCategories.map(([category, count]) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200
                      transform hover:scale-105
                      ${selectedCategory === category
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-sm'
                      }`}
          >
            {category} <span className="text-xs ml-1 opacity-70">({count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};