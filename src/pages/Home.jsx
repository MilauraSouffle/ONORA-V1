// src/pages/Home.jsx
// VERSION : PURE GLASS & FLIP-CARDS FIXED
// - Plus de rectangle sombre parasite
// - Dimensions Golden Master rétablies
// - Bug Miroir corrigé (via styles inline)
// - Design "Business Dashboard" (Pas de code, que du résultat)

import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import HackiingSprint from "../components/HackiingSprint";
import Waitlist from "../components/Waitlist";
import Footer from "../components/Footer";
import SourceCodeOrigin from "../components/SourceCodeOrigin";
import StatusBar from "../components/StatusBar";
import VisionBubble from "../components/VisionBubble";

// --- COMPOSANT CTA UNIFIÉ ---
const ShineButton = ({ to, children, className = "" }) => (
    <Link
      to={to}
      className={`group relative inline-flex items-center justify-center px-8 py-3.5 rounded-[2rem] bg-white/10 border border-gray-900/20 text-gray-900 font-bold text-sm tracking-wide overflow-hidden hover:bg-white/30 transition-all shadow-sm ${className}`}
    >
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:animate-shine" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Link>
);

// --- COMPOSANT FLIP CARD (CORRIGÉ & STABILISÉ) ---
// Utilise des styles inline pour garantir la 3D sans dépendre de la config Tailwind
const FlipCard = ({ icon, title, value, color, backTitle, backDesc }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group relative h-32 xl:h-40 w-full cursor-pointer"
      style={{ perspective: '1000px' }} // Force la perspective 3D
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div 
        className="relative h-full w-full transition-all duration-500"
        style={{ transformStyle: 'preserve-3d' }} // Indispensable pour l'effet
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* FACE AVANT (Dashboard) */}
        <div 
            className="absolute inset-0 bg-white/60 border border-white/60 rounded-2xl p-4 shadow-sm flex flex-col justify-between backdrop-blur-md"
            style={{ backfaceVisibility: 'hidden' }} // Cache le dos quand on regarde devant
        >
            <div className="flex justify-between items-start">
                <div className={`w-8 h-8 xl:w-10 xl:h-10 rounded-xl flex items-center justify-center ${color}`}>
                    {icon}
                </div>
                <div className="bg-white/50 px-2 py-1 rounded text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                    Actif
                </div>
            </div>
            <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase">{title}</p>
                <p className="text-xl xl:text-2xl font-black text-gray-800 tracking-tight">{value}</p>
            </div>
        </div>

        {/* FACE ARRIÈRE (Explication Business) */}
        <div 
            className="absolute inset-0 bg-white/90 border border-blue-200 rounded-2xl p-4 shadow-xl flex flex-col justify-center items-center text-center backdrop-blur-xl"
            style={{ 
                backfaceVisibility: 'hidden', 
                transform: 'rotateY(180deg)' // Pivote le dos pour qu'il soit à l'endroit une fois retourné
            }}
        >
            <p className="text-xs font-black text-orange-500 uppercase mb-1">{backTitle}</p>
            <p className="text-[10px] xl:text-xs text-blue-900 leading-snug font-medium">
                {backDesc}
            </p>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================================================
// PAGE PRINCIPALE
// ============================================================================

export default function Home() {
  const waitlistRef = useRef(null);
  const desktopScrollRef = useRef(null);
  
  const [activeDesktopSlide, setActiveDesktopSlide] = useState(0);
  const desktopSlidesCount = 5; 
  const lastScrollTime = useRef(0);

  const scrollToDesktopSlide = (index) => {
    const container = desktopScrollRef.current;
    if (!container) return;
    const width = container.clientWidth;
    container.scrollTo({
      left: width * index,
      behavior: "smooth",
    });
  };

  // Moteur de Scroll
  useEffect(() => {
    const container = desktopScrollRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      const inCard = e.target.closest(".card-scroll");
      if (inCard) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      e.stopPropagation();

      const isTrackpad = Math.abs(e.deltaY) < 40 && e.deltaMode === 0;

      if (isTrackpad) {
        container.scrollLeft += e.deltaY * 1.5;
      } else {
        const now = Date.now();
        if (now - lastScrollTime.current < 600) return;
        const direction = e.deltaY > 0 ? 1 : -1;
        const width = container.clientWidth;
        const current = Math.round(container.scrollLeft / width);
        const target = Math.min(Math.max(current + direction, 0), desktopSlidesCount - 1);
        if (target !== current) {
            lastScrollTime.current = now;
            scrollToDesktopSlide(target);
        }
      }
    };
    
    const handleScroll = () => {
        const scrollLeft = container.scrollLeft;
        const width = container.clientWidth;
        const index = Math.round(scrollLeft / width);
        setActiveDesktopSlide(index);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>ONORA – Le Système IA pour votre Business</title>
        <meta name="description" content="L'agence marketing est obsolète. Activez le système ONORA." />
      </Helmet>

      <div className="w-full h-screen flex flex-col relative overflow-hidden">
        
        <StatusBar />

        {/* ================================================================= */}
        {/* LAYOUT DESKTOP */}
        {/* ================================================================= */}
        <div className="hidden lg:flex flex-col flex-1 h-full w-full relative">
          
          {/* NAVIGATION DROITE */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6 pointer-events-none">
            <div className="flex flex-col gap-3 pointer-events-auto">
                {Array.from({ length: desktopSlidesCount }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => scrollToDesktopSlide(idx)}
                        className={`transition-all duration-500 ease-out rounded-full shadow-lg border border-white/10 backdrop-blur-sm ${activeDesktopSlide === idx ? "h-8 w-2 bg-blue-600 shadow-lg scale-110" : "h-2 w-2 bg-blue-900/30 hover:bg-blue-600/50 hover:scale-125"}`}
                    />
                ))}
            </div>
          </div>

          {/* SLIDER */}
          <div
            ref={desktopScrollRef}
            className="
              onora-desktop-slider
              w-full h-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory
              items-start
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
              pt-[60px] pb-[200px]
            "
          >
            {/* --- SLIDE 1 : HERO - FLIP DASHBOARD (CLEAN VERSION) --- */}
            <section className="w-full h-full flex-shrink-0 snap-center px-4 md:px-8">
              {/* VisionBubble remplit toute la hauteur disponible dans le padding */}
              <VisionBubble className="h-full relative overflow-hidden flex flex-col items-center justify-center">
                
                {/* 1. BULLE STATUS (Design Pillule Screen 1) */}
                <div className="absolute top-6 right-6 z-40 flex items-center gap-3 px-5 py-2.5 bg-white/40 backdrop-blur-md border border-white/40 rounded-full shadow-sm">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
                    </span>
                    <span className="text-[10px] md:text-[11px] font-bold tracking-widest text-gray-900 uppercase font-mono pt-0.5">
                      Les agences sont obsolètes. ONORA – System activé.
                    </span>
                </div>

                {/* GRILLE PRINCIPALE */}
                <div className="w-full max-w-[1400px] mx-auto h-full grid grid-cols-1 lg:grid-cols-[0.35fr_1.65fr] gap-6 relative z-10">
                  
                  {/* --- COLONNE GAUCHE : IDENTITÉ --- */}
                  <div className="flex flex-col items-start justify-start pt-12 pl-4 relative z-20 h-full pointer-events-none">
                    <div className="pointer-events-auto">
                        <img src="/logo/onora.webp" alt="ONORA" className="w-40 md:w-56 object-contain mb-8 origin-top-left" />
                        <ShineButton to="/about" className="mb-8">
                            DÉCOUVRIR LE SYSTÈME
                        </ShineButton>
                        <div className="space-y-4 max-w-lg">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-950 leading-none uppercase tracking-tight">
                              ONORA.
                            </h1>
                            <p className="text-gray-900 text-base md:text-lg font-medium leading-relaxed">
                              T’en as marre de payer <span className="font-black">5 000 €/mois</span> à une agence ? <br/>
                              Activez le <span className="text-blue-800 font-extrabold">système IA complet</span> qui pilote votre business 24/7.
                            </p>
                        </div>
                    </div>
                  </div>

                  {/* --- COLONNE DROITE : DASHBOARD FLOTTANT (PURE GLASS) --- */}
                  <div className="hidden lg:flex items-center justify-center relative w-full h-full">
                      
                      {/* CONTENEUR DASHBOARD (Sans rectangle foncé !) */}
                      <div className="relative w-[850px] h-[550px] flex flex-col justify-center">
                          
                          {/* Header Dashboard Simplifié */}
                          <div className="flex items-center justify-between px-2 mb-4">
                              <div className="flex items-center gap-2 bg-white/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                  <span className="text-[10px] font-bold text-blue-900/70 uppercase tracking-wider">
                                      Tableau de bord Entrepreneur
                                  </span>
                              </div>
                          </div>

                          {/* GRID DES 4 CARTES (Design Glass) */}
                          <div className="grid grid-cols-2 gap-4 h-full max-h-[450px]">
                              
                              {/* CARTE 1 : ACQUISITION */}
                              <FlipCard 
                                icon={<svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                                title="Clients / Mois"
                                value="+45 Prospects"
                                color="bg-blue-100"
                                backTitle="Finie la prospection"
                                backDesc="Le système cible, attire et qualifie vos clients idéaux 24/7. Vous ne parlez qu'à ceux qui veulent acheter."
                              />

                              {/* CARTE 2 : GESTION TEMPS */}
                              <FlipCard 
                                icon={<svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                title="Temps de Gestion"
                                value="0h / Semaine"
                                color="bg-purple-100"
                                backTitle="Récupérez votre vie"
                                backDesc="Posts, emails, relances... L'IA gère 100% de la routine. Concentrez-vous sur votre métier, pas sur l'admin."
                              />

                              {/* CARTE 3 : CHIFFRE D'AFFAIRE */}
                              <FlipCard 
                                icon={<svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                title="Conversion Site"
                                value="Ventes Auto."
                                color="bg-green-100"
                                backTitle="Un site qui vend"
                                backDesc="Votre site n'est plus une vitrine, c'est un commercial. Il capture, convainc et encaisse pendant que vous dormez."
                              />

                              {/* CARTE 4 : CORE SYSTEM (Plus de code, que du visuel) */}
                              <div className="group relative bg-white/40 border border-white/50 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:bg-white/60 transition-all cursor-default backdrop-blur-md">
                                   <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                            </div>
                                            <span className="text-[10px] font-bold text-blue-900 uppercase">ONORA CORE</span>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                   </div>
                                   
                                   <div className="mt-4">
                                       <p className="text-xl font-black text-blue-900 mb-1">Pilotez tout.</p>
                                       <div className="w-full bg-white/50 h-1.5 rounded-full mt-2 overflow-hidden">
                                           <div className="h-full bg-blue-500 w-[85%] rounded-full animate-pulse"></div>
                                       </div>
                                       <p className="text-[9px] text-gray-500 mt-2 font-medium">
                                           Plus de fichiers Excel. Plus d'outils dispersés. <br/>
                                           <span className="text-blue-800 font-bold">Un seul écran pour régner.</span>
                                       </p>
                                   </div>
                              </div>

                          </div>
                      </div>
                  </div>

                </div>
              </VisionBubble>
            </section>

            {/* --- SLIDE 2 : LES STUDIOS --- */}
            <section className="w-full h-full flex-shrink-0 snap-center px-8">
              <VisionBubble className="h-full">
                <div className="flex flex-col h-full justify-center space-y-10 2xl:space-y-16">
                  <div className="text-center">
                    <h2 className="text-4xl 2xl:text-5xl font-bold text-white mb-3">Nos studios d&apos;IA augmentée</h2>
                    <p className="text-lg 2xl:text-xl text-gray-400">Quatre modules pour booster ton business de tous les côtés.</p>
                  </div>
                  <div className="grid grid-cols-4 gap-6 2xl:gap-12 items-start">
                     {[
                        { name: "SKRiiB", img: "/logos/skriib-title.webp", desc: "Sites + contenu." },
                        { name: "CLiiP", img: "/logos/cliip-title.webp", desc: "Visuels & vidéos." },
                        { name: "SIION", img: "/logos/siion-title.webp", desc: "Data & IA." },
                        { name: "HACKiiNG", img: "/logos/hackiing-title.webp", desc: "Automations." },
                      ].map((studio) => (
                        <div key={studio.name} className="flex flex-col items-center gap-4">
                          <img src={studio.img} alt={studio.name} className="w-full max-w-[180px] 2xl:max-w-[240px] h-auto object-contain brightness-125" />
                          <p className="text-sm 2xl:text-lg text-gray-400 text-center font-medium">{studio.desc}</p>
                        </div>
                      ))}
                  </div>
                  <div className="text-center pt-6">
                      <Link to="/studios" className="inline-flex items-center justify-center px-8 py-3.5 rounded-[2rem] bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all">
                        Découvrir les studios
                      </Link>
                  </div>
                </div>
              </VisionBubble>
            </section>

            {/* --- SLIDE 3 : SPRINT --- */}
            <section className="w-full h-full flex-shrink-0 snap-center px-8">
                <VisionBubble className="h-full flex flex-col justify-center">
                    <HackiingSprint onCtaClick={() => scrollToDesktopSlide(4)} />
                </VisionBubble>
            </section>

            {/* --- SLIDE 4 : USE CASES --- */}
            <section className="w-full h-full flex-shrink-0 snap-center px-8">
              <VisionBubble className="h-full">
                <div className="flex flex-col h-full justify-center text-center space-y-10">
                    <div>
                      <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wider uppercase text-gray-400 mb-6 backdrop-blur-md">
                        Use Cases · Reality Check
                      </span>
                      <h2 className="text-6xl 2xl:text-7xl font-bold text-white mb-6 tracking-tight">
                        Pas de portfolio.<br />
                        <span className="text-gray-500">Des résultats.</span>
                      </h2>
                      <p className="text-xl 2xl:text-2xl text-gray-300 max-w-2xl 2xl:max-w-4xl mx-auto font-light leading-relaxed">
                        Ici on ne vous montre pas de &quot;portfolio&quot;. Mais des résultats et des cas d&apos;usages concrets où chaque entrepreneur se retrouve.
                      </p>
                    </div>
                    <div>
                      <Link to="/usecases" className="inline-flex items-center justify-center px-10 py-4 rounded-[2rem] bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all">
                        Voir les cas réels
                      </Link>
                    </div>
                </div>
              </VisionBubble>
            </section>

            {/* --- SLIDE 5 : ORIGIN --- */}
            <section className="w-full h-full flex-shrink-0 snap-center px-8">
              <VisionBubble className="h-full !bg-transparent !border-none !shadow-none !backdrop-blur-none">
                  <SourceCodeOrigin />
              </VisionBubble>
            </section>

          </div>
        </div>

        {/* ================================================================= */}
        {/* LAYOUT MOBILE (Vertical) */}
        {/* ================================================================= */}
        <div className="flex flex-col flex-1 lg:hidden pt-32 pb-28 space-y-8 overflow-y-auto">
          
          {/* HERO MOBILE (Avec Flip Cards 2x2) */}
          <div className="px-4">
            <VisionBubble padding="p-6">
                <div className="flex flex-col items-center text-center gap-6 mb-8">
                    <img src="/logo/onora.webp" alt="ONORA" className="w-32 object-contain" />
                    <ShineButton to="/about">DÉCOUVRIR LE SYSTÈME</ShineButton>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-extrabold text-blue-950 uppercase">ONORA.</h1>
                        <p className="text-gray-900 text-sm">T’en as marre de payer 5000€/mois ? Activez le système IA complet.</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <FlipCard 
                        icon={<svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                        title="Clients"
                        value="+45"
                        color="bg-blue-100"
                        backTitle="Stop Prospection"
                        backDesc="L'IA attire vos clients idéaux 24/7."
                    />
                    <FlipCard 
                        icon={<svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        title="Gestion"
                        value="0h"
                        color="bg-purple-100"
                        backTitle="Liberté"
                        backDesc="L'IA gère 100% de la routine."
                    />
                    <FlipCard 
                        icon={<svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        title="Ventes"
                        value="Auto"
                        color="bg-green-100"
                        backTitle="Conversion"
                        backDesc="Encaissez pendant que vous dormez."
                    />
                    {/* Carte Core Mobile Simplifiée */}
                    <div className="bg-white/40 border border-white/50 rounded-2xl p-3 flex flex-col justify-center items-center text-center">
                         <p className="text-[9px] font-bold text-blue-900 uppercase">CORE</p>
                         <p className="text-sm font-black mt-1 text-blue-900">Pilotez tout.</p>
                    </div>
                </div>
            </VisionBubble>
          </div>

          <div className="px-4"><VisionBubble padding="p-6"><h2 className="text-xl font-bold text-white mb-6 text-center">Les studios</h2><div className="grid grid-cols-2 gap-3">{[{ name: "SKRiiB", desc: "Contenu" },{ name: "CLiiP", desc: "Visuels" },{ name: "SIION", desc: "Data" },{ name: "HACKiiNG", desc: "Automations" },].map(s => (<div key={s.name} className="bg-white/5 p-3 rounded-xl border border-white/10 text-center"><span className="block font-bold text-white text-sm">{s.name}</span><span className="text-[10px] text-gray-400">{s.desc}</span></div>))}</div><div className="mt-6 text-center"><Link to="/studios" className="text-sm font-semibold text-white underline">Voir tout</Link></div></VisionBubble></div>
          <div className="w-full"><HackiingSprint onCtaClick={() => waitlistRef.current?.scrollIntoView()} /></div>
          <div className="px-4"><VisionBubble padding="p-8"><div className="text-center space-y-6"><span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Reality Check</span><h2 className="text-2xl font-bold text-white">Pas de portfolio.<br/>Des résultats.</h2><Link to="/usecases" className="block w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-sm text-center">Voir les cas réels</Link></div></VisionBubble></div>
          <div className="px-4"><VisionBubble padding="p-6" className="!bg-transparent !shadow-none !border-none"><SourceCodeOrigin /></VisionBubble></div>
          <div ref={waitlistRef} className="px-4"><Waitlist /></div>
          <Footer />
        </div>
      </div>
    </>
  );
}