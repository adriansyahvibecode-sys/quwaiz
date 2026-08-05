import React from 'react';
import { motion } from 'motion/react';
import { Mascot } from '../types';

interface MascotWidgetProps {
  mascot: Mascot;
  speechText?: string;
  reactionState?: 'idle' | 'happy' | 'thinking' | 'cheering' | 'sad';
  size?: 'sm' | 'md' | 'lg';
  showSpeechBubble?: boolean;
}

export const MascotWidget: React.FC<MascotWidgetProps> = ({
  mascot,
  speechText,
  reactionState = 'idle',
  size = 'md',
  showSpeechBubble = true,
}) => {
  const sizeClasses = {
    sm: 'text-3xl w-12 h-12',
    md: 'text-4xl sm:text-5xl w-14 h-14 sm:w-16 sm:h-16',
    lg: 'text-5xl sm:text-6xl w-18 h-18 sm:w-20 sm:h-20',
  };

  const currentSpeech = speechText || mascot.greeting;

  // Animation variants depending on reaction state
  const mascotVariants = {
    idle: {
      y: [0, -6, 0],
      rotate: [0, 2, -2, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
    happy: {
      scale: [1, 1.25, 1],
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.6, repeat: 2 },
    },
    cheering: {
      y: [0, -20, 0],
      rotate: [0, -15, 15, -15, 0],
      scale: [1, 1.3, 1],
      transition: { duration: 0.8, repeat: 3 },
    },
    thinking: {
      rotate: [-5, 5, -5],
      transition: { duration: 1.5, repeat: Infinity },
    },
    sad: {
      y: [0, 8, 0],
      scale: [1, 0.9, 1],
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-3 relative z-10">
      {/* Mascot Emoji Frame */}
      <motion.div
        variants={mascotVariants}
        animate={reactionState}
        className={`flex items-center justify-center rounded-full bg-[#FFE66D] border-4 border-[#2D3436] shadow-[4px_4px_0_0_#2D3436] p-2 select-none cursor-pointer transform hover:scale-110 transition-transform ${sizeClasses[size]}`}
      >
        <span role="img" aria-label={mascot.name}>
          {mascot.emoji}
        </span>
      </motion.div>

      {/* Speech Bubble */}
      {showSpeechBubble && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative max-w-xs md:max-w-md p-2.5 sm:p-3 rounded-2xl bg-white border-3 border-[#2D3436] shadow-[4px_4px_0_0_#2D3436] text-center md:text-left font-black text-xs sm:text-sm leading-tight text-[#2D3436]"
        >
          {/* Bubble Triangle Pointer */}
          <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-[#2D3436]" />
          <div className="md:hidden absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-[#2D3436]" />

          <p className="text-[#2D3436] font-extrabold">{currentSpeech}</p>
        </motion.div>
      )}
    </div>
  );
};
