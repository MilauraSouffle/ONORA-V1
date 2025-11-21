import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ⚠️ TES LIENS IMAGEKIT (Ne les perds pas !) ---
const ASSETS = {
    robotVideo: "https://ik.imagekit.io/bupjuxqi6/robot%20iA%20Onora%20?updatedAt=1763734568516", // Remets ton vrai lien ici !
    logoSkriib: "https://ik.imagekit.io/bupjuxqi6/logo%20CliiP%20copie.png?updatedAt=1763629897887", // Remets ton vrai lien ici !
    logoSiion: "https://ik.imagekit.io/bupjuxqi6/logo%20CliiP%20copie.png?updatedAt=1763629897887",  // Remets ton vrai lien ici !
    logoCliip: "https://ik.imagekit.io/bupjuxqi6/logo%20CliiP%20copie.png?updatedAt=1763629897887",  // Remets ton vrai lien ici !
    logoHackiing: "https://ik.imagekit.io/bupjuxqi6/logo%20CliiP%20copie.png?updatedAt=1763629897887" // Remets ton vrai lien ici !
};

// --- EFFET BRUIT BLANC (TV STATIC) ---
const StaticNoise = ({ opacity = 0.15 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            const idata = ctx.createImageData(w, h);
            const buffer32 = new Uint32Array(idata.data.buffer);
            const len = buffer32.length;
            for (let i = 0; i < len; i++) {
                buffer32[i] = Math.random() < 0.5 ? 0xff000000 : 0xffffffff;
            }
            ctx.putImageData(idata, 0, 0);
            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 mix-blend-overlay" style={{ opacity }} />
    );
};

// --- CARTE APP (Liquid Glass) ---
const AppCard = ({ title, logo, onClick }) => (
    <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="relative group cursor-pointer flex flex-col items-center"
        onClick={onClick}
    >
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-lg transition-all duration-500 group-hover:border-white/40 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            <img src={logo} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <h3 className="mt-4 text-white font-medium tracking-wider text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">{title}</h3>
    </motion.div>
);

export default function OnoraIntro() {
    const [showContent, setShowContent] = useState(false);

    // --- ⏳ CONFIGURATION DU TEMPS ---
    useEffect(() => {
        // On a augmenté le temps ici : 7000ms = 7 secondes de "Robot seul"
        const timer = setTimeout(() => setShowContent(true), 7000);
        return () => clearTimeout(timer);
    }, []);

    // --- ACTIONS DE NAVIGATION (A brancher plus tard) ---
    const handleWaitlist = () => {
        alert("Ouverture du module Waitlist... (À brancher sur Supabase)");
    };

    const handleAppClick = (appName) => {
        alert(`Navigation vers le module ${appName}...`);
        // Plus tard, on mettra ici : navigate('/skriib')
    };

    const handleReload = () => {
        window.location.reload(); // Recharge la page pour rejouer l'intro
    };

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden font-sans text-white">

            {/* 1. FOND STATIC NOISE (S'atténue quand le menu arrive) */}
            <motion.div animate={{ opacity: showContent ? 0.04 : 0.15 }} transition={{ duration: 2 }}>
                <StaticNoise />
            </motion.div>

            {/* 2. ROBOT VIDEO */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 3 }}
                    className="w-full h-full flex items-center justify-center"
                >
                    <video
                        src={ASSETS.robotVideo}
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover opacity-80 mix-blend-screen"
                    />
                </motion.div>
            </div>

            {/* 3. DASHBOARD */}
            <AnimatePresence>
                {showContent && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8"
                    >
                        {/* Titre (Maintenant Cliquable) */}
                        <div className="absolute top-10 w-full flex justify-between items-center px-10 max-w-7xl">
                            <h1
                                onClick={handleReload}
                                className="text-2xl font-bold tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 cursor-pointer hover:opacity-80 transition-opacity"
                            >
                                ONORA.STUDIO
                            </h1>

                            {/* Bouton Waitlist (Maintenant Actif) */}
                            <button
                                onClick={handleWaitlist}
                                className="px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                            >
                                Waitlist Access
                            </button>
                        </div>

                        {/* Grille des Apps (Maintenant Active) */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-20">
                            <AppCard title="SKriiB" logo={ASSETS.logoSkriib} onClick={() => handleAppClick("SKriiB")} />
                            <AppCard title="SiiON" logo={ASSETS.logoSiion} onClick={() => handleAppClick("SiiON")} />
                            <AppCard title="CLiiP" logo={ASSETS.logoCliip} onClick={() => handleAppClick("CLiiP")} />
                            <AppCard title="HACKiinG" logo={ASSETS.logoHackiing} onClick={() => handleAppClick("HACKiinG")} />
                        </div>

                        {/* Message Robot */}
                        <div className="absolute bottom-10 md:bottom-20 bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl max-w-lg text-center">
                            <p className="text-gray-300 text-sm font-light">
                                <span className="text-blue-400 font-semibold">ONORA AI :</span> "L'ancien monde est bruyant. Bienvenue dans la clarté. Choisissez votre module."
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}