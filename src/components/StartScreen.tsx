import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Category, Mascot, QuizSettings } from '../types';
import { MASCOTS } from '../data/mascots';
import { soundFx } from '../utils/sound';
import { Play, Sparkles, Trophy } from 'lucide-react';
import { NameKeyboard } from './NameKeyboard';
import { Leaderboard } from './Leaderboard';
import { QuizResult } from '../types';

interface StartScreenProps {
  settings: QuizSettings;
  onUpdateSettings: (newSettings: QuizSettings) => void;
  onStartQuiz: () => void;
  onOpenAdmin: () => void;
  totalAvailableQuestions: number;
  highScore: number;
  history?: QuizResult[];
}

export const StartScreen: React.FC<StartScreenProps> = ({
  settings,
  onUpdateSettings,
  onStartQuiz,
  onOpenAdmin,
  totalAvailableQuestions,
  highScore,
  history = [],
}) => {
  const [selectedMascot, setSelectedMascot] = useState<Mascot>(
    MASCOTS.find((m) => m.id === settings.selectedMascotId) || MASCOTS[0]
  );

  const categories: { id: Category; label: string; icon: string; bg: string }[] = [
    { id: 'penjumlahan', label: 'Penjumlahan ➕', icon: '🍎', bg: 'bg-[#4ECDC4]' },
    { id: 'pengurangan', label: 'Pengurangan ➖', icon: '🎈', bg: 'bg-[#FF7675]' },
    { id: 'hitung_benda', label: 'Hitung Benda 🔢', icon: '⭐', bg: 'bg-[#FFE66D] text-[#2D3436]' },
    { id: 'campuran', label: 'Campuran 🎲', icon: '🎨', bg: 'bg-[#A29BFE]' },
  ];

  const handleSelectMascot = (m: Mascot) => {
    soundFx.playClick();
    setSelectedMascot(m);
    onUpdateSettings({ ...settings, selectedMascotId: m.id });
    soundFx.speakText(`Halo! Aku ${m.name}! Mari belajar bersama!`);
  };

  const handleSelectCategory = (cat: Category) => {
    soundFx.playClick();
    onUpdateSettings({ ...settings, selectedCategory: cat });
  };

  const handleSelectQuestionCount = (count: number) => {
    soundFx.playClick();
    onUpdateSettings({ ...settings, selectedQuestionCount: count });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-3 my-0 space-y-3">
      {/* Title Header with Bouncy Animations */}
      <div className="text-center py-2">
        <motion.div
          initial={{ scale: 0.8, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="inline-flex items-center gap-2 bg-[#FFE66D] text-[#2D3436] px-5 sm:px-6 py-2 rounded-2xl font-black text-xl sm:text-2xl md:text-3xl border-3 border-[#2D3436] shadow-[4px_4px_0_0_#2D3436]"
        >
          <Sparkles className="w-5 h-5 text-[#2D3436] shrink-0 animate-pulse" />
          <span>QUAIZ - Quiz dari Uwaiz</span>
        </motion.div>
      </div>

      {/* Name Input & Visual Keyboard Section */}
      <NameKeyboard
        value={settings.playerName || ''}
        onChange={(newName) => onUpdateSettings({ ...settings, playerName: newName })}
      />
      {/* Game Mode Selection */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border-3 border-[#2D3436] shadow-[4px_4px_0_0_#2D3436] space-y-2">
        <h2 className="font-black text-[#2D3436] text-sm sm:text-base flex items-center gap-1.5">
          <span>🧠</span> PILIH MODE BELAJAR:
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onUpdateSettings({ ...settings, gameMode: 'matematika_umum' })}
            className={`p-3 rounded-2xl border-3 border-[#2D3436] font-black text-xs sm:text-sm flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              settings.gameMode === 'matematika_umum'
                ? 'bg-[#FFE66D] text-[#2D3436] shadow-[0_4px_0_0_#2D3436] -translate-y-0.5'
                : 'bg-slate-50 text-[#2D3436] hover:bg-[#FFE66D]/30'
            }`}
          >
            <span className="text-2xl">🧮</span>
            <span className="font-black">MATEMATIKA UMUM</span>
            <span className="text-[9px] text-[#2D3436]/60 font-bold hidden sm:inline">Penjumlahan, Pengurangan, Hitung Benda</span>
          </button>

          <button
            onClick={() => onUpdateSettings({ ...settings, gameMode: 'matematika_coding' })}
            className={`p-3 rounded-2xl border-3 border-[#2D3436] font-black text-xs sm:text-sm flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              settings.gameMode === 'matematika_coding'
                ? 'bg-[#4ECDC4] text-white shadow-[0_4px_0_0_#2D3436] -translate-y-0.5 border-[#2D3436]'
                : 'bg-slate-50 text-[#2D3436] hover:bg-[#4ECDC4]/20'
            }`}
          >
            <span className="text-2xl">💻</span>
            <span className="font-black">ALGORITMA CODING</span>
            <span className="text-[9px] text-white/80 font-bold hidden sm:inline">Algoritma, Pengenalan Pola, Navigasi</span>
          </button>
        </div>
      </div>

      {/* Category & Question Count Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Category Picker */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border-3 border-[#2D3436] shadow-[4px_4px_0_0_#2D3436] space-y-2">
          <h2 className="font-black text-[#2D3436] text-sm flex items-center gap-1.5">
            <span>🎯</span> KATEGORI SOAL:
          </h2>

          {settings.gameMode === 'matematika_coding' ? (
            <div className="flex flex-col items-center justify-center p-3 bg-[#4ECDC4]/10 border-2 border-dashed border-[#4ECDC4] rounded-xl text-center h-24 justify-center">
              <span className="text-2xl">💻</span>
              <span className="font-black text-[#2D3436] text-xs mt-1">LOGIKA CODING & CT</span>
              <span className="text-[9px] text-[#2D3436]/70 font-bold">Algoritma, Pola, Navigasi, Kondisional, dll.</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                const isSelected = settings.selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`p-2 rounded-xl font-black text-xs border-2 border-[#2D3436] flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? `${cat.bg} text-white shadow-[0_3px_0_0_#2D3436] -translate-y-0.5`
                        : 'bg-slate-100 text-[#2D3436] hover:bg-slate-200'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Question Count Picker */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border-3 border-[#2D3436] shadow-[4px_4px_0_0_#2D3436] space-y-2 flex flex-col justify-between">
          <div>
            <h2 className="font-black text-[#2D3436] text-sm flex items-center gap-1.5 mb-2">
              <span>🔢</span> JUMLAH SOAL:
            </h2>

            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 15].map((count) => {
                const isSelected = settings.selectedQuestionCount === count;
                return (
                  <button
                    key={count}
                    onClick={() => handleSelectQuestionCount(count)}
                    className={`py-1.5 rounded-xl font-black text-xs border-2 border-[#2D3436] flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFE66D] text-[#2D3436] shadow-[0_3px_0_0_#2D3436] -translate-y-0.5'
                        : 'bg-slate-100 text-[#2D3436] hover:bg-slate-200'
                    }`}
                  >
                    <span className="text-base sm:text-lg">{count}</span>
                    <span className="text-[9px] uppercase font-black">Soal</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#2D3436] font-black bg-[#FFE66D]/30 p-2 rounded-xl border border-[#2D3436] mt-1">
            <span>Bank: {totalAvailableQuestions} Soal</span>
            {highScore > 0 && (
              <span className="text-[#2D3436] flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-[#FF7675]" /> Rekor: {highScore}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mascot Selection Section */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border-3 border-[#2D3436] shadow-[4px_4px_0_0_#2D3436] space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-[#2D3436] text-sm sm:text-base flex items-center gap-1.5">
            <span>🐾</span> PILIH TEMAN KARAKTERMU:
          </h2>
          <span className="text-[11px] font-black text-[#2D3436] bg-[#FFE66D] px-2.5 py-0.5 rounded-full border border-[#2D3436]">
            {selectedMascot.name}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1 sm:gap-2">
          {MASCOTS.map((m) => {
            const isSelected = m.id === selectedMascot.id;
            return (
              <motion.button
                key={m.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectMascot(m)}
                className={`flex flex-col items-center p-1 sm:p-1.5 rounded-xl border-2 border-[#2D3436] transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#FFE66D] shadow-[0_3px_0_0_#2D3436] -translate-y-0.5'
                    : 'bg-slate-50 hover:bg-[#FFE66D]/40'
                }`}
              >
                <span className="text-xl sm:text-2xl mb-0.5">{m.emoji}</span>
                <span className="font-black text-[10px] sm:text-xs text-[#2D3436] text-center truncate w-full">
                  {m.name}
                </span>

                {isSelected && (
                  <span className="absolute -top-1 -right-1 bg-[#FF7675] text-white rounded-full p-0.5 text-[8px] border border-[#2D3436]">
                    ⭐
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Top 5 Leaderboard Display */}
      <Leaderboard history={history} />

      {/* Action Button: START */}
      <div className="pt-1">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            soundFx.playClick();
            onStartQuiz();
          }}
          className="w-full bg-[#FF7675] hover:bg-[#ff5252] text-white font-black text-xl sm:text-2xl py-2.5 sm:py-3 px-6 rounded-2xl shadow-[0_5px_0_0_#D63031] border-3 border-[#2D3436] flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-1 active:shadow-none"
        >
          <Play className="w-6 h-6 fill-current text-white animate-pulse" />
          <span>MULAI KUIS! 🚀</span>
        </motion.button>
      </div>
    </div>
  );
};
