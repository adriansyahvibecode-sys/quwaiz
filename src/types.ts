export type Category = 'penjumlahan' | 'pengurangan' | 'hitung_benda' | 'perbandingan' | 'geometri' | 'campuran';

export type VisualType = 'emoji' | 'dots' | 'shapes';

export interface Question {
  id: string;
  category: Category | string;
  title?: string;
  visualType: VisualType;
  visualItem: string; // Emoji e.g., "🍎", "🎈", "⭐️", "🍩", "🚗", "🐰"
  operandA: number;
  operandB?: number;
  operator: '+' | '-' | '?' | '=';
  correctAnswer: number;
  timerSeconds: number;
  options?: number[];
  optionsText?: string[]; // Multiple choice options text for coding
  explanation?: string;
}

export interface Mascot {
  id: string;
  name: string;
  animal: string;
  emoji: string;
  color: string;
  bgLight: string;
  accentColor: string;
  catchphrase: string;
  greeting: string;
  correctReactions: string[];
  wrongReactions: string[];
}

export interface QuizSettings {
  defaultTimerSeconds: number;
  soundEnabled: boolean;
  speechEnabled: boolean;
  selectedMascotId: string;
  selectedQuestionCount: number;
  selectedCategory: Category;
  gameMode: 'matematika_umum' | 'matematika_coding'; // Game mode selection
  tvInputHint: boolean;
  playerName?: string;
}

export interface UserAnswer {
  questionId: string;
  question: Question;
  userAnswer: number | null;
  isCorrect: boolean;
  timeSpentSeconds: number;
  pointsEarned?: number;
}

export interface QuizResult {
  score: number; // 0 - 100 percentage
  totalScore: number; // Accumulated PTS points
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  stars: number; // 1 to 3
  timeSpentSeconds: number;
  answers: UserAnswer[];
  completedAt: string;
  mascotName: string;
  mascotEmoji: string;
  playerName?: string;
  isNewRecord?: boolean;
}
