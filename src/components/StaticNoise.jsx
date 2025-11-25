import React, { useEffect, useRef, useState } from "react";

// Animation d'ouverture type TV cathodique + neige + logo ONORA qui se dissout
export default function StaticNoise({ onFinish, duration = 10000 }) {
  const [phase, setPhase] = useState("init"); // init -> line -> expand -> full_noise -> logo -> dissolve -> message -> off
  const [visible, setVisible] = useState(true);
  const [typedText, setTypedText] = useState("");
  const canvasRef = useRef(null);
  const hasStartedRef = useRef(false); // Protection contre les doubles exécutions

  // Références pour le filtre SVG de "dissolution" numérique
  const displacementRef = useRef(null);
  const turbulenceRef = useRef(null);
  
  const message = "[Système initialisé, Bienvenue humain.]";

  // --- 1. Générateur de neige (optimisé) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId;

    const resize = () => {
      const w = Math.floor(window.innerWidth / 3);
      const h = Math.floor(window.innerHeight / 3);
      canvas.width = w > 0 ? w : 1;
      canvas.height = h > 0 ? h : 1;
    };

    const drawNoise = () => {
      const w = canvas.width;
      const h = canvas.height;
      if (w <= 0 || h <= 0) return;

      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        const isWhite = Math.random() > 0.5;
        const val = isWhite ? 255 : 0;
        buffer32[i] = (255 << 24) | (val << 16) | (val << 8) | val;
      }

      ctx.putImageData(idata, 0, 0);
      animationFrameId = requestAnimationFrame(drawNoise);
    };

    window.addEventListener("resize", resize);
    resize();
    drawNoise();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- 2. Animation de décomposition numérique du logo ---
  useEffect(() => {
    let animId;

    if (phase === "dissolve") {
      let start = null;

      const animateDistortion = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const totalDuration = 2000;
        const t = Math.min(progress / totalDuration, 1);

        // Ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);

        const scaleVal = eased * 250; // intensité de la distorsion
        const freqVal = 0.05 + eased * 0.1; // fait "bouillir" le nuage

        if (displacementRef.current) {
          displacementRef.current.scale.baseVal = scaleVal;
        }
        if (turbulenceRef.current) {
          turbulenceRef.current.setAttribute("baseFrequency", `${freqVal} 0.2`);
        }

        if (progress < totalDuration) {
          animId = requestAnimationFrame(animateDistortion);
        }
      };

      animId = requestAnimationFrame(animateDistortion);
    } else {
      // reset quand on n'est plus en phase dissolve
      if (displacementRef.current) {
        displacementRef.current.scale.baseVal = 0;
      }
      if (turbulenceRef.current) {
        turbulenceRef.current.setAttribute("baseFrequency", "0.05 0.2");
      }
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [phase]);

  // --- 3. Animation Typewriter ---
  useEffect(() => {
    if (phase === "message") {
      setTypedText("");
      let currentIndex = 0;
      let typeInterval = null;
      
      const startTyping = () => {
        typeInterval = setInterval(() => {
          if (currentIndex < message.length) {
            setTypedText(message.slice(0, currentIndex + 1));
            currentIndex++;
          } else {
            if (typeInterval) clearInterval(typeInterval);
          }
        }, 90); // Vitesse de frappe lisible (90ms par caractère)
      };
      
      startTyping();
      
      return () => {
        if (typeInterval) clearInterval(typeInterval);
      };
    } else {
      setTypedText("");
    }
  }, [phase, message]);

  // --- 4. Séquençage temporel ---
  useEffect(() => {
    // Protection : si l'animation a déjà commencé, on ne la relance pas
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const t1 = setTimeout(() => setPhase("line"), 400);
    const t2 = setTimeout(() => setPhase("expand"), 1000);
    const t3 = setTimeout(() => setPhase("full_noise"), 1700);
    const t4 = setTimeout(() => setPhase("logo"), 2600);
    const t5 = setTimeout(() => setPhase("dissolve"), 4000);
    
    // Après la dissolution, on affiche le message typewriter
    const t6 = setTimeout(() => setPhase("message"), 6100);
    
    // Fin : disparition du fond noir
    // On attend que le message soit complètement affiché + un peu de temps
    const messageDuration = message.length * 90; // Temps d'écriture du message (90ms par caractère)
    const t7 = setTimeout(() => {
      setPhase("off");
      setTimeout(() => {
        setVisible(false);
        if (onFinish) onFinish();
      }, 2500); // Transition plus longue et douce
    }, 6100 + messageDuration + 2000); // 6.1s (dissolve) + durée message + 2s d'affichage

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [duration, onFinish, message]);

  if (!visible) return null;

  return (
    <>
      {/* Définition du filtre SVG utilisé pour la dissolution */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="digital-cloud" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.05 0.2"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Overlay de l'animation */}
      <div
        className={`
          fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden pointer-events-none
          transition-opacity duration-[3000ms] ease-out
          ${phase === "off" ? "opacity-0" : "opacity-100"}
        `}
      >
        <div
          className="relative w-full h-full overflow-hidden will-change-transform"
          style={{
            backgroundColor: "white",
            opacity: phase === "dissolve" || phase === "message" || phase === "off" ? 0 : 1,
            transform:
              phase === "init"
                ? "scale(0, 0.005)"
                : phase === "line"
                ? "scale(1, 0.005)"
                : "scale(1, 1)",
            transition:
              phase === "expand"
                ? "transform 1.5s cubic-bezier(0.19, 1, 0.22, 1)"
                : phase === "dissolve" || phase === "message"
                ? "opacity 1.5s ease-out, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                : "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Neige */}
          <canvas
            ref={canvasRef}
            className={`
              w-full h-full object-cover scale-105 transition-opacity duration-[1000ms] ease-in-out
              ${phase === "logo" || phase === "dissolve" || phase === "message" ? "opacity-0" : "opacity-100"}
            `}
          />

          {/* Vignette */}
          <div 
            className={`
              absolute inset-0 pointer-events-none z-10 mix-blend-multiply
              transition-opacity duration-[1000ms] ease-in-out
              ${phase === "message" ? "opacity-0" : "opacity-100"}
            `}
          >
            <div className="w-full h-full bg-[radial-gradient(circle,transparent_30%,#000_100%)] opacity-90" />
          </div>

          {/* Logo ONORA au centre */}
          <div
            className="absolute inset-0 flex items-center justify-center z-30"
            style={{
              opacity:
                phase === "logo"
                  ? 1
                  : phase === "dissolve" || phase === "message" || phase === "off"
                  ? 0
                  : 0,
              transform:
                phase === "logo"
                  ? "scale(1)"
                  : phase === "dissolve" || phase === "off"
                  ? "scale(1.15)"
                  : "scale(0.85)",
              filter:
                phase === "logo"
                  ? "blur(0px)"
                  : phase === "dissolve" || phase === "off"
                  ? "blur(20px)"
                  : "blur(12px)",
              transition:
                phase === "logo"
                  ? "opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1), transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), filter 1.8s cubic-bezier(0.16, 1, 0.3, 1)"
                  : phase === "dissolve" || phase === "off"
                  ? "opacity 2s cubic-bezier(0.4, 0, 0.2, 1), transform 2s cubic-bezier(0.4, 0, 0.2, 1), filter 2s cubic-bezier(0.4, 0, 0.2, 1)"
                  : "opacity 0.8s ease-out, transform 0.8s ease-out, filter 0.8s ease-out",
            }}
          >
            <img
              src="/logo/onora.png"
              alt="ONORA Logo"
              style={{ filter: "url(#digital-cloud)" }}
              className="w-[75vw] h-[75vh] max-w-[90vw] max-h-[90vh] object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>

        {/* Flash central */}
        <div
          className={`
            absolute top-1/2 left-1/2 w-full h-[4px] bg-white
            shadow-[0_0_60px_30px_rgba(255,255,255,0.9)]
            transform -translate-x-1/2 -translate-y-1/2
            transition-opacity duration-300 pointer-events-none z-50
            ${phase === "line" ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* Message Typewriter */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center z-40 pointer-events-none
            transition-opacity duration-500 ease-in-out
            ${phase === "message" || phase === "off" ? "opacity-100" : "opacity-0"}
          `}
        >
          <p
            className="
              text-2xl md:text-4xl lg:text-5xl text-white
              tracking-[0.15em] text-center
              drop-shadow-[0_0_20px_rgba(0,229,255,0.6),0_0_40px_rgba(0,0,0,0.8)]
            "
            style={{
              fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Courier New', monospace",
              fontWeight: 400,
              letterSpacing: '0.1em',
            }}
          >
            {typedText}
            {/* Curseur clignotant */}
            {phase === "message" && typedText.length < message.length && (
              <span className="animate-pulse">|</span>
            )}
          </p>
        </div>
      </div>
    </>
  );
}