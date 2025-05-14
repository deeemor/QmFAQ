import useSWR from 'swr';
import { useState, useMemo } from 'react';
import { FAQ, CategoryCount } from '../types';
import { useDebounce } from './useDebounce';


const API_URL = import.meta.env.VITE_API_URL;

const fetcher = async (url: string): Promise<FAQ[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch FAQs');
  }
  
  const text = await response.text();
  if (!text) {
    return [];
  }
  
  try {
    const data = JSON.parse(text);
    return data;
  } catch (e) {
    console.error('Failed to parse FAQs response:', e);
    return [];
  }
};

export function useFAQs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  const { data, error, isLoading } = useSWR<FAQ[]>(API_URL, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  const categories = useMemo(() => {
    if (!data) return {};
    
    return data.reduce((acc: CategoryCount, faq) => {
      if (faq.tags && faq.tags.length > 0) {
        faq.tags.forEach(tag => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
      }
      return acc;
    }, {});
  }, [data]);

  const filteredFAQs = useMemo(() => {
    if (!data) return [];
    
    return data.filter((faq) => {
      if (selectedCategory && (!faq.tags || !faq.tags.includes(selectedCategory))) {
        return false;
      }
      
      if (debouncedSearchTerm) {
        const searchLower = debouncedSearchTerm.toLowerCase();
        return (
          faq.question.toLowerCase().includes(searchLower) ||
          faq.answer.toLowerCase().includes(searchLower) ||
          faq.tags?.some(tag => tag.toLowerCase().includes(searchLower)) ||
          false
        );
      }
      
      return true;
    });
  }, [data, debouncedSearchTerm, selectedCategory]);

  return {
    faqs: filteredFAQs,
    isLoading,
    error,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  };
}