import React, { useState } from 'react';
import { Mascot } from '../types';
import { soundFx } from '../utils/sound';
import { Volume2, VolumeX, Maximize, Tv, Sparkles, Settings } from 'lucide-react';

interface HeaderProps {
  mascot: Mascot;
  soundEnabled: boolean;
  speechEnabled: boolean;
  onToggleSound: () => void;
  onToggleSpeech: () => void;
  onOpenAdmin: () => void;
  onOpenTvGuide?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mascot,
  soundEnabled,
  speechEnabled,
  onToggleSound,
  onToggleSpeech,
  onOpenAdmin,
}) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <header className="w-full max-w-5xl mx-auto my-1 px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-3 bg-[#FF7675] border-3 border-[#2D3436] rounded-2xl shadow-[0_4px_0_0_#D63031] text-[#2D3436] z-20">
      {/* Brand Logo & Mascot Indicator */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#2D3436] font-black text-xl border-2 border-[#2D3436] shadow-[0_2px_0_0_#2D3436] select-none shrink-0">
          {mascot.emoji}
        </div>
        <div>
          <span className="font-black text-white text-sm sm:text-lg tracking-tight leading-tight block uppercase">
            QUAIZ
          </span>
          <span className="text-[11px] sm:text-xs text-[#FFE66D] font-black flex items-center gap-1 uppercase">
            <Sparkles className="w-3 h-3 text-[#FFE66D]" /> {mascot.name}
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2">
        {/* Sound Toggle */}
        <button
          onClick={() => {
            soundFx.playClick();
            onToggleSound();
          }}
          title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          className={`p-2.5 rounded-2xl border-3 border-[#2D3436] font-black transition-all cursor-pointer shadow-[0_4px_0_0_#2D3436] active:translate-y-1 active:shadow-none ${
            soundEnabled
              ? 'bg-[#FFE66D] text-[#2D3436]'
              : 'bg-white/80 text-[#2D3436]/60'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>

        {/* Speech Reading Toggle */}
        <button
          onClick={() => {
            soundFx.playClick();
            onToggleSpeech();
          }}
          title={speechEnabled ? 'Suara Pembaca Soal Aktif' : 'Suara Pembaca Soal Mati'}
          className={`px-3 py-2 rounded-2xl border-3 border-[#2D3436] font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_4px_0_0_#2D3436] active:translate-y-1 active:shadow-none ${
            speechEnabled
              ? 'bg-[#4ECDC4] text-white'
              : 'bg-white/80 text-[#2D3436]/60'
          }`}
        >
          <span className="text-sm">🗣️</span>
          <span className="hidden sm:inline uppercase">{speechEnabled ? 'Suara Soal' : 'Mute Soal'}</span>
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          title="Layar Penuh TV / Computer"
          className="p-2.5 bg-[#54A0FF] text-white hover:bg-[#2e86de] border-3 border-[#2D3436] rounded-2xl font-black cursor-pointer hidden sm:flex items-center justify-center shadow-[0_4px_0_0_#2D3436] active:translate-y-1 active:shadow-none transition-all"
        >
          <Maximize className="w-5 h-5" />
        </button>

        {/* Settings / Admin Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenAdmin();
          }}
          title="Pengaturan & Bank Soal"
          className="p-2.5 bg-[#A29BFE] text-white hover:bg-[#6c5ce7] border-3 border-[#2D3436] rounded-2xl font-black cursor-pointer shadow-[0_4px_0_0_#2D3436] active:translate-y-1 active:shadow-none transition-all"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
