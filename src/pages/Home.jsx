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
            {/* --- SLIDE 1 --- */}
            <section className="w-full h-full flex-shrink-0 snap-center px-8">
              {/* h-full ici va prendre 100% de l'espace RESTANT (écran - 120px - 110px) */}
              <VisionBubble className="h-full">
                <div className="grid gap-12 grid-cols-[0.8fr_1.2fr] items-center h-full relative">
                   <div className="absolute -top-6 right-0 z-20 flex items-center gap-3 px-4 py-2 bg-black/50 border border-white/10 rounded-full backdrop-blur-md shadow-lg">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500 shadow-[0_0_10px_#f97316]"></span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-white uppercase font-mono">Intelligence : Activée</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-[280px] 2xl:w-[350px] aspect-square rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center p-10 shadow-2xl">
                      <img src="/logo/onora.webp" alt="ONORA" className="w-full h-full object-contain drop-shadow-2xl" />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-8">
                    <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-white leading-[1.1] tracking-tight uppercase drop-shadow-lg">
                      L&apos;Agence Marketing<br/>est Obsolète.<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Activez le système.</span>
                    </h1>
                    <div className="space-y-4">
                        <p className="text-lg text-gray-300 font-medium">L&apos;IA est un moteur surpuissant, mais elle a besoin d&apos;un pilote.</p>
                        <p className="text-lg text-gray-400 max-w-2xl">
                          OnORA est votre Studio Augmenté, fusionnant <span className="font-bold text-white">20 ans d&apos;expérience</span> avec la vitesse de l&apos;IA. 
                        </p>
                    </div>
                    <div className="pt-2">
                        <Link to="/about" className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-white text-black font-bold text-base tracking-wide hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                          EXPLORER LE SYSTÈME ONORA
                        </Link>
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
        <div className="flex flex-col flex-1 lg:hidden pt-40 pb-28 space-y-8 overflow-y-auto">
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