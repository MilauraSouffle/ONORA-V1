// src/pages/studios/Skriib.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Skriib() {
  return (
    <>
      <Helmet>
        <title>SKRiiB · Studio Contenu & Sites Web · ONORA</title>
        <meta
          name="description"
          content="SKRiiB crée du contenu humain, digital et intelligent pour votre entreprise. Sites web, contenu stratégique, SEO."
        />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-12">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.6)] mb-6 overflow-hidden">
              <img
                src="/logos/skriib.png"
                alt="SKRiiB"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              SKRiiB
            </h1>
            <p className="text-xl md:text-2xl text-cyan-400 mb-4">
              Human. Digital. Intelligent.
            </p>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl">
              Studio contenu & sites web. Nous créons du contenu qui convertit,
              des sites qui performants, et une stratégie digitale qui fait la
              différence.
            </p>
          </div>

          {/* Capacités */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                Sites Web Performants
              </h3>
              <p className="text-sm text-gray-400">
                Sites web modernes, rapides et optimisés pour la conversion.
                Mobile-first, SEO-friendly, et pensés pour vos utilisateurs.
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                Contenu Stratégique
              </h3>
              <p className="text-sm text-gray-400">
                Contenu qui raconte votre histoire, engage votre audience et
                génère des leads. Textes, images, vidéos : tout est pensé pour
                convertir.
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                Stratégie SEO
              </h3>
              <p className="text-sm text-gray-400">
                Optimisation pour les moteurs de recherche. Visibilité accrue,
                trafic qualifié, positions durables sur les mots-clés qui
                comptent.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/#waitlist"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-cyan-400/50 bg-cyan-400/10 backdrop-blur-md text-white font-medium hover:bg-cyan-400/20 hover:border-cyan-400 transition-all duration-300"
            >
              Parler de SKRiiB dans mon audit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}

