// src/components/HackiingSprint.jsx
// HUD Futuriste - Widget de Commande VisionOS

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, Loader2, Zap } from "lucide-react";

export default function HackiingSprint({ onCtaClick, to }) {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);

  const problems = ["Emails", "Support", "Leads", "Planning", "Autre"];

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    setResult(null);
    
    // Simuler le calcul de rentabilité
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setResult({
        agent: `Agent IA ${problem}`,
        gainTemps: "8h/semaine",
        roi: "320€/mois économisés",
        description: `Automatisation complète de votre gestion ${problem.toLowerCase()}.`,
      });
    }, 2000);
  };

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header minimaliste */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs tracking-[0.5em] uppercase text-gray-900 mb-4 font-medium">
            HACKiinG · SPRINT 48H
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            MVP IA en 48h
          </h2>
          <p className="text-sm text-gray-900 tracking-wide">
            calibré sur ton business
          </p>
        </div>

        {/* Widget HUD central */}
        <div className="relative rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-2xl overflow-hidden"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 0 60px rgba(168,85,247,0.1)'
          }}
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 p-8 md:p-12">
            {/* GAUCHE : L'Offre - Gros chiffres */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center space-y-8 text-center"
            >
              {/* 48H en énorme */}
              <div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-8xl md:text-9xl font-light text-gray-900 tracking-tight mb-2"
                >
                  48H
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-5xl font-light text-purple-400 tracking-tight"
                >
                  290€
                </motion.div>
              </div>

              {/* Label */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
              >
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-xs tracking-[0.3em] uppercase text-gray-900 font-medium">
                  MVP PROTOCOL READY
                </span>
              </motion.div>
            </motion.div>

            {/* DROITE : L'Architecte - Boutons pillules */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm text-gray-900 mb-4 tracking-wide">
                  Quel est le problème ?
                </p>
                <div className="flex flex-wrap gap-3">
                  {problems.map((problem) => (
                    <motion.button
                      key={problem}
                      onClick={() => handleProblemSelect(problem)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-full border text-sm font-medium transition-all duration-300 ${
                        selectedProblem === problem
                          ? "bg-white/12 border-white/30 text-gray-900 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                          : "bg-white/5 border-white/10 text-gray-900 hover:bg-white/8 hover:border-white/20"
                      }`}
                    >
                      {problem}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Barre de chargement / Résultat */}
              <AnimatePresence mode="wait">
                {isCalculating && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4"
                  >
                    <div className="flex items-center gap-3 text-gray-900">
                      <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                      <span className="text-sm tracking-wide">
                        Calcul de rentabilité...
                      </span>
                    </div>
                    {/* Barre de progression animée */}
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-400 to-cyan-400"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                    </div>
                  </motion.div>
                )}

                {result && !isCalculating && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="rounded-[1.5rem] border border-emerald-400/30 bg-emerald-400/10 backdrop-blur-md p-6 space-y-4"
                    style={{
                      boxShadow: '0 0 30px rgba(16,185,129,0.2)'
                    }}
                  >
                    <div className="flex items-center gap-3 text-emerald-400 mb-4">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm tracking-wide font-medium">
                        RENTABILITÉ CALCULÉE
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-900 mb-1">Agent proposé</p>
                        <p className="text-base text-gray-900 font-medium">{result.agent}</p>
                      </div>
                      <div className="flex gap-6">
                        <div>
                          <p className="text-xs text-gray-900 mb-1">Gain de temps</p>
                          <p className="text-2xl text-emerald-400 font-light">{result.gainTemps}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-900 mb-1">ROI estimé</p>
                          <p className="text-2xl text-cyan-400 font-light">{result.roi}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-900 leading-relaxed">
                        {result.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          {to ? (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={to}
                className="inline-flex items-center justify-center px-8 py-4 rounded-[2rem] border border-white/10 bg-white/8 backdrop-blur-2xl text-sm tracking-[0.3em] uppercase text-gray-900 font-medium hover:bg-white/12 hover:border-white/20 transition-all duration-300"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05) inset'
                }}
              >
                Lancer un Sprint 48h
              </Link>
            </motion.div>
          ) : (
            <motion.button
              onClick={onCtaClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-[2rem] border border-white/10 bg-white/8 backdrop-blur-2xl text-sm tracking-[0.3em] uppercase text-gray-900 font-medium hover:bg-white/12 hover:border-white/20 transition-all duration-300"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05) inset'
              }}
            >
              Lancer un Sprint 48h
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}
