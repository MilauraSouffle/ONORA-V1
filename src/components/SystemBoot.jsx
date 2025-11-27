import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SystemBoot({ onFinish }) {
  // --- 1. SÉCURITÉ SEO & UX (Smart Skip) ---
  const shouldSkip = () => {
    if (typeof window === "undefined") return false;
    return (
      window.location.search.includes("no-intro") || 
      window.matchMedia("(prefers-reduced-motion: reduce)").matches || 
      sessionStorage.getItem("hasSeenIntro")
    );
  };

  const [visible, setVisible] = useState(!shouldSkip());
  
  const [phase, setPhase] = useState("chaos");
  const [terminalLines, setTerminalLines] = useState([]);
  
  const canvasRef = useRef(null);
  const hasStartedRef = useRef(false);
  const skipTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);
  const activeAudioSourcesRef = useRef([]); 
  const noiseIntervalRef = useRef(null);

  // --- 2. GESTION DU SKIP AUTOMATIQUE ---
  useEffect(() => {
    if (!visible) {
      if (onFinish) onFinish();
    } else {
      sessionStorage.setItem("hasSeenIntro", "true");
    }
  }, []);

  const terminalMessages = [
    "> initialisation du systeme...",
    "> ONORA intelligence démarre...",
    "> Recherche de vos concurrents...", 
    "  [Metz, Nancy, Luxembourg, Strasbourg]", 
    "> êtes vous prêts pour une expérience augmentée ?",
  ];

  // --- AUDIO ENGINE ---
  const stopAllSounds = () => {
    if (noiseIntervalRef.current) clearInterval(noiseIntervalRef.current);
    activeAudioSourcesRef.current.forEach((s) => { try { s.stop(); } catch (e) {} });
    activeAudioSourcesRef.current = [];
  };

  const resumeAudioContext = () => {
    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
  };

  const generateWhiteNoise = (duration = 0.1) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.value = 0.08; 
    src.connect(gain);
    gain.connect(ctx.destination);
    src.start(0);
    activeAudioSourcesRef.current.push(src);
  };

  const playKeyboardClick = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
    activeAudioSourcesRef.current.push(osc);
  };

  const playDataBreachSound = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const t = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(t);

    const sub = ctx.createOscillator();
    sub.type = "sine";
    sub.frequency.setValueAtTime(100, t);
    sub.frequency.exponentialRampToValueAtTime(30, t + 0.5);
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.8, t);
    subGain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
    sub.connect(subGain);
    subGain.connect(ctx.destination);
    sub.start(t);

    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.linearRampToValueAtTime(50, t + 0.2);
    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.1, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(t);

    activeAudioSourcesRef.current.push(noise, sub, osc);
  };

  // --- INIT AUDIO ---
  useEffect(() => {
    if (!visible) return;
    try { audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)(); } 
    catch (e) {}
    return () => stopAllSounds();
  }, [visible]);

  const handleSkip = () => {
    stopAllSounds();
    if (skipTimeoutRef.current) skipTimeoutRef.current.forEach(clearTimeout);
    setPhase("off");
    setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 100);
  };

  // --- CANVAS NOISE ---
  useEffect(() => {
    if (!visible) return;
    if (phase !== "chaos" && phase !== "extinction") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    
    let frame;
    const resize = () => { 
        canvas.width = window.innerWidth / (window.innerWidth < 768 ? 3 : 2); 
        canvas.height = window.innerHeight / (window.innerWidth < 768 ? 3 : 2); 
    };
    const draw = () => {
      const w = canvas.width; const h = canvas.height;
      if(w===0) return;
      const idata = ctx.createImageData(w, h);
      const buf = new Uint32Array(idata.data.buffer);
      for (let i = 0; i < buf.length; i++) buf[i] = Math.random() > 0.5 ? 0xFFFFFFFF : 0xFF000000;
      ctx.putImageData(idata, 0, 0);
      frame = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    if (phase === "chaos") {
        resumeAudioContext();
        noiseIntervalRef.current = setInterval(() => generateWhiteNoise(0.08), 150);
    } else stopAllSounds();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
      stopAllSounds();
    };
  }, [phase, visible]);

  // --- TERMINAL ---
  useEffect(() => {
    if (!visible) return;
    if (phase !== "terminal") return;
    resumeAudioContext();
    stopAllSounds();
    setTerminalLines([]);
    
    let line=0, char=0, interval, timeout;
    const type = () => {
      if (line >= terminalMessages.length) { clearInterval(interval); return; }
      const currentLine = terminalMessages[line];
      if (char < currentLine.length) {
        if(Math.random()>0.5) playKeyboardClick();
        setTerminalLines(p => { const n=[...p]; n[line]=currentLine.slice(0,char+1); return n; });
        char++;
      } else {
        line++; char=0; clearInterval(interval);
        timeout = setTimeout(() => interval = setInterval(type, 30), 250);
      }
    };
    interval = setInterval(type, 30);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [phase, visible]);

  // --- GLITCH TRIGGER ---
  useEffect(() => {
    if (!visible) return;
    if (phase === "title_glitch") {
        resumeAudioContext();
        playDataBreachSound();
    }
  }, [phase, visible]);

  // --- TIMELINE ---
  useEffect(() => {
    if (!visible) return;
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    const timers = [];

    timers.push(setTimeout(() => setPhase("extinction"), 2000));
    timers.push(setTimeout(() => setPhase("terminal"), 2500));
    
    const totalChars = terminalMessages.reduce((a,b)=>a+b.length,0);
    const typingTime = (totalChars*30) + (terminalMessages.length*250) + 800;
    const startCleanTitle = 2500 + typingTime;

    timers.push(setTimeout(() => setPhase("title_clean"), startCleanTitle));
    timers.push(setTimeout(() => setPhase("title_glitch"), startCleanTitle + 1200));

    timers.push(setTimeout(() => {
      setPhase("off");
      setTimeout(() => { setVisible(false); if(onFinish) onFinish(); }, 800);
    }, startCleanTitle + 1200 + 800));

    skipTimeoutRef.current = timers;
    return () => timers.forEach(clearTimeout);
  }, [onFinish, visible]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {phase !== "off" && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[9999] bg-black overflow-hidden font-mono"
          exit={{ opacity: 0, transition: { duration: 1 } }} 
        >
          {/* BOUTON SKIP */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-[10000]">
            <button
              onClick={handleSkip}
              className="group relative px-4 py-2 md:px-5 md:py-2.5 bg-black/40 backdrop-blur-md border border-white/20 rounded-full
                         flex items-center gap-2 md:gap-3 transition-all duration-300 hover:border-white/60 hover:bg-black/60"
            >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[10px] md:text-xs text-white/80 font-medium tracking-widest uppercase group-hover:text-white transition-colors">
                    passer l'intro.
                </span>
            </button>
          </div>

          {/* LAYER 1: CHAOS */}
          {(phase === "chaos" || phase === "extinction") && (
            <motion.canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover"
              animate={phase === "extinction" ? { scaleY: 0.002, opacity: 0 } : { scaleY: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          )}

          {/* LAYER 2: TERMINAL */}
          {phase === "terminal" && (
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
              <div className="w-full max-w-2xl text-left space-y-2">
                {terminalLines.map((line, i) => (
                  <div key={i} className={`
                    text-xs sm:text-sm md:text-lg tracking-wider font-bold 
                    break-words whitespace-pre-wrap
                    ${i === terminalLines.length - 1 ? "text-green-400" : "text-green-600/80"}
                  `}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LAYER 3: TITLE SEQUENCE */}
          {(phase === "title_clean" || phase === "title_glitch") && (
            <div className="absolute inset-0 flex items-center justify-center bg-black px-4">
                <div className="relative z-20 w-full flex justify-center">
                    <motion.h1
                        className="
                          font-black text-white tracking-widest text-center whitespace-nowrap
                          text-xl sm:text-3xl md:text-5xl lg:text-7xl
                        "
                        animate={phase === "title_glitch" ? {
                            x: [-2, 2, -2, 2, 0],
                            scale: [1, 1.1, 1.5, 2.5], 
                            opacity: [1, 0.8, 0], 
                            filter: ["blur(0px)", "blur(0px)", "blur(12px)"]
                        } : {
                            x: 0, scale: 1, opacity: 1, filter: "blur(0px)"
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        [ BIENVENUE HUMAIN. ]
                    </motion.h1>

                    {phase === "title_glitch" && (
                        <>
                            <motion.h1
                                className="absolute top-0 left-0 w-full font-black text-red-600 tracking-widest text-center mix-blend-screen opacity-80 whitespace-nowrap text-xl sm:text-3xl md:text-5xl lg:text-7xl"
                                animate={{ x: [-5, 5], y: [-2, 2], opacity: [0, 1, 0] }}
                                transition={{ duration: 0.2, repeat: 4 }}
                            >
                                [ BIENVENUE HUMAIN. ]
                            </motion.h1>
                             
                             <motion.h1
                                className="absolute top-0 left-0 w-full font-black text-cyan-400 tracking-widest text-center mix-blend-screen opacity-80 whitespace-nowrap text-xl sm:text-3xl md:text-5xl lg:text-7xl"
                                animate={{ x: [5, -5], y: [2, -2], opacity: [0, 1, 0] }}
                                transition={{ duration: 0.2, repeat: 4, delay: 0.05 }}
                            >
                                [ BIENVENUE HUMAIN. ]
                            </motion.h1>
                            
                            <motion.div 
                                className="absolute inset-0 bg-black mix-blend-hard-light"
                                animate={{ clipPath: [
                                    "inset(10% 0 80% 0)", "inset(50% 0 10% 0)", "inset(0 0 0 0)"
                                ]}}
                                transition={{ duration: 0.3, repeat: 3 }}
                            />
                        </>
                    )}
                </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}