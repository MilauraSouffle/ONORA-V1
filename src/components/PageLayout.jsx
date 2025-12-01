// src/components/PageLayout.jsx
// Layout standardisé pour les pages internes (About, Waitlist, Studios...)
// FIX : Pleine largeur, alignement sous StatusBar, Design Glass Transparent

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function PageLayout({ children, maxWidth = "max-w-[95%]" }) {
  return (
    // 1. LE CONTENEUR GLOBAL
    // - pt-[110px] : On pousse vers le bas pour être SOUS la Status Bar (56px + 12px marge + 40px buffer)
    // - pb-6 : Marge en bas
    // - px-4 : Marge sur les côtés
    <div className="fixed inset-0 w-full h-full flex justify-center items-start pt-[110px] pb-6 px-4 z-10 pointer-events-none">
      
      {/* 2. LA FENÊTRE (MODAL) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`
          pointer-events-auto
          relative 
          w-full ${maxWidth}
          h-full              /* Prend toute la hauteur disponible */
          rounded-[2.5rem]    /* Gros arrondi comme la Home */
          
          /* DESIGN GLASS TRANSPARENT (Le même que la Home) */
          bg-white/5
          backdrop-blur-3xl 
          border border-white/15
          shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset]
          
          overflow-hidden 
          flex flex-col
        `}
      >
        {/* HEADER DE LA FENÊTRE (Fixe) */}
        <div className="h-20 flex-shrink-0 flex items-center justify-between px-8 border-b border-white/10 bg-white/5 backdrop-blur-md z-20">
          <Link
            to="/"
            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
            aria-label="Retourner à la page d'accueil ONORA"
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors border border-white/10">
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="text-base font-medium tracking-wide">Retour au Système</span>
          </Link>
          
          <div className="flex items-center gap-3 opacity-50">
            <img
              src="/logo/onora-logo.webp"
              alt="ONORA"
              className="w-6 h-6 object-contain"
            />
          </div>
        </div>

        {/* ZONE DE CONTENU (Scrollable) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden dashboard-scroll relative">
          {/* PADDING CONTENU : 
             - pb-40 : Espace vide en bas pour le Dock
          */}
          <div className="p-8 md:p-16 pb-48 max-w-7xl mx-auto">
            {children}
          </div>
        </div>

      </motion.div>
    </div>
  );
}