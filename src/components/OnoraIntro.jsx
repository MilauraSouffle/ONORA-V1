import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TES ASSETS IMAGEKIT ---
const ASSETS = {
    robotVideo: "https://ik.imagekit.io/bupjuxqi6/robot%20iA%20Onora%20?updatedAt=1763734568516",
    mainLogo: "https://ik.imagekit.io/bupjuxqi6/ONORA%20log%20de%CC%81toure%CC%81.png?updatedAt=1763629897161",
    logoSkriib: "https://ik.imagekit.io/bupjuxqi6/logo%20SkriiB%20copie.png?updatedAt=1763629897597",
    logoSiion: "https://ik.imagekit.io/bupjuxqi6/logo%20SiioN.png?updatedAt=1763629897926",
    logoCliip: "https://ik.imagekit.io/bupjuxqi6/logo%20CliiP%20copie.png?updatedAt=1763629897887",
    logoHackiing: "https://ik.imagekit.io/bupjuxqi6/Logo%20HackiinG.png?updatedAt=1763629897814"
};

// --- EFFET BRUIT BLANC PERMANENT (Overlay) ---
const StaticNoise = () => {
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
                // Bruit noir et blanc aléatoire
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
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999] mix-blend-overlay opacity-[0.08]"
        />
    );
};

// --- CARTE APP ---
const AppCard = ({ title, logo, onClick }) => (
    <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="relative group cursor-pointer flex flex-col items-center"
        onClick={onClick}
    >
        <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 group-hover:border-blue-400/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <img src={logo} alt={title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="mt-3 text-gray-400 text-xs tracking-[0.2em] uppercase group-hover:text-white transition-colors">{title}</h3>
    </motion.div>
);

export default function OnoraIntro() {
    const [isScreenOn, setIsScreenOn] = useState(false);

    // --- SÉQUENCE D'ALLUMAGE CRT ---
    useEffect(() => {
        const timer = setTimeout(() => setIsScreenOn(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-screen bg-[#050505] overflow-hidden font-sans text-white flex items-center justify-center">

            {/* 1. LE NOISE (Toujours là) */}
            <StaticNoise />

            {/* 2. EFFET ÉCRAN CATHODIQUE (CRT) */}
            <motion.div
                initial={{ scaleY: 0.005, scaleX: 0, opacity: 0 }}
                animate={{
                    scaleY: isScreenOn ? 1 : 0.005,
                    scaleX: isScreenOn ? 1 : (isScreenOn === false ? 0 : 1),
                    opacity: 1
                }}
                transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    times: [0, 0.4, 1] // Ligne s'étend -> Ligne s'ouvre
                }}
                className="relative w-full h-full flex flex-col"
                style={{ boxShadow: "inset 0 0 100px rgba(0,0,0,0.9)" }}
            >

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: isScreenOn ? 1 : 0, y: isScreenOn ? 0 : -20 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50"
                >
                    <img
                        src={ASSETS.mainLogo}
                        alt="ONORA"
                        className="h-12 md:h-16 object-contain cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => window.location.reload()}
                    />
                    <button className="border border-white/20 bg-black/50 backdrop-blur-md px-6 py-2 rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                        Access Waitlist
                    </button>
                </motion.div>

                {/* VIDEO FOND + SCANLINES */}
                <div className="absolute inset-0 z-0">
                    <motion.video
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isScreenOn ? 0.6 : 0 }}
                        transition={{ delay: 1, duration: 2 }}
                        src={ASSETS.robotVideo}
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover grayscale-[30%] contrast-125"
                    />
                    {/* Lignes horizontales TV */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none z-10 opacity-50"></div>
                </div>

                {/* CONTENU CENTRAL */}
                <div className="relative z-20 flex-grow flex flex-col items-center justify-center pt-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: isScreenOn ? 1 : 0, scale: isScreenOn ? 1 : 0.9 }}
                        transition={{ delay: 2.5, duration: 1 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
                    >
                        <AppCard title="SKriiB" logo={ASSETS.logoSkriib} onClick={() => console.log("SKriiB")} />
                        <AppCard title="SiiON" logo={ASSETS.logoSiion} onClick={() => console.log("SiiON")} />
                        <AppCard title="CLiiP" logo={ASSETS.logoCliip} onClick={() => console.log("CLiiP")} />
                        <AppCard title="HACKiinG" logo={ASSETS.logoHackiing} onClick={() => console.log("HACKiinG")} />
                    </motion.div>

                    {/* Indicateur de Scroll */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 4, duration: 1 }}
                        className="absolute bottom-10 flex flex-col items-center gap-2 opacity-50 animate-bounce"
                    >
                        <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
                        <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent"></div>
                    </motion.div>
                </div>

            </motion.div>
        </div>
    );
}