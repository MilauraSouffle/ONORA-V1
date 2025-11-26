// src/pages/studios/Hackiing.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hackiing() {
  return (
    <>
      <Helmet>
        <title>HACKiinG · Ton temps, multiplié · ONORA</title>
        <meta
          name="description"
          content="HACKiinG automatise vos tâches avec des agents IA. Automations, agents IA, MVP en 48h. Gain de temps garanti."
        />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.6)] mb-6 overflow-hidden">
              <img
                src="/logos/hackiing.png"
                alt="HACKiinG"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              HACKiinG
            </h1>
            <p className="text-xl md:text-2xl text-purple-400 mb-4">
              Ton temps, multiplié.
            </p>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl">
              Automations & Agents IA. Nous créons des agents IA qui
              automatisent vos tâches répétitives, libèrent votre temps et
              génèrent un ROI mesurable dès la première semaine.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                Agents IA
              </h3>
              <p className="text-sm text-gray-400">
                Agents IA personnalisés pour automatiser vos tâches les plus
                chronophages. Support client, planning, suivi : tout est
                automatisable.
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                MVP en 48h
              </h3>
              <p className="text-sm text-gray-400">
                Sprint de 48h pour déployer votre premier agent IA. Test rapide,
                ROI mesurable, itération continue.
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                Automations Métier
              </h3>
              <p className="text-sm text-gray-400">
                Automatisation complète de vos processus métier. Intégrations
                API, workflows, notifications : tout est connecté.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/#waitlist"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-purple-400/50 bg-purple-400/10 backdrop-blur-md text-white font-medium hover:bg-purple-400/20 hover:border-purple-400 transition-all duration-300"
            >
              Parler de HACKiinG dans mon audit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}

