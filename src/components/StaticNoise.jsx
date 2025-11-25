// src/App.jsx
import React from "react";
import Home from "./pages/Home";

function App() {
  return (
    // Conteneur global, totalement transparent pour laisser passer l'humanoïde
    <div className="min-h-screen w-full flex items-center justify-center text-white overflow-hidden relative">
      {/* Fenêtre principale type OS / Dashboard */}
      <div
        className="
          relative z-10
          w-[96vw] max-w-6xl
          h-[90vh]
          rounded-[32px]
          border border-white/12

          /* Fond quasi invisible, c'est surtout le blur qui travaille */
          bg-black/5
          backdrop-blur-3xl

          /* Lueur très légère en haut du dashboard */
          bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_70%)]

          shadow-[0_0_80px_rgba(0,0,0,0.85)]
          overflow-hidden
        "
      >
        {/* Barre du haut */}
        <header
          className="
            h-14
            w-full
            flex items-center justify-between
            px-6
            bg-black/15
            border-b border-white/6
            backdrop-blur-xl
            text-xs tracking-[0.25em] uppercase
          "
        >
          <div className="flex items-center gap-3 opacity-80">
            <div className="w-5 h-5 rounded-full border border-white/15 bg-white/5 shadow-[0_0_14px_rgba(255,255,255,0.35)] relative">
              <div className="absolute inset-1.5 bg-white/60 rounded-full animate-pulse" />
            </div>
            <span className="text-[10px] text-gray-200 font-medium">
              ONORA · SYSTEM V1
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] opacity-80">
            <span className="text-gray-400 mr-1">AI MONITORING</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)] animate-pulse" />
          </div>
        </header>

        {/* Zone scrollable interne (le “dashboard”) */}
        <main className="relative h-[calc(100%-56px)]">
          {/* Pas de calque noir ici pour garder l'humanoïde bien visible */}
          <div className="absolute inset-0 overflow-y-auto overscroll-contain">
            <Home />
          </div>
        </main>
      </div>

      {/* Dock flottant ONORA en bas de l’écran */}
      <div
        className="
          fixed
          bottom-6
          left-1/2
          -translate-x-1/2
          z-50
        "
      >
        <div
          className="
            flex items-center gap-6
            px-8 py-3
            rounded-full
            bg-black/40
            backdrop-blur-xl
            border border-white/10
            shadow-[0_20px_40px_rgba(0,0,0,0.7)]
            text-[10px] text-gray-300 tracking-widest uppercase
          "
        >
          <div className="flex space-x-1">
            <div className="h-3 w-0.5 bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
            <div className="h-3 w-0.5 bg-orange-500 shadow-[0_0_6px_#f97316]" />
          </div>
          <span className="hover:text-white transition-colors cursor-pointer">
            Home
          </span>
          <span className="hover:text-white transition-colors cursor-pointer">
            Studios
          </span>
          <span className="hover:text-white transition-colors cursor-pointer">
            Audit
          </span>
          <span className="text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)] cursor-pointer font-bold">
            AI ACCESS
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;