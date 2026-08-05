import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mascot, QuizResult } from '../types';
import { X, Printer, Award, Sparkles } from 'lucide-react';

interface CertificateModalProps {
  result: QuizResult;
  mascot: Mascot;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  result,
  mascot,
  onClose,
}) => {
  const [playerName, setPlayerName] = useState<string>(result.playerName || 'Adik Pintar');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-[36px] max-w-2xl w-full border-6 border-[#2D3436] shadow-[10px_10px_0_0_#FFE66D] p-6 relative print:border-4 print:p-8 print:shadow-none print:max-w-none text-[#2D3436]"
      >
        {/* Close Button (Hidden on Print) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#FF7675] hover:bg-[#ff5252] text-white p-2 rounded-2xl border-3 border-[#2D3436] shadow-[0_3px_0_0_#2D3436] cursor-pointer print:hidden active:translate-y-0.5 active:shadow-none"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Certificate Decorative Border Frame */}
        <div className="border-4 border-dashed border-[#2D3436] rounded-2xl p-6 text-center space-y-4 bg-[#FFE66D]/20">
          {/* Header Badge */}
          <div className="flex justify-center items-center gap-2">
            <Award className="w-10 h-10 text-[#FF7675]" />
            <span className="font-black text-[#2D3436] text-xl sm:text-2xl tracking-wider uppercase">
              SERTIFIKAT KELULUSAN
            </span>
            <Award className="w-10 h-10 text-[#FF7675]" />
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#2D3436] tracking-tight uppercase">
            🌟 BINTANG MATEMATIKA CERIA 🌟
          </h1>

          <p className="text-[#2D3436] font-black text-sm sm:text-base">
            Sertifikat ini dengan bangga diberikan kepada:
          </p>

          {/* Editable Name Field for Printing */}
          <div className="my-3 print:my-4">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="text-center text-2xl sm:text-4xl font-black text-[#2D3436] border-b-4 border-[#2D3436] focus:outline-none focus:border-[#FF7675] bg-transparent w-full max-w-md mx-auto print:border-none print:font-black"
              placeholder="Masukkan Namamu"
            />
            <p className="text-[10px] text-[#2D3436]/70 mt-1 font-bold print:hidden">
              (Klik nama di atas untuk mengubah nama pada sertifikat)
            </p>
          </div>

          <p className="text-[#2D3436] font-black text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Atas keberhasilannya menyelesaikan Kuis Matematika Anak Ceria dengan Skor Tinggi{' '}
            <span className="text-[#4ECDC4] font-black text-xl">{result.score} / 100</span> bersama{' '}
            <span className="text-[#FF7675] font-black">{mascot.name}</span>!
          </p>

          {/* Stars & Mascot Emoji */}
          <div className="flex items-center justify-center gap-3 my-4 py-3 bg-[#FFE66D] rounded-2xl border-3 border-[#2D3436] shadow-[3px_3px_0_0_#2D3436]">
            <span className="text-5xl">{mascot.emoji}</span>
            <div className="flex text-3xl">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className={i < result.stars ? 'text-white drop-shadow-[0_2px_0_#2D3436]' : 'text-[#2D3436]/30'}>
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Date & Sign Footer */}
          <div className="flex justify-between items-end pt-4 border-t-3 border-[#2D3436] text-xs text-[#2D3436] font-black">
            <div className="text-left">
              <p>Tanggal: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="text-[#FF7675]">Kategori: {result.answers[0]?.question.category || 'Matematika TK'}</p>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 justify-end text-[#2D3436] font-black text-sm">
                <Sparkles className="w-4 h-4 text-[#FF7675]" /> {mascot.name}
              </div>
              <p className="text-[10px] text-[#2D3436]/70">Kuis Matematika Anak Ceria</p>
            </div>
          </div>
        </div>

        {/* Action Buttons (Print & Close) */}
        <div className="mt-5 flex items-center justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl border-3 border-[#2D3436] text-[#2D3436] font-black hover:bg-slate-100 cursor-pointer text-sm shadow-[0_3px_0_0_#2D3436] active:translate-y-0.5 active:shadow-none transition-all"
          >
            Tutup
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-2xl bg-[#FFE66D] hover:bg-[#fed330] text-[#2D3436] font-black flex items-center gap-2 border-3 border-[#2D3436] shadow-[0_4px_0_0_#2D3436] cursor-pointer text-sm active:translate-y-0.5 active:shadow-none transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Sertifikat 🖨️</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
