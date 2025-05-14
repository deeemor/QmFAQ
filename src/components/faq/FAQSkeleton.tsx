import React from 'react';

interface FAQSkeletonProps {
  count?: number;
  className?: string;
}

export const FAQSkeleton: React.FC<FAQSkeletonProps> = ({ count = 3, className = '' }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index}
          className={`bg-white/70 dark:bg-gray-900/70 rounded-xl overflow-hidden p-6
                     border border-gray-200/50 dark:border-gray-700/50
                     backdrop-blur-sm
                     ${className}`}
        >
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg w-3/4 mb-4"></div>
            <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-4/6"></div>
          </div>
          <div className="mt-5 flex space-x-2">
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      ))}
    </>
  );
};