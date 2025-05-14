import React from 'react';
import { Loader2 } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

export const LoadingScreen: React.FC = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 280, friction: 60 }
  });

  const rotate = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
    loop: true,
    config: { duration: 1000 }
  });

  return (
    <animated.div style={fadeIn} className="fixed inset-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center">
        <animated.div style={rotate}>
          <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
        </animated.div>
        <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium animate-pulse">
          Loading Knowledge Base...
        </p>
      </div>
    </animated.div>
  );
};