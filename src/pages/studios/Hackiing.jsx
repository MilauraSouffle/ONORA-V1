// src/pages/studios/Hackiing.jsx
// Fenêtre spatiale flottante VisionOS

import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Bot, Clock } from "lucide-react";
import PageLayout from "../../components/PageLayout";

export default function Hackiing() {
  return (
    <>
      <Helmet>
        <title>HACKiinG · Automatisation · ONORA</title>
        <meta
          name="description"
          content="HACKiinG automatise vos tâches avec des agents IA. Automations, agents IA, MVP en 48h. Gain de temps garanti."
        />
      </Helmet>

      <PageLayout>
        <div className="space-y-12">
          {/* Header Studio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center">
              <img
                src="/logos/logo-hackiing.png"
                alt="HACKiinG Logo"
                className="w-32 h-32 md:w-40 md:h-40 object-contain"
              />
            </div>
            <img
              src="/logos/hackiing-title.png"
              alt="HACKiinG"
              className="h-60 md:h-80 lg:h-96 xl:h-[28rem] w-auto mx-auto object-contain"
            />
            <p className="text-lg text-gray-900 font-medium">Ton temps, multiplié.</p>
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
              <Bot className="w-10 h-10 text-purple-400" />
              <h3 className="text-xl font-bold text-gray-900">Agents IA</h3>
              <p className="text-sm text-gray-900">
                Automatisation intelligente de tes tâches chronophages.
              </p>
            </motion.div>

            {/* Carte 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4"
            >
              <Clock className="w-10 h-10 text-purple-400" />
              <h3 className="text-xl font-bold text-gray-900">MVP en 48h</h3>
              <p className="text-sm text-gray-900">
                Sprint rapide pour tester et mesurer un ROI.
              </p>
            </motion.div>

            {/* Carte 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4"
            >
              <Zap className="w-10 h-10 text-purple-400" />
              <h3 className="text-xl font-bold text-gray-900">Automations Métier</h3>
              <p className="text-sm text-gray-900">
                Connecte tous tes outils et automatise tes processus.
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Commencer avec HACKiinG
            </h2>
            <Link
              to="/waitlist"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-900 font-semibold hover:bg-white/15 hover:border-white/30 transition-all duration-300"
            >
              Parler de HACKiinG dans mon audit
            </Link>
          </motion.div>
        </div>
      </PageLayout>
    </>
  );
}
