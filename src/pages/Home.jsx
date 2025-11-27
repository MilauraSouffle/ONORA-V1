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
      // sur desktop, on va d'abord sur la dernière carte
      scrollToDesktopSlide(4);
      setTimeout(() => {
        waitlistRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      // mobile : scroll vertical normal
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

  // Transforme le scroll vertical en horizontal sur desktop,
  // sauf quand la molette est au-dessus d'une bulle .card-scroll
  useEffect(() => {
    const container = desktopScrollRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // si on scroll dans une bulle de contenu, on laisse le scroll vertical
      const inCard = e.target.closest(".card-scroll");
      if (inCard) return;

      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      container.scrollBy({
        left: e.deltaY * 1.1,
        behavior: "smooth",
      });
    };

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = container;
      if (!clientWidth) return;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveDesktopSlide(index);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", handleScroll);

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
  const desktopSlidesCount = 5; // Hero, Studios, Sprint, Use Cases, Origin+Waitlist

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

      <StatusBar onWaitlistClick={scrollToWaitlist} />
      {/* AuditWidget masqué pour le moment - sera réutilisé plus tard */}

      <div className="w-full min-h-full flex flex-col">
        {/* ========== LAYOUT DESKTOP HORIZONTAL ========== */}
        <div className="hidden lg:flex flex-col flex-1 relative">
          <div
            ref={desktopScrollRef}
            className="
              onora-desktop-slider
              flex-1 flex overflow-x-auto overflow-hidden snap-x snap-mandatory scroll-smooth
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
            "
          >
            {/* SLIDE 1 – HERO / PROMESSE */}
            <section className="w-full h-[calc(100vh-64px)] flex-shrink-0 snap-start flex flex-col items-center px-4 relative">
              <div className="absolute inset-0 bg-black/10 backdrop-blur-md pointer-events-none" />
              
              {/* Bulle remontée */}
              <div className="relative z-10 w-full flex items-center justify-center flex-1" style={{ paddingTop: '4vh', paddingBottom: '15vh' }}>
                <VisionBubble className="-mt-8">
                  <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-[1fr_1.2fr] items-center h-full">
                    {/* Logo ONORA + CTA */}
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative w-full max-w-xs rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden aspect-square flex items-center justify-center p-8">
                        <img
                          src="/logo/onora.webp"
                          alt="ONORA.STUDIO – build different."
                          className="w-full h-full object-contain"
                          loading="eager"
                        />
                      </div>
                      
                      {/* CTA en dessous du logo */}
                      <Link
                        to="/about"
                        className="inline-flex items-center justify-center px-8 py-3.5 rounded-[2rem] bg-white/10 border border-white/20 text-gray-900 font-semibold text-sm md:text-base hover:bg-white/20 active:scale-[0.98] transition-all duration-200"
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
            <section className="w-full h-[calc(100vh-64px)] flex-shrink-0 snap-start flex flex-col items-center px-4 relative">
              <div className="absolute inset-0 bg-black/8 backdrop-blur-sm pointer-events-none" />
              
              {/* Bulle remontée */}
              <div className="relative z-10 w-full flex items-center justify-center flex-1" style={{ paddingTop: '4vh', paddingBottom: '15vh' }}>
                <VisionBubble className="-mt-8">
                  <div className="space-y-8 h-full flex flex-col">
                    {/* Header */}
                    <div className="text-center">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Nos studios d&apos;IA augmentée
                      </h2>
                      <p className="text-base md:text-lg text-gray-900">
                        Quatre modules pour booster ton business de tous les côtés.
                      </p>
                    </div>

                    {/* Grid logos studios */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 flex-1 items-center">
                      {[
                        { name: "SKRIIB", logo: "/logos/logo-skriib.png", path: "/studios/skriib" },
                        { name: "CLiiP", logo: "/logos/logo-cliip.png", path: "/studios/cliip" },
                        { name: "SIION", logo: "/logos/logo-siion.png", path: "/studios/siion" },
                        { name: "HACKiinG", logo: "/logos/logo-hackiing.png", path: "/studios/hackiing" },
                      ].map((studio, idx) => (
                        <Link
                          key={studio.name}
                          to={studio.path}
                          className="group flex flex-col items-center gap-3"
                        >
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            className="relative"
                          >
                            <img
                              src={studio.logo}
                              alt={studio.name}
                              className="w-24 h-24 md:w-32 md:h-32 object-contain transition-all duration-300"
                            />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 pointer-events-none bg-cyan-400" />
                          </motion.div>
                          <span className="text-sm md:text-base font-medium text-gray-800 text-center">
                            {studio.name}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="pt-4 text-center">
                      <Link
                        to="/studios/skriib"
                        className="inline-flex items-center justify-center px-8 py-3.5 rounded-[2rem] bg-white/10 border border-white/20 text-gray-900 font-semibold text-sm md:text-base hover:bg-white/20 active:scale-[0.98] transition-all duration-200"
                      >
                        Voir les studios ONORA
                      </Link>
                    </div>
                  </div>
                </VisionBubble>
              </div>
              
            </section>

            {/* SLIDE 3 – MVP IA 48H */}
            <section className="w-full h-[calc(100vh-64px)] flex-shrink-0 snap-start flex flex-col items-center px-4 relative">
              <div className="absolute inset-0 bg-black/8 backdrop-blur-sm pointer-events-none" />
              
              {/* Bulle remontée */}
              <div className="relative z-10 w-full flex items-center justify-center flex-1" style={{ paddingTop: '4vh', paddingBottom: '15vh' }}>
                <VisionBubble className="-mt-8">
                  <div className="space-y-8 text-center h-full flex flex-col justify-center">
                    <div>
                      <span className="inline-block py-1 px-3 rounded-full bg-purple-500/20 border border-purple-500/50 text-xs font-mono tracking-wider uppercase text-purple-300 mb-4">
                        HACKiinG · Sprint
                      </span>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Arrêtez les réunions.
                        <br />
                        Payez pour voir.
                      </h2>
                      <p className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        MVP IA en 48h Chrono.
                      </p>
                      <p className="text-base md:text-lg text-gray-900 max-w-2xl mx-auto leading-relaxed">
                        Je livre un agent fonctionnel sur votre stack. Vous testez. Satisfait ou Remboursé. <span className="font-bold text-gray-900">290€ HT+</span>
                      </p>
                    </div>
                    <div className="pt-4">
                      <Link
                        to="/studios/hackiing"
                        className="inline-flex items-center justify-center px-8 py-3.5 rounded-[2rem] bg-white/10 border border-white/20 text-gray-900 font-semibold text-sm md:text-base hover:bg-white/20 active:scale-[0.98] transition-all duration-200"
                      >
                        Lancer le challenge
                      </Link>
                    </div>
                  </div>
                </VisionBubble>
              </div>
              
            </section>

            {/* SLIDE 4 – USE CASES TEASER */}
            <section className="w-full h-[calc(100vh-64px)] flex-shrink-0 snap-start flex flex-col items-center px-4 relative">
              <div className="absolute inset-0 bg-black/8 backdrop-blur-sm pointer-events-none" />
              
              {/* Bulle remontée */}
              <div className="relative z-10 w-full flex items-center justify-center flex-1" style={{ paddingTop: '4vh', paddingBottom: '15vh' }}>
                <VisionBubble className="-mt-8">
                  <div className="space-y-8 text-center h-full flex flex-col justify-center">
                    <div>
                      <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wider uppercase text-gray-900 mb-4">
                        Use Cases · Reality Check
                      </span>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Pas de portfolio.
                        <br />
                        <span className="text-gray-900">
                          Des résultats.
                        </span>
                      </h2>
                      <p className="text-base md:text-lg text-gray-900 max-w-2xl mx-auto leading-relaxed">
                        Ici on ne vous montre pas de &quot;portfolio&quot; de nos réalisations. Mais des résultats et des cas d&apos;usages concrets où chaque entrepreneur, commerçant et indépendant se retrouve.
                      </p>
                    </div>
                    <div className="pt-4">
                      <Link
                        to="/usecases"
                        className="inline-flex items-center justify-center px-8 py-3.5 rounded-[2rem] bg-white/10 border border-white/20 text-gray-900 font-semibold text-sm md:text-base hover:bg-white/20 active:scale-[0.98] transition-all duration-200"
                      >
                        Voir les cas réels
                      </Link>
                    </div>
                  </div>
                </VisionBubble>
              </div>
              
            </section>

            {/* SLIDE 5 – ORIGIN */}
            <section className="w-full h-[calc(100vh-64px)] flex-shrink-0 snap-start flex flex-col items-center px-4 relative">
              <div className="absolute inset-0 bg-black/8 backdrop-blur-sm pointer-events-none" />
              
              {/* Bulle remontée */}
              <div className="relative z-10 w-full flex items-center justify-center flex-1" style={{ paddingTop: '4vh', paddingBottom: '15vh' }}>
                <VisionBubble className="-mt-8">
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
                  </div>
                </VisionBubble>
              </div>
              
            </section>
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