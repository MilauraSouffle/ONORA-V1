// src/components/SourceCodeOrigin.jsx
// Section storytelling "SOURCE CODE : ORIGIN"

import React from "react";
import { motion } from "framer-motion";

export default function SourceCodeOrigin() {
  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-black/30 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
        >
          {/* Label ACCESS GRANTED */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6">
            <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-full">
              <span className="text-[10px] md:text-xs font-mono text-emerald-400 tracking-wider">
                ACCESS GRANTED – SOURCE CODE
              </span>
            </div>
          </div>

          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8">
              SOURCE CODE : ORIGIN
            </h2>

            {/* Profil / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                  XP
                </p>
                <p className="text-2xl font-bold text-white">20 ans</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Rôle
                </p>
                <p className="text-lg font-semibold text-white">
                  Entrepreneur – Builder & Survivor
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                  Spécialité
                </p>
                <p className="text-lg font-semibold text-white">
                  Résilience, vision business, IA & no-code
                </p>
              </div>
            </div>

            {/* Texte storytelling */}
            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-gray-300 leading-relaxed">
              <p>
                Il y a 20 ans, je lançais mes premières boutiques. Un million
                d'euros de CA, des équipes, la vitesse, l'ambition. Le succès.
              </p>
              <p>
                Puis le crash. Covid. Tout s'arrête. Les économies partent en
                fumée. Le solide devient fragile. Le futur, incertain.
              </p>
              <p>
                La reconstruction s'est faite avec les armes du présent : l'IA
                et le no-code. Des outils que je n'avais pas au moment du crash.
                Des outils qui auraient tout changé.
              </p>
              <p className="text-white font-semibold">
                ONORA, c'est l'arme que je construis pour que d'autres n'aient
                pas à tomber. Pour que les petites entreprises ambitieuses aient
                accès aux mêmes leviers que les grandes. Sans bullshit. Sans
                promesses vides. Avec des résultats mesurables.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

