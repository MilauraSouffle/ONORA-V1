// src/pages/Home.jsx
// Dashboard ONORA principal - Version VisionOS 2.0

import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ModulesGrid from "../components/ModulesGrid";
import HackiingSprint from "../components/HackiingSprint";
import Portfolio from "../components/Portfolio";
import Waitlist from "../components/Waitlist";
import Footer from "../components/Footer";
import SourceCodeOrigin from "../components/SourceCodeOrigin";
import StatusBar from "../components/StatusBar";
import AuditWidget from "../components/AuditWidget";

export default function Home() {
  const waitlistRef = useRef(null);

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>ONORA – Studio IA & no-code à Metz et Luxembourg</title>
        <meta
          name="description"
          content="OS de croissance pour petites entreprises ambitieuses. Sites, automatisations, IA, sprint MVP en 48h. Metz, Luxembourg, Grand Est."
        />
        <meta
          name="keywords"
          content="Metz, Luxembourg, Grand Est, studio IA, automatisation, no-code, MVP, agents IA, HACKiinG, SKRIIB, CLiiP, SiioN"
        />
        <meta
          property="og:title"
          content="ONORA – Studio IA & no-code à Metz et Luxembourg"
        />
        <meta
          property="og:description"
          content="OS de croissance pour petites entreprises ambitieuses. Sites, automatisations, IA, sprint MVP en 48h."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ONORA – Studio IA & no-code" />
        <meta
          name="twitter:description"
          content="Sites, automatisations IA et MVP en 48h pour les TPE/PME."
        />
      </Helmet>

      {/* Top Status Bar */}
      <StatusBar onWaitlistClick={scrollToWaitlist} />

      {/* Widget Audit Flottant */}
      <AuditWidget />

      <div className="w-full min-h-full flex flex-col">
        {/* NOUVEAU HERO VisionOS */}
        <section className="w-full min-h-[80vh] flex items-center justify-center px-4 md:px-6 py-20 relative">
          {/* Couche de lisibilité */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-xl pointer-events-none" />
          
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 md:space-y-12"
            >
              {/* Logo ONORA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex justify-center"
              >
                <div className="relative inline-block p-8 rounded-[2rem] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)]">
                  <img
                    src="/logo/onora.png"
                    alt="ONORA"
                    className="w-64 md:w-80 lg:w-96 h-auto object-contain"
                  />
                </div>
              </motion.div>

              {/* Punchline H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] tracking-tight"
              >
                Les agences sont mortes.
                <br />
                Bienvenue dans le système ONORA.
              </motion.h1>

              {/* Sous-titre H2 */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              >
                IA, automatisation, no-code et design spatial pour les petites entreprises ambitieuses.
              </motion.h2>

              {/* CTA Principal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="pt-4"
              >
                <Link
                  to="#modules"
                  className="inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-5 rounded-[2rem] bg-white/10 backdrop-blur-2xl border border-white/20 text-white font-semibold text-lg md:text-xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)]"
                >
                  Découvrir le Système ONORA
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator VisionOS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <ChevronDown className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2 : Écosystème des studios (ModulesGrid) */}
        <section id="modules" className="w-full py-12 md:py-20 px-4 md:px-6 relative">
          <div className="absolute inset-0 bg-black/15 backdrop-blur-sm pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                Tes studios ONORA
              </h2>
              <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                ONORA = SKRIIB (contenu), CLiiP (créa rapide), SiioN (data / IA
                avancée), HACKiinG (automations & agents IA).
              </p>
            </div>
            <ModulesGrid />
          </div>
        </section>

        {/* Section 3 : Bloc HACKiinG Sprint 48h */}
        <HackiingSprint onCtaClick={scrollToWaitlist} />

        {/* Section 4 : Portfolio / preuves */}
        <section className="w-full py-12 md:py-20 px-4 md:px-6 relative">
          <div className="absolute inset-0 bg-black/15 backdrop-blur-sm pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <Portfolio />
          </div>
        </section>

        {/* Section 5 : SOURCE CODE : ORIGIN */}
        <SourceCodeOrigin />

        {/* Section 6 : Waitlist / Audit IA */}
        <div ref={waitlistRef}>
          <Waitlist />
        </div>

        {/* Section 7 : Footer */}
        <Footer />
      </div>
    </>
  );
}
