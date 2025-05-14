import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  language?: string;
  onResult?: (transcript: string) => void;
  onEnd?: () => void;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  startListening: () => Promise<void>;
  stopListening: () => void;
  resetTranscript: () => void;
  browserSupportsSpeechRecognition: boolean;
  error: string | null;
}

const useSpeechRecognition = ({ 
  language = 'en-US',
  onResult,
  onEnd
}: UseSpeechRecognitionProps = {}): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [browserSupportsSpeechRecognition, setBrowserSupportsSpeechRecognition] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      setBrowserSupportsSpeechRecognition(false);
      setError('Your browser does not support speech recognition');
      return;
    }

    setBrowserSupportsSpeechRecognition(true);
    
    const recognitionInstance = new SpeechRecognitionAPI();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = language;

    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.length > 0) {
          finalTranscript += result[0].transcript;
        }
      }
      
      setTranscript(finalTranscript);
      if (onResult) onResult(finalTranscript);
    };

    recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error', event.error);
      let errorMessage = 'Speech recognition error occurred';
      
      switch (event.error) {
        case 'not-allowed':
          errorMessage = 'Microphone permission was denied';
          break;
        case 'no-speech':
          errorMessage = 'No speech was detected';
          break;
        case 'audio-capture':
          errorMessage = 'No microphone was found';
          break;
        case 'network':
          errorMessage = 'Network error occurred';
          break;
        case 'aborted':
          errorMessage = 'Speech recognition was aborted';
          break;
      }
      
      setError(errorMessage);
      if (event.error !== 'aborted') {
        stopListening();
      }
    };

    recognitionInstance.onend = () => {
      if (isListening) {
        try {
          recognitionInstance.start();
        } catch (err) {
          console.error('Error restarting speech recognition:', err);
          setIsListening(false);
          if (onEnd) onEnd();
        }
      } else {
        if (onEnd) onEnd();
      }
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        try {
          recognitionInstance.stop();
          setIsListening(false);
        } catch (err) {
          console.error('Error stopping speech recognition:', err);
        }
      }
    };
  }, [language, onResult, onEnd, isListening]);

  const startListening = useCallback(async () => {
    setError(null);
    
    if (!recognition) {
      setError('Speech recognition is not initialized');
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      recognition.start();
      setIsListening(true);
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      setError('Error starting speech recognition');
      setIsListening(false);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.stop();
      } catch (err) {
        console.error('Error stopping speech recognition:', err);
      }
    }
    setIsListening(false);
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    error
  };
};

export default useSpeechRecognition;