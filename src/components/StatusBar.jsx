// src/components/StatusBar.jsx
// Top status bar sticky avec FOMO

import React from "react";
import { motion } from "framer-motion";

export default function StatusBar({ onWaitlistClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-30 h-8 md:h-10 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 md:px-6 text-[10px] md:text-xs"
    >
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        <span className="text-gray-300 font-mono tracking-wider">
          SYSTEM STATUS: ONLINE
        </span>
      </div>
      <button
        onClick={onWaitlistClick}
        className="text-red-400 md:text-orange-400 hover:text-orange-400 md:hover:text-red-400 font-mono tracking-wider cursor-pointer transition-colors duration-200"
      >
        OFFRE AMBASSADEUR : 87 PLACES RESTANTES
      </button>
    </motion.div>
  );
}

