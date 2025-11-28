// src/components/StatusBar.jsx
// Bulle d'offre ambassadeur ONORA – VisionOS style

import React from "react";
import { motion } from "framer-motion";

const PLACES_LEFT = 87;
const TOTAL_PLACES = 100;

export default function StatusBar({ onWaitlistClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        max-w-5xl mx-auto
        rounded-[999px]
        bg-slate-900/65
        border border-white/12
        backdrop-blur-2xl
        shadow-[0_22px_60px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.06)_inset]
        px-4 py-2 md:px-6 md:py-3
        flex items-center gap-4
        text-[10px] md:text-[12px]
      "
    >
      {/* Bloc gauche : pack + prix + compteur */}
      <div className="flex items-center gap-3 min-w-[150px]">
        <div className="
          hidden sm:block
          w-9 h-9 rounded-full
          bg-white/8
          border border-white/20
          shadow-[0_0_18px_rgba(56,189,248,0.6)]
        " />
        <div className="space-y-0.5">
          <p className="text-[9px] md:text-[10px] tracking-[0.18em] uppercase text-gray-200/80">
            Pack lancement Onora
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-[11px] text-red-400 line-through">
              2000€
            </span>
            <span className="text-base md:text-lg font-semibold text-emerald-400">
              200€
            </span>
          </div>
          <p className="text-[10px] text-gray-300/85">
            {PLACES_LEFT} / {TOTAL_PLACES} places
          </p>
        </div>
      </div>

      {/* Bloc centre : bénéfices pack */}
      <div className="flex-1 overflow-hidden">
        <p className="whitespace-nowrap text-[9px] md:text-[11px] text-slate-50/90">
          Site optimisé référencement naturel · Audit notoriété web ·
          Automatisation de tes leads · accompagnement complet ONORA
        </p>
      </div>

      {/* Bloc droite : badge + CTA */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="hidden sm:flex items-center gap-2 text-[9px] md:text-[10px] text-emerald-300/90">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)] animate-pulse" />
          <span>Offre ambassadeur</span>
        </div>
        <button
          type="button"
          onClick={onWaitlistClick}
          className="
            px-4 md:px-5 py-2
            rounded-full
            bg-white
            text-slate-900
            text-[10px] md:text-[11px] font-semibold
            shadow-[0_16px_40px_rgba(0,0,0,0.75)]
            hover:bg-slate-100
            active:scale-[0.98]
            transition-all duration-150
          "
        >
          Découvrir l’offre
        </button>
      </div>
    </motion.div>
  );
}