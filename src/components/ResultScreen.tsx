import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Mascot, QuizResult } from '../types';
import { MascotWidget } from './MascotWidget';
import { soundFx } from '../utils/sound';
import { RotateCcw, Award, Home, CheckCircle2, XCircle } from 'lucide-react';

interface ResultScreenProps {
  result: QuizResult;
  mascot: Mascot;
  onPlayAgain: () => void;
  onBackToHome: () => void;
  onOpenCertificate: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  mascot,
  onPlayAgain,
  onBackToHome,
  onOpenCertificate,
}) => {
  useEffect(() => {
    // Fire celebratory confetti!
    soundFx.playVictory();

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 400);
    } catch {
      // Confetti fallback
    }

    // Speak victory message
    const speechMsg =
      result.score >= 80
        ? `Hore! Nilaimu ${result.score}! Kamu pintar luar biasa!`
        : `Hebat! Nilaimu ${result.score}! Ayo tetap semangat latihan ya!`;

    soundFx.speakText(speechMsg);
  }, [result.score]);

  // Mascot speech text based on score
  const mascotMessage =
    result.score === 100
      ? 'SEMPURNA!! Kamu benar-benar Juara Matematika Sejati! 🏆✨'
      : result.score >= 80
      ? 'LUAR BIASA! Jawabanmu banyak yang betul! Keren banget! 🌟'
      : result.score >= 50
      ? 'BAGUS SEKALI! Hasil yang menyenangkan, yuk latihan lagi biar dapet 100! 🎉'
      : 'TETAP SEMANGAT! Belajar itu asyik, mari coba lagi bersama! 💪';

  return (
    <div className="w-full max-w-3xl mx-auto p-2 sm:p-3 my-0 space-y-3">
      {/* Top Banner Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-3 sm:p-4 border-3 border-[#2D3436] shadow-[6px_6px_0_0_#FFE66D] text-center space-y-2 text-[#2D3436]"
      >
        <div className="inline-block bg-[#FFE66D] text-[#2D3436] font-black text-xs px-3 py-1 rounded-full uppercase border-2 border-[#2D3436] shadow-[0_2px_0_0_#2D3436]">
          HASIL KUIS MATEMATIKA
        </div>

        {/* Mascot MascotWidget Reaction */}
        <MascotWidget
          mascot={mascot}
          speechText={mascotMessage}
          reactionState={result.score >= 80 ? 'cheering' : 'happy'}
          size="sm"
        />

        {/* Big Score Display & Stars */}
        <div className="my-2 py-2.5 bg-[#FFE66D]/20 rounded-xl border-2 border-[#2D3436] shadow-[2px_2px_0_0_#2D3436]">
          <p className="text-[10px] font-black text-[#2D3436] uppercase tracking-widest mb-0.5">
            SKOR AKHIR KAMU
          </p>
          <div className="text-3xl sm:text-5xl font-black text-[#2D3436] tracking-tight">
            {result.score}
            <span className="text-lg sm:text-2xl font-black text-[#FF7675]"> / 100</span>
          </div>

          {/* Star Rating Display */}
          <div className="flex items-center justify-center gap-1.5 mt-1 text-2xl sm:text-3xl">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3 + i * 0.2, type: 'spring' }}
                className={i < result.stars ? 'text-[#FFE66D] drop-shadow-[0_2px_0_#2D3436]' : 'text-slate-200'}
              >
                ★
              </motion.span>
            ))}
          </div>

          <p className="text-xs font-black text-[#2D3436] mt-1">
            Benar: <span className="text-[#4ECDC4] font-black">{result.correctCount}</span> |
            Salah: <span className="text-[#FF7675] font-black">{result.wrongCount}</span> dari{' '}
            {result.totalQuestions} Soal
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              soundFx.playClick();
              onPlayAgain();
            }}
            className="w-full sm:flex-1 bg-[#4ECDC4] hover:bg-[#3dbdb4] text-white font-black text-sm py-2.5 px-4 rounded-xl border-3 border-[#2D3436] shadow-[0_4px_0_0_#2D3436] flex items-center justify-center gap-1.5 cursor-pointer transition-all active:translate-y-1 active:shadow-none"
          >
            <RotateCcw className="w-4 h-4" />
            <span>MAIN LAGI 🔄</span>
          </motion.button>

          <button
            onClick={() => {
              soundFx.playClick();
              onOpenCertificate();
            }}
            className="w-full sm:flex-1 bg-[#FFE66D] hover:bg-[#fed330] text-[#2D3436] font-black text-sm py-2.5 px-4 rounded-xl border-3 border-[#2D3436] shadow-[0_4px_0_0_#2D3436] flex items-center justify-center gap-1.5 cursor-pointer transition-all active:translate-y-1 active:shadow-none"
          >
            <Award className="w-4 h-4 text-[#2D3436]" />
            <span>SERTIFIKAT 📜</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onBackToHome();
            }}
            className="w-full sm:w-auto bg-[#FF7675] hover:bg-[#ff5252] text-white font-black text-xs py-2.5 px-4 rounded-xl border-3 border-[#2D3436] shadow-[0_4px_0_0_#D63031] flex items-center justify-center gap-1.5 cursor-pointer transition-all active:translate-y-1 active:shadow-none"
          >
            <Home className="w-4 h-4" />
            <span>MENU UTAMA</span>
          </button>
        </div>
      </motion.div>

      {/* Review Answers Grid */}
      <div className="bg-white rounded-[28px] p-5 sm:p-6 border-4 border-[#2D3436] shadow-[6px_6px_0_0_#2D3436] space-y-3">
        <h3 className="font-black text-[#2D3436] text-base sm:text-lg flex items-center gap-2">
          <span>📋</span> REKAPAN JAWABAN KAMU:
        </h3>

        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {result.answers.map((ans, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border-3 border-[#2D3436] flex items-center justify-between gap-3 text-xs sm:text-sm font-black ${
                ans.isCorrect
                  ? 'bg-[#4ECDC4]/20 text-[#2D3436]'
                  : 'bg-[#FF7675]/20 text-[#2D3436]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-black text-[#2D3436] w-6">#{idx + 1}</span>
                <span>{ans.question.title || `${ans.question.operandA} ${ans.question.operator} ${ans.question.operandB || ''}`}</span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span>
                  Jawabanmu:{' '}
                  <span className="font-black">
                    {ans.userAnswer !== null ? ans.userAnswer : 'Waktu Habis'}
                  </span>
                </span>
                {!ans.isCorrect && (
                  <span className="text-[#FF7675]">
                    (Benar: <span className="font-black">{ans.question.correctAnswer}</span>)
                  </span>
                )}

                {ans.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-[#4ECDC4]" />
                ) : (
                  <XCircle className="w-5 h-5 text-[#FF7675]" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
