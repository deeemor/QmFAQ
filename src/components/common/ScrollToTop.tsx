import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const springProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 300, friction: 20 }
  });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <animated.button
          style={springProps}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-indigo-600 dark:bg-indigo-500 text-white
                    rounded-full shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-600
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    transition-colors duration-200 z-20"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </animated.button>
      )}
    </>
  );
};