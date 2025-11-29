// src/pages/studios/Skriib.jsx
// Fenêtre spatiale flottante VisionOS

import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, Globe, FileSearch } from "lucide-react";
import PageLayout from "../../components/PageLayout";

export default function Skriib() {
  return (
    <>
      <Helmet>
        <title>SKRiiB · Architecture Digitale & Contenu Stratégique · ONORA</title>
        <meta
          name="description"
          content="SKRiiB crée du contenu humain, digital et intelligent pour votre entreprise. Sites web modernes, contenu stratégique, SEO. Studio ONORA à Metz et Luxembourg."
        />
        <meta
          name="keywords"
          content="SKRiiB, architecture digitale, contenu stratégique, SEO, sites web, ONORA, Metz, Luxembourg"
        />
        <meta property="og:title" content="SKRiiB · Architecture Digitale & Contenu Stratégique" />
        <meta property="og:description" content="Human. Digital. Intelligent. Sites web, contenu stratégique, SEO pour votre entreprise." />
        <meta property="og:type" content="website" />
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
                src="/logos/logo-skriib.png"
                alt="Logo SKRiiB - Studio architecture digitale et contenu stratégique ONORA"
                className="w-32 h-32 md:w-40 md:h-40 object-contain"
                loading="eager"
                width="160"
                height="160"
              />
            </div>
            <img
              src="/logos/skriib-title.png"
              alt="SKRiiB - Architecture Digitale & Contenu Stratégique"
              className="h-60 md:h-80 lg:h-96 xl:h-[28rem] w-auto mx-auto object-contain"
              loading="eager"
              width="400"
              height="448"
            />
            <h1 className="sr-only">SKRiiB - Architecture Digitale & Contenu Stratégique</h1>
            <p className="text-lg text-gray-900 font-medium">Human. Digital. Intelligent.</p>
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
              <Code2 className="w-10 h-10 text-cyan-400" aria-hidden="true" />
              <h2 className="text-xl font-bold text-gray-900">Architecture Digitale</h2>
              <p className="text-sm text-gray-900">
                Sites web modernes, rapides et optimisés pour la conversion.
              </p>
            </motion.div>

            {/* Carte 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4"
            >
              <FileSearch className="w-10 h-10 text-cyan-400" aria-hidden="true" />
              <h2 className="text-xl font-bold text-gray-900">Contenu Stratégique</h2>
              <p className="text-sm text-gray-900">
                Contenu qui raconte ton histoire et génère des leads.
              </p>
            </motion.div>

            {/* Carte 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 space-y-4"
            >
              <Globe className="w-10 h-10 text-cyan-400" aria-hidden="true" />
              <h2 className="text-xl font-bold text-gray-900">Visibilité SEO</h2>
              <p className="text-sm text-gray-900">
                Optimisation pour être trouvé par tes clients.
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
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Commencer avec SKRiiB
            </h3>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-900 font-semibold hover:bg-white/15 hover:border-white/30 transition-all duration-300"
              aria-label="Contacter ONORA pour un audit SKRiiB"
            >
              Parler de SKRiiB dans mon audit
            </Link>
          </motion.div>
        </div>
      </PageLayout>
    </>
  );
}
