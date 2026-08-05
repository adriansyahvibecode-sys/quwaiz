import { Question, QuizResult, QuizSettings } from '../types';
import { DEFAULT_QUESTIONS } from '../data/defaultQuestions';

const SETTINGS_KEY = 'kids_math_settings_v1';
const HISTORY_KEY = 'kids_math_history_v1';

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQjQOIn4nA_8AC8oWZn9WHPZC2Umb4jIvDP8_t07HBB_n9DNFmUygu2HkkyQdoBwm9jY-h9D1xT2dLu/pub?output=csv';

function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [""];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    if (c === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push("");
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') {
        i++;
      }
      lines.push(row);
      row = [""];
    } else {
      row[row.length - 1] += c;
    }
  }
  if (row.length > 1 || row[0] !== "") {
    lines.push(row);
  }
  return lines;
}

export async function fetchGoogleSheetQuestions(): Promise<{ math: Question[], coding: Question[] }> {
  try {
    const res = await fetch(SHEET_CSV_URL);
    if (res.ok) {
      const csvText = await res.text();
      const parsed = parseCSV(csvText);
      if (parsed.length > 1) {
        const headers = parsed[0];
        const math: Question[] = [];
        const coding: Question[] = [];

        for (let i = 1; i < parsed.length; i++) {
          const row = parsed[i];
          if (row.length < headers.length) continue;

          const id = row[0];
          const category = row[1];
          const title = row[2];
          const visualType = row[3] as any;
          const visualItem = row[4];
          const operandA = parseInt(row[5], 10) || 0;
          const operandB = parseInt(row[6], 10) || 0;
          const operator = row[7] as any;
          const correctAnswer = parseInt(row[8], 10) || 0;
          const timerSeconds = parseInt(row[9], 10) || 20;
          const optionsTextRaw = row[10];
          const explanation = row[11];

          let optionsText: string[] | undefined = undefined;
          if (optionsTextRaw) {
            try {
              optionsText = JSON.parse(optionsTextRaw);
            } catch {
              if (optionsTextRaw.includes(';')) {
                optionsText = optionsTextRaw.split(';').map(s => s.trim());
              }
            }
          }

          const q: Question = {
            id,
            category,
            title,
            visualType,
            visualItem,
            operandA,
            operandB,
            operator,
            correctAnswer,
            timerSeconds,
            optionsText,
            explanation
          };

          if (category.startsWith('coding_')) {
            coding.push(q);
          } else {
            math.push(q);
          }
        }

        if (math.length > 0 || coding.length > 0) {
          localStorage.setItem('kids_math_questions_v1', JSON.stringify(math));
          localStorage.setItem('kids_coding_questions_v1', JSON.stringify(coding));
          return { math, coding };
        }
      }
    }
  } catch (e) {
    console.warn('Failed to fetch from Google Sheet, using cache:', e);
  }

  // Fallback to cache or defaults
  const localMath = localStorage.getItem('kids_math_questions_v1');
  const localCoding = localStorage.getItem('kids_coding_questions_v1');

  let mathList: Question[] = [];
  let codingList: Question[] = [];

  if (localMath) {
    try { mathList = JSON.parse(localMath); } catch {}
  }
  if (localCoding) {
    try { codingList = JSON.parse(localCoding); } catch {}
  }

  return {
    math: mathList.length > 0 ? mathList : DEFAULT_QUESTIONS,
    coding: codingList
  };
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
