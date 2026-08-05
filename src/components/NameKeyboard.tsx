import React from 'react';
import { motion } from 'motion/react';
import { soundFx } from '../utils/sound';
import { Delete, RotateCcw, User, Sparkles } from 'lucide-react';

interface NameKeyboardProps {
  value: string;
  onChange: (newName: string) => void;
}

export function autoCapitalizeName(text: string): string {
  if (!text) return '';
  // Capitalizes the first letter of each word automatically
  return text.replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
}

export const NameKeyboard: React.FC<NameKeyboardProps> = ({ value, onChange }) => {
  const keyboardRows = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
    ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  ];

  const presets = ['MYESHA', 'HAFSHAH', 'UWAIS', 'UMMA', 'BABA'];

  const handleKeyPress = (char: string) => {
    soundFx.playClick();
    const updated = autoCapitalizeName(value + char);
    onChange(updated);
  };

  const handleBackspace = () => {
    soundFx.playClick();
    const updated = autoCapitalizeName(value.slice(0, -1));
    onChange(updated);
  };

  const handleClear = () => {
    soundFx.playClick();
    onChange('');
  };

  const handlePresetSelect = (presetName: string) => {
    soundFx.playClick();
    onChange(autoCapitalizeName(presetName));
  };

  const handleDirectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = autoCapitalizeName(raw);
    onChange(formatted);
  };

  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 border-3 border-[#2D3436] shadow-[4px_4px_0_0_#2D3436] space-y-2.5">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 border-b-2 border-[#2D3436]/15 pb-2">
        <h2 className="font-black text-[#2D3436] text-sm sm:text-base flex items-center gap-1.5">
          <User className="w-5 h-5 text-[#FF7675]" />
          <span>ISI NAMA PEMAIN:</span>
        </h2>
      </div>

      {/* Main Name Input Display */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={handleDirectInput}
          placeholder="Ketik namamu di sini..."
          className="w-full bg-[#FFE66D]/20 text-[#2D3436] font-black text-lg sm:text-xl px-4 py-2 pr-20 rounded-xl border-2 border-[#2D3436] focus:outline-none focus:border-[#4ECDC4] placeholder:text-[#2D3436]/40 placeholder:font-bold"
        />

        <div className="absolute right-2.5 flex items-center gap-1">
          {value && (
            <button
              onClick={handleClear}
              title="Bersihkan nama"
              className="p-1.5 bg-[#FF7675] hover:bg-[#ff5252] text-white rounded-lg border border-[#2D3436] shadow-[0_2px_0_0_#2D3436] active:translate-y-0.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Name Presets */}
      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
        <span className="text-[11px] font-black text-[#2D3436]/70">Pilih Cepat:</span>
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => handlePresetSelect(p)}
            className={`text-[11px] font-black px-2.5 py-1 rounded-lg border border-[#2D3436] transition-all cursor-pointer ${
              value === p
                ? 'bg-[#4ECDC4] text-white shadow-[0_2px_0_0_#2D3436] -translate-y-0.5'
                : 'bg-slate-100 text-[#2D3436] hover:bg-[#FFE66D]'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* On-Screen Visual Keyboard */}
      <div className="bg-slate-100 p-2 sm:p-2.5 rounded-xl border-2 border-[#2D3436] space-y-1.5">
        <div className="text-[11px] font-black text-[#2D3436] flex items-center justify-between mb-1">
          <span>⌨️ KEYBOARD NAMA PADA LAYAR:</span>
          <span className="text-[10px] text-[#2D3436]/60">Klik huruf di bawah</span>
        </div>

        {/* Keyboard Letter Rows */}
        {keyboardRows.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1">
            {row.map((char) => (
              <motion.button
                key={char}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleKeyPress(char)}
                className="w-6 h-8 sm:w-8 sm:h-9 bg-white text-[#2D3436] font-black text-xs sm:text-sm rounded-lg border border-[#2D3436] shadow-[0_2px_0_0_#2D3436] hover:bg-[#FFE66D] active:translate-y-0.5 active:shadow-none cursor-pointer flex items-center justify-center transition-colors"
              >
                {char}
              </motion.button>
            ))}
          </div>
        ))}

        {/* Action Row: Space & Backspace */}
        <div className="flex justify-center gap-1.5 pt-0.5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleKeyPress(' ')}
            className="flex-1 max-w-xs h-8 sm:h-9 bg-[#4ECDC4] text-white font-black text-xs sm:text-sm rounded-lg border border-[#2D3436] shadow-[0_2px_0_0_#2D3436] hover:bg-[#3dbdb4] active:translate-y-0.5 active:shadow-none cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>␣ SPASI</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackspace}
            className="px-3 h-8 sm:h-9 bg-[#FF7675] text-white font-black text-xs sm:text-sm rounded-lg border border-[#2D3436] shadow-[0_2px_0_0_#2D3436] hover:bg-[#ff5252] active:translate-y-0.5 active:shadow-none cursor-pointer flex items-center justify-center gap-1"
          >
            <Delete className="w-4 h-4" />
            <span className="hidden sm:inline">HAPUS</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
