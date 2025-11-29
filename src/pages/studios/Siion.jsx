// src/pages/studios/Siion.jsx
// Fenêtre spatiale flottante VisionOS

import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, Database, Brain } from "lucide-react";
import PageLayout from "../../components/PageLayout";

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
                src="/logos/logo-siion.png"
                alt="SiioN Logo"
                className="w-32 h-32 md:w-40 md:h-40 object-contain"
              />
            </div>
            <img
              src="/logos/siion-title.png"
              alt="SiioN"
              className="h-60 md:h-80 lg:h-96 xl:h-[28rem] w-auto mx-auto object-contain"
            />
            <p className="text-lg text-gray-900 font-medium">Intelligence augmentée.</p>
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
              <h3 className="text-xl font-bold text-gray-900">Analyse de Données</h3>
              <p className="text-sm text-gray-900">
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
              <h3 className="text-xl font-bold text-gray-900">IA Avancée</h3>
              <p className="text-sm text-gray-900">
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
              <h3 className="text-xl font-bold text-gray-900">Stratégie & Vision</h3>
              <p className="text-sm text-gray-900">
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Commencer avec SiioN
            </h2>
            <Link
              to="/waitlist"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-900 font-semibold hover:bg-white/15 hover:border-white/30 transition-all duration-300"
            >
              Parler de SiioN dans mon audit
            </Link>
          </motion.div>
        </div>
      </PageLayout>
    </>
  );
}
