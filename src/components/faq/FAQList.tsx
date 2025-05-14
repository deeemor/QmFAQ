import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { FAQ } from '../../types';
import { FAQItem } from './FAQItem';
import { SearchBar } from './SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { FAQSkeleton } from './FAQSkeleton';

interface FAQListProps {
  faqs: FAQ[];
  isLoading: boolean;
  error: Error | null;
  categories: Record<string, number>;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const FAQList: React.FC<FAQListProps> = ({
  faqs,
  isLoading,
  error,
  categories,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const [openFAQId, setOpenFAQId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenFAQId(openFAQId === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={onSearchChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FAQSkeleton count={3} />
          <FAQSkeleton count={3} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50/50 dark:bg-red-900/20 p-8 rounded-xl backdrop-blur-lg">
        <div className="flex items-center mb-3">
          <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-400 mr-2" />
          <h2 className="text-lg font-medium text-red-800 dark:text-red-300">
            Error Loading FAQs
          </h2>
        </div>
        <p className="text-red-700 dark:text-red-300">
          Sorry, we encountered a problem while loading the FAQ data. Please try again later.
        </p>
        <pre className="mt-3 text-sm text-red-600 dark:text-red-400 bg-red-100/50 dark:bg-red-900/30 p-4 rounded-lg">
          {error.message}
        </pre>
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className="space-y-6">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={onSearchChange}
        />
        
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onCategoryChange={onCategoryChange}
        />
        
        <div className="text-center py-12 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
            No matching FAQs found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Please try adjusting your search or filter criteria
          </p>
          
          <button
            onClick={() => {
              onSearchChange('');
              onCategoryChange(null);
            }}
            className="mt-4 px-6 py-2 text-sm font-medium text-white
                      bg-gradient-to-r from-indigo-600 to-purple-600
                      hover:from-indigo-700 hover:to-purple-700
                      rounded-full shadow-lg hover:shadow-xl
                      transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Reset filters
          </button>
        </div>
      </div>
    );
  }

  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumnFAQs = faqs.slice(0, midPoint);
  const rightColumnFAQs = faqs.slice(midPoint);

  return (
    <div className="space-y-6">
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={onSearchChange}
      />
      
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onCategoryChange={onCategoryChange}
      />
      
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Showing {faqs.length} {faqs.length === 1 ? 'result' : 'results'}
          {searchTerm && ` for "${searchTerm}"`}
          {selectedCategory && ` in "${selectedCategory}"`}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {leftColumnFAQs.map((faq) => (
              <FAQItem 
                key={faq.id} 
                faq={faq} 
                isOpen={openFAQId === faq.id}
                toggleOpen={() => toggleFAQ(faq.id)}
              />
            ))}
          </div>
          <div className="space-y-6">
            {rightColumnFAQs.map((faq) => (
              <FAQItem 
                key={faq.id} 
                faq={faq} 
                isOpen={openFAQId === faq.id}
                toggleOpen={() => toggleFAQ(faq.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};