import React, { useEffect, useState } from 'react';
import {MessageCircle, BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className={`transform transition-all duration-1000 delay-100 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Support that feels like magic
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Elevate your customer experience with our intelligent helpdesk solution. 
              Streamlined, intuitive, and designed with your team in mind.
            </p>
          </div>
          
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Button 
              variant="primary" 
              size="lg" 
              icon={<MessageCircle className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              Contact Support
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              icon={<BookOpen className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              Getting Started Guide
            </Button>
          </div>
          
          <div 
            className={`mt-12 relative transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-10 h-16 bottom-0"></div>
            <div className="relative mx-auto overflow-hidden rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800">
              <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-400">QmFAQ.app</div>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 h-64 overflow-hidden">
                <div className="animate-pulse space-y-3">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/6"></div>
                </div>
                <div className="mt-6 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-indigo-500"></div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};