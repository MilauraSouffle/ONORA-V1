// src/components/StatusBar.jsx
// Barre "Pack lancement ONORA" – Version Ticker (Défilement)
// Design compact, Pastille Orange, Lien Waitlist, Texte défilant infini.

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function StatusBar() {
  // Texte long pour le défilement
  const textContent = "Site optimisé, audit notoriété web et automatisation de tes leads pour 200€ au lieu de 2000€ (Offre limitée aux 100 premiers)  ✦  ";

  return (
    // Ajout des styles d'animation directement dans le composant
    <>
      <style>{`
        @keyframes scroll-text {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-text {
          display: flex;
          width: fit-content;
          animation: scroll-text 15s linear infinite;
        }
        /* Pause au survol pour lire tranquillement si besoin */
        .animate-scroll-text:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="sticky top-4 z-40 flex justify-center px-3 pointer-events-none w-full">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            pointer-events-auto
            relative
            w-full max-w-5xl 
            h-11 md:h-12
            rounded-full
            bg-cyan-50/90
            border border-white/60
            backdrop-blur-xl
            shadow-[0_8px_32px_rgba(6,182,212,0.15)]
            flex items-center
            px-3 md:px-5
            gap-3
            overflow-hidden
          "
        >
          {/* Reflet vitre */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

          {/* --- GAUCHE : PASTILLE ORANGE + PRIX (FIXE) --- */}
          <div className="relative z-10 flex items-center gap-3 flex-shrink-0 bg-cyan-50/0 pr-2">
            {/* Pastille ORANGE animée */}
            <div className="relative flex items-center justify-center w-7 h-7 md:w-8 md:h-8">
              <span className="absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-20 animate-ping"></span>
              <div className="absolute inset-0 rounded-full border border-orange-500/30 opacity-80" />
              <div className="relative w-full h-full rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center">
                 <div className="w-2 h-2 rounded-full bg-orange-500 shadow-sm" />
              </div>
            </div>

            <div className="flex flex-col leading-none justify-center">
              <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-cyan-900/60 mb-0.5">
                Pack Lancement
              </span>
              <div className="flex items-center gap-2">
                
                {/* PRIX BARRÉ */}
                <div className="relative">
                  <span className="text-[10px] text-gray-400 font-medium">
                    2000€
                  </span>
                  <div className="absolute top-1/2 left-[-10%] w-[120%] h-[1.5px] bg-red-500 -rotate-12 transform -translate-y-1/2 rounded-full opacity-90"></div>
                </div>

                <span className="text-xs md:text-sm font-extrabold text-cyan-600">
                  200€
                </span>
                <span className="hidden sm:inline-block text-[9px] text-cyan-900/60 font-medium ml-1 py-0.5 px-1.5 rounded bg-white/40 border border-white/50">
                  87/100 dispo
                </span>
              </div>
            </div>
          </div>

          {/* --- CENTRE : BANDEAU DÉFILANT (SNAKE / TICKER) --- */}
          {/* Masque de débordement + dégradés sur les côtés pour fondre le texte */}
          <div className="relative z-0 flex-1 h-full overflow-hidden flex items-center mask-image-gradient">
            {/* Dégradés latéraux pour adoucir l'entrée/sortie du texte */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-cyan-50/90 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-cyan-50/90 to-transparent z-10" />

            {/* Conteneur animé qui boucle */}
            <div className="animate-scroll-text whitespace-nowrap">
              {/* On duplique le texte pour créer la boucle infinie parfaite */}
              <span className="text-[10px] md:text-xs text-gray-900 font-semibold px-4">
                {textContent}
              </span>
              <span className="text-[10px] md:text-xs text-gray-900 font-semibold px-4">
                {textContent}
              </span>
              <span className="text-[10px] md:text-xs text-gray-900 font-semibold px-4">
                {textContent}
              </span>
            </div>
          </div>

          {/* --- DROITE : CTA LINK (/waitlist) --- */}
          <div className="relative z-10 flex items-center justify-end flex-shrink-0 pl-2">
            <Link
              to="/waitlist"
              className="
                group relative inline-flex items-center justify-center
                rounded-full bg-gray-900 text-white
                text-[9px] md:text-[11px] font-bold uppercase tracking-wide
                px-3 py-1.5 md:px-4 md:py-2
                shadow-lg shadow-cyan-900/20
                hover:bg-black hover:scale-105 active:scale-95
                transition-all duration-200 overflow-hidden
              "
            >
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              <span className="relative z-10">Découvrir l'offre</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}