// src/components/AuditWidget.jsx
// Bulle d'audit concurrentiel flottante, fixée en bas à droite de l'écran

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radar } from "lucide-react";

export default function AuditWidget() {
  const [open, setOpen] = useState(true);

  // Option : léger délai avant d'afficher la bulle pour laisser respirer le hero
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.button
          onClick={() => {
            const target = document.querySelector("#waitlist");
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="
            fixed bottom-4 right-4 md:bottom-6 md:right-8 z-[60]
            flex items-center gap-3 px-4 py-3 md:px-5 md:py-3.5
            rounded-full bg-white/90 text-black
            shadow-[0_18px_45px_rgba(0,0,0,0.6)]
            border border-black/5
            hover:bg-white active:scale-[0.97]
            transition-all duration-200
          "
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-cyan-400/40 blur-md" />
            <div className="relative w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              <Radar className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xs md:text-sm font-semibold whitespace-nowrap">
            Tu es sûr d&apos;être devant tes concurrents ?
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
