// src/components/SystemBoot.jsx
// Animation intro immersive : Ancien monde (chaos) → Nouveau monde (futuriste)

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SystemBoot({ onFinish }) {
  const [phase, setPhase] = useState("chaos"); // chaos -> extinction -> reboot -> reveal -> off
  const [visible, setVisible] = useState(true);
  const [terminalLines, setTerminalLines] = useState([]);
  const canvasRef = useRef(null);
  const hasStartedRef = useRef(false);
  const skipTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);
  const activeAudioSourcesRef = useRef([]); // Stocker toutes les sources audio actives
  const noiseIntervalRef = useRef(null); // Référence pour l'intervalle de bruit blanc

  const terminalMessages = [
    "> PURGE ANCIEN MONDE... [OK]",
    "> INITIALIZING ONORA SYSTEM...",
    "> CONNECTING TO IA...",
    "> ACCESS GRANTED.",
    "",
    "> BIENVENUE HUMAIN",
  ];

  // Fonction pour arrêter tous les sons
  const stopAllSounds = () => {
    // Arrêter l'intervalle de bruit blanc
    if (noiseIntervalRef.current) {
      clearInterval(noiseIntervalRef.current);
      noiseIntervalRef.current = null;
    }
    
    // Arrêter toutes les sources audio actives
    activeAudioSourcesRef.current.forEach((source) => {
      try {
        if (source && typeof source.stop === "function") {
          source.stop();
        }
      } catch (e) {
        // Ignorer les erreurs si la source est déjà arrêtée
      }
    });
    activeAudioSourcesRef.current = [];
  };

  // --- GÉNÉRATION DE SONS AVEC WEB AUDIO API ---
  const generateWhiteNoise = (duration = 0.1) => {
    if (!audioContextRef.current) return null;
    const ctx = audioContextRef.current;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    whiteNoise.buffer = buffer;
    gainNode.gain.value = 0.12; // Réduit de 0.3 à 0.12 pour être moins agaçant
    whiteNoise.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Stocker la source pour pouvoir l'arrêter
    activeAudioSourcesRef.current.push(whiteNoise);
    
    whiteNoise.start(0);
    whiteNoise.stop(ctx.currentTime + duration);
    
    // Retirer de la liste après la fin
    whiteNoise.onended = () => {
      activeAudioSourcesRef.current = activeAudioSourcesRef.current.filter(
        (s) => s !== whiteNoise
      );
    };
    
    return whiteNoise;
  };

  const playZapSound = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    activeAudioSourcesRef.current.push(oscillator);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.3);
    
    oscillator.onended = () => {
      activeAudioSourcesRef.current = activeAudioSourcesRef.current.filter(
        (s) => s !== oscillator
      );
    };
  };

  const playKeyboardClick = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "square";
    oscillator.frequency.value = 800 + Math.random() * 400;

    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    activeAudioSourcesRef.current.push(oscillator);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.05);
    
    oscillator.onended = () => {
      activeAudioSourcesRef.current = activeAudioSourcesRef.current.filter(
        (s) => s !== oscillator
      );
    };
  };

  const playGlitchBoom = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    
    const oscillators = [];
    
    // Créer plusieurs oscillateurs pour un son complexe
    for (let i = 0; i < 3; i++) {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.type = i === 0 ? "square" : "sawtooth";
      oscillator.frequency.setValueAtTime(100 + i * 50, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.4);

      gainNode.gain.setValueAtTime(0.25 / (i + 1), ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      activeAudioSourcesRef.current.push(oscillator);
      oscillators.push(oscillator);
      
      oscillator.start(ctx.currentTime + i * 0.05);
      oscillator.stop(ctx.currentTime + 0.4 + i * 0.05);
      
      oscillator.onended = () => {
        activeAudioSourcesRef.current = activeAudioSourcesRef.current.filter(
          (s) => s !== oscillator
        );
      };
    }
  };

  // Initialiser AudioContext
  useEffect(() => {
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn("Web Audio API non supporté");
    }

    return () => {
      // Arrêter tous les sons avant de fermer
      stopAllSounds();
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Arrêter tous les sons quand la phase change vers "off" ou quand on skip
  useEffect(() => {
    if (phase === "off" || !visible) {
      stopAllSounds();
    }
  }, [phase, visible]);

  // Reprendre AudioContext si suspendu
  const resumeAudioContext = () => {
    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
  };

  // Fonction pour skip l'animation
  const handleSkip = () => {
    stopAllSounds(); // Arrêter tous les sons immédiatement
    resumeAudioContext();
    if (skipTimeoutRef.current) {
      skipTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
    }
    setPhase("off");
    setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 100);
  };

  // --- PHASE 1 & 2 : Générateur de neige TV (CHAOS + EXTINCTION) ---
  useEffect(() => {
    if (phase !== "chaos" && phase !== "extinction") {
      stopAllSounds(); // Arrêter le bruit quand on quitte ces phases
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawNoise = () => {
      const w = canvas.width;
      const h = canvas.height;
      if (w <= 0 || h <= 0) return;

      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        const isWhite = Math.random() > 0.48;
        const val = isWhite ? 255 : 0;
        buffer32[i] = (255 << 24) | (val << 16) | (val << 8) | val;
      }

      ctx.putImageData(idata, 0, 0);
      animationFrameId = requestAnimationFrame(drawNoise);
    };

    // Son white noise pendant le chaos uniquement (moins fréquent et moins fort)
    if (phase === "chaos") {
      resumeAudioContext();
      stopAllSounds(); // S'assurer qu'il n'y a pas d'autres sons
      noiseIntervalRef.current = setInterval(() => {
        generateWhiteNoise(0.08);
      }, 250); // Moins fréquent : 250ms au lieu de 150ms
    } else if (phase === "extinction") {
      // Arrêter le bruit blanc lors de l'extinction
      stopAllSounds();
    }

    window.addEventListener("resize", resize);
    resize();
    drawNoise();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      stopAllSounds();
    };
  }, [phase]);

  // Son zap lors de l'extinction
  useEffect(() => {
    if (phase === "extinction") {
      resumeAudioContext();
      setTimeout(() => playZapSound(), 100);
    }
  }, [phase]);

  // --- PHASE 3 : Animation Typewriter Terminal ---
  useEffect(() => {
    if (phase !== "reboot") return;

    resumeAudioContext();
    stopAllSounds(); // Arrêter les sons précédents
    setTerminalLines([]);
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let intervalId = null;
    let timeoutId = null;

    const typeNextChar = () => {
      if (currentLineIndex >= terminalMessages.length) {
        if (intervalId) clearInterval(intervalId);
        return;
      }

      const currentLine = terminalMessages[currentLineIndex];
      
      if (currentLine === "") {
        setTerminalLines((prev) => [...prev, ""]);
        currentLineIndex++;
        currentCharIndex = 0;
        return;
      }
      
      if (currentCharIndex < currentLine.length) {
        // Son de clic moins fréquent pour être moins agaçant
        if (Math.random() > 0.8) {
          playKeyboardClick();
        }

        setTerminalLines((prev) => {
          const newLines = [...prev];
          if (!newLines[currentLineIndex]) {
            newLines[currentLineIndex] = "";
          }
          newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          return newLines;
        });
        currentCharIndex++;
      } else {
        currentLineIndex++;
        currentCharIndex = 0;
        if (intervalId) clearInterval(intervalId);
        timeoutId = setTimeout(() => {
          intervalId = setInterval(typeNextChar, 30);
        }, 150);
      }
    };

    intervalId = setInterval(typeNextChar, 30);

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
      stopAllSounds();
    };
  }, [phase]);

  // Son boom lors du reveal
  useEffect(() => {
    if (phase === "reveal") {
      resumeAudioContext();
      stopAllSounds(); // Arrêter les sons précédents
      playGlitchBoom();
    }
  }, [phase]);

  // --- SÉQUENÇAGE TEMPOREL PRÉCIS ---
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    resumeAudioContext();

    const timeouts = [];

    const t1 = setTimeout(() => {
      setPhase("extinction");
    }, 2000);
    timeouts.push(t1);

    const t2 = setTimeout(() => {
      setPhase("reboot");
    }, 2500);
    timeouts.push(t2);

    const totalChars = terminalMessages.reduce((sum, line) => sum + line.length, 0);
    const typingDuration = totalChars * 30;
    const pauseBetweenLines = terminalMessages.length * 100;
    const totalRebootDuration = typingDuration + pauseBetweenLines + 1000;

    const t3 = setTimeout(() => {
      setPhase("reveal");
    }, 2500 + totalRebootDuration);
    timeouts.push(t3);

    const t4 = setTimeout(() => {
      stopAllSounds(); // Arrêter tous les sons avant de disparaître
      setPhase("off");
      setTimeout(() => {
        setVisible(false);
        if (onFinish) onFinish();
      }, 600);
    }, 2500 + totalRebootDuration + 1500);
    timeouts.push(t4);

    skipTimeoutRef.current = timeouts;

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
      stopAllSounds();
    };
  }, [onFinish]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {phase !== "off" && (
        <motion.div
          key="system-boot"
          className="fixed inset-0 z-[9999] bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* BOUTON SKIP FUTURISTE - Positionné en haut à droite, responsive et jamais coupé */}
          <div
            className="fixed top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-[10000] pointer-events-none"
            style={{
              maxWidth: "calc(100vw - 2rem)",
            }}
          >
            <button
              onClick={handleSkip}
              className="pointer-events-auto
                         group relative
                         px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3
                         bg-black/70 backdrop-blur-md
                         border border-cyan-400/50
                         rounded-full
                         text-cyan-400 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider
                         hover:border-cyan-400 hover:text-cyan-300
                         transition-all duration-300
                         shadow-[0_0_20px_rgba(34,211,238,0.3)]
                         hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]
                         active:scale-95
                         whitespace-nowrap
                         before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-cyan-400/10 before:to-transparent
                         before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 before:rounded-full"
              style={{
                fontFamily:
                  "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.1)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
                passer l'intro.
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </button>
          </div>

          {/* PHASE 1 : CHAOS - Neige TV dense */}
          {(phase === "chaos" || phase === "extinction") && (
            <motion.div
              className="absolute inset-0 bg-white origin-center pointer-events-none"
              initial={phase === "chaos" ? { scaleY: 1, scaleX: 1 } : false}
              animate={
                phase === "extinction"
                  ? {
                      scaleY: [1, 0.005, 0.005],
                      scaleX: [1, 1, 0.005],
                    }
                  : { scaleY: 1, scaleX: 1 }
              }
              transition={
                phase === "extinction"
                  ? {
                      duration: 0.5,
                      times: [0, 0.5, 1],
                      ease: [0.87, 0, 0.13, 1],
                    }
                  : {}
              }
            >
              <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
                style={{ imageRendering: "pixelated" }}
              />
            </motion.div>
          )}

          {/* PHASE 3 : REBOOT TERMINAL */}
          {phase === "reboot" && (
            <motion.div
              className="absolute inset-0 bg-black flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-2xl px-6 md:px-8">
                <div
                  className="font-mono text-sm md:text-base space-y-2"
                  style={{
                    fontFamily:
                      "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
                    color: "#00ff88",
                    textShadow: "0 0 10px rgba(0, 255, 136, 0.5)",
                  }}
                >
                  {terminalLines.map((line, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span>{line}</span>
                      {index === terminalLines.length - 1 &&
                        line.length === (terminalMessages[terminalLines.length - 1]?.length || 0) && (
                          <span className="animate-pulse text-[#00ff88]">▊</span>
                        )}
                      {index === terminalLines.length - 1 &&
                        line.length < (terminalMessages[terminalLines.length - 1]?.length || 0) && (
                          <span className="animate-pulse text-[#00ff88]">|</span>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* PHASE 4 : REVEAL GLITCH - EFFET RGB SPLIT PRONONCÉ */}
          {phase === "reveal" && (
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute inset-0 bg-black"
                animate={{
                  opacity: [1, 1, 0.95, 1, 0.9, 1, 0.8, 1, 0.6, 0.4, 0.2, 0],
                  x: [0, -8, 8, -6, 6, -4, 4, -3, 3, -2, 2, 0],
                  scaleX: [1, 1.02, 0.98, 1.01, 0.99, 1.005, 0.995, 1, 1, 1, 1, 1],
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 1],
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute inset-0 bg-red-500 mix-blend-screen"
                style={{
                  filter: "brightness(1.5) contrast(1.2)",
                  clipPath: "inset(0 0 0 0)",
                }}
                animate={{
                  x: [0, 20, -15, 12, -8, 6, -4, 3, -2, 1, 0],
                  opacity: [0, 0.8, 0.6, 0.7, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05, 0],
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.15, 0.3, 0.45, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 1],
                  ease: "easeOut",
                }}
              />

              <motion.div
                className="absolute inset-0 bg-green-400 mix-blend-screen"
                style={{
                  filter: "brightness(1.3) contrast(1.1)",
                }}
                animate={{
                  x: [0, -15, 12, -8, 6, -4, 3, -2, 1, 0],
                  opacity: [0, 0.7, 0.5, 0.6, 0.4, 0.3, 0.2, 0.1, 0.05, 0],
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.15, 0.3, 0.45, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
                  ease: "easeOut",
                }}
              />

              <motion.div
                className="absolute inset-0 bg-cyan-400 mix-blend-screen"
                style={{
                  filter: "brightness(1.4) contrast(1.15)",
                }}
                animate={{
                  x: [0, -18, 15, -12, 8, -6, 4, -3, 2, 0],
                  opacity: [0, 0.75, 0.55, 0.65, 0.45, 0.35, 0.25, 0.15, 0.08, 0],
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.15, 0.3, 0.45, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
                  ease: "easeOut",
                }}
              />

              <motion.div
                className="absolute inset-0"
                style={{
                  background: `repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    transparent 2px,
                    rgba(255, 0, 0, 0.1) 2px,
                    rgba(255, 0, 0, 0.1) 4px,
                    transparent 4px,
                    transparent 6px
                  )`,
                  mixBlendMode: "screen",
                }}
                animate={{
                  y: [0, -10, 10, -8, 8, -5, 5, -3, 3, 0],
                  opacity: [0, 0.6, 0.4, 0.5, 0.3, 0.2, 0.1, 0.05, 0.02, 0],
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
                  ease: "easeOut",
                }}
              />

              <motion.div
                className="absolute inset-0 bg-white"
                animate={{
                  opacity: [0, 0.3, 0, 0.2, 0, 0.15, 0, 0.1, 0, 0.05, 0],
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1],
                  ease: "easeOut",
                }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
