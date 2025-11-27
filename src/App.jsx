import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollHint from "./components/ScrollHint";
import CarouselPager from "./components/CarouselPager";
import { Twitter, Linkedin, Youtube, Bot } from "lucide-react";

// Imports existants
import SystemBoot from "./components/SystemBoot";
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
import UseCases from "./pages/UseCases";
import Login from "./pages/Login";
import Socials from "./pages/Socials";

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
  const [activeDesktopSlide, setActiveDesktopSlide] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  // Écouter les changements de slide pour la navigation
  useEffect(() => {
    if (location.pathname !== "/") return;

    const desktopSlider = document.querySelector(".onora-desktop-slider");
    if (!desktopSlider) return;

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = desktopSlider;
      if (!clientWidth) return;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveDesktopSlide(index);
    };

    desktopSlider.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      desktopSlider.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const scrollToDesktopSlide = (index) => {
    const desktopSlider = document.querySelector(".onora-desktop-slider");
    if (!desktopSlider) return;
    const width = desktopSlider.clientWidth;
    desktopSlider.scrollTo({
      left: width * index,
      behavior: "smooth",
    });
  };

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
    <div className="relative min-h-screen w-full flex items-center justify-center text-gray-900 overflow-hidden">
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
            className="relative w-[96vw] max-w-6xl h-[90vh] max-h-[90vh] rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)_inset"
        >
          {/* HEADER */}
          <header
              className="h-14 w-full flex items-center justify-between px-4 md:px-6 bg-white/8 backdrop-blur-xl border-b border-white/10"
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

            {/* Menu centré */}
            <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-black/70 backdrop-blur-2xl border border-white/10">
              <Link
                to="/contact"
                className="text-white hover:text-cyan-400 transition-colors text-xs font-medium"
              >
                Nous contacter
              </Link>
              
              <div className="w-px h-4 bg-white/20" />
              
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan-400 transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              
              <div className="w-px h-4 bg-white/20" />
              
              <Link
                to="/login"
                className="text-white hover:text-cyan-400 transition-colors"
                aria-label="Se connecter"
              >
                <Bot className="w-4 h-4" />
              </Link>
            </nav>

            {/* Espace vide à droite pour équilibrer */}
            <div className="w-[120px]" />
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
                  <Route path="/usecases" element={<UseCases />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/socials" element={<Socials />} />
                  <Route path="/studios/skriib" element={<Skriib />} />
                  <Route path="/studios/cliip" element={<Cliip />} />
                  <Route path="/studios/siion" element={<Siion />} />
                  <Route path="/studios/hackiing" element={<Hackiing />} />
              </Routes>
            </div>
            
            {/* Navigation et Scroll Hint - En arrière-plan, visible à travers les bulles */}
            {location.pathname === "/" && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1] flex items-center justify-center gap-4 pointer-events-auto">
                <ScrollHint />
                <CarouselPager
                  totalSlides={5}
                  activeIndex={activeDesktopSlide}
                  onSlideChange={scrollToDesktopSlide}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;