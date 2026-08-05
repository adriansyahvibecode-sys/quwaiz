import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Category, Question } from '../types';
import { soundFx } from '../utils/sound';
import { X, Plus, Trash2, RotateCcw, Sparkles, Save, HelpCircle } from 'lucide-react';

interface AdminModalProps {
  questions: Question[];
  onSaveQuestions: (updated: Question[]) => Promise<void>;
  onResetQuestions: () => Promise<void>;
  onClose: () => void;
  generalTimer: number;
  onUpdateGeneralTimer: (seconds: number) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  questions,
  onSaveQuestions,
  onResetQuestions,
  onClose,
  generalTimer,
  onUpdateGeneralTimer,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [questionList, setQuestionList] = useState<Question[]>(questions);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [generalTimerVal, setGeneralTimerVal] = useState<number>(generalTimer);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiCount, setAiCount] = useState<number>(5);
  const [aiCategory, setAiCategory] = useState<Category>('penjumlahan');

  // Form state for adding custom question
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<Category>('penjumlahan');
  const [newVisualItem, setNewVisualItem] = useState<string>('🍎');
  const [newOperandA, setNewOperandA] = useState<number>(3);
  const [newOperandB, setNewOperandB] = useState<number>(2);
  const [newOperator, setNewOperator] = useState<'+' | '-' | '?'>('+');
  const [newCorrectAnswer, setNewCorrectAnswer] = useState<number>(5);
  const [newTimer, setNewTimer] = useState<number>(20);

  const handleDeleteQuestion = async (id: string) => {
    soundFx.playClick();
    const updated = questionList.filter((q) => q.id !== id);
    setQuestionList(updated);
    await onSaveQuestions(updated);
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();

    const newQ: Question = {
      id: `q_custom_${Date.now()}`,
      category: newCategory,
      title: newTitle || `Soal ${newCategory}`,
      visualType: 'emoji',
      visualItem: newVisualItem || '🍎',
      operandA: newOperandA,
      operandB: newOperandB,
      operator: newOperator,
      correctAnswer: newCorrectAnswer,
      timerSeconds: newTimer,
    };

    const updated = [newQ, ...questionList];
    setQuestionList(updated);
    setIsSaving(true);
    await onSaveQuestions(updated);
    setIsSaving(false);

    // Reset form
    setNewTitle('');
    setActiveTab('list');
  };

  const handleGenerateAi = async () => {
    setIsAiLoading(true);
    soundFx.playClick();

    try {
      const res = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: aiCategory, count: aiCount }),
      });

      if (!res.ok) {
        throw new Error('Gagal menghubungi AI Server');
      }

      const data = await res.json();
      if (data.success && Array.isArray(data.questions)) {
        const merged = [...data.questions, ...questionList];
        setQuestionList(merged);
        await onSaveQuestions(merged);
        soundFx.playCorrect();
        alert(`Berhasil membuat ${data.questions.length} soal baru dengan AI Gemini! ✨`);
        setActiveTab('list');
      } else {
        alert(data.message || 'Gagal menghasilkan soal AI.');
      }
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Error AI generation';
      alert(`Terjadi kesalahan: ${msg}`);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleReset = async () => {
    if (confirm('Apakah Anda yakin ingin mengembalikan bank soal ke standar awal?')) {
      await onResetQuestions();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-[36px] max-w-3xl w-full border-6 border-[#2D3436] shadow-[10px_10px_0_0_#A29BFE] p-6 relative max-h-[90vh] flex flex-col text-[#2D3436]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-3 border-[#2D3436]">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            <div>
              <h2 className="text-xl font-black text-[#2D3436]">Bank Soal & Pengaturan Ortu</h2>
              <p className="text-xs text-[#2D3436]/70 font-bold">Kelola dan tambah soal matematika anak</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-[#FF7675] hover:bg-[#ff5252] text-white rounded-2xl border-3 border-[#2D3436] shadow-[0_3px_0_0_#2D3436] cursor-pointer active:translate-y-0.5 active:shadow-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 my-4 bg-[#FFE66D]/20 p-2 rounded-2xl border-3 border-[#2D3436]">
          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm border-2 transition-all cursor-pointer ${
              activeTab === 'list'
                ? 'bg-[#FFE66D] text-[#2D3436] border-[#2D3436] shadow-[0_3px_0_0_#2D3436]'
                : 'bg-transparent border-transparent text-[#2D3436]/70 hover:text-[#2D3436]'
            }`}
          >
            📋 Daftar Soal ({questionList.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`flex-1 py-2 px-3 rounded-xl font-black text-xs sm:text-sm border-2 transition-all cursor-pointer ${
              activeTab === 'add'
                ? 'bg-[#4ECDC4] text-white border-[#2D3436] shadow-[0_3px_0_0_#2D3436]'
                : 'bg-transparent border-transparent text-[#2D3436]/70 hover:text-[#2D3436]'
            }`}
          >
            ➕ Tambah Manual
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto pr-1 my-2">
          {/* TAB 1: LIST QUESTIONS */}
          {activeTab === 'list' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                <span>Total: {questionList.length} Soal</span>
                <button
                  onClick={handleReset}
                  className="text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset ke Default
                </button>
              </div>
              <div className="bg-[#FFE66D]/20 p-3 rounded-2xl border-3 border-[#2D3436] flex items-center justify-between gap-3 text-xs sm:text-sm shadow-[0_3px_0_0_#2D3436]">
                <span className="font-black text-[#2D3436] flex items-center gap-1.5">
                  ⏱️ TIMER GENERAL (SEMUA SOAL):
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="5"
                    max="120"
                    value={generalTimerVal}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10) || 20;
                      setGeneralTimerVal(val);
                      onUpdateGeneralTimer(val);
                    }}
                    className="w-16 p-1 rounded-lg border-2 border-[#2D3436] text-center font-black text-xs sm:text-sm focus:outline-none bg-white text-[#2D3436]"
                  />
                  <span className="font-black text-xs text-[#2D3436]">Detik</span>
                </div>
              </div>
              {questionList.map((q, idx) => (
                <div
                  key={q.id || idx}
                  className="p-3.5 bg-slate-50 rounded-2xl border-3 border-[#2D3436] flex items-center justify-between gap-3 text-xs sm:text-sm shadow-[0_3px_0_0_#2D3436]"
                >
                  <div className="space-y-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="font-black text-[#2D3436]">#{idx + 1}</span>
                        <span className="bg-[#FFE66D] text-[#2D3436] font-black px-2 py-0.5 rounded border border-[#2D3436] text-[10px] uppercase">
                          {q.category}
                        </span>
                      </div>
                      <input
                        type="text"
                        value={q.title || ''}
                        onChange={async (e) => {
                          const val = e.target.value;
                          const updated = [...questionList];
                          updated[idx] = { ...q, title: val };
                          setQuestionList(updated);
                          await onSaveQuestions(updated);
                        }}
                        className="font-bold text-[#2D3436] bg-white border border-[#2D3436]/30 rounded-lg px-2 py-0.5 text-xs focus:outline-none focus:border-[#4ECDC4] w-full max-w-md"
                        placeholder="Edit kalimat soal..."
                      />
                    </div>

                    <div className="text-[#2D3436]/80 font-bold flex items-center gap-2">
                      <span>Visual: {q.visualItem}</span>
                      <span>•</span>
                      <span>
                        {q.operandA} {q.operator} {q.operandB || ''} ={' '}
                        <strong className="text-[#4ECDC4] font-black">{q.correctAnswer}</strong>
                      </span>
                      <span>•</span>
                      <span>⏱️ {q.timerSeconds}s</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="p-2 text-[#FF7675] hover:bg-[#FF7675]/20 rounded-xl cursor-pointer transition-colors border-2 border-[#2D3436]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: ADD MANUAL QUESTION */}
          {activeTab === 'add' && (
            <form onSubmit={handleAddQuestion} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Soal</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Berapa jumlah pisang kiki?"
                  className="w-full p-2.5 rounded-xl border-2 border-slate-300 focus:outline-none focus:border-amber-400 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as Category)}
                    className="w-full p-2.5 rounded-xl border-2 border-slate-300 font-bold text-slate-800"
                  >
                    <option value="penjumlahan">Penjumlahan ➕</option>
                    <option value="pengurangan">Pengurangan ➖</option>
                    <option value="hitung_benda">Hitung Benda 🔢</option>
                    <option value="perbandingan">Perbandingan ⚖️</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Emoji Benda</label>
                  <input
                    type="text"
                    required
                    value={newVisualItem}
                    onChange={(e) => setNewVisualItem(e.target.value)}
                    placeholder="🍎, 🎈, ⭐️, 🍩, 🚗, 🐰"
                    className="w-full p-2.5 rounded-xl border-2 border-slate-300 text-center text-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Angka A (0-9)</label>
                  <input
                    type="number"
                    min="0"
                    max="9"
                    required
                    value={newOperandA}
                    onChange={(e) => setNewOperandA(parseInt(e.target.value, 10))}
                    className="w-full p-2.5 rounded-xl border-2 border-slate-300 text-center font-black"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Operator</label>
                  <select
                    value={newOperator}
                    onChange={(e) => setNewOperator(e.target.value as '+' | '-' | '?')}
                    className="w-full p-2.5 rounded-xl border-2 border-slate-300 font-black text-center"
                  >
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="?">?</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Angka B (0-9)</label>
                  <input
                    type="number"
                    min="0"
                    max="9"
                    required
                    value={newOperandB}
                    onChange={(e) => setNewOperandB(parseInt(e.target.value, 10))}
                    className="w-full p-2.5 rounded-xl border-2 border-slate-300 text-center font-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-emerald-800 mb-1">Jawaban Benar (0-9)</label>
                  <input
                    type="number"
                    min="0"
                    max="9"
                    required
                    value={newCorrectAnswer}
                    onChange={(e) => setNewCorrectAnswer(parseInt(e.target.value, 10))}
                    className="w-full p-2.5 rounded-xl border-2 border-emerald-400 bg-emerald-50 text-center font-black text-emerald-950 text-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Timer (Detik)</label>
                  <input
                    type="number"
                    min="5"
                    max="60"
                    required
                    value={newTimer}
                    onChange={(e) => setNewTimer(parseInt(e.target.value, 10))}
                    className="w-full p-2.5 rounded-xl border-2 border-slate-300 text-center font-bold"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                <span>Simpan Soal Baru</span>
              </button>
            </form>
          )}

          {/* AI Gemini Generator Removed */}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t-2 border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 font-bold rounded-xl text-slate-800 text-xs sm:text-sm cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </motion.div>
    </div>
  );
};
