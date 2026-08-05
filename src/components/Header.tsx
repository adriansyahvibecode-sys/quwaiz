import React, { useState } from 'react';
import { Mascot } from '../types';
import { soundFx } from '../utils/sound';
import { Volume2, VolumeX, Maximize, Tv, Sparkles, Settings, Minimize } from 'lucide-react';

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
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#2D3436] font-black text-sm sm:text-base border-2 border-[#2D3436] shadow-[0_2px_0_0_#2D3436] select-none shrink-0">
          {mascot.emoji}
        </div>
        <div>
          <span className="font-black text-white text-xs sm:text-sm tracking-tight leading-tight block uppercase">
            QUAIZ
          </span>
          <span className="text-[9px] sm:text-[10px] text-[#FFE66D] font-black flex items-center gap-0.5 uppercase">
            <Sparkles className="w-2.5 h-2.5 text-[#FFE66D]" /> {mascot.name}
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
          className={`p-2 rounded-xl border-2 border-[#2D3436] font-black transition-all cursor-pointer shadow-[0_2.5px_0_0_#2D3436] active:translate-y-0.5 active:shadow-none ${
            soundEnabled ? 'bg-[#FFE66D] text-[#2D3436]' : 'bg-white/80 text-[#2D3436]/60'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Speech Reading Toggle */}
        <button
          onClick={() => {
            soundFx.playClick();
            onToggleSpeech();
          }}
          title={speechEnabled ? 'Suara Pembaca Soal Aktif' : 'Suara Pembaca Soal Mati'}
          className={`px-2 py-1.5 rounded-xl border-2 border-[#2D3436] font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_2.5px_0_0_#2D3436] active:translate-y-0.5 active:shadow-none ${
            speechEnabled ? 'bg-[#4ECDC4] text-white' : 'bg-white/80 text-[#2D3436]/60'
          }`}
        >
          <span className="text-xs">🗣️</span>
          <span className="hidden sm:inline uppercase text-[9px]">{speechEnabled ? 'Suara Soal' : 'Mute Soal'}</span>
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          title="Layar Penuh TV / Computer"
          className="p-2 bg-[#54A0FF] text-white hover:bg-[#2e86de] border-2 border-[#2D3436] rounded-xl font-black cursor-pointer hidden sm:flex items-center justify-center shadow-[0_2.5px_0_0_#2D3436] active:translate-y-0.5 active:shadow-none transition-all"
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>

        {/* Settings / Admin Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenAdmin();
          }}
          title="Pengaturan & Bank Soal"
          className="p-2 bg-[#A29BFE] text-white hover:bg-[#6c5ce7] border-2 border-[#2D3436] rounded-xl font-black cursor-pointer shadow-[0_2.5px_0_0_#2D3436] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
