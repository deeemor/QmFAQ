import React from 'react';
import { Flame } from 'lucide-react';
import { FAQ } from '../../types';
import { useSpring, animated } from '@react-spring/web';

interface PopularFAQsProps {
  faqs: FAQ[];
  onSelectFAQ: (id: string) => void;
}

export const PopularFAQs: React.FC<PopularFAQsProps> = ({ faqs, onSelectFAQ }) => {
  // Sort by helpful count descending and take top 5
  const popularFaqs = [...faqs]
    .sort((a, b) => (b.helpfulCount || 0) - (a.helpfulCount || 0))
    .slice(0, 5);

  if (popularFaqs.length === 0) return null;

  return (
    <div className="bg-white/70 dark:bg-gray-900/70 rounded-xl p-6
                 backdrop-blur-sm shadow-sm
                 border border-gray-200/50 dark:border-gray-700/50">
      <h3 className="flex items-center space-x-2 text-lg font-semibold mb-4
                   bg-gradient-to-r from-orange-600 to-red-600 
                   dark:from-orange-400 dark:to-red-400 
                   bg-clip-text text-transparent">
        <Flame className="h-5 w-5 text-orange-500 dark:text-orange-400 animate-flame" />
        <span>Popular FAQs</span>
      </h3>
      
      <div className="space-y-4">
        {popularFaqs.map((faq) => (
          <PopularFAQCard 
            key={faq.id} 
            faq={faq} 
            onSelect={() => onSelectFAQ(faq.id)} 
          />
        ))}
      </div>
    </div>
  );
};

interface PopularFAQCardProps {
  faq: FAQ;
  onSelect: () => void;
}

const PopularFAQCard: React.FC<PopularFAQCardProps> = ({ faq, onSelect }) => {
  const [springs, api] = useSpring(() => ({
    scale: 1,
    y: 0,
    shadow: 4,
    config: { tension: 280, friction: 60 }
  }));

  const handleMouseEnter = () => {
    api.start({
      scale: 1.02,
      y: -4,
      shadow: 16
    });
  };

  const handleMouseLeave = () => {
    api.start({
      scale: 1,
      y: 0,
      shadow: 4
    });
  };

  return (
    <animated.button
      onClick={onSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: springs.scale.to(s => `scale(${s})`),
        y: springs.y,
        boxShadow: springs.shadow.to(s => `0 ${s/4}px ${s/2}px rgba(0, 0, 0, 0.1)`)
      }}
      className="w-full text-left p-4 rounded-lg bg-gray-50 dark:bg-gray-800
                border border-gray-200/80 dark:border-gray-700/60
                transition-colors duration-200
                hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50
                dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20"
    >
      <div className="flex items-start space-x-2">
        <div className="flex-1">
          <p className="font-medium text-gray-800 dark:text-gray-200">{faq.question}</p>
          
          <div className="flex items-center mt-2 space-x-2">
            <span className="flex items-center space-x-1 px-2 py-1 rounded-full
                            bg-orange-100 dark:bg-orange-900/30
                            text-orange-700 dark:text-orange-300
                            text-xs font-medium">
              <Flame className="h-3 w-3" />
              <span>{faq.helpfulCount || 0} helpful</span>
            </span>
            
            {faq.tags && faq.tags.length > 0 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                in {faq.tags[0]}
              </span>
            )}
          </div>
        </div>
      </div>
    </animated.button>
  );
};