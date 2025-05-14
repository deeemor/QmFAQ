import { useState } from 'react';
import { ToastType } from '../components/ui/Toast';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const addToast = (message: string, type: ToastType = 'success') => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    return id;
  };
  
  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };
  
  return {
    toasts,
    addToast,
    removeToast,
  };
};