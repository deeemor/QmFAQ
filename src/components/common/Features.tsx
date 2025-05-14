import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, MessageSquare, Clock, Users, BarChart } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

export const Feature: React.FC<FeatureProps> = ({ icon, title, description, delay }) => {
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
  
  return (
    <div 
      ref={ref}
      className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Designed for efficiency</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our platform comes with everything you need to provide excellent customer support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Feature 
            icon={<Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            title="AI-Powered Responses"
            description="Our AI suggests responses based on previous tickets, helping your team respond faster with consistent answers."
            delay={100}
          />
          
          <Feature 
            icon={<MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            title="Multi-Channel Support"
            description="Handle inquiries from email, chat, social media, and phone—all from a single unified inbox."
            delay={200}
          />
          
          <Feature 
            icon={<Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            title="Automation Workflows"
            description="Create custom workflows to route, assign, and resolve tickets automatically based on your business rules."
            delay={300}
          />
          
          <Feature 
            icon={<Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            title="Team Collaboration"
            description="Work together seamlessly with internal notes, assignments, and shared inboxes for your entire team."
            delay={400}
          />
          
          <Feature 
            icon={<BarChart className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            title="Analytics Dashboard"
            description="Gain insights into your support performance with detailed metrics and customizable reports."
            delay={500}
          />
          
          <Feature 
            icon={<Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            title="Knowledge Base"
            description="Create a self-service portal with searchable articles to help customers find answers quickly."
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};