import React, { useEffect, useRef, useState } from 'react';
import { Users, Clock, MessagesSquare, Award } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface StatProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const Stat: React.FC<StatProps> = ({ icon, value, label, suffix = '', delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const end = value;
    const duration = 2000;
    const step = Math.max(1, Math.floor(end / (duration / 20)));
    
    const timer = setInterval(() => {
      start += step;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 20);
    
    return () => {
      clearInterval(timer);
    };
  }, [value, isVisible]);
  
  return (
    <div 
      ref={ref}
      className={cn(
        "transform transition-all duration-700",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
          {icon}
        </div>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {count}
          </span>
          {suffix && <span className="ml-1 text-lg font-medium text-gray-500 dark:text-gray-400">{suffix}</span>}
        </div>
        <p className="mt-1 text-gray-600 dark:text-gray-300">{label}</p>
      </div>
    </div>
  );
};

export const Stats: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Loved by teams worldwide
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our platform is making a difference for support teams everywhere.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Stat 
            icon={<Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            value={5420}
            label="Happy customers"
            delay={100}
          />
          
          <Stat 
            icon={<Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            value={45}
            label="Average response time"
            suffix="min"
            delay={200}
          />
          
          <Stat 
            icon={<MessagesSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            value={8}
            label="Million tickets resolved"
            suffix="M+"
            delay={300}
          />
          
          <Stat 
            icon={<Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            value={98}
            label="Customer satisfaction"
            suffix="%"
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};