import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Imports existants
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
  // --- LOGIQUE D'INITIALISATION (NO FLASH) ---
  const checkShouldSkip = () => {
    if (typeof window === "undefined") return false;
    return (
      window.location.search.includes("no-intro") ||
      sessionStorage.getItem("hasSeenIntro")
    );
  };

  const shouldSkip = checkShouldSkip();

  const [showIntro, setShowIntro] = useState(!shouldSkip);
  const [isAIActive, setIsAIActive] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleIntroFinish = () => {
    setShowIntro(false);
    sessionStorage.setItem("hasSeenIntro", "true");
  };

  // Logo ONORA : 
  // - si on est sur / : retour HERO + top du scroll
  // - sinon : navigate("/")
  const handleLogoClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      // Slider horizontal desktop
      const desktopSlider = document.querySelector(".onora-desktop-slider");
      if (desktopSlider) {
        desktopSlider.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }

      // Scroll vertical interne du dashboard
      const scrollContainer = document.querySelector(".dashboard-scroll");
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center text-white overflow-hidden">
      {/* Background est géré par CSS (#root::before) */}

      {/* INTRO SYSTEMBOOT */}
      <AnimatePresence>
        {showIntro && <SystemBoot onFinish={handleIntroFinish} />}
      </AnimatePresence>

      {/* FENÊTRE PRINCIPALE / DASHBOARD */}
      <div
        className={`
          relative z-10 w-full h-full flex items-center justify-center
          ${
            showIntro
              ? "opacity-0 scale-95 translate-y-4 transition-all duration-1000 ease-out"
              : shouldSkip
              ? "content-delay" // Fade-in après 1 seconde si on skip l'intro
              : "opacity-100 scale-100 translate-y-0 transition-all duration-1000 ease-out delay-700" // Fade-in après l'intro
          }
        `}
      >
        <div
          className={`
            relative
            w-[96vw] max-w-6xl 
            h-[90vh] max-h-[90vh]
            rounded-[2rem]
            border
            bg-white/10
            backdrop-blur-2xl
            -webkit-backdrop-filter: blur(24px)
            overflow-hidden
            transition-all duration-500 ease-out
            ${
              isAIActive
                ? "border-transparent bg-gradient-to-r from-cyan-500/10 via-orange-500/10 to-cyan-500/10 shadow-[0_0_80px_rgba(0,0,0,0.8),0_0_40px_rgba(34,211,238,0.2),0_0_0_1px_rgba(255,255,255,0.1)_inset]"
                : "border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
            }
          `}
        >
          {/* HEADER */}
          <header
            className={`
              h-14 w-full flex items-center justify-between px-4 md:px-6
              bg-white/8 backdrop-blur-xl border-b
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
              <img
                src="/logo/onora-logo.webp"
                alt="ONORA"
                className="w-6 h-6 md:w-7 md:h-7 object-contain"
              />
              <span className="text-[10px] md:text-[11px] text-gray-900 font-medium">
                ONORA.STUDIO
              </span>
            </button>

            <div className="flex items-center gap-2">
              <AIAssistant
                isActive={isAIActive}
                onToggle={() => setIsAIActive(!isAIActive)}
              />
            </div>
          </header>

          {/* CONTENU ROUTES */}
          <main className="relative h-[calc(100%-56px)] overflow-hidden">
            <div
              className="absolute inset-0 overflow-y-auto overscroll-contain dashboard-scroll bg-transparent"
              style={{ scrollBehavior: "smooth" }}
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

        {/* MENU FLOTTANT */}
        <div className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] md:w-auto">
          <div
            className="
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