// src/components/PageLayout.jsx
// Version FINALE : Plein écran, Ancrage précis Haut/Bas pour éviter le Dock

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function PageLayout({ children, maxWidth = "max-w-[98%]" }) { // 98% de largeur = quasi plein écran
  return (
    // CONTENEUR FIXE
    // - pt-[110px] : Sous la StatusBar
    // - pb-[100px] : S'arrête AVANT le Dock (environ 90-100px du bas)
    // - px-2 : Marge latérale minime
    <div className="fixed inset-0 w-full h-full flex justify-center items-start pt-[110px] pb-[110px] px-2 z-10 pointer-events-none">
      
      {/* FENÊTRE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`
          pointer-events-auto
          relative 
          w-full ${maxWidth}
          h-full              /* Prend toute la hauteur définie par les paddings */
          rounded-[2rem]      /* Arrondi cohérent */
          
          /* STYLE GLASS TRANSPARENT (Identique Home) */
          bg-white/5
          backdrop-blur-3xl 
          border border-white/15
          shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset]
          
          overflow-hidden 
          flex flex-col
        `}
      >
        {/* HEADER */}
        <div className="h-16 flex-shrink-0 flex items-center justify-between px-6 md:px-8 border-b border-white/10 bg-white/5 backdrop-blur-md z-20">
          <Link
            to="/"
            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
            aria-label="Retourner à la page d'accueil ONORA"
          >
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors border border-white/10">
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </div>
            <span className="text-sm font-medium tracking-wide">Retour au Système</span>
          </Link>
          
          <div className="flex items-center gap-3 opacity-50">
            <img
              src="/logo/onora-logo.webp"
              alt="ONORA"
              className="w-6 h-6 object-contain"
            />
          </div>
        </div>

        {/* CONTENU SCROLLABLE */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden dashboard-scroll relative">
          <div className="p-8 md:p-12 max-w-7xl mx-auto">
            {children}
          </div>
        </div>

      </motion.div>
    </div>
  );
}