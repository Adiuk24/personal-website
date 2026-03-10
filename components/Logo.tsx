'use client';

import { motion } from 'motion/react';

export default function Logo() {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative w-9 h-9 flex items-center justify-center">
        {/* Minimalist Growth Icon */}
        <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-white/30 transition-colors duration-500" />
        
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-5 h-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized 'A' that looks like a mountain/peak */}
          <motion.path 
            d="M12 5L4 19H20L12 5Z" 
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "circOut" }}
          />
          {/* Growth Indicator - Upward Arrow inside the 'A' */}
          <motion.path 
            d="M12 15V9M12 9L10 11M12 9L14 11" 
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
        </svg>
      </div>
      
      <div className="flex flex-col -space-y-0.5">
        <span className="text-[15px] font-serif font-medium tracking-tight text-white leading-none">
          Arif Adito
        </span>
        <span className="text-[8px] uppercase tracking-[0.3em] text-[#A19E95] font-semibold leading-none mt-1">
          Growth Leader
        </span>
      </div>
    </div>
  );
}
