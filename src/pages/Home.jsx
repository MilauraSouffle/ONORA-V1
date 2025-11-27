// src/pages/Home.jsx
// Dashboard ONORA – layout desktop horizontal + layout mobile vertical

import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import ModulesGrid from "../components/ModulesGrid";
import HackiingSprint from "../components/HackiingSprint";
import NoPortfolio from "../components/NoPortfolio";
import Waitlist from "../components/Waitlist";
import Footer from "../components/Footer";
import SourceCodeOrigin from "../components/SourceCodeOrigin";
import StatusBar from "../components/StatusBar";
import AuditWidget from "../components/AuditWidget";

export default function Home() {
  const waitlistRef = useRef(null);

  // Desktop horizontal
  const desktopScrollRef = useRef(null);
  const [activeDesktopSlide, setActiveDesktopSlide] = useState(0);

  // Mobile hero slider
  const mobileHeroRef = useRef(null);
  const [activeMobileSlide, setActiveMobileSlide] = useState(0);

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll vertical → horizontal sur desktop (carrousel)
  const handleDesktopWheel = (e) => {
    const container = desktopScrollRef.current;
    if (!container) return;

    // 1) Si on est dans une zone marquée "vertical-scroll", on ne touche à rien
    const verticalZone = e.target.closest?.("[data-vertical-scroll='true']");
    if (verticalZone) return;

    // 2) Si le scroll est déjà majoritairement horizontal (trackpad), on laisse faire
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    // 3) Si on est déjà au tout début ou à la toute fin, on ne bloque pas
    if (
      (container.scrollLeft <= 0 && e.deltaY < 0) ||
      (container.scrollLeft >= maxScrollLeft && e.deltaY > 0)
    ) {
      return;
    }

    // 4) Sinon on détourne le scroll vertical vers le scroll horizontal
    e.preventDefault();
    container.scrollBy({
      left: e.deltaY * 1.1,
      behavior: "smooth",
    });
  };

  const handleDesktopScroll = (e) => {
    const { scrollLeft, clientWidth } = e.currentTarget;
    if (!clientWidth) return;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveDesktopSlide(index);
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

  // Slider mobile – suivi + contrôle par bullets
  const handleMobileHeroScroll = (e) => {
    const { scrollLeft, clientWidth } = e.currentTarget;
    if (!clientWidth) return;
    const i = Math.round(scrollLeft / clientWidth);
    setActiveMobileSlide(i);
  };

  const scrollToMobileSlide = (index) => {
    const el = mobileHeroRef.current;
    if (!el) return;
    const width = el.clientWidth;
    el.scrollTo({
      left: width * index,
      behavior: "smooth",
    });
  };

  const mobileSlidesCount = 2;
  const desktopSlidesCount = 5; // Hero, Studios, Sprint, Use Cases, Origin+Waitlist

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
          content="Metz, Luxembourg, Grand Est, studio IA, automatisation, no-code, MVP, agents IA, HACKiinG, SKRiiB, CLiiP, SiioN"
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

      <StatusBar onWaitlistClick={scrollToWaitlist} />
      <AuditWidget />

      <div className="w-full min-h-full flex flex-col">
        {/* ========== LAYOUT DESKTOP HORIZONTAL ========== */}
        <div className="hidden lg:flex flex-col flex-1">
          <div
            ref={desktopScrollRef}
            onWheel={handleDesktopWheel}
            onScroll={handleDesktopScroll}
            className="
              flex-1 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
            "
          >
            {/* SLIDE 1 – HERO / PROMESSE */}
            <section className="w-full h-[calc(100vh-64px)] flex-shrink-0 snap-start flex items-center px-10 xl:px-20 relative">
              <div className="absolute inset-0 bg-black/35 backdrop-blur-xl pointer-events-none" />
              <div className="relative z-10 w-full max-w-6xl mx-auto">
                <div className="grid gap-12 grid-cols-[minmax(0,1.05fr)_minmax(0,1.2fr)] items-center">
                  {/* Logo ONORA */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="flex justify-center"
                  >
                    <div className="relative w-full max-w-md rounded-[2.5rem] bg-white/8 border border-white/15 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden">
                      <div className="aspect-square flex items-center justify-center p-10">
                        <img
                          src="/logo/onora.webp"
                          alt="ONORA.STUDIO – build different."
                          className="w-full h-full object-contain"
                          loading="eager"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Texte + studios */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="space-y-8"
                  >
                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/20 px-4 py-1 text-xs tracking-[0.25em] uppercase text-gray-200 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                        Studio IA & no-code · Metz · Nancy · Strasbourg · Luxembourg
                      </span>
                    </div>

                    <h1 className="text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight">
                      Tu n&apos;embauches pas une agence.
                      <br />
                      Tu branches un système.
                    </h1>

                    <p className="text-lg text-gray-200/90 max-w-xl leading-relaxed">
                      ONORA recycle le meilleur des designers, marketeurs et devs
                      avec l&apos;IA. On construit des systèmes qui travaillent pour
                      toi pendant que tu t&apos;occupes de ton business et de ta vie.
                    </p>

                    <div className="space-y-3">
                      <p className="text-xs text-gray-300 uppercase tracking-[0.2em]">
                        Les studios du système ONORA
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <div className="px-4 py-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-md text-sm text-white/90">
                          SKRiiB · Contenu & architecture digitale
                        </div>
                        <div className="px-4 py-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-md text-sm text-white/90">
                          CLiiP · Créa rapide & motion
                        </div>
                        <div className="px-4 py-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-md text-sm text-white/90">
                          SiioN · Data & IA avancée
                        </div>
                        <div className="px-4 py-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-md text-sm text-white/90">
                          HACKiinG · Automations & agents IA
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => scrollToDesktopSlide(1)}
                        className="inline-flex items-center justify-center px-10 py-4 rounded-[2rem] bg-white/90 text-black font-semibold text-base tracking-wide shadow-[0_25px_60px_rgba(0,0,0,0.9)] hover:bg-white active:scale-[0.98] transition-all duration-200"
                      >
                        Découvrir le système ONORA
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Indicateur scroll horizontal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                >
                  <div className="w-10 h-10 rounded-full border border-white/30 bg-white/5 backdrop-blur-md flex items-center justify-center">
                    <ChevronDown className="w-5 h-5 text-white rotate-90" />
                  </div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-gray-300">
                    Slide
                  </span>
                </motion.div>
              </div>
            </section>

            {/* SLIDE 2 – STUDIOS GRID */}
            <section className="w-full h-[calc(100vh-64px)] flex-shrink-0 snap-start px-10 xl:px-20 py-16 relative">
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-none" />
              <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col justify-center">
                <div className="text-center mb-10">
                  <h2 className="text-4xl xl:text-5xl font-bold text-white mb-4">
                    Tes studios ONORA
                  </h2>
                  <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                    ONORA = SKRiiB (contenu), CLiiP (créa rapide), SiioN (data / IA
                    avancée), HACKiinG (automations & agents IA).
                  </p>
                </div>
                <ModulesGrid />
              </div>
            </section>

            {/* SLIDE 3 – SPRINT 48H */}
            <section className="w-full h-[calc(100vh-64px)] flex-shrink-0 snap-start px-10 xl:px-20 py-16 relative">
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-none" />
              <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center">
                <HackiingSprint onCtaClick={scrollToWaitlist} />
              </div>
            </section>

            {/* SLIDE 4 – USE CASES (scroll vertical interne) */}
            <section
              data-vertical-scroll="true"
              className="w-full h-[calc(100vh-64px)] flex-shrink-0 snap-start px-10 xl:px-20 py-16 relative overflow-y-auto"
            >
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-none" />
              <div className="relative z-10 w-full max-w-6xl mx-auto">
                <NoPortfolio />
              </div>
            </section>

            {/* SLIDE 5 – ORIGIN + WAITLIST + FOOTER (scroll vertical interne) */}
            <section
              data-vertical-scroll="true"
              className="w-full h-[calc(100vh-64px)] flex-shrink-0 snap-start px-10 xl:px-20 py-16 relative overflow-y-auto"
            >
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-none" />
              <div className="relative z-10 w-full max-w-6xl mx-auto space-y-16">
                <SourceCodeOrigin />
                <div ref={waitlistRef}>
                  <Waitlist />
                </div>
                <Footer />
              </div>
            </section>
          </div>

          {/* Bullets de navigation desktop */}
          <div className="hidden lg:flex justify-center gap-2 py-4">
            {Array.from({ length: desktopSlidesCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToDesktopSlide(idx)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  activeDesktopSlide === idx
                    ? "w-6 bg-cyan-400"
                    : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ========== LAYOUT MOBILE VERTICAL ========== */}
        <div className="flex flex-col flex-1 lg:hidden">
          {/* Hero slider horizontal mais page verticale normale */}
          <section className="w-full pt-16 pb-10 px-4 relative">
            <div className="absolute inset-0 bg-black/35 backdrop-blur-xl pointer-events-none" />
            <div className="relative z-10 max-w-5xl mx-auto">
              <div
                ref={mobileHeroRef}
                onScroll={handleMobileHeroScroll}
                className="
                  flex overflow-x-auto snap-x snap-mandatory space-x-4 pb-6
                  [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden
                "
              >
                {/* Slide mobile 1 – logo + promesse */}
                <div className="snap-start min-w-full bg:white/5 bg-white/5 border border-white/15 rounded-[2rem] backdrop-blur-2xl p-6 space-y-6">
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
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/8 border border-white/20 px-3 py-1 text-[10px] tracking-[0.25em] uppercase text-gray-200 backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                      Studio IA & no-code · Metz · Luxembourg
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                      Tu n&apos;embauches pas une agence.
                      <br />
                      Tu branches un système.
                    </h1>
                    <p className="text-sm text-gray-200/90 leading-relaxed">
                      ONORA construit des systèmes IA et no-code qui bossent pour
                      toi pendant que tu gères ton business et ta vie.
                    </p>
                  </div>
                </div>

                {/* Slide mobile 2 – studios */}
                <div className="snap-start min-w-full bg-white/5 border border-white/15 rounded-[2rem] backdrop-blur-2xl p-6 space-y-5">
                  <p className="text-xs text-gray-300 uppercase tracking-[0.2em]">
                    Les studios du système ONORA
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-md text-xs text-white/90">
                      SKRiiB · Contenu & architecture digitale
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-md text-xs text-white/90">
                      CLiiP · Créa rapide & motion
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-md text-xs text:white/90 text-white/90">
                      SiioN · Data & IA avancée
                    </div>
                    <div className="px-4 py-2 rounded-full bg:white/8 bg-white/8 border border-white/15 backdrop-blur-md text-xs text-white/90">
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
                    className="mt-2 inline-flex items-center justify-center w-full px-6 py-3 rounded-[2rem] bg:white/90 bg-white/90 text-black text-sm font-semibold shadow-[0_18px_40px_rgba(0,0,0,0.8)] active:scale-[0.98] transition-all duration-150"
                  >
                    Découvrir le système ONORA
                  </button>
                </div>
              </div>

              {/* Bullets hero mobile (cliquables) */}
              <div className="flex justify-center gap-2">
                {Array.from({ length: mobileSlidesCount }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToMobileSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-200 ${
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
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  />
                </div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-gray-300">
                  Scroll
                </span>
              </div>
            </div>
          </section>

          {/* Sections classiques en vertical */}
          <section id="modules-mobile" className="w-full py-10 px-4 relative">
            <div className="absolute inset-0 bg-black/18 backdrop-blur-sm pointer-events-none" />
            <div className="relative z-10 max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Tes studios ONORA
                </h2>
                <p className="text-base text-gray-300 max-w-3xl mx-auto">
                  ONORA = SKRiiB (contenu), CLiiP (créa rapide), SiioN (data / IA
                  avancée), HACKiinG (automations & agents IA).
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