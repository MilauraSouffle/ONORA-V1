// src/components/StatusBar.jsx
// Version CORRIGÉE : Commentaires CSS supprimés pour éviter l'erreur de build.
// Position : top-[56px]

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { motion } from "framer-motion";

export default function StatusBar() {
  const textWide = "Site optimisé, audit notoriété web et automatisation de tes leads pour 200€ au lieu de 2000€ pour les 100 premiers. ✦ ";
  const textLaptop = "Site + Audit + Auto Leads : 200€ au lieu de 2000€ (Offre limitée aux 100 premiers) ✦ ";
  const textMobile = "Pack complet : Site + Audit + Auto pour 200€ ✦ ";

  const [textSource, setTextSource] = useState(textWide);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setTextSource(textMobile);
      } else if (width < 1280) {
        setTextSource(textLaptop);
      } else {
        setTextSource(textWide);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
       <style>{`
        @keyframes scroll-text {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-text {
          display: flex;
          width: fit-content;
          animation: scroll-text 20s linear infinite; 
        }
        .animate-scroll-text:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="fixed top-[56px] left-0 w-full z-40 pointer-events-none flex justify-center px-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            pointer-events-auto
            relative
            w-full max-w-6xl
            h-11 md:h-12
            rounded-b-[1.5rem] rounded-t-none md:rounded-full
            bg-cyan-50/90
            border-b border-x border-white/60 border-t-0
            backdrop-blur-xl
            shadow-[0_8px_32px_rgba(6,182,212,0.15)]
            flex items-center
            px-3 md:px-5
            gap-3
            overflow-hidden
          "
          style={{ marginTop: '-1px' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

          {/* GAUCHE */}
          <div className="relative z-10 flex items-center gap-3 flex-shrink-0 pr-2">
            <div className="relative flex items-center justify-center w-7 h-7 md:w-8 md:h-8">
              <span className="absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-20 animate-ping"></span>
              <div className="absolute inset-0 rounded-full border border-orange-500/40 opacity-80 shadow-[inset_0_0_4px_rgba(249,115,22,0.4)]" />
              <div className="relative w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600 shadow-[0_0_8px_rgba(251,146,60,1)] animate-pulse">
                 <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full opacity-60"></div>
              </div>
            </div>
            <div className="flex flex-col leading-none justify-center">
              <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-cyan-900/60 mb-0.5">Pack Lancement</span>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="text-[10px] text-gray-400 font-medium">2000€</span>
                  <div className="absolute top-1/2 left-[-10%] w-[120%] h-[1.5px] bg-red-500 -rotate-12 transform -translate-y-1/2 rounded-full opacity-90"></div>
                </div>
                <span className="text-xs md:text-sm font-extrabold text-cyan-600">200€</span>
                <span className="hidden sm:inline-block text-[9px] text-cyan-900/60 font-medium ml-1 py-0.5 px-1.5 rounded bg-white/40 border border-white/50">87/100 dispo</span>
              </div>
            </div>
          </div>

          {/* CENTRE */}
          <div className="relative z-0 flex-1 h-full overflow-hidden flex items-center mask-image-gradient">
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-cyan-50/90 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-cyan-50/90 to-transparent z-10" />
            <div className="animate-scroll-text whitespace-nowrap">
              {[1,2,3,4].map(i => (
                  <span key={i} className="text-[10px] md:text-xs text-gray-900 font-semibold px-4">{textSource}</span>
              ))}
            </div>
          </div>

          {/* DROITE */}
          <div className="relative z-10 flex items-center justify-end flex-shrink-0 pl-2">
            <Link to="/waitlist" className="group relative inline-flex items-center justify-center rounded-full bg-gray-900 text-white text-[9px] md:text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 md:px-4 md:py-2 shadow-lg shadow-cyan-900/20 hover:bg-black hover:scale-105 active:scale-95 transition-all duration-200 overflow-hidden">
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              <span className="relative z-10">DÉCOUVRIR L'OFFRE</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}