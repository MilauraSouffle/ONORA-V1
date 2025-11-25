// src/App.jsx
import React from "react";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center text-white relative z-10">
      {/* Fenêtre principale type OS / Dashboard - STYLE LIQUIDE GLASS APPLE */}
      <div
        className="
          relative z-20
          w-[96vw] max-w-6xl 
          h-[90vh]
          rounded-[32px]
          border border-white/12
          /* Fond très transparent pour voir l'humanoïde */
          bg-black/5
          backdrop-blur-xl
          shadow-[0_0_80px_rgba(0,0,0,0.9)]
          overflow-hidden
          /* On voit l'humanoïde à travers grâce à la transparence */
        "
      >
        {/* Barre du haut - Header transparent et bleuté */}
        <header
          className="
            h-14
            w-full
            flex items-center justify-between
            px-6
            /* Header transparent avec léger bleu */
            bg-slate-950/25
            border-b border-white/10
            backdrop-blur-3xl
            text-xs tracking-[0.25em] uppercase
          "
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border border-white/15 bg-white/5 shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
            <span className="text-[10px] text-gray-200">ONORA · SYSTEM</span>
          </div>

          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-gray-300 mr-1">AI READY</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
          </div>
        </header>

        {/* Zone scrollable interne - Le contenu scroll uniquement ici */}
        <main className="relative h-[calc(100%-56px)] overflow-hidden">
          <div 
            className="
              absolute inset-0 
              overflow-y-auto overscroll-contain 
              /* Scrollbar custom pour le dashboard */
              dashboard-scroll
              /* Fond totalement transparent pour voir l'humanoïde */
              bg-transparent
            "
            style={{ scrollBehavior: 'smooth' }}
          >
            <Home />
          </div>
        </main>
      </div>

      {/* Menu flottant ONORA en bas de l'écran (dock) - Noir */}
      <div
        className="
          fixed
          bottom-4
          left-1/2
          -translate-x-1/2
          z-50
        "
      >
        <div
          className="
            flex items-center gap-4
            px-6 py-2
            rounded-full
            bg-black/70
            backdrop-blur-2xl
            border border-white/10
            shadow-[0_18px_60px_rgba(0,0,0,0.8)]
            text-[11px] text-gray-300
          "
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
          <span className="whitespace-nowrap">
            Menu flottant ONORA · Home · Studios · Dashboard · Audit · IA
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;