// src/pages/Home.jsx
// Dashboard ONORA – layout desktop horizontal + layout mobile vertical

import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import ModulesGrid from "../components/ModulesGrid";
import HackiingSprint from "../components/HackiingSprint";
import NoPortfolio from "../components/NoPortfolio";
import Waitlist from "../components/Waitlist";
import Footer from "../components/Footer";
import SourceCodeOrigin from "../components/SourceCodeOrigin";
import StatusBar from "../components/StatusBar";
import AuditWidget from "../components/AuditWidget";
import VisionBubble from "../components/VisionBubble";
import ScrollHint from "../components/ScrollHint";
import CarouselPager from "../components/CarouselPager";

export default function Home() {
  const waitlistRef = useRef(null);

  // Desktop horizontal
  const desktopScrollRef = useRef(null);
  const [activeDesktopSlide, setActiveDesktopSlide] = useState(0);

  // Mobile hero slider
  const mobileHeroRef = useRef(null);
  const [activeMobileSlide, setActiveMobileSlide] = useState(0);

  const scrollToWaitlist = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      // sur desktop, on scrolle vers la dernière carte (slide 5 = index 4)
      scrollToDesktopSlide(4);
    } else {
      // mobile : scroll vertical normal vers le formulaire waitlist
      waitlistRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToDesktopSlide = (index) => {
    const container = desktopScrollRef.current;
    if (!container) return;
    const width = container.clientWidth;
    container.scrollTo({
      left: width * index,
      behavior: "smooth",
    });
  };

  const desktopSlidesCount = 5; // Hero, Studios, Sprint, Use Cases, Origin+Waitlist

  // Transforme le scroll vertical en horizontal sur desktop,
  // fluide et réactif pour trackpad Mac, souris et tablette
  useEffect(() => {
    const container = desktopScrollRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Si on scroll dans une zone .card-scroll, on laisse le scroll vertical
      const inCard = e.target.closest(".card-scroll");
      if (inCard) return;

      // Détection : si scroll horizontal prédominant, on laisse faire
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      e.preventDefault();
      e.stopPropagation();

      // Détection du type de périphérique pour ajuster la sensibilité
      // deltaMode: 0 = pixel, 1 = ligne, 2 = page
      // Trackpad Mac envoie souvent deltaMode 0 avec petits deltas
      // Souris envoie deltaMode 1 avec deltas plus grands
      const isTrackpad = e.deltaMode === 0 && Math.abs(e.deltaY) < 50;
      const conversionFactor = isTrackpad ? 1.0 : 1.5;

      // Conversion vertical -> horizontal
      const scrollDelta = e.deltaY * conversionFactor;

      // Scroll direct et fluide - le CSS snap gère le verrouillage
      container.scrollLeft += scrollDelta;
    };

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = container;
      if (!clientWidth) return;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveDesktopSlide(index);
    };

    // Utilisation de { passive: false } pour pouvoir preventDefault
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Suivi du slider mobile
  useEffect(() => {
    const el = mobileHeroRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollLeft, clientWidth } = el;
      if (!clientWidth) return;
      const i = Math.round(scrollLeft / clientWidth);
      setActiveMobileSlide(i);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const mobileSlidesCount = 2;

  return (
    <>
      <Helmet>
        <title>ONORA – Studio IA & no-code à Metz et Luxembourg</title>
        <meta
          name="description"
          content="Tu n'embauches pas une agence. Tu branches un système. ONORA recycle le meilleur des designers, marketeurs et devs avec l'IA. OS de croissance pour petites entreprises ambitieuses."
        />
        <meta
          name="keywords"
          content="Metz, Luxembourg, Grand Est, studio IA, automatisation, no-code, MVP, agents IA, HACKiinG, SKRiiB, CLiiP, SiioN, système IA, ONORA"
        />
        <meta
          property="og:title"
          content="ONORA – Tu branches un système, pas une agence"
        />
        <meta
          property="og:description"
          content="ONORA recycle le meilleur des designers, marketeurs et devs avec l'IA. On construit des systèmes qui travaillent pour toi."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ONORA – Studio IA & no-code" />
        <meta
          name="twitter:description"
          content="Tu n'embauches pas une agence. Tu branches un système ONORA."
        />
      </Helmet>

      {/* AuditWidget masqué pour le moment - sera réutilisé plus tard */}

      <div className="w-full min-h-full flex flex-col">
        {/* ========== LAYOUT DESKTOP HORIZONTAL ========== */}
        <div className="hidden lg:flex flex-col flex-1 relative">
          {/* StatusBar flottante avant-plan */}
          <div className="hidden lg:block absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className="pointer-events-auto">
              <StatusBar />
            </div>
          </div>

          <div
            ref={desktopScrollRef}
            className="
              onora-desktop-slider
              flex-1 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
            "
          >
            {/* SLIDE 1 – HERO / PROMESSE */}
            <section className="w-full h-full flex-shrink-0 snap-start flex flex-col items-center justify-center px-6 py-6 relative">
              <div className="absolute inset-0 bg-black/10 backdrop-blur-md pointer-events-none" />
              
              {/* Bulle centrée */}
              <div className="relative z-10 w-full flex items-center justify-center flex-1 max-w-7xl">
                <VisionBubble>
                  <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-[1fr_1.2fr] items-center h-full">
                    {/* Logo ONORA + CTA */}
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative w-full max-w-xs rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden aspect-square flex items-center justify-center p-8">
                        <img
                          src="/logo/onora.webp"
                          alt="ONORA.STUDIO – Studio IA et no-code à Metz et Luxembourg"
                          className="w-full h-full object-contain"
                          loading="eager"
                          width="400"
                          height="400"
                        />
                      </div>
                      
                      {/* CTA en dessous du logo */}
                      <Link
                        to="/about"
                        className="inline-flex items-center justify-center px-8 py-3.5 rounded-[2rem] bg-white/10 border border-white/20 text-gray-900 font-semibold text-sm md:text-base hover:bg-white/20 active:scale-[0.98] transition-all duration-200"
                        aria-label="Découvrir le système ONORA et notre approche"
                      >
                        Explorer le système ONORA
                      </Link>
                    </div>

                    {/* Texte */}
                    <div className="space-y-6 text-center md:text-left">
                      <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/20 px-4 py-1.5 text-xs tracking-[0.25em] uppercase text-gray-900 backdrop-blur-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                          ONORA.STUDIO · build different.
                        </span>
                      </div>

                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                        Tu n&apos;embauches pas une agence.
                        <br />
                        Tu branches un système.
                      </h1>

                      <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                        ONORA recycle le meilleur des designers, marketeurs et devs avec l&apos;IA. On construit des systèmes qui travaillent pour toi pendant que tu t&apos;occupes de ton business et de ta vie.
                      </p>
                    </div>
                  </div>
                </VisionBubble>
              </div>
              
            </section>

            {/* SLIDE 2 – STUDIOS GRID */}
            <section className="w-full h-full flex-shrink-0 snap-start flex flex-col items-center justify-center px-6 py-6 relative">
              <div className="absolute inset-0 bg-black/8 backdrop-blur-sm pointer-events-none" />
              
              {/* Bulle centrée */}
              <div className="relative z-10 w-full flex items-center justify-center flex-1 max-w-7xl">
                <VisionBubble>
                  <div className="space-y-8 h-full flex flex-col">
                    {/* Header */}
                    <div className="text-center">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Nos studios d&apos;IA augmentée
                      </h2>
                      <p className="text-base md:text-lg text-gray-900">
                        ONORA est structuré en 4 studios spécialisés qui travaillent ensemble pour créer des systèmes intelligents et performants.
                      </p>
                    </div>

                    {/* Grid wordmark logos studios (2x2) - NON CLIQUABLES */}
                    <div className="grid grid-cols-2 gap-8 md:gap-12 flex-1 items-center">
                      {[
                        { name: "SKRiiB", wordmark: "/logos/skriib-title.webp", description: "Sites + contenu qui convertissent." },
                        { name: "CLiiP", wordmark: "/logos/cliip-title.webp", description: "Création rapide, visuels & vidéos." },
                        { name: "SIION", wordmark: "/logos/siion-title.webp", description: "Données, dashboards & IA avancée." },
                        { name: "HACKiiNG", wordmark: "/logos/hackiing-title.webp", description: "Automations et agents IA." },
                      ].map((studio) => (
                        <div
                          key={studio.name}
                          className="flex flex-col items-center gap-4"
                        >
                          <img
                            src={studio.wordmark}
                            alt={`Wordmark ${studio.name}`}
                            className="w-full max-w-xs h-auto object-contain"
                            loading="lazy"
                          />
                          <p className="text-sm md:text-base text-gray-900/80 text-center font-medium">
                            {studio.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="pt-4 text-center">
                      <Link
                        to="/studios"
                        className="inline-flex items-center justify-center px-8 py-3.5 rounded-[2rem] bg-white/10 border border-white/20 text-gray-900 font-semibold text-sm md:text-base hover:bg-white/20 active:scale-[0.98] transition-all duration-200"
                        aria-label="Découvrir tous les studios ONORA : SKRiiB, CLiiP, SiioN et HACKiinG"
                      >
                        Découvrir les studios ONORA
                      </Link>
                    </div>
                  </div>
                </VisionBubble>
              </div>
              
            </section>

            {/* SLIDE 3 – MVP IA 48H */}
            <section className="w-full h-full flex-shrink-0 snap-start flex flex-col items-center justify-center px-6 py-6 relative">
              <div className="absolute inset-0 bg-black/8 backdrop-blur-sm pointer-events-none" />
              
              {/* Bulle centrée */}
              <div className="relative z-10 w-full flex items-center justify-center flex-1 max-w-7xl">
                <VisionBubble>
                  <div className="space-y-8 h-full flex flex-col justify-center">
                    {/* Header */}
                    <div className="text-center">
                      <p className="text-xs tracking-[0.5em] uppercase text-gray-900 mb-4 font-medium">
                        HACKiinG · SPRINT 48H
                      </p>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
                        MVP IA en 48h
                      </h2>
                      <p className="text-sm text-gray-900 tracking-wide mb-8">
                        calibré sur ton business
                      </p>
                    </div>

                    {/* Contenu principal */}
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      {/* GAUCHE : Gros chiffres */}
                      <div className="flex flex-col items-center justify-center space-y-6 text-center">
                        <div>
                          <div className="text-7xl md:text-8xl font-light text-gray-900 tracking-tight mb-2">
                            48H
                          </div>
                          <div className="text-3xl md:text-4xl font-light text-purple-400 tracking-tight">
                            290€
                          </div>
                        </div>
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                          <motion.div
                            className="w-4 h-4 rounded-full bg-purple-400"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="text-xs tracking-[0.3em] uppercase text-gray-900 font-medium">
                            MVP PROTOCOL READY
                          </span>
                        </div>
                      </div>

                      {/* DROITE : Description */}
                      <div className="space-y-4">
                        <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                          Je livre un agent fonctionnel sur votre stack. Vous testez. Satisfait ou Remboursé.
                        </p>
                        <p className="text-sm text-gray-900/80">
                          Automatisation complète de vos processus métier en 48 heures chrono.
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-4 text-center">
                      <Link
                        to="/sprint-48h"
                        className="inline-flex items-center justify-center px-8 py-3.5 rounded-[2rem] bg-white/10 border border-white/20 text-gray-900 font-semibold text-sm md:text-base hover:bg-white/20 active:scale-[0.98] transition-all duration-200"
                        aria-label="Lancer un Sprint 48h avec HACKiinG"
                      >
                        Lancer un Sprint 48h
                      </Link>
                    </div>
                  </div>
                </VisionBubble>
              </div>
              
            </section>

            {/* SLIDE 4 – MVP IA 48H */}
            <section className="w-full h-full flex-shrink-0 snap-start flex flex-col items-center justify-center px-6 py-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/8 backdrop-blur-sm pointer-events-none" />
              
              {/* Contenu HackiingSprint */}
              <div className="relative z-10 w-full h-full flex items-center justify-center overflow-y-auto">
                <HackiingSprint onCtaClick={() => scrollToDesktopSlide(4)} />
              </div>
              
            </section>

            {/* SLIDE 5 – ORIGIN */}
            <section className="w-full h-full flex-shrink-0 snap-start flex flex-col items-center justify-center px-6 py-6 relative">
              <div className="absolute inset-0 bg-black/8 backdrop-blur-sm pointer-events-none" />
              
              {/* Bulle centrée */}
              <div className="relative z-10 w-full flex items-center justify-center flex-1 max-w-7xl">
                <VisionBubble>
                  <div className="space-y-6 h-full flex flex-col">
                    {/* Label ACCESS GRANTED */}
                    <div className="flex justify-end">
                      <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-full">
                        <span className="text-[10px] md:text-xs font-mono text-gray-900 tracking-wider">
                          ACCESS GRANTED – SOURCE CODE
                        </span>
                      </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                      SOURCE CODE : ORIGIN
                    </h2>

                    {/* Profil / Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="text-xs uppercase tracking-wider text-gray-900 mb-2">
                          XP
                        </p>
                        <p className="text-2xl font-bold text-gray-900">20 ans</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="text-xs uppercase tracking-wider text-gray-900 mb-2">
                          Rôle
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          Entrepreneur – Builder & Survivor
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <p className="text-xs uppercase tracking-wider text-gray-900 mb-2">
                          Spécialité
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          Résilience, vision business, IA & no-code
                        </p>
                      </div>
                    </div>

                    {/* Texte storytelling */}
                    <div className="space-y-3 text-sm md:text-base text-gray-900 leading-relaxed flex-1 overflow-y-auto">
                      <p>
                        Il y a 20 ans, je lançais mes premières boutiques. Un million
                        d&apos;euros de CA, des équipes, la vitesse, l&apos;ambition. Le succès.
                      </p>
                      <p>
                        Puis le crash. Covid. Tout s&apos;arrête. Les économies partent en
                        fumée. Le solide devient fragile. Le futur, incertain.
                      </p>
                      <p>
                        La reconstruction s&apos;est faite avec les armes du présent : l&apos;IA
                        et le no-code. Des outils que je n&apos;avais pas au moment du crash.
                        Des outils qui auraient tout changé.
                      </p>
                      <p className="text-gray-900 font-semibold">
                        ONORA, c&apos;est l&apos;arme que je construis pour que d&apos;autres n&apos;aient
                        pas à tomber. Pour que les petites entreprises ambitieuses aient
                        accès aux mêmes leviers que les grandes. Sans bullshit. Sans
                        promesses vides. Avec des résultats mesurables.
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="pt-4 text-center">
                      <Link
                        to="/patrice"
                        className="inline-flex items-center justify-center px-8 py-3.5 rounded-[2rem] bg-white/10 border border-white/20 text-gray-900 font-semibold text-sm md:text-base hover:bg-white/20 active:scale-[0.98] transition-all duration-200"
                        aria-label="Découvrir Patrice - Source Code Origin"
                      >
                        Découvrir Patrice
                      </Link>
                    </div>
                  </div>
                </VisionBubble>
              </div>
              
            </section>
          </div>

          {/* Souris + Points de navigation en bas, arrière-plan */}
          <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 items-center gap-4">
            {/* Souris */}
            <motion.div
              className="w-7 h-11 rounded-full border border-gray-900/30 bg-gray-900/10 backdrop-blur-xl flex items-start justify-center p-1 shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
              animate={{
                y: [0, 3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-0.5 h-1.5 rounded-full bg-gray-900/70"
                animate={{
                  y: [0, 12, 0],
                  opacity: [1, 0.3, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            {/* Bullets */}
            <div className="flex items-center gap-2">
              {Array.from({ length: desktopSlidesCount }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToDesktopSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    activeDesktopSlide === idx
                      ? "w-6 bg-cyan-400/90 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                      : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ========== LAYOUT MOBILE VERTICAL ========== */}
        <div className="flex flex-col flex-1 lg:hidden">
          {/* Hero slider horizontal mais page verticale normale */}
          <section className="w-full pt-16 pb-10 px-4 relative">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-md pointer-events-none" />
            <div className="relative z-10 max-w-5xl mx-auto">
              <div
                ref={mobileHeroRef}
                className="
                  flex overflow-x-auto snap-x snap-mandatory space-x-4 pb-6
                  [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden
                "
              >
                {/* Slide mobile 1 – logo + promesse */}
                <div className="snap-start min-w-[90%] bg-white/5 border border-white/15 rounded-[2rem] backdrop-blur-2xl p-6 space-y-6">
                  <div className="flex justify-center">
                    <div className="w-40 h-40 rounded-3xl bg-white/5 border border-white/15 flex items-center justify-center overflow-hidden">
                      <img
                        src="/logo/onora.webp"
                        alt="ONORA.STUDIO – build different."
                        className="w-full h-full object-contain"
                        loading="eager"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/20 px-3 py-1 text-[10px] tracking-[0.25em] uppercase text-gray-900 backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                      Studio IA & no-code · Metz · Luxembourg
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                      Tu n&apos;embauches pas une agence.
                      <br />
                      Tu branches un système.
                    </h1>
                    <p className="text-sm text-gray-900 leading-relaxed">
                      ONORA construit des systèmes IA et no-code qui bossent
                      pour toi pendant que tu gères ton business et ta vie.
                    </p>
                  </div>
                </div>

                {/* Slide mobile 2 – studios */}
                <div className="snap-start min-w-[90%] bg-white/5 border border-white/15 rounded-[2rem] backdrop-blur-2xl p-6 space-y-5">
                  <p className="text-xs text-gray-900 uppercase tracking-[0.2em]">
                    Les studios du système ONORA
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-md text-xs text-gray-900">
                      SKRiiB · Contenu & architecture digitale
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-md text-xs text-gray-900">
                      CLiiP · Créa rapide & motion
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-md text-xs text-gray-900">
                      SiioN · Data & IA avancée
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-md text-xs text-gray-900">
                      HACKiinG · Automations & agents IA
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("modules-mobile")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="mt-2 inline-flex items-center justify-center w-full px-6 py-3 rounded-[2rem] bg-white/90 text-black text-sm font-semibold shadow-[0_18px_40px_rgba(0,0,0,0.8)] active:scale-[0.98] transition-all duration-150"
                  >
                    Découvrir le système ONORA
                  </button>
                </div>
              </div>

              {/* Bullets hero mobile */}
              <div className="flex justify-center gap-2">
                {Array.from({ length: mobileSlidesCount }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-2 rounded-full ${
                      activeMobileSlide === idx
                        ? "w-6 bg-cyan-400"
                        : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Indication scroll vertical */}
              <div className="mt-6 flex flex-col items-center gap-2">
                <div className="w-7 h-10 rounded-full border border-white/35 bg-white/5 backdrop-blur-md flex items-start justify-center p-1">
                  <motion.div
                    className="w-1 h-2 rounded-full bg-white/80"
                    animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.8,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-gray-900">
                  Scroll
                </span>
              </div>
            </div>
          </section>

          {/* Sections verticales classiques */}
          <section id="modules-mobile" className="w-full py-10 px-4 relative">
            <div className="absolute inset-0 bg-black/8 backdrop-blur-sm pointer-events-none" />
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Tes studios ONORA
                </h2>
                <p className="text-base text-gray-900 max-w-3xl mx-auto">
                  ONORA = SKRiiB (contenu), CLiiP (créa rapide), SiioN (data /
                  IA avancée), HACKiinG (automations & agents IA).
                </p>
              </div>
              <ModulesGrid />
            </div>
          </section>

          <section className="w-full px-4 pb-10">
            <HackiingSprint onCtaClick={scrollToWaitlist} />
          </section>

          <section className="w-full px-4 pb-10">
            <NoPortfolio />
          </section>

          <section className="w-full px-4 pb-10">
            <SourceCodeOrigin />
          </section>

          <section className="w-full px-4 pb-10">
            <div ref={waitlistRef}>
              <Waitlist />
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </>
  );
}