// src/components/StatusBar.jsx
// Barre "Pack lancement ONORA" – fine, glass, centrée

import React from "react";
import { motion } from "framer-motion";

export default function StatusBar({ onWaitlistClick }) {
  return (
    <div className="sticky top-3 z-30 flex justify-center px-3 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          pointer-events-auto
          w-full max-w-4xl
          h-10 md:h-11
          rounded-full
          bg-white/14
          border border-white/45
          backdrop-blur-2xl
          shadow-[0_14px_35px_rgba(0,0,0,0.55)]
          flex items-center justify-between
          px-3 md:px-4 lg:px-6
          gap-3 md:gap-4
          relative
          overflow-hidden
        "
      >
        {/* lueur bleue très légère */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/24 via-cyan-300/10 to-transparent opacity-70"
        />

        {/* Bloc gauche : pastille + texte offre */}
        <div className="relative z-10 flex items-center gap-3 md:gap-3.5">
          {/* pastille animée */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="
              relative
              w-8 h-8 md:w-9 md:h-9
              rounded-full
              bg-cyan-500/18
              border border-cyan-300/70
              flex items-center justify-center
              shadow-[0_0_18px_rgba(56,189,248,0.75)]
            "
          >
            <div className="w-4 h-4 md:w-4.5 md:h-4.5 rounded-full bg-cyan-400/70 border border-white/70" />
            {/* halo orange très léger */}
            <div className="absolute inset-0 rounded-full border border-orange-400/40 opacity-70" />
          </motion.div>

          <div className="flex flex-col leading-tight">
            <span className="text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-slate-50/85">
              Pack lancement ONORA
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[10px] md:text-[11px] text-slate-200/80 line-through">
                2000€
              </span>
              <motion.span
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.35, ease: "easeOut" }}
                className="text-[11px] md:text-xs font-semibold text-emerald-300"
              >
                200€
              </motion.span>
              <span className="ml-2 text-[10px] md:text-[11px] text-slate-100/75">
                87 / 100 places
              </span>
            </div>
          </div>
        </div>

        {/* Texte central très court, optionnel mais lisible */}
        <div className="relative z-10 flex-1 hidden sm:flex items-center justify-center px-2">
          <p className="text-[10px] md:text-[11px] text-slate-50/80 text-center truncate">
            Site optimisé, audit notoriété web et automatisation de tes leads à 200€ pour les 100 premiers.
          </p>
        </div>

        {/* CTA droite */}
        <div className="relative z-10 flex items-center justify-end flex-shrink-0">
          <button
            type="button"
            onClick={onWaitlistClick}
            className="
              inline-flex items-center justify-center
              rounded-full
              bg-white
              text-slate-900
              text-[10px] md:text-[11px] font-semibold
              px-3.5 md:px-4.5
              py-1.5
              shadow-[0_10px_24px_rgba(0,0,0,0.55)]
              hover:bg-slate-100
              active:scale-[0.97]
              transition-all duration-150
            "
          >
            Découvrir l’offre
          </button>
        </div>
      </motion.div>
    </div>
  );
}