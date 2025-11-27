import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Tes imports existants
import SystemBoot from "./components/SystemBoot";
import AIAssistant from "./components/AIAssistant";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Merci from "./pages/Merci";
import Skriib from "./pages/studios/Skriib";
import Cliip from "./pages/studios/Cliip";
import Siion from "./pages/studios/Siion";
import Hackiing from "./pages/studios/Hackiing";
import Scan from "./pages/Scan";

function App() {
  // --- CORRECTION DU FLASH (FOUC) ---
  // On vérifie la sessionStorage DIRECTEMENT à l'initialisation.
  // Pas de useEffect = Pas de délai = Pas de flash blanc/noir.
  const [showIntro, setShowIntro] = useState(() => {
    // Sécurité SSR (Server Side Rendering)
    if (typeof window === 'undefined') return false;
    
    // On regarde tout de suite si on doit zapper
    const shouldSkip = 
      window.location.search.includes("no-intro") || 
      sessionStorage.getItem("hasSeenIntro");

    // Si on doit skip, l'état commence DIRECTEMENT à false.
    return !shouldSkip;
  });

  const [isAIActive, setIsAIActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Quand l'intro est finie, on la cache et on mémorise
  const handleIntroFinish = () => {
    setShowIntro(false);
    sessionStorage.setItem("hasSeenIntro", "true");
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const scrollContainer = document.querySelector('.dashboard-scroll');
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center text-white relative z-10">
      
      {/* 1. L'INTRO (Superposition Z-Index Max) */}
      <AnimatePresence>
        {showIntro && (
          <SystemBoot onFinish={handleIntroFinish} />
        )}
      </AnimatePresence>

      {/* 2. LE VRAI SITE (Chargé en arrière-plan) */}
      {/* L'opacité est gérée ici : si showIntro est true, le site est invisible (mais présent pour Google) */}
      <div className={`
        relative w-full h-full flex items-center justify-center
        transition-opacity duration-1000 ease-in-out
        ${showIntro ? 'opacity-0' : 'opacity-100'} 
      `}>
        {/* Fenêtre principale type OS / Dashboard - STYLE VISIONOS GLASS */}
        <div
            className={`
            relative z-20
            w-[96vw] max-w-6xl 
            h-[90vh] max-h-[90vh]
            rounded-[2rem]
            border
            bg-white/8
            backdrop-blur-2xl
            -webkit-backdrop-filter: blur(2rem)
            overflow-hidden
            transition-all duration-1000 ease-out
            ${
              isAIActive
                ? "border-transparent bg-gradient-to-r from-cyan-500/15 via-orange-500/15 to-cyan-500/15 shadow-[0_0_100px_rgba(0,0,0,1),0_0_80px_rgba(34,211,238,0.3),0_0_0_1px_rgba(255,255,255,0.1)_inset]"
                : "border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
            }
          `}
          style={{
            boxShadow: isAIActive
              ? '0 0 100px rgba(0,0,0,1), 0 0 80px rgba(34,211,238,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset'
              : '0 25px 50px -12px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05) inset'
          }}
        >
          {/* Header */}
          <header
            className={`
              h-14 w-full flex items-center justify-between px-4 md:px-6
              bg-white/5 backdrop-blur-2xl border-b
              text-xs tracking-[0.25em] uppercase
              transition-all duration-500
              ${
                isAIActive
                  ? "border-transparent bg-gradient-to-r from-cyan-500/20 via-orange-500/20 to-cyan-500/20 shadow-[0_0_40px_rgba(34,211,238,0.4)]"
                  : "border-white/10"
              }
            `}
          >
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img src="/logo/onora-logo.png" alt="ONORA" className="w-6 h-6 md:w-7 md:h-7 object-contain"/>
              <span className="text-[10px] md:text-[11px] text-gray-900 font-medium">ONORA.STUDIO</span>
            </button>

            <div className="flex items-center gap-2">
              <AIAssistant isActive={isAIActive} onToggle={() => setIsAIActive(!isAIActive)} />
            </div>
          </header>

          {/* Main Content */}
          <main className="relative h-[calc(100%-56px)] overflow-hidden">
            <div 
              className="absolute inset-0 overflow-y-auto overscroll-contain dashboard-scroll bg-transparent"
              style={{ scrollBehavior: 'smooth' }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/merci" element={<Merci />} />
                <Route path="/scan" element={<Scan />} />
                <Route path="/studios/skriib" element={<Skriib />} />
                <Route path="/studios/cliip" element={<Cliip />} />
                <Route path="/studios/siion" element={<Siion />} />
                <Route path="/studios/hackiing" element={<Hackiing />} />
              </Routes>
            </div>
          </main>
        </div>

        {/* Menu flottant ONORA en bas de l'écran (dock) */}
        <div
          className="
            fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] md:w-auto
          "
        >
          <div className="
              flex items-center gap-2 md:gap-4 px-4 md:px-6 py-2 rounded-full
              bg-black/70 backdrop-blur-2xl border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.8)]
              text-[9px] md:text-[11px] text-gray-300 overflow-x-auto scrollbar-hide
            "
          >
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)] flex-shrink-0" />
            <span className="whitespace-nowrap">
              Menu flottant ONORA · Home · Studios · Dashboard · Audit · IA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;