// src/pages/Home.jsx
// Dashboard ONORA principal avec toutes les sections

import React from "react";
import { Helmet } from "react-helmet-async";
import ModulesGrid from "../components/ModulesGrid";
import HackiingSprint from "../components/HackiingSprint";
import Portfolio from "../components/Portfolio";
import Waitlist from "../components/Waitlist";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>ONORA · Studio IA & No-Code à Metz et Luxembourg</title>
        <meta
          name="description"
          content="ONORA conçoit des sites, automatisations IA et MVP en 48h pour les TPE/PME à Metz, au Luxembourg et dans le Grand Est."
        />
        <meta
          name="keywords"
          content="Metz, Luxembourg, Grand Est, studio IA, automatisation, no-code, MVP, agents IA, HACKiinG, SKRIIB, CLiiP, SiioN"
        />
        <meta property="og:title" content="ONORA · Studio IA & No-Code à Metz et Luxembourg" />
        <meta
          property="og:description"
          content="ONORA conçoit des sites, automatisations IA et MVP en 48h pour les TPE/PME."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ONORA · Studio IA & No-Code" />
        <meta
          name="twitter:description"
          content="Sites, automatisations IA et MVP en 48h pour les TPE/PME."
        />
      </Helmet>

      <div className="w-full min-h-full flex flex-col">
        {/* Section 1 : Intro ONORA */}
        <section className="w-full py-12 md:py-20 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                ONORA
              </h1>
              <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-gray-400 mb-4">
                ONORA · Studio IA & No-Code · Metz · Luxembourg · Grand Est
              </p>
              <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                L'OS de croissance pour les petites entreprises ambitieuses. 100
                places pour la V1. Candidature obligatoire, pas d'agence
                bullshit. Tu entres dans le système, ou tu restes dehors.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 : Écosystème des studios (ModulesGrid) */}
        <section className="w-full py-12 md:py-20 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Tes studios ONORA
              </h2>
              <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
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
        <section className="w-full py-12 md:py-20 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <Portfolio />
          </div>
        </section>

        {/* Section 5 : Waitlist / Audit IA */}
        <Waitlist />

        {/* Section 6 : Footer */}
        <Footer />
      </div>
    </>
  );
}
