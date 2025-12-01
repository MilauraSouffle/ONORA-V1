// src/pages/Home.jsx
// VERSION FINALE SANS TOUCHER AU DESIGN
// - StatusBar positionnée fixe
// - Centrage vertical corrigé (h-full + justify-center)
// - VisionBubble original préservé

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

  useEffect(() => {
    const container = desktopScrollRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      const inCard = e.target.closest(".card-scroll");
      if (inCard) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      e.preventDefault();
      e.stopPropagation();

      const isTrackpad = e.deltaMode === 0 && Math.abs(e.deltaY) < 50;
      const conversionFactor = isTrackpad ? 1.0 : 1.5;
      const scrollDelta = e.deltaY * conversionFactor;
      container.scrollLeft += scrollDelta;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <>
      <Helmet>
        <title>ONORA – Studio IA & no-code à Metz et Luxembourg</title>
        <meta name="description" content="L'agence marketing est obsolète. Activez le système ONORA." />
      </Helmet>

      <div className="w-full h-full flex flex-col relative">
        
        {/* STATUS BAR - Position Fixe au dessus de tout */}
        <StatusBar />

        {/* ================================================================= */}
        {/* LAYOUT DESKTOP */}
        {/* ================================================================= */}
        <div className="hidden lg:flex flex-col flex-1 h-full overflow-hidden">
          
          <div
            ref={desktopScrollRef}
            className="
              onora-desktop-slider
              w-full h-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory
              items-center
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
            "
          >
            {/* --- SLIDE 1 : HERO --- */}
            <section className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-8">
              <VisionBubble className="max-h-[80vh]">
                <div className="grid gap-12 grid-cols-[0.8fr_1.2fr] items-center h-full relative">
                   <div className="absolute top-0 right-0 z-20 flex items-center gap-3 px-4 py-2 bg-black/80 border border-white/10 rounded-full backdrop-blur-md shadow-lg">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-white uppercase font-mono">
                      Intelligence Business : Activée
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-[300px] aspect-square rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center p-10 shadow-2xl">
                      <img src="/logo/onora.webp" alt="ONORA" className="w-full h-full object-contain drop-shadow-2xl" />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-8">
                    <h1 className="text-5xl xl:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight uppercase">
                      L&apos;Agence Marketing<br/>est Obsolète.<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                        Activez le système ONORA.
                      </span>
                    </h1>
                    <div className="space-y-4">
                        <p className="text-lg text-gray-800 font-medium">L&apos;IA est un moteur surpuissant, mais elle a besoin d&apos;un pilote.</p>
                        <p className="text-lg text-gray-700 max-w-2xl">
                          OnORA est votre Studio Augmenté, fusionnant <span className="font-bold text-gray-900">20 ans d&apos;expérience</span> avec la vitesse de l&apos;IA. 
                          Nous apportons : <span className="font-bold text-gray-900">Vision Stratégique</span>, <span className="font-bold text-gray-900">Architecture</span> et <span className="font-bold text-gray-900">Traduction Business</span>.
                        </p>
                    </div>
                    <div className="pt-2">
                        <Link to="/about" className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-gray-900 text-white font-bold text-base tracking-wide hover:scale-105 transition-all shadow-lg">
                          EXPLORER LE SYSTÈME ONORA
                        </Link>
                    </div>
                  </div>
                </div>
              </VisionBubble>
            </section>

            {/* --- SLIDE 2 : STUDIOS --- */}
            <section className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-8">
              <VisionBubble className="max-h-[80vh]">
                <div className="flex flex-col h-full justify-center space-y-10">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">Nos studios d&apos;IA augmentée</h2>
                    <p className="text-lg text-gray-900">Quatre modules pour booster ton business de tous les côtés.</p>
                  </div>
                  <div className="grid grid-cols-4 gap-8 items-start">
                     {[
                        { name: "SKRiiB", img: "/logos/skriib-title.webp", desc: "Sites + contenu qui convertissent." },
                        { name: "CLiiP", img: "/logos/cliip-title.webp", desc: "Création rapide, visuels & vidéos." },
                        { name: "SIION", img: "/logos/siion-title.webp", desc: "Données, dashboards & IA avancée." },
                        { name: "HACKiiNG", img: "/logos/hackiing-title.webp", desc: "Automations et agents IA." },
                      ].map((studio) => (
                        <div key={studio.name} className="flex flex-col items-center gap-4">
                          <img src={studio.img} alt={studio.name} className="w-full max-w-[200px] h-auto object-contain" />
                          <p className="text-sm text-gray-900/80 text-center font-medium">{studio.desc}</p>
                        </div>
                      ))}
                  </div>
                  <div className="text-center pt-6">
                      <Link to="/studios" className="inline-flex items-center justify-center px-8 py-3.5 rounded-[2rem] bg-white/10 border border-white/20 text-gray-900 font-semibold hover:bg-white/20 transition-all">
                        Découvrir les studios ONORA
                      </Link>
                  </div>
                </div>
              </VisionBubble>
            </section>

            {/* --- SLIDE 3 : SPRINT --- */}
            <section className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-8">
                <div className="w-full max-w-7xl">
                    <HackiingSprint onCtaClick={() => scrollToDesktopSlide(4)} />
                </div>
            </section>

            {/* --- SLIDE 4 : USE CASES --- */}
            <section className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-8">
              <VisionBubble className="max-h-[80vh]">
                <div className="flex flex-col h-full justify-center text-center space-y-10">
                    <div>
                      <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wider uppercase text-gray-900 mb-6 backdrop-blur-md">
                        Use Cases · Reality Check
                      </span>
                      <h2 className="text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                        Pas de portfolio.<br />
                        <span className="text-gray-500">Des résultats.</span>
                      </h2>
                      <p className="text-xl text-gray-900 max-w-2xl mx-auto font-light leading-relaxed">
                        Ici on ne vous montre pas de &quot;portfolio&quot;. Mais des résultats et des cas d&apos;usages concrets où chaque entrepreneur se retrouve.
                      </p>
                    </div>
                    <div>
                      <Link to="/usecases" className="inline-flex items-center justify-center px-10 py-4 rounded-[2rem] bg-white/10 border border-white/20 text-gray-900 font-semibold text-lg hover:bg-white/20 transition-all">
                        Voir les cas réels
                      </Link>
                    </div>
                </div>
              </VisionBubble>
            </section>

            {/* --- SLIDE 5 : ORIGIN --- */}
            <section className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-8">
              <VisionBubble className="max-h-[80vh]">
                  <SourceCodeOrigin />
              </VisionBubble>
            </section>

          </div>
        </div>

        {/* ================================================================= */}
        {/* LAYOUT MOBILE */}
        {/* ================================================================= */}
        <div className="flex flex-col flex-1 lg:hidden pt-40 pb-10 space-y-12">
          
          {/* 1. HERO MOBILE */}
          <div className="px-4">
            <VisionBubble padding="p-8">
                <div className="flex flex-col items-center text-center gap-6">
                    <div className="w-32 h-32 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center p-6">
                        <img src="/logo/onora.webp" alt="ONORA" className="w-full h-full object-contain" />
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-3xl font-bold text-gray-900 leading-tight">L'Agence Marketing est Obsolète.</h1>
                        <p className="text-sm text-gray-800">L&apos;IA n&apos;est rien sans vision. OnORA fusionne 20 ans d&apos;XP et la puissance de l&apos;IA.</p>
                    </div>
                    <Link to="/about" className="w-full py-3 rounded-xl bg-gray-900 text-white font-bold text-sm text-center">
                        Explorer le système
                    </Link>
                </div>
            </VisionBubble>
          </div>

          {/* 2. STUDIOS MOBILE */}
          <div className="px-4">
            <VisionBubble padding="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Les studios</h2>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { name: "SKRiiB", desc: "Contenu" },
                        { name: "CLiiP", desc: "Visuels" },
                        { name: "SIION", desc: "Data" },
                        { name: "HACKiiNG", desc: "Automations" },
                    ].map(s => (
                        <div key={s.name} className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                            <span className="block font-bold text-gray-900">{s.name}</span>
                            <span className="text-xs text-gray-600">{s.desc}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-6 text-center">
                    <Link to="/studios" className="text-sm font-semibold text-gray-900 underline">Voir tout</Link>
                </div>
            </VisionBubble>
          </div>

          {/* 3. SPRINT MOBILE */}
          <div className="w-full">
             <HackiingSprint onCtaClick={() => waitlistRef.current?.scrollIntoView()} />
          </div>

          {/* 4. USE CASES HOOK MOBILE */}
          <div className="px-4">
            <VisionBubble padding="p-8">
                <div className="text-center space-y-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Reality Check</span>
                    <h2 className="text-3xl font-bold text-gray-900">Pas de portfolio.<br/>Des résultats.</h2>
                    <p className="text-sm text-gray-800">Découvrez comment des entrepreneurs comme vous ont transformé leur business.</p>
                    <Link to="/usecases" className="block w-full py-3 rounded-xl bg-white/10 border border-white/20 text-gray-900 font-bold text-sm text-center">
                        Voir les cas réels
                    </Link>
                </div>
            </VisionBubble>
          </div>

          {/* 5. ORIGIN MOBILE */}
          <div className="px-4">
             <VisionBubble padding="p-6">
                <SourceCodeOrigin />
             </VisionBubble>
          </div>

          {/* 6. WAITLIST & FOOTER */}
          <div ref={waitlistRef} className="px-4">
             <Waitlist />
          </div>
          <Footer />

        </div>

      </div>
    </>
  );
}