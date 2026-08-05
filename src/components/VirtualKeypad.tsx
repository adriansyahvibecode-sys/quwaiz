import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { soundFx } from '../utils/sound';

interface VirtualKeypadProps {
  onSelectNumber: (num: number) => void;
  disabled?: boolean;
  activeFocusIndex?: number;
  allowedNumbers?: number[]; // Custom allowed keys e.g. [1, 2, 3] for MCQ
}

export const VirtualKeypad: React.FC<VirtualKeypadProps> = ({
  onSelectNumber,
  disabled = false,
  activeFocusIndex: externalFocusIndex,
  allowedNumbers,
}) => {
  // Grid layout
  const keypadLayout = allowedNumbers
    ? [allowedNumbers]
    : [
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

  // Keydown event listener for Dual Input Mode
  useEffect(() => {
    if (disabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Direct Numpad / Digits 0-9
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        const num = parseInt(e.key, 10);
        if (allowedNumbers && !allowedNumbers.includes(num)) return;
        soundFx.playClick();
        onSelectNumber(num);
        return;
      }

      // 2. Navigation Arrow Keys (ArrowLeft, ArrowRight, ArrowUp, ArrowDown)
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        soundFx.playClick();
        if (allowedNumbers) {
          setFocusIndex((prev) => {
            if (prev === null) return allowedNumbers[0];
            const idx = allowedNumbers.indexOf(prev);
            const nextIdx = idx > 0 ? idx - 1 : allowedNumbers.length - 1;
            return allowedNumbers[nextIdx];
          });
        } else {
          setFocusIndex((prev) => (prev === null ? 0 : (prev > 0 ? prev - 1 : 9)));
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        soundFx.playClick();
        if (allowedNumbers) {
          setFocusIndex((prev) => {
            if (prev === null) return allowedNumbers[0];
            const idx = allowedNumbers.indexOf(prev);
            const nextIdx = idx < allowedNumbers.length - 1 ? idx + 1 : 0;
            return allowedNumbers[nextIdx];
          });
        } else {
          setFocusIndex((prev) => (prev === null ? 0 : (prev < 9 ? prev + 1 : 0)));
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (allowedNumbers) return;
        soundFx.playClick();
        setFocusIndex((prev) => (prev === null ? 0 : (prev >= 5 ? prev - 5 : prev)));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (allowedNumbers) return;
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
  }, [disabled, focusIndex, onSelectNumber, allowedNumbers]);

  return (
    <div className="w-full max-w-2xl mx-auto my-1 sm:my-1.5 p-2.5 sm:p-3 rounded-2xl bg-white border-3 border-[#2D3436] shadow-[4px_4px_0_0_#A29BFE]">
      {/* Keypad Title */}
      <div className="flex items-center justify-center mb-2 px-1 text-center">
        <span className="font-black text-[#2D3436] text-xs sm:text-sm flex items-center justify-center">
          PILIH JAWABANMU:
        </span>
      </div>

      {/* Grid Buttons */}
      <div className="space-y-1.5">
        {keypadLayout.map((row, rowIdx) => (
          <div key={rowIdx} className={`grid gap-2 sm:gap-3 ${row.length === 3 ? 'grid-cols-3 max-w-sm mx-auto' : 'grid-cols-5'}`}>
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
                    <span className="absolute -top-1.5 -right-1.5 bg-[#FF7675] text-white rounded-full p-0.5 text-[8px] border border-[#2D3436]">
                      ⭐
                    </span>
                  )}
                  <span>{num}</span>
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
