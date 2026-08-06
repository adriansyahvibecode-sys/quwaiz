import React from 'react';
import { motion } from 'motion/react';
import { QuizResult } from '../types';
import { Trophy, Medal, Star } from 'lucide-react';

interface LeaderboardProps {
  history: QuizResult[];
  currentResultId?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ history, currentResultId }) => {
  // Sort history by totalScore descending, fallback to percentage score
  const topScores = [...history]
    .sort((a, b) => (b.totalScore || b.score * 10) - (a.totalScore || a.score * 10))
    .slice(0, 5);

  const getRankBadge = (index: number) => {
    if (index === 0) return { label: '#1 🥇', bg: 'bg-[#FFE66D]', text: 'text-[#2D3436]' };
    if (index === 1) return { label: '#2 🥈', bg: 'bg-slate-200', text: 'text-slate-800' };
    if (index === 2) return { label: '#3 🥉', bg: 'bg-amber-600', text: 'text-white' };
    return { label: `#${index + 1}`, bg: 'bg-slate-100', text: 'text-slate-700' };
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border-4 border-[#2D3436] shadow-[6px_6px_0_0_#FFE66D] space-y-3 text-[#2D3436]">
      <div className="flex items-center justify-between border-b-2 border-[#2D3436]/20 pb-2">
        <h3 className="font-black text-sm sm:text-base text-[#2D3436] flex items-center gap-2 uppercase tracking-wide">
          <Trophy className="w-5 h-5 text-[#FFE66D] fill-[#FFE66D] stroke-[#2D3436]" />
          <span>PAPAN SKOR TERATAS (TOP 5)</span>
        </h3>
        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#4ECDC4] text-white border border-[#2D3436]">
          REKOR TERBAIK
        </span>
      </div>

      {topScores.length === 0 ? (
        <div className="text-center py-4 text-xs font-bold text-slate-400">
          Belum ada rekor tersimpan. Ayo mainkan kuis pertama kamu! 🚀
        </div>
      ) : (
        <div className="space-y-2">
          {topScores.map((item, idx) => {
            const rank = getRankBadge(idx);
            const isCurrent = currentResultId && item.completedAt === currentResultId;
            const dateFormatted = new Date(item.completedAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <motion.div
                key={item.completedAt || idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`p-2.5 sm:p-3 rounded-2xl border-3 border-[#2D3436] flex items-center justify-between gap-2 text-xs sm:text-sm font-black transition-all ${
                  isCurrent
                    ? 'bg-[#FFE66D] shadow-[0_3px_0_0_#2D3436] scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 shadow-[0_2px_0_0_#2D3436]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-9 h-7 rounded-xl flex items-center justify-center font-black text-xs border border-[#2D3436] ${rank.bg} ${rank.text} shrink-0`}
                  >
                    {rank.label}
                  </span>
                  <div className="min-w-0">
                    <span className="font-black text-[#2D3436] uppercase truncate block">
                      {item.playerName || 'MYESHA'}
                    </span>
                    <span className="text-[10px] font-semibold text-[#2D3436]/60 block">
                      {dateFormatted}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-right">
                  <div>
                    <span className="text-xs sm:text-sm font-black text-[#2D3436] block">
                      {item.totalScore !== undefined ? `${item.totalScore.toLocaleString()} PTS` : `${item.score * 10} PTS`}
                    </span>
                    <span className="text-[10px] font-black text-[#4ECDC4] block">
                      {item.score}/100 Poin ({item.correctCount}/{item.totalQuestions})
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
