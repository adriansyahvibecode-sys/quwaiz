import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Mascot, QuizResult } from '../types';
import { MascotWidget } from './MascotWidget';
import { Leaderboard } from './Leaderboard';
import { soundFx } from '../utils/sound';
import { RotateCcw, Award, Home, CheckCircle2, XCircle, Zap, Trophy } from 'lucide-react';

interface ResultScreenProps {
  result: QuizResult;
  mascot: Mascot;
  onPlayAgain: () => void;
  onBackToHome: () => void;
  onOpenCertificate: () => void;
  history?: QuizResult[];
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  mascot,
  onPlayAgain,
  onBackToHome,
  onOpenCertificate,
  history = [],
}) => {
  useEffect(() => {
    soundFx.playVictory();

    // Standard celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'],
      });

      // Extra festive cannons for NEW HIGH SCORE!
      if (result.isNewRecord) {
        const duration = 2500;
        const animationEnd = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#FF7675', '#FFE66D', '#4ECDC4', '#A29BFE'],
          });
          confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#FF7675', '#FFE66D', '#4ECDC4', '#A29BFE'],
          });

          if (Date.now() < animationEnd) {
            requestAnimationFrame(frame);
          }
        };
        frame();
      } else {
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
      }
    } catch {
      // Confetti fallback
    }

    // Speak victory message
    const speechMsg = result.isNewRecord
      ? `Luar biasa! Rekor skor baru dicapai oleh ${result.playerName || 'kamu'}! ${result.totalScore} poin!`
      : result.score >= 80
      ? `Hore! Nilaimu ${result.score}! Kamu pintar luar biasa!`
      : `Hebat! Nilaimu ${result.score}! Ayo tetap semangat latihan ya!`;

    soundFx.speakText(speechMsg);
  }, [result]);

  // Mascot speech text based on score
  const mascotMessage = result.isNewRecord
    ? `🎉 REKOR SKOR BARU! Kamu mencetak ${result.totalScore} PTS! Luar biasa jenius! 🏆✨`
    : result.score === 100
    ? 'SEMPURNA!! Kamu benar-benar Juara Matematika Sejati! 🏆✨'
    : result.score >= 80
    ? 'LUAR BIASA! Jawabanmu banyak yang betul! Keren banget! 🌟'
    : result.score >= 50
    ? 'BAGUS SEKALI! Hasil yang menyenangkan, yuk latihan lagi biar dapet 100! 🎉'
    : 'TETAP SEMANGAT! Belajar itu asyik, mari coba lagi bersama! 💪';

  const totalSpeedBonus = result.answers.reduce((acc, ans) => {
    if (!ans.isCorrect) return acc;
    const speedBonus = Math.max(0, Math.round(100 - ans.timeSpentSeconds * 5));
    return acc + speedBonus;
  }, 0);

  return (
    <div className="w-full max-w-3xl mx-auto p-2 sm:p-3 my-0 space-y-3">
      {/* NEW RECORD FESTIVE BANNER */}
      {result.isNewRecord && (
        <motion.div
          initial={{ scale: 0.8, y: -20, opacity: 0 }}
          animate={{ scale: [1, 1.03, 1], y: 0, opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="bg-gradient-to-r from-[#FF7675] via-[#FFE66D] to-[#4ECDC4] text-[#2D3436] font-black text-sm sm:text-lg p-3 rounded-2xl border-4 border-[#2D3436] shadow-[0_5px_0_0_#2D3436] flex items-center justify-center gap-2 tracking-wide uppercase select-none shadow-amber-300/50"
        >
          <Trophy className="w-6 h-6 text-[#2D3436] animate-bounce" />
          <span>🎉 SKOR REKOR TERBARU DICAPAI! 🎉</span>
          <Trophy className="w-6 h-6 text-[#2D3436] animate-bounce" />
        </motion.div>
      )}

      {/* Top Banner Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-3 sm:p-4 border-3 border-[#2D3436] shadow-[6px_6px_0_0_#FFE66D] text-center space-y-2 text-[#2D3436]"
      >
        <div className="inline-block bg-[#FFE66D] text-[#2D3436] font-black text-xs px-3 py-1 rounded-full uppercase border-2 border-[#2D3436] shadow-[0_2px_0_0_#2D3436]">
          HASIL KUIS MATEMATIKA & CODING
        </div>

        {/* Mascot Reaction Widget */}
        <MascotWidget
          mascot={mascot}
          speechText={mascotMessage}
          reactionState={result.score >= 80 || result.isNewRecord ? 'cheering' : 'happy'}
          size="sm"
        />

        {/* Dual Score Displays: Percentage (/100) & Calculated Score (PTS) */}
        <div className="my-2 py-3 px-2 bg-[#FFE66D]/20 rounded-2xl border-2 border-[#2D3436] shadow-[2px_2px_0_0_#2D3436] flex flex-col sm:flex-row items-center justify-around gap-3">
          {/* Percentage Score (/100) */}
          <div className="text-center">
            <p className="text-[10px] font-black text-[#2D3436]/70 uppercase tracking-widest mb-0.5">
              NILAI PERSENTASE
            </p>
            <div className="text-3xl sm:text-4xl font-black text-[#2D3436] tracking-tight">
              {result.score}
              <span className="text-lg sm:text-xl font-black text-[#FF7675]"> / 100</span>
            </div>
            <p className="text-[10px] font-bold text-[#2D3436]/80 mt-0.5">
              {result.correctCount} Benar • {result.wrongCount} Salah
            </p>
          </div>

          <div className="hidden sm:block w-0.5 h-12 bg-[#2D3436]/20"></div>

          {/* Total Accumulated Score (PTS) */}
          <div className="text-center">
            <p className="text-[10px] font-black text-[#2D3436]/70 uppercase tracking-widest mb-0.5 flex items-center justify-center gap-1">
              <span>TOTAL SKOR KELAJUAN</span> <Zap className="w-3 h-3 text-amber-500 fill-amber-400" />
            </p>
            <div className="text-3xl sm:text-4xl font-black text-[#4ECDC4] tracking-tight drop-shadow-[1px_1px_0_#2D3436]">
              {(result.totalScore || result.score * 10).toLocaleString()}{' '}
              <span className="text-xs sm:text-sm font-black text-[#2D3436]">PTS</span>
            </div>
            <p className="text-[10px] font-bold text-amber-600 mt-0.5">
              ⚡ Bonus Kecepatan: +{totalSpeedBonus} PTS
            </p>
          </div>
        </div>

        {/* Star Rating Display */}
        <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl">
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

      {/* TOP 5 LEADERBOARD */}
      <Leaderboard history={history} currentResultId={result.completedAt} />

      {/* Review Answers Grid */}
      <div className="bg-white rounded-[28px] p-4 sm:p-5 border-4 border-[#2D3436] shadow-[6px_6px_0_0_#2D3436] space-y-3">
        <h3 className="font-black text-[#2D3436] text-sm sm:text-base flex items-center gap-2">
          <span>📋</span> REKAPAN DETAIL JAWABAN & KECEPATAN:
        </h3>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {result.answers.map((ans, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border-3 border-[#2D3436] flex items-center justify-between gap-3 text-xs sm:text-sm font-black ${
                ans.isCorrect
                  ? 'bg-[#4ECDC4]/15 text-[#2D3436]'
                  : 'bg-[#FF7675]/15 text-[#2D3436]'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-black text-[#2D3436] w-5 text-xs">#{idx + 1}</span>
                <span className="truncate max-w-xs">{ans.question.title || `${ans.question.operandA} ${ans.question.operator} ${ans.question.operandB || ''}`}</span>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 text-right">
                <div className="text-right">
                  <span className="block text-[11px]">
                    Jawaban: <strong className="font-black">{ans.userAnswer !== null ? ans.userAnswer : 'Habis'}</strong>
                  </span>
                  <span className="block text-[10px] text-[#2D3436]/70">
                    ⏱️ {ans.timeSpentSeconds}s • {ans.isCorrect ? `+${ans.pointsEarned || 100} PTS` : '0 PTS'}
                  </span>
                </div>

                {ans.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-[#4ECDC4] shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-[#FF7675] shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
