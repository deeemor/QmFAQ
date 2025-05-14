import React from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';

interface SpeechToTextButtonProps {
  isListening: boolean;
  onToggle: () => void;
  disabled?: boolean;
  browserSupported: boolean;
}

const SpeechToTextButton: React.FC<SpeechToTextButtonProps> = ({
  isListening,
  onToggle,
  disabled = false,
  browserSupported
}) => {
  if (!browserSupported) {
    return (
      <button
        type="button"
        disabled={true}
        className="flex items-center justify-center w-10 h-10 rounded-full
                  bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400
                  cursor-not-allowed"
        title="Speech recognition not supported in this browser"
      >
        <MicOff className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={`flex items-center justify-center w-10 h-10 rounded-full
                transition-all duration-300
                ${isListening
                  ? 'bg-indigo-500 text-white animate-pulse'
                  : disabled
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
      title={
        isListening
          ? 'Stop listening'
          : disabled
            ? 'Currently unavailable'
            : 'Click to speak'
      }
    >
      {disabled ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : isListening ? (
        <Mic className="h-5 w-5" />
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </button>
  );
};

export default SpeechToTextButton;