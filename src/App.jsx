// src/App.jsx
// Main Application Component - ONORA
// Intègre le SystemDock et la structure globale VisionOS

import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Twitter, Linkedin, Youtube, Bot } from "lucide-react";

// --- COMPOSANTS SYSTÈME ---
import SystemBoot from "./components/SystemBoot";
import SystemDock from "./components/SystemDock";

// --- PAGES PRINCIPALES ---
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Merci from "./pages/Merci";
import Scan from "./pages/Scan";
import UseCases from "./pages/UseCases";
import Login from "./pages/Login";
import Socials from "./pages/Socials";
import WaitlistPage from "./pages/WaitlistPage";
import Studios from "./pages/Studios";
import Sprint48h from "./pages/Sprint48h";
import Patrice from "./pages/Patrice";
import Links from "./pages/Links";

// --- PAGES STUDIOS ---
import Skriib from "./pages/studios/Skriib";
import Cliip from "./pages/studios/Cliip";
import Siion from "./pages/studios/Siion";
import Hackiing from "./pages/studios/Hackiing";

function App() {
  const checkShouldSkip = () => {
    if (typeof window === "undefined") return false;
    return (
      window.location.search.includes("no-intro") ||
      sessionStorage.getItem("hasSeenIntro")
    );
  };

  const shouldSkip = checkShouldSkip();
  const [showIntro, setShowIntro] = useState(!shouldSkip);
  
  const location = useLocation();
  const navigate = useNavigate();

  const handleIntroFinish = () => {
    setShowIntro(false);
    sessionStorage.setItem("hasSeenIntro", "true");
  };

  // Gestion du Clic sur le Logo ONORA
  const handleLogoClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      const desktopSlider = document.querySelector(".onora-desktop-slider");
      if (desktopSlider) {
        desktopSlider.scrollTo({ left: 0, behavior: "smooth" });
      }
      const scrollContainer = document.querySelector(".dashboard-scroll");
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center text-gray-900 overflow-hidden">
      {/* Le background est géré par CSS dans index.css (#root::before) */}

      {/* --- 1. INTRO SYSTEMBOOT --- */}
      <AnimatePresence>
        {showIntro && <SystemBoot onFinish={handleIntroFinish} />}
      </AnimatePresence>

      {/* --- 2. FENÊTRE PRINCIPALE / DASHBOARD --- */}
      <div
        className={`
          relative z-10 w-full h-full flex items-center justify-center
          ${
            showIntro
              ? "opacity-0 scale-95 translate-y-4 transition-all duration-1000 ease-out"
              : shouldSkip
              ? "content-delay"
              : "opacity-100 scale-100 translate-y-0 transition-all duration-1000 ease-out delay-700"
          }
        `}
      >
        {/* CONTENEUR GLASSMORPHISM LARGE (Adapté 27") */}
        <div
            className="relative w-[96vw] max-w-[1800px] h-[90vh] max-h-[90vh] rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
        >
          {/* HEADER */}
          <header
              className="h-14 w-full flex items-center justify-between px-4 md:px-6 bg-white/8 backdrop-blur-xl border-b border-white/10"
          >
            {/* Logo Gauche */}
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="Retourner à l'accueil ONORA"
            >
              <img
                src="/logo/onora-logo.webp"
                alt="ONORA.STUDIO"
                className="w-6 h-6 md:w-7 md:h-7 object-contain"
                width="28"
                height="28"
              />
              <span className="text-[10px] md:text-[11px] text-gray-900 font-medium">
                ONORA.STUDIO
              </span>
            </button>

            {/* Menu Central Flottant */}
            <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-black/70 backdrop-blur-2xl border border-white/10">
              <Link
                to="/contact"
                className="text-white hover:text-cyan-400 transition-colors text-xs font-medium"
              >
                Nous contacter
              </Link>
              
              <div className="w-px h-4 bg-white/20" />
              
              <a href="[https://x.com](https://x.com)" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              
              <a href="[https://linkedin.com](https://linkedin.com)" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              
              <a href="[https://youtube.com](https://youtube.com)" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              
              <div className="w-px h-4 bg-white/20" />
              
              <Link to="/login" className="text-white hover:text-cyan-400 transition-colors" aria-label="Se connecter">
                <Bot className="w-4 h-4" />
              </Link>
            </nav>

            {/* Espace vide Droite */}
            <div className="w-[120px]" />
          </header>

          {/* ROUTING / CONTENU */}
          <main className="relative h-[calc(100%-56px)] overflow-hidden">
            <div
              className="absolute inset-0 overflow-y-auto lg:overflow-hidden overscroll-contain dashboard-scroll bg-transparent"
              style={{ scrollBehavior: "smooth" }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                
                {/* Pages Principales */}
                <Route path="/studios" element={<Studios />} />
                <Route path="/sprint-48h" element={<Sprint48h />} />
                <Route path="/patrice" element={<Patrice />} />
                <Route path="/links" element={<Links />} />
                
                {/* Studios Individuels */}
                <Route path="/studios/skriib" element={<Skriib />} />
                <Route path="/studios/cliip" element={<Cliip />} />
                <Route path="/studios/siion" element={<Siion />} />
                <Route path="/studios/hackiing" element={<Hackiing />} />
                
                {/* Pages Secondaires */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/merci" element={<Merci />} />
                <Route path="/scan" element={<Scan />} />
                <Route path="/usecases" element={<UseCases />} />
                <Route path="/login" element={<Login />} />
                <Route path="/socials" element={<Socials />} />
                <Route path="/waitlist" element={<WaitlistPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>

      {/* --- 3. SYSTEM DOCK (NIVEAU OS) --- */}
      <SystemDock />

    </div>
  );
}

export default App;