// src/components/PageLayout.jsx
// Composant réutilisable pour le layout VisionOS de toutes les pages

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function PageLayout({ children, maxWidth = "max-w-5xl" }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 md:px-6 py-4 md:py-6">
      {/* Fenêtre spatiale flottante VisionOS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative w-full ${maxWidth} rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl overflow-hidden`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05) inset'
        }}
      >
        {/* Header avec bouton retour */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-white/5 backdrop-blur-md">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-900 hover:text-gray-900 transition-colors"
            aria-label="Retourner à la page d'accueil ONORA"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm font-medium">Retour</span>
          </Link>
          <div className="flex items-center gap-3">
            <img
              src="/logo/onora-logo.png"
              alt="ONORA"
              className="w-6 h-6 object-contain opacity-60"
            />
          </div>
        </div>

        {/* Contenu scrollable */}
        <div className="overflow-y-auto max-h-[calc(90vh-4rem)] dashboard-scroll">
          <div className="p-8 md:p-12">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}



