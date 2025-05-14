import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow fade-out animation to complete
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-md bg-white dark:bg-gray-800 
                rounded-lg shadow-lg border border-gray-200 dark:border-gray-700
                transform transition-all duration-300 ease-in-out z-50
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
                ${type === 'success' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'}`}
    >
      <div className="p-4 flex items-start space-x-3">
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
        )}
        
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{message}</p>
        </div>
        
        <button 
          className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};