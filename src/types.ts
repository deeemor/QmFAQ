export interface FAQ {
  dislikes: number;
  likes: number;
  id: string;
  question: string;
  answer: string;
  tags?: string[];
  createdAt: string | Date;
  updatedAt?: string | Date;
  helpfulCount?: number;
  unhelpfulCount?: number;
}

export interface NewQuestion {
  question: string;
  email?: string;
  name?: string;
}

export interface CategoryCount {
  [key: string]: number;
}

export interface SortOption {
  value: keyof FAQ | 'helpfulRatio';
  label: string;
  direction: 'asc' | 'desc';
}


//hier fur specheh
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
