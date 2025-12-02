// src/components/PageLayout.jsx
// Layout standardisé pour les pages internes
// AMÉLIORATIONS :
// - Marges validées (60px haut / 70px bas)
// - Vrai bouton "Retour" (Historique navigateur)
// - Logo ONORA bien visible et opaque

import React from "react";
import { useNavigate } from "react-router-dom"; // On utilise useNavigate au lieu de Link
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function PageLayout({ children, maxWidth = "max-w-[98%]" }) {
  const navigate = useNavigate();

  return (
    // 1. CONTENEUR GLOBAL (Avec tes marges validées 60/70)
    <div className="fixed inset-0 w-full h-full flex justify-center items-start pt-[60px] pb-[70px] px-2 z-10 pointer-events-none">
      
      {/* 2. LA FENÊTRE (MODAL) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`
          pointer-events-auto
          relative 
          w-full ${maxWidth}
          h-full
          rounded-[2.5rem]
          
          /* DESIGN GLASS TRANSPARENT */
          bg-white/5
          backdrop-blur-3xl 
          border border-white/15
          shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset]
          
          overflow-hidden 
          flex flex-col
        `}
      >
        {/* HEADER DE LA FENÊTRE */}
        <div className="h-20 flex-shrink-0 flex items-center justify-between px-6 md:px-8 border-b border-white/10 bg-white/5 backdrop-blur-md z-20">
          
          {/* GAUCHE : VRAI BOUTON RETOUR (Navigue en arrière) */}
          <button
            onClick={() => navigate(-1)} // Retour à la page précédente
            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group cursor-pointer"
            aria-label="Retour à la page précédente"
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors border border-white/10">
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="text-base font-medium tracking-wide">Retour</span>
          </button>
          
          {/* DROITE : LOGO ONORA (Plus grand & Opaque) */}
          <div className="flex items-center gap-3">
            <img
              src="/logo/onora-logo.webp"
              alt="ONORA"
              // Modif ici : w-8 h-8 (plus grand) et opacity-100 (bien visible)
              className="w-12 h-12 object-contain opacity-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            />
          </div>
        </div>

        {/* ZONE DE CONTENU */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden dashboard-scroll relative">
          <div className="p-8 md:p-16 max-w-7xl mx-auto">
            {children}
          </div>
        </div>

      </motion.div>
    </div>
  );
}