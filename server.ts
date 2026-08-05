import express from 'express';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { DEFAULT_QUESTIONS } from './src/data/defaultQuestions.js';

const currentDirname = typeof __dirname !== 'undefined' 
  ? __dirname 
  : (typeof import.meta !== 'undefined' && import.meta.url ? path.dirname(fileURLToPath(import.meta.url)) : process.cwd());

// In-memory / initial store for questions
let questionsStore = [...DEFAULT_QUESTIONS];
let settingsStore = {
  defaultTimerSeconds: 20,
  soundEnabled: true,
  speechEnabled: true,
  selectedMascotId: 'kiki',
  selectedQuestionCount: 5,
  selectedCategory: 'penjumlahan',
  tvInputHint: true,
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Get question bank
  app.get('/api/questions', (_req, res) => {
    res.json({
      success: true,
      questions: questionsStore,
    });
  });

  // Update question bank
  app.post('/api/questions', (req, res) => {
    const { questions } = req.body;
    if (Array.isArray(questions)) {
      questionsStore = questions;
      return res.json({ success: true, message: 'Question bank updated', count: questionsStore.length });
    }
    res.status(400).json({ success: false, message: 'Invalid questions payload' });
  });

  // Reset to default question bank
  app.post('/api/questions/reset', (_req, res) => {
    questionsStore = [...DEFAULT_QUESTIONS];
    res.json({ success: true, message: 'Questions reset to defaults', questions: questionsStore });
  });

  // Get settings
  app.get('/api/settings', (_req, res) => {
    res.json({ success: true, settings: settingsStore });
  });

  // Save settings
  app.post('/api/settings', (req, res) => {
    const { settings } = req.body;
    if (settings) {
      settingsStore = { ...settingsStore, ...settings };
      return res.json({ success: true, settings: settingsStore });
    }
    res.status(400).json({ success: false, message: 'Invalid settings' });
  });

  // Download project source ZIP route
  app.get('/api/download-zip', (_req, res) => {
    const zipPath = path.join(process.cwd(), 'kuis-matematika-tk.zip');
    try {
      if (fs.existsSync(zipPath)) {
        fs.unlinkSync(zipPath);
      }
      
      // Try zip command first, fallback to tar
      try {
        execSync(`zip -q -r "${zipPath}" . -x "node_modules/*" "dist/*" ".git/*" ".cache/*" "kuis-matematika-tk.zip"`);
      } catch (zipErr) {
        // Fallback to tar if zip tool is missing
        const tarPath = path.join(process.cwd(), 'kuis-matematika-tk.tar.gz');
        execSync(`tar -czf "${tarPath}" --exclude="node_modules" --exclude="dist" --exclude=".git" --exclude=".cache" .`);
        return res.download(tarPath, 'kuis-matematika-tk.tar.gz', () => {
          if (fs.existsSync(tarPath)) fs.unlinkSync(tarPath);
        });
      }

      res.download(zipPath, 'kuis-matematika-tk.zip', () => {
        if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
      });
    } catch (error: any) {
      console.error('Error creating export archive:', error);
      res.status(500).json({ success: false, message: 'Gagal mengunduh ZIP source code: ' + error.message });
    }
  });

  // AI Question Generator Endpoint (Using Gemini API)
  app.post('/api/generate-questions', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          success: false,
          message: 'GEMINI_API_KEY is not configured in environment',
        });
      }

      const { category = 'penjumlahan', count = 5 } = req.body;

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Anda adalah pembuat kuis matematika anak TK (usia 4-6 tahun). 
Buatkan ${count} soal matematika sederhana dalam format JSON array.
Kategori yang diminta: ${category}.
Syarat wajib:
1. Angka operandA dan operandB berkisar antara 0 sampai 9.
2. Jawaban akhir (correctAnswer) MUST BE single digit (antara 0 sampai 9).
3. Gunakan emoji konkret anak-anak seperti "🍎", "🎈", "⭐️", "🍩", "🚗", "🐰", "🍬", "🐥", "🍦", "🍓".
4. Judul soal ramah anak dalam Bahasa Indonesia.
5. Tiap objek JSON harus memiliki properti persis:
{
  "id": "ai_q_1",
  "category": "${category}",
  "title": "Judul soal ramah anak",
  "visualType": "emoji",
  "visualItem": "🍎",
  "operandA": 3,
  "operandB": 2,
  "operator": "+",
  "correctAnswer": 5,
  "timerSeconds": 20,
  "explanation": "Penjelasan singkat ceria"
}

Kembalikan HANYA JSON array yang valid, tanpa markdown code block ekstra.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text || '';
      // Clean up json formatting if needed
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const generatedQuestions = JSON.parse(cleanJson);

      res.json({
        success: true,
        questions: generatedQuestions,
      });
    } catch (err: unknown) {
      console.error('Gemini API Question Generation Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate AI questions';
      res.status(500).json({
        success: false,
        message: errorMessage,
      });
    }
  });

  // Vite Middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎮 Kuis Matematika Anak Ceria Server running on http://localhost:${PORT}`);
  });
}

startServer();
