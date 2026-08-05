import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types';
import { soundFx } from '../utils/sound';
import { Volume2 } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onTimeOut: () => void;
  disabled?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onTimeOut,
  disabled = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(question.timerSeconds || 20);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    setTimeLeft(question.timerSeconds || 20);

    if (disabled) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeOut();
          return 0;
        }
        // Play tick sound
        if (prev <= 5) {
          soundFx.playHurry();
        } else {
          soundFx.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [question, disabled, onTimeOut]);

  // Manual speaker button handler
  const handleSpeakQuestion = () => {
    setIsSpeaking(true);
    let speechString = question.title || '';
    if (question.operator === '+') {
      speechString = `${question.operandA} ditambah ${question.operandB} sama dengan berapa?`;
    } else if (question.operator === '-') {
      speechString = `${question.operandA} dikurangi ${question.operandB} sama dengan berapa?`;
    }
    soundFx.speakText(speechString);

    setTimeout(() => {
      setIsSpeaking(false);
    }, 2500);
  };

  const progressPct = Math.max(0, (timeLeft / (question.timerSeconds || 20)) * 100);
  const timerColorClass =
    progressPct > 50
      ? 'bg-[#4ECDC4]'
      : progressPct > 25
      ? 'bg-[#FFE66D]'
      : 'bg-[#FF7675] animate-pulse';

  // Helper to render concrete item array
  const renderItemEmojis = (count: number, itemEmoji: string, colorClass = 'bg-white') => {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-1.5 p-2 sm:p-2.5 rounded-xl border-2 border-[#2D3436] ${colorClass} shadow-[2px_2px_0_0_#2D3436]`}>
        {Array.from({ length: Math.max(0, count) }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.05, type: 'spring' }}
            className="text-2xl sm:text-3xl select-none hover:scale-125 transition-transform cursor-pointer"
          >
            {itemEmoji}
          </motion.span>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl border-3 border-[#2D3436] shadow-[6px_6px_0_0_#54A0FF] p-3 sm:p-4 text-[#2D3436] relative overflow-hidden">
      {/* Top Header Row: Question Counter & Category & Speak Button */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2 pb-2 border-b-2 border-[#2D3436]/20">
        <div className="flex items-center gap-2">
          <span className="bg-[#FFE66D] text-[#2D3436] font-black text-xs sm:text-sm px-3 py-0.5 rounded-full border border-[#2D3436] shadow-[0_2px_0_0_#2D3436]">
            Soal {questionNumber} / {totalQuestions}
          </span>
          <span className="bg-[#4ECDC4] text-white font-black text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase border border-[#2D3436]">
            {question.category.replace('_', ' ')}
          </span>
        </div>

        {/* Speak Button */}
        <button
          onClick={handleSpeakQuestion}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-black text-xs transition-all border border-[#2D3436] shadow-[0_2px_0_0_#2D3436] cursor-pointer active:translate-y-0.5 active:shadow-none ${
            isSpeaking
              ? 'bg-[#FFE66D] text-[#2D3436] scale-105'
              : 'bg-[#A29BFE] text-white hover:bg-[#6c5ce7]'
          }`}
        >
          <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-bounce' : ''}`} />
          <span>Dengarkan Soal</span>
        </button>
      </div>

      {/* Countdown Timer Bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-0.5 text-xs font-black text-[#2D3436]">
          <span className="flex items-center gap-1">⏱️ WAKTU:</span>
          <span className={timeLeft <= 5 ? 'text-[#FF7675] font-black animate-bounce text-xs' : 'text-[#2D3436]'}>
            {timeLeft} Detik
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full border-2 border-[#2D3436] p-0.5 overflow-hidden">
          <motion.div
            className={`h-full rounded-full transition-all duration-300 ${timerColorClass}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Title / Story Prompt */}
      {question.title && (
        <h2 className="text-base sm:text-xl font-black text-center text-[#2D3436] mb-3 px-2 leading-tight">
          {question.title}
        </h2>
      )}

      {/* Main Concrete Math Visual Area */}
      <div className="my-2 p-3 sm:p-4 bg-[#FFE66D]/20 rounded-2xl border-2 border-[#2D3436] flex flex-col items-center justify-center gap-3">
        {/* Math Visual Expression */}
        {question.operator === '+' || question.operator === '-' ? (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 w-full">
            {/* Group A */}
            <div className="flex flex-col items-center gap-1">
              {renderItemEmojis(question.operandA, question.visualItem, 'bg-white')}
            </div>

            {/* Operator Sign */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`text-2xl sm:text-3xl font-black text-white w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border-2 border-[#2D3436] shadow-[0_3px_0_0_#2D3436] select-none ${
                question.operator === '+' ? 'bg-[#4ECDC4]' : 'bg-[#FF7675]'
              }`}
            >
              {question.operator}
            </motion.div>

            {/* Group B */}
            <div className="flex flex-col items-center gap-1">
              {renderItemEmojis(question.operandB || 0, question.visualItem, 'bg-white')}
            </div>

            {/* Equal Sign */}
            <div className="text-2xl sm:text-3xl font-black text-white bg-[#54A0FF] w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border-2 border-[#2D3436] shadow-[0_3px_0_0_#2D3436] select-none">
              =
            </div>

            {/* Answer Placeholder Box */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-3 border-dashed border-[#FF7675] bg-white flex items-center justify-center text-3xl sm:text-4xl font-black text-[#FF7675] shadow-inner animate-pulse select-none">
                ?
              </div>
              <span className="font-black text-[10px] text-[#2D3436]">Pilih di bawah</span>
            </div>
          </div>
        ) : (
          /* Single Group Counting (e.g., Counting objects) */
          <div className="flex flex-col items-center gap-4 w-full">
            {renderItemEmojis(question.operandA, question.visualItem, 'bg-white')}
            <div className="flex items-center gap-2 font-black text-3xl text-[#2D3436]">
              <span>Jumlah = </span>
              <span className="w-16 h-16 rounded-2xl border-4 border-dashed border-[#FF7675] bg-white flex items-center justify-center text-[#FF7675] animate-pulse">
                ?
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
