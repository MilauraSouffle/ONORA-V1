// src/pages/Home.jsx
// VERSION ANCRAGE FIXE :
// - Top : Toujours calé sous la barre (plus de vide aléatoire)
// - Bottom : Toujours calé au dessus du dock
// - Hauteur : S'étire pour remplir l'espace

import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import ModulesGrid from "../components/ModulesGrid";
import HackiingSprint from "../components/HackiingSprint";
import Waitlist from "../components/Waitlist";
import Footer from "../components/Footer";
import SourceCodeOrigin from "../components/SourceCodeOrigin";
import StatusBar from "../components/StatusBar";
import VisionBubble from "../components/VisionBubble";

export default function Home() {
  const waitlistRef = useRef(null);
  const desktopScrollRef = useRef(null);
  const mobileHeroRef = useRef(null);
  
  const [activeDesktopSlide, setActiveDesktopSlide] = useState(0);
  const desktopSlidesCount = 5; 
  const lastScrollTime = useRef(0);

  const scrollToWaitlist = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      scrollToDesktopSlide(4);
    } else {
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

  // Moteur Scroll
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
        <title>ONORA – Studio IA & no-code à Metz et Luxembourg</title>
        <meta name="description" content="L'agence marketing est obsolète. Activez le système ONORA." />
      </Helmet>

      <div className="w-full h-screen flex flex-col relative overflow-hidden">
        
        <StatusBar />

        {/* ================================================================= */}
        {/* LAYOUT DESKTOP */}
        {/* ================================================================= */}
        <div className="hidden lg:flex flex-col flex-1 w-full h-full relative">
          
          {/* NAVIGATION DROITE */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6 pointer-events-none">
            <div className="flex flex-col gap-3 pointer-events-auto">
                {Array.from({ length: desktopSlidesCount }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => scrollToDesktopSlide(idx)}
                        className={`transition-all duration-500 ease-out rounded-full shadow-lg border border-white/10 backdrop-blur-sm ${activeDesktopSlide === idx ? "h-8 w-2 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] scale-110" : "h-2 w-2 bg-white/20 hover:bg-white/50 hover:scale-125"}`}
                    />
                ))}
            </div>
            <motion.div className="w-5 h-8 rounded-full border-2 border-white bg-black/20 backdrop-blur-md flex justify-center p-1 shadow-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <motion.div className="w-0.5 h-1.5 rounded-full bg-white" animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
            </motion.div>
          </div>

          {/* SLIDER */}
          <div
            ref={desktopScrollRef}
            className="
              onora-desktop-slider
              w-full h-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory
              items-start /* Alignement HAUT, pas center */
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
              
              /* PADDING MAGIQUE POUR LE CALAGE */
              pt-[60px] /* Espace fixe sous la barre */
              pb-[200px] /* Espace réservé pour le Dock */
            "
          >
            // src/pages/Home.jsx (Extrait du Slide 1)

{/* --- SLIDE 1 : HERO - THE NEURAL SYSTEM --- */}
<section className="w-full h-full flex-shrink-0 snap-center px-4 md:px-8">
              <VisionBubble className="h-full relative overflow-hidden flex flex-col items-center justify-center">
                
                {/* 1. BULLE STATUS (Haut-Droite) */}
                <div className="absolute top-6 right-6 z-40 flex items-center gap-3 px-5 py-2.5 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/30 rounded-full shadow-lg animate-fade-in">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
                    </span>
                    <span className="text-[11px] font-bold tracking-widest text-emerald-600 uppercase font-mono pt-0.5">
                      System Status: ONLINE
                    </span>
                </div>

                {/* GRILLE PRINCIPALE */}
                <div className="w-full max-w-[1400px] mx-auto h-full grid grid-cols-1 lg:grid-cols-[0.35fr_1.65fr] gap-4 relative z-10">
                  
                  {/* --- COLONNE GAUCHE : LOGO + CTA (INTACTE & VERROUILLÉE) --- */}
                  <div className="flex flex-col items-start justify-start pt-12 pl-4 relative z-20 h-full">
                    
                    {/* Logo (Gros) */}
                    <img src="/logo/onora.webp" alt="ONORA" className="w-48 md:w-56 object-contain mb-8 origin-top-left" />

                    {/* CTA */}
                    <Link 
                      to="/about" 
                      className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-[2rem] border border-gray-900/20 bg-white/10 text-gray-900 font-bold text-sm tracking-wide overflow-hidden hover:bg-white/30 transition-all shadow-sm w-max mb-8"
                    >
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:animate-shine" />
                        <span className="relative z-10">DÉCOUVRIR LE SYSTÈME</span>
                    </Link>

                     {/* TEXTE PUNCHY */}
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

                  {/* --- COLONNE DROITE : LE "NEURAL DASHBOARD" INTERACTIF --- */}
                  <div className="hidden lg:flex items-center justify-center relative w-full h-full perspective-1000">
                      
                      {/* LE DASHBOARD FLOTTANT */}
                      <div className="relative w-[750px] h-[500px] bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col transform transition-transform hover:scale-[1.01] duration-500">
                          
                          {/* Header du Dashboard */}
                          <div className="h-14 border-b border-white/30 flex items-center justify-between px-6 bg-white/20">
                              <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                              </div>
                              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-white/30 px-3 py-1 rounded-full">
                                  ONORA SYSTEM V.2.0 • LIVE MONITORING
                              </div>
                              <div className="flex items-center gap-2 text-gray-400">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                              </div>
                          </div>

                          {/* Corps du Dashboard : Grille de Modules */}
                          <div className="flex-1 p-6 grid grid-cols-2 grid-rows-2 gap-4">
                              
                              {/* MODULE 1 : ACQUISITION (Actif) */}
                              <div className="group relative bg-white/50 border border-white/60 rounded-2xl p-5 hover:bg-white/80 transition-all cursor-default overflow-hidden">
                                  <div className="absolute top-0 right-0 p-3 opacity-50 group-hover:opacity-100 transition-opacity">
                                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                  </div>
                                  <div className="flex items-center gap-4 mb-4">
                                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                      </div>
                                      <div>
                                          <p className="text-xs font-bold text-gray-400 uppercase">Acquisition</p>
                                          <p className="text-lg font-black text-blue-900">+48 Leads</p>
                                      </div>
                                  </div>
                                  {/* Fake Graph */}
                                  <div className="h-16 w-full flex items-end gap-1">
                                      {[40, 60, 45, 70, 85, 60, 90, 75, 100].map((h, i) => (
                                          <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-blue-200 rounded-t-sm group-hover:bg-blue-500 transition-colors delay-[${i*50}ms]"></div>
                                      ))}
                                  </div>
                                  <p className="text-[10px] text-gray-500 mt-2 font-mono">Autopilot: ON • Last run: 2m ago</p>
                              </div>

                              {/* MODULE 2 : CONTENT (En cours) */}
                              <div className="group bg-white/50 border border-white/60 rounded-2xl p-5 hover:bg-white/80 transition-all cursor-default">
                                  <div className="flex items-center gap-4 mb-3">
                                      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                      </div>
                                      <div>
                                          <p className="text-xs font-bold text-gray-400 uppercase">Contenu IA</p>
                                          <p className="text-sm font-bold text-purple-900">3 Posts Générés</p>
                                      </div>
                                  </div>
                                  <div className="space-y-2">
                                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                          <div className="h-full bg-purple-500 w-[80%] rounded-full relative overflow-hidden">
                                              <div className="absolute inset-0 bg-white/30 animate-[shimmer_1s_infinite]"></div>
                                          </div>
                                      </div>
                                      <div className="flex justify-between text-[9px] font-mono text-gray-500">
                                          <span>LinkedIn: Ready</span>
                                          <span>SEO: Optimized</span>
                                      </div>
                                  </div>
                              </div>

                              {/* MODULE 3 : CONVERSION (Target) */}
                              <div className="group bg-white/50 border border-white/60 rounded-2xl p-5 hover:bg-white/80 transition-all cursor-default">
                                  <div className="flex items-center justify-between mb-4">
                                      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                      </div>
                                      <span className="text-xl font-black text-gray-800">2.4%</span>
                                  </div>
                                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Taux de Conversion</p>
                                  <div className="flex items-center gap-2 text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded-md w-max">
                                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                                      <span>+12% vs last week</span>
                                  </div>
                              </div>

                              {/* MODULE 4 : DATA CENTER (Le Cerveau) */}
                              <div className="group bg-gray-900 border border-gray-800 rounded-2xl p-5 text-white flex flex-col justify-between relative overflow-hidden">
                                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                  {/* Cercle animé */}
                                  <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500 blur-[40px] opacity-40 animate-pulse"></div>
                                  
                                  <div className="relative z-10">
                                      <p className="text-[10px] font-mono text-gray-400 uppercase mb-1">ONORA CORE</p>
                                      <p className="text-sm font-medium text-gray-200">Processing Data...</p>
                                  </div>

                                  <div className="relative z-10 font-mono text-[9px] text-green-400 space-y-1 opacity-80">
                                      <p>> Analyze_Competitors.exe</p>
                                      <p>> Optimization_Complete</p>
                                      <p className="animate-pulse">> Awaiting User Command_</p>
                                  </div>
                              </div>

                          </div>
                      </div>

                  </div>

                  {/* MOBILE (Simplifié : Juste le Core) */}
                  <div className="lg:hidden w-full flex items-center justify-center mt-6">
                      <div className="w-full max-w-xs bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-xl">
                          <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                              </div>
                              <div>
                                  <p className="font-bold text-gray-900">Dashboard IA</p>
                                  <p className="text-xs text-gray-500">Votre business en autopilot.</p>
                              </div>
                          </div>
                          <div className="space-y-2">
                             <div className="flex justify-between text-xs font-medium text-gray-700">
                                 <span>Traffic</span>
                                 <span className="text-green-600">+24%</span>
                             </div>
                             <div className="h-1.5 w-full bg-gray-200 rounded-full"><div className="h-full w-[70%] bg-blue-500 rounded-full"></div></div>
                             
                             <div className="flex justify-between text-xs font-medium text-gray-700 mt-2">
                                 <span>Leads</span>
                                 <span className="text-green-600">+12%</span>
                             </div>
                             <div className="h-1.5 w-full bg-gray-200 rounded-full"><div className="h-full w-[50%] bg-purple-500 rounded-full"></div></div>
                          </div>
                      </div>
                  </div>

                </div>
              </VisionBubble>
            </section>

            {/* --- SLIDE 2 --- */}
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

            {/* --- SLIDE 3 --- */}
            <section className="w-full h-full flex-shrink-0 snap-center px-8">
                <VisionBubble className="h-full flex flex-col justify-center">
                    <HackiingSprint onCtaClick={() => scrollToDesktopSlide(4)} />
                </VisionBubble>
            </section>

            {/* --- SLIDE 4 --- */}
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

            {/* --- SLIDE 5 --- */}
            <section className="w-full h-full flex-shrink-0 snap-center px-8">
              <VisionBubble className="h-full !bg-transparent !border-none !shadow-none !backdrop-blur-none">
                  <SourceCodeOrigin />
              </VisionBubble>
            </section>

          </div>
        </div>

        {/* MOBILE (Inchangé) */}
        <div className="flex flex-col flex-1 lg:hidden pt-20 pb-28 space-y-8 overflow-y-auto">
          <div className="px-4"><VisionBubble padding="p-8"><div className="flex flex-col items-center text-center gap-6"><div className="w-24 h-24 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center p-4"><img src="/logo/onora.webp" alt="ONORA" className="w-full h-full object-contain" /></div><div className="space-y-3"><h1 className="text-2xl font-bold text-white leading-tight">L'Agence Marketing est Obsolète.</h1><p className="text-sm text-gray-400">L&apos;IA n&apos;est rien sans vision. OnORA fusionne 20 ans d&apos;XP et la puissance de l&apos;IA.</p></div><Link to="/about" className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm text-center">Explorer le système</Link></div></VisionBubble></div>
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