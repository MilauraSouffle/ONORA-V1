// src/pages/studios/Cliip.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Cliip() {
  return (
    <>
      <Helmet>
        <title>CLiiP · Design, Motion, Impact · ONORA</title>
        <meta
          name="description"
          content="CLiiP crée des vidéos, shorts et assets média qui marquent. Design, motion et impact pour votre communication visuelle."
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
                src="/logos/cliip.png"
                alt="CLiiP"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              CLiiP
            </h1>
            <p className="text-xl md:text-2xl text-orange-400 mb-4">
              Design. Motion. Impact.
            </p>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl">
              Vidéo, shorts & assets média. Nous créons des visuels qui
              captivent, des vidéos qui convertissent, et une identité visuelle
              qui marque les esprits.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                Vidéos & Shorts
              </h3>
              <p className="text-sm text-gray-400">
                Vidéos courtes et percutantes pour les réseaux sociaux. Motion
                design, montage, effets : tout pour maximiser l'engagement.
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                Assets Média
              </h3>
              <p className="text-sm text-gray-400">
                Images, graphismes, animations. Tous les visuels dont vous avez
                besoin pour une communication cohérente et impactante.
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                Identité Visuelle
              </h3>
              <p className="text-sm text-gray-400">
                Charte graphique complète, logo, couleurs, typographie. Une
                identité forte qui vous démarque de la concurrence.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/#waitlist"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-orange-400/50 bg-orange-400/10 backdrop-blur-md text-white font-medium hover:bg-orange-400/20 hover:border-orange-400 transition-all duration-300"
            >
              Parler de CLiiP dans mon audit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}

