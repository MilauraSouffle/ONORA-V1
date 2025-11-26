// src/pages/studios/Siion.jsx
// Fenêtre spatiale flottante VisionOS

import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Database, Brain } from "lucide-react";

export default function Siion() {
  return (
    <>
      <Helmet>
        <title>SiioN · Growth Data · ONORA</title>
        <meta
          name="description"
          content="SiioN utilise l'intelligence artificielle et les données pour optimiser votre business. Data, stratégie, vision."
        />
      </Helmet>

      <div className="min-h-screen w-full flex items-center justify-center px-4 md:px-6 py-12">
        {/* Fenêtre spatiale flottante VisionOS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-5xl rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl overflow-hidden"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05) inset'
          }}
        >
          {/* Header avec bouton retour */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-white/5 backdrop-blur-md">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
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
            <div className="p-8 md:p-12 space-y-12">
              {/* Header Studio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-6"
              >
                <div className="flex justify-center">
                  <img
                    src="/logos/logo-siion.png"
                    alt="SiioN Logo"
                    className="w-32 h-32 md:w-40 md:h-40 object-contain"
                  />
                </div>
                <img
                  src="/logos/siion-title.png"
                  alt="SiioN"
                  className="h-12 md:h-16 w-auto mx-auto object-contain"
                />
                <p className="text-lg text-gray-300">Intelligence augmentée.</p>
              </motion.div>

              {/* Cartes visuelles */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Carte 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4"
                >
                  <Database className="w-10 h-10 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">Analyse de Données</h3>
                  <p className="text-sm text-gray-300">
                    Insights actionnables pour prendre les bonnes décisions.
                  </p>
                </motion.div>

                {/* Carte 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4"
                >
                  <Brain className="w-10 h-10 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">IA Avancée</h3>
                  <p className="text-sm text-gray-300">
                    Modèles d'IA personnalisés pour ton secteur.
                  </p>
                </motion.div>

                {/* Carte 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4"
                >
                  <TrendingUp className="w-10 h-10 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">Stratégie & Vision</h3>
                  <p className="text-sm text-gray-300">
                    Vision long terme basée sur les données.
                  </p>
                </motion.div>
              </div>

              {/* Section finale CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center pt-8 border-t border-white/10"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Commencer avec SiioN
                </h2>
                <Link
                  to="/#waitlist"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/15 hover:border-white/30 transition-all duration-300"
                >
                  Parler de SiioN dans mon audit
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
