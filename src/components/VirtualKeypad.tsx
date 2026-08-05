import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { soundFx } from '../utils/sound';

interface VirtualKeypadProps {
  onSelectNumber: (num: number) => void;
  disabled?: boolean;
  activeFocusIndex?: number; // 0 to 9
}

export const VirtualKeypad: React.FC<VirtualKeypadProps> = ({
  onSelectNumber,
  disabled = false,
  activeFocusIndex: externalFocusIndex,
}) => {
  // Keypad grid 0-9 layout (Row 1: 0,1,2,3,4 | Row 2: 5,6,7,8,9)
  const keypadLayout = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
  ];

  const [focusIndex, setFocusIndex] = useState<number | null>(
    externalFocusIndex !== undefined ? externalFocusIndex : null
  );

  useEffect(() => {
    if (externalFocusIndex !== undefined) {
      setFocusIndex(externalFocusIndex);
    }
  }, [externalFocusIndex]);

  // Keydown event listener for Dual Input Mode (Numpad + Arrow keys)
  useEffect(() => {
    if (disabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Direct Numpad / Digits 0-9
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        const num = parseInt(e.key, 10);
        soundFx.playClick();
        onSelectNumber(num);
        return;
      }

      // 2. Navigation Arrow Keys (ArrowLeft, ArrowRight, ArrowUp, ArrowDown)
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        soundFx.playClick();
        setFocusIndex((prev) => (prev === null ? 0 : (prev > 0 ? prev - 1 : 9)));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        soundFx.playClick();
        setFocusIndex((prev) => (prev === null ? 0 : (prev < 9 ? prev + 1 : 0)));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundFx.playClick();
        setFocusIndex((prev) => (prev === null ? 0 : (prev >= 5 ? prev - 5 : prev)));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundFx.playClick();
        setFocusIndex((prev) => (prev === null ? 0 : (prev < 5 ? prev + 5 : prev)));
      } else if (e.key === 'Enter' || e.key === ' ' || e.key === 'Select') {
        e.preventDefault();
        if (focusIndex !== null) {
          soundFx.playClick();
          onSelectNumber(focusIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, focusIndex, onSelectNumber]);

  return (
    <div className="w-full max-w-2xl mx-auto my-1 sm:my-1.5 p-2.5 sm:p-3 rounded-2xl bg-white border-3 border-[#2D3436] shadow-[4px_4px_0_0_#A29BFE]">
      {/* Keypad Title & Dual Input Helper */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-2 px-1 gap-1 text-center sm:text-left">
        <span className="font-black text-[#2D3436] text-xs sm:text-sm flex items-center gap-1.5">
          <span>⌨️</span> PILIH JAWABANMU:
        </span>
        <div className="bg-[#FFE66D] text-[#2D3436] px-2.5 py-0.5 rounded-full text-[11px] font-black flex items-center gap-1 border border-[#2D3436] shadow-[0_1px_0_0_#2D3436]">
          <span>🎮</span> Remote: <code className="bg-white px-1 py-0.5 rounded text-[#2D3436] font-black border border-[#2D3436]">Panah + Enter</code>
          <span>atau</span>
          <code className="bg-white px-1 py-0.5 rounded text-[#2D3436] font-black border border-[#2D3436]">Numpad 0-9</code>
        </div>
      </div>

      {/* Grid 0-9 Buttons */}
      <div className="space-y-1.5">
        {keypadLayout.map((row, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-5 gap-2 sm:gap-3">
            {row.map((num) => {
              const isFocused = focusIndex === num;

              return (
                <motion.button
                  key={num}
                  disabled={disabled}
                  whileHover={{ scale: disabled ? 1 : 1.05 }}
                  whileTap={{ scale: disabled ? 1 : 0.95 }}
                  onClick={() => {
                    if (disabled) return;
                    soundFx.playClick();
                    setFocusIndex(num);
                    onSelectNumber(num);
                  }}
                  className={`
                    relative flex flex-col items-center justify-center
                    h-11 sm:h-13 rounded-xl font-black text-xl sm:text-2xl transition-all border-3 border-[#2D3436] select-none cursor-pointer
                    ${
                      isFocused
                        ? 'bg-[#FFE66D] text-[#2D3436] shadow-[0_4px_0_0_#2D3436] -translate-y-0.5 z-10'
                        : 'bg-white text-[#2D3436] shadow-[0_3px_0_0_#2D3436] hover:bg-[#FFE66D]/30'
                    }
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {/* Focus Ring Indicator for Smart TV */}
                  {isFocused && (
                    <motion.div
                      layoutId="focusRing"
                      className="absolute -inset-1 rounded-xl border-3 border-[#FF7675] pointer-events-none"
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    />
                  )}

                  <span>{num}</span>

                  {/* Numpad Badge Indicator */}
                  <span
                    className={`text-[9px] font-black px-1 rounded border ${
                      isFocused ? 'bg-[#2D3436] text-white border-[#2D3436]' : 'bg-slate-100 text-[#2D3436]/60 border-slate-300'
                    }`}
                  >
                    [{num}]
                  </span>
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
