import { Question, QuizResult, QuizSettings } from '../types';
import { DEFAULT_QUESTIONS } from '../data/defaultQuestions';

const QUESTIONS_KEY = 'kids_math_questions_v1';
const SETTINGS_KEY = 'kids_math_settings_v1';
const HISTORY_KEY = 'kids_math_history_v1';

export async function fetchQuestions(): Promise<Question[]> {
  try {
    const res = await fetch('/api/questions');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        // Save to localStorage cache as well
        localStorage.setItem(QUESTIONS_KEY, JSON.stringify(data.questions));
        return data.questions;
      }
    }
  } catch (e) {
    console.warn('API fetchQuestions failed, using local cache:', e);
  }

  // Fallback to localStorage or DEFAULT_QUESTIONS
  const local = localStorage.getItem(QUESTIONS_KEY);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      // parse error
    }
  }

  return DEFAULT_QUESTIONS;
}

export async function saveQuestions(questions: Question[]): Promise<boolean> {
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
  try {
    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questions }),
    });
    return res.ok;
  } catch {
    return true; // cached locally
  }
}

export async function resetQuestionsToDefault(): Promise<Question[]> {
  localStorage.removeItem(QUESTIONS_KEY);
  try {
    await fetch('/api/questions/reset', { method: 'POST' });
  } catch {
    // ignored
  }
  return DEFAULT_QUESTIONS;
}

export function loadLocalSettings(): QuizSettings {
  const local = localStorage.getItem(SETTINGS_KEY);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      // ignored
    }
  }
  return {
    defaultTimerSeconds: 20,
    soundEnabled: true,
    speechEnabled: true,
    selectedMascotId: 'alex',
    selectedQuestionCount: 5,
    selectedCategory: 'campuran',
    gameMode: 'matematika_umum',
    tvInputHint: true,
    playerName: 'MYESHA',
  };
}

export function saveLocalSettings(settings: QuizSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function saveQuizResult(result: QuizResult) {
  const existing = loadQuizHistory();
  existing.unshift(result);
  // Keep last 20 results
  localStorage.setItem(HISTORY_KEY, JSON.stringify(existing.slice(0, 20)));
}

export function loadQuizHistory(): QuizResult[] {
  const local = localStorage.getItem(HISTORY_KEY);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      // ignored
    }
  }
  return [];
}
