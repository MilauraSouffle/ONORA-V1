// src/App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SystemBoot from "./components/SystemBoot";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Merci from "./pages/Merci";

function App() {
  const [bootDone, setBootDone] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center text-white relative z-10">
      {/* Animation de boot système */}
      {!bootDone && <SystemBoot onFinish={() => setBootDone(true)} />}

      {/* Fenêtre principale type OS / Dashboard - STYLE LIQUIDE GLASS APPLE */}
      <div
        className={`
          relative z-20
          w-[96vw] max-w-6xl 
          h-[90vh] max-h-[90vh]
          rounded-[32px]
          border border-white/12
          bg-black/5
          backdrop-blur-xl
          shadow-[0_0_80px_rgba(0,0,0,0.9)]
          overflow-hidden
          transition-opacity duration-1000 ease-out
          ${bootDone ? "opacity-100 glitch-appear" : "opacity-0"}
        `}
      >
        {/* Barre du haut - Header transparent et bleuté */}
        <header
          className="
            h-14
            w-full
            flex items-center justify-between
            px-4 md:px-6
            bg-slate-950/25
            border-b border-white/10
            backdrop-blur-3xl
            text-xs tracking-[0.25em] uppercase
          "
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border border-white/15 bg-white/5 shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
            <span className="text-[9px] md:text-[10px] text-gray-200">ONORA · SYSTEM</span>
          </div>

          <div className="flex items-center gap-1 md:gap-2 text-[9px] md:text-[10px]">
            <span className="text-gray-300 mr-1 hidden sm:inline">AI READY</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
          </div>
        </header>

        {/* Zone scrollable interne - Le contenu scroll uniquement ici */}
        <main className="relative h-[calc(100%-56px)] overflow-hidden">
          <div 
            className="
              absolute inset-0 
              overflow-y-auto overscroll-contain 
              dashboard-scroll
              bg-transparent
            "
            style={{ scrollBehavior: 'smooth' }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/merci" element={<Merci />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Menu flottant ONORA en bas de l'écran (dock) - Noir */}
      {bootDone && (
        <div
          className="
            fixed
            bottom-4 md:bottom-6
            left-1/2
            -translate-x-1/2
            z-50
            w-[95vw] md:w-auto
          "
        >
          <div
            className="
              flex items-center gap-2 md:gap-4
              px-4 md:px-6 py-2
              rounded-full
              bg-black/70
              backdrop-blur-2xl
              border border-white/10
              shadow-[0_18px_60px_rgba(0,0,0,0.8)]
              text-[9px] md:text-[11px] text-gray-300
              overflow-x-auto
              scrollbar-hide
            "
          >
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)] flex-shrink-0" />
            <span className="whitespace-nowrap">
              Menu flottant ONORA · Home · Studios · Dashboard · Audit · IA
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;