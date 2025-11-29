// src/pages/WaitlistPage.jsx
// Page dédiée pour le formulaire Waitlist - héberge le composant Waitlist

import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Waitlist from "../components/Waitlist";
import PageLayout from "../components/PageLayout";

export default function WaitlistPage() {
  return (
    <>
      <Helmet>
        <title>Waitlist ONORA – Audit gratuit site + visibilité + IA</title>
        <meta
          name="description"
          content="Rejoins la waitlist ONORA et reçois ton audit gratuit (site + visibilité + IA) sous 24-48h. Pour les 100 premiers entrepreneurs ambitieux."
        />
        <meta
          name="keywords"
          content="waitlist ONORA, audit gratuit, audit site web, audit IA, visibilité web, ONORA studio"
        />
      </Helmet>

      <PageLayout maxWidth="max-w-4xl">
        <div className="space-y-12">
          {/* Header avec titres */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-xs tracking-[0.35em] uppercase text-gray-900 mb-6">
              WAITLIST · AUDIT IA
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Rejoins la waitlist ONORA
            </h1>
            <p className="text-base md:text-lg text-gray-900 max-w-3xl mx-auto mb-3">
              Audit site + visibilité + IA offert pour les 100 premiers.
            </p>
            <p className="text-sm md:text-base text-gray-900 max-w-2xl mx-auto mb-4">
              Tu recevras ton audit sous 24-48h.
            </p>
            <p className="text-xs md:text-sm text-gray-900 max-w-2xl mx-auto">
              On te répond à la main, pas avec un robot.
            </p>
          </motion.div>

          {/* Formulaire Waitlist */}
          <Waitlist hideHeader={true} />
        </div>
      </PageLayout>
    </>
  );
}

