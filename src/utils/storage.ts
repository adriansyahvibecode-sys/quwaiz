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
        const rawHeaders = parsed[0].map(h => h.trim().toLowerCase());
        const getIdx = (name: string) => rawHeaders.indexOf(name.toLowerCase());

        const idIdx = getIdx('id') !== -1 ? getIdx('id') : 0;
        const catIdx = getIdx('category') !== -1 ? getIdx('category') : 1;
        const titleIdx = getIdx('title') !== -1 ? getIdx('title') : 3;
        const vTypeIdx = getIdx('visualtype') !== -1 ? getIdx('visualtype') : 4;
        const vItemIdx = getIdx('visualitem') !== -1 ? getIdx('visualitem') : 5;
        const opAIdx = getIdx('operanda') !== -1 ? getIdx('operanda') : 6;
        const opBIdx = getIdx('operandb') !== -1 ? getIdx('operandb') : 7;
        const opIdx = getIdx('operator') !== -1 ? getIdx('operator') : 8;
        const ansIdx = getIdx('correctanswer') !== -1 ? getIdx('correctanswer') : 9;
        const timerIdx = getIdx('timerseconds') !== -1 ? getIdx('timerseconds') : 10;
        const optTxtIdx = getIdx('optionstext') !== -1 ? getIdx('optionstext') : 11;
        const expIdx = getIdx('explanation') !== -1 ? getIdx('explanation') : 12;

        const math: Question[] = [];
        const coding: Question[] = [];

        for (let i = 1; i < parsed.length; i++) {
          const row = parsed[i];
          if (row.length < 5) continue;

          const id = row[idIdx] || `q_${i}`;
          const category = row[catIdx] || 'penjumlahan';
          const title = row[titleIdx] || '';
          const visualType = (row[vTypeIdx] || 'emoji') as any;
          const visualItem = row[vItemIdx] || '🍎';
          const operandA = parseInt(row[opAIdx], 10) || 0;
          const operandB = parseInt(row[opBIdx], 10) || 0;
          const operator = (row[opIdx] || '+') as any;
          const correctAnswer = parseInt(row[ansIdx], 10) || 0;
          const timerSeconds = parseInt(row[timerIdx], 10) || 20;
          const optionsTextRaw = row[optTxtIdx];
          const explanation = row[expIdx] || '';

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
