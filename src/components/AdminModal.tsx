import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Question } from '../types';
import { X, RotateCcw } from 'lucide-react';

interface AdminModalProps {
  questions: Question[];
  onResetQuestions: () => Promise<void>; // Used as Sync from Google Sheet
  onClose: () => void;
  generalTimer: number;
  onUpdateGeneralTimer: (seconds: number) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  questions,
  onResetQuestions,
  onClose,
  generalTimer,
  onUpdateGeneralTimer,
}) => {
  const [questionList, setQuestionList] = useState<Question[]>(questions);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [generalTimerVal, setGeneralTimerVal] = useState<number>(generalTimer);

  const handleSync = async () => {
    if (confirm('Apakah Anda yakin ingin menyinkronkan ulang data soal dari Google Sheets?')) {
      setIsSyncing(true);
      try {
        await onResetQuestions();
        alert('Sinkronisasi Google Sheets berhasil!');
        onClose();
      } catch (e) {
        alert('Sinkronisasi gagal, silakan periksa koneksi internet Anda.');
      } finally {
        setIsSyncing(false);
      }
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
              <p className="text-xs text-[#2D3436]/70 font-bold">Sinkronisasi data soal dari Google Sheets</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-[#FF7675] hover:bg-[#ff5252] text-white rounded-2xl border-3 border-[#2D3436] shadow-[0_3px_0_0_#2D3436] cursor-pointer active:translate-y-0.5 active:shadow-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Box */}
        <div className="my-3 p-3 bg-blue-50 border-2 border-blue-200 rounded-2xl text-xs sm:text-sm font-semibold text-blue-900">
          💡 <strong>Catatan:</strong> Penambahan, pengeditan, atau penghapusan soal kini sepenuhnya dilakukan melalui **Google Sheets**. Tekan tombol sinkronisasi di bawah untuk memuat perubahan terbaru dari cloud.
        </div>

        {/* General Settings */}
        <div className="bg-[#FFE66D]/20 p-3 rounded-2xl border-3 border-[#2D3436] flex items-center justify-between gap-3 text-xs sm:text-sm shadow-[0_3px_0_0_#2D3436] mb-3">
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

        {/* Sync Controls & Stats */}
        <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-3">
          <span>Total: {questionList.length} Soal Terdaftar</span>
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer font-black"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} /> 
            {isSyncing ? 'Menyinkronkan...' : '🔄 Sinkronkan Google Sheet'}
          </button>
        </div>

        {/* Tab Content (Question List) */}
        <div className="flex-1 overflow-y-auto pr-1 my-2 space-y-3">
          {questionList.map((q, idx) => (
            <div
              key={q.id || idx}
              className="p-3.5 bg-slate-50 rounded-2xl border-3 border-[#2D3436] flex items-center justify-between gap-3 text-xs sm:text-sm shadow-[0_3px_0_0_#2D3436]"
            >
              <div className="space-y-1 w-full">
                <div className="flex items-center gap-2 w-full flex-wrap">
                  <span className="font-black text-[#2D3436]">#{idx + 1}</span>
                  <span className="bg-[#FFE66D] text-[#2D3436] font-black px-2 py-0.5 rounded border border-[#2D3436] text-[10px] uppercase">
                    {q.category}
                  </span>
                  <span className="font-black text-[#2D3436] text-xs max-w-md truncate">
                    {q.title || ''}
                  </span>
                </div>

                <div className="text-[#2D3436]/80 font-bold flex items-center gap-2 flex-wrap">
                  <span>Visual: {q.visualItem}</span>
                  {q.optionsText ? (
                    <>
                      <span>•</span>
                      <span>Opsi: {q.optionsText.join(' | ')}</span>
                      <span>•</span>
                      <span>Kunci: <strong className="text-[#4ECDC4] font-black">{q.correctAnswer}</strong></span>
                    </>
                  ) : (
                    <>
                      <span>•</span>
                      <span>
                        {q.operandA} {q.operator} {q.operandB || ''} ={' '}
                        <strong className="text-[#4ECDC4] font-black">{q.correctAnswer}</strong>
                      </span>
                    </>
                  )}
                  <span>•</span>
                  <span>⏱️ {q.timerSeconds}s</span>
                </div>
              </div>
            </div>
          ))}
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
