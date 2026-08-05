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
  defaultTimerSeconds?: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onTimeOut,
  disabled = false,
  defaultTimerSeconds,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(
    defaultTimerSeconds !== undefined ? defaultTimerSeconds : (question.timerSeconds || 20)
  );
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    setTimeLeft(defaultTimerSeconds !== undefined ? defaultTimerSeconds : (question.timerSeconds || 20));

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
  }, [question, disabled, onTimeOut, defaultTimerSeconds]);

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

  const maxTime = defaultTimerSeconds !== undefined ? defaultTimerSeconds : (question.timerSeconds || 20);
  const progressPct = Math.max(0, (timeLeft / maxTime) * 100);
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
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl border-3 border-[#2D3436] shadow-[6px_6px_0_0_#54A0FF] p-3 sm:p-4 text-[#2D3436] relative">
      {/* Floating Circular Countdown Timer */}
      <div className="absolute -top-7 -right-3 sm:-right-4 md:-right-24 md:top-2 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white rounded-full border-3 border-[#2D3436] shadow-[3px_3px_0_0_#2D3436] z-30 select-none">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            className="stroke-slate-100 fill-white"
            strokeWidth="10"
          />
          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            className="fill-none transition-all duration-1000 ease-linear"
            style={{
              stroke: timeLeft <= 5 ? '#FF7675' : '#4ECDC4',
            }}
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 40}
            strokeDashoffset={2 * Math.PI * 40 * (1 - timeLeft / maxTime)}
            strokeLinecap="round"
          />
        </svg>
        {/* Seconds text in the center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-black text-base sm:text-lg md:text-xl leading-none ${timeLeft <= 5 ? 'text-[#FF7675] animate-pulse' : 'text-[#2D3436]'}`}>
            {timeLeft}
          </span>
          <span className="text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase text-[#2D3436]/60 leading-none mt-0.5">Detik</span>
        </div>
      </div>

      {/* Top Header Row: Question Counter & Category */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2 pb-2 border-b-2 border-[#2D3436]/20">
        <div className="flex items-center gap-2">
          <span className="bg-[#FFE66D] text-[#2D3436] font-black text-xs sm:text-sm px-3 py-0.5 rounded-full border border-[#2D3436] shadow-[0_2px_0_0_#2D3436]">
            Soal {questionNumber} / {totalQuestions}
          </span>
          <span className="bg-[#4ECDC4] text-white font-black text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase border border-[#2D3436] flex items-center gap-1">
            <span className="text-xs sm:text-sm animate-pulse">{question.visualItem}</span>
            <span>{question.category.replace('_', ' ')}</span>
          </span>
        </div>
      </div>

      {/* Title / Story Prompt */}
      {question.title && (
        <h2 className="text-base sm:text-xl font-black text-center text-[#2D3436] mb-3 px-2 leading-tight">
          {question.title}
        </h2>
      )}

      {/* Main Concrete Math Visual Area */}
      <div className={`my-2 p-3 sm:p-4 rounded-2xl border-2 border-[#2D3436] flex flex-col items-center justify-center gap-3 ${
        question.optionsText ? 'bg-[#FF7675]' : 'bg-[#FFE66D]/20'
      }`}>
        {/* Math Visual Expression or Coding Multiple Choice */}
        {question.optionsText ? (
          <div className="flex flex-col gap-3 w-full max-w-xl mx-auto">
            {/* List of Options */}
            <div className="space-y-2.5">
              {question.optionsText.map((optText, optIdx) => {
                const optNumber = optIdx + 1;
                return (
                  <motion.div
                    key={optIdx}
                    whileHover={{ scale: 1.01 }}
                    className="p-2 sm:p-2.5 bg-white hover:bg-[#FFE66D]/10 rounded-xl border-2 border-[#2D3436] flex items-center gap-3 shadow-[2px_2px_0_0_#2D3436] text-left transition-colors"
                  >
                    <span className="w-9 h-9 rounded-full bg-[#FFE66D] border-2 border-[#2D3436] font-black text-[#2D3436] flex items-center justify-center text-base shrink-0">
                      {optNumber}
                    </span>
                    <span className="font-bold text-sm sm:text-base md:text-lg text-[#2D3436]">
                      {optText}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : question.operator === '+' || question.operator === '-' ? (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 w-full">
            {/* Group A */}
            <div className="flex flex-col items-center gap-1">
              {renderItemEmojis(question.operandA, question.visualItem, 'bg-white')}
            </div>

            {/* Operator Sign */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ 
                scale: [1, 1.15, 1.15, 1, 1],
                rotate: [0, 8, -8, 8, -8, 0] 
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: 0.8
              }}
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
