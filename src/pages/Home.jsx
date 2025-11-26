// src/pages/Home.jsx
// Dashboard ONORA principal avec toutes les sections

import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";
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
        {/* Section Hero ONORA - Améliorée */}
        <section className="w-full py-12 md:py-20 px-4 md:px-6 relative">
          {/* Couche de lisibilité */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-md pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                ONORA
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-6 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Studio IA & no-code pour petites entreprises ambitieuses, basé
                entre Metz, Luxembourg et le Grand Est.
              </p>
              
              <p className="text-lg md:text-xl lg:text-2xl text-cyan-400 font-semibold max-w-2xl mx-auto mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Tu n'achètes pas un site. Tu entres dans un système.
              </p>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col items-center gap-2 text-xs md:text-sm text-gray-400"
            >
              <span>Scrolle pour explorer le système ONORA</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section 2 : Écosystème des studios (ModulesGrid) */}
        <section className="w-full py-12 md:py-20 px-4 md:px-6 relative">
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
        <HackiingSprint />

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
