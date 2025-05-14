import React, { useState, useEffect } from 'react';
import { Send, HelpCircle } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import axios from 'axios';
import SpeechToTextButton from '../ui/SpeechToTextButton';
import useSpeechRecognition from '../../hooks/useSpeechRecognition';

export const QuestionForm: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Speech recognition setup
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    browserSupportsSpeechRecognition,
    error: speechError
  } = useSpeechRecognition({
    language: 'en-US',
    onResult: (text) => setQuestion(text),
    onEnd: () => {
      // Stop listening when speech recognition ends
      stopListening();
    }
  });

  // Show speech recognition errors
  useEffect(() => {
    if (speechError) {
      setMessage(`Microphone error: ${speechError}`);
      setStatus('error');
      
      // Reset error message after 3 seconds
      const timer = setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [speechError]);

  // Handle toggling speech recognition
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const formSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 60 }
  });
  
  const buttonSpring = useSpring({
    scale: status === 'sending' ? 0.95 : 1,
    config: { tension: 300, friction: 10 }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If currently listening, stop first
    if (isListening) {
      stopListening();
    }
    
    setStatus('sending');
    
    try {
      await axios.post("https://localhost:7223/api/UserQuestions", {
        question: question,
      });
      
      setStatus('success');
      setMessage('Thank you for your question! We\'ll review it shortly.');
      setQuestion('');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      
      // Reset error status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <animated.div 
      style={formSpring}
      className="relative overflow-hidden bg-white/70 dark:bg-gray-900/70 rounded-xl p-6 shadow-lg mb-8
                 border border-gray-200/50 dark:border-gray-700/50
                 backdrop-blur-lg"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/50 via-transparent to-purple-50/50
                     dark:from-indigo-900/10 dark:via-transparent dark:to-purple-900/10
                     pointer-events-none"></div>
                     
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex items-center justify-center h-8 w-8 rounded-full
                         bg-indigo-100 dark:bg-indigo-900/30
                         text-indigo-600 dark:text-indigo-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 
                        dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Ask a Question
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={
                browserSupportsSpeechRecognition 
                  ? "Type or speak your question..." 
                  : "What would you like to know?"
              }
              rows={3}
              className={`w-full px-4 py-3 rounded-lg
                        bg-white dark:bg-gray-800
                        border border-gray-200 dark:border-gray-700
                        ${isListening ? 'border-indigo-500 ring-2 ring-indigo-300 dark:ring-indigo-700' : ''}
                        focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                        focus:border-transparent
                        placeholder:text-gray-500 dark:placeholder:text-gray-500
                        text-gray-700 dark:text-gray-300
                        resize-none transition-all duration-200`}
              required
              disabled={status === 'sending'}
            />
            
            {/* Add speech indicator when listening */}
            {isListening && (
              <div className="absolute top-3 right-3 flex items-center space-x-1 px-2 py-1 rounded-full 
                            bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span>Listening...</span>
              </div>
            )}
            
            {/* Character counter */}
            <div className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500">
              {question.length}/500
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {/* Speech to text button */}
              <SpeechToTextButton 
                isListening={isListening}
                onToggle={toggleListening}
                disabled={status === 'sending'}
                browserSupported={browserSupportsSpeechRecognition}
              />
              
              <p className={`text-sm transition-opacity duration-300 ${
                message ? 'opacity-100' : 'opacity-0'
              } ${
                status === 'success' ? 'text-green-600 dark:text-green-400' : 
                status === 'error' ? 'text-red-600 dark:text-red-400' : ''
              }`}>
                {message || (
                  browserSupportsSpeechRecognition 
                    ? 'Type or click the microphone to speak' 
                    : 'Type your question and submit'
                )}
              </p>
            </div>
            
            <animated.button
              type="submit"
              disabled={status === 'sending' || !question.trim()}
              style={buttonSpring}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg
                        transition-all duration-300
                        ${status === 'sending'
                          ? 'bg-indigo-500 cursor-wait' 
                          : question.trim()
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                            : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'}
                        text-white shadow-md hover:shadow-lg`}
            >
              {status === 'sending' ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span>{status === 'sending' ? 'Submitting...' : 'Submit Question'}</span>
            </animated.button>
          </div>
        </form>
      </div>
    </animated.div>
  );
};

export default QuestionForm;