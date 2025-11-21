import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ASSETS ---
const ASSETS = {
    robotVideo: "https://ik.imagekit.io/bupjuxqi6/Design%20sans%20titre.mp4",
    mainLogo: "https://ik.imagekit.io/bupjuxqi6/ONORA%20log%20de%CC%81toure%CC%81.png?updatedAt=1763629897161",
    logoSkriib: "https://ik.imagekit.io/bupjuxqi6/logo%20SkriiB%20copie.png?updatedAt=1763629897597",
    logoSiion: "https://ik.imagekit.io/bupjuxqi6/logo%20SiioN.png?updatedAt=1763629897926",
    logoCliip: "https://ik.imagekit.io/bupjuxqi6/logo%20CliiP%20copie.png?updatedAt=1763629897887",
    logoHackiing: "https://ik.imagekit.io/bupjuxqi6/Logo%20HackiinG.png?updatedAt=1763629897814"
};

import StaticNoise from './StaticNoise';

// --- CARTE APP ---
const AppCard = ({ title, logo, link }) => (
    <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="relative group cursor-pointer flex flex-col items-center"
    >
        <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 group-hover:border-blue-400/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <img src={logo} alt={title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="mt-3 text-gray-400 text-xs tracking-[0.2em] uppercase group-hover:text-white transition-colors">{title}</h3>
    </motion.a>
);

export default function OnoraIntro({ onComplete }) {
    const [phase, setPhase] = useState('boot'); // 'boot' | 'hero' | 'apps'

    useEffect(() => {
        // Phase 1: BOOT (1.8s)
        const timer = setTimeout(() => setPhase('hero'), 1800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Notify parent when entering 'apps' phase to stop global noise
        if (phase === 'apps' && onComplete) {
            onComplete();
        }
    }, [phase, onComplete]);

    const scrollToWaitlist = () => {
        const section = document.getElementById('join-the-100');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative w-full h-screen bg-transparent overflow-hidden font-sans text-white">

            {/* PHASE 1: BOOT SCREEN */}
            <AnimatePresence>
                {phase === 'boot' && (
                    <motion.div
                        key="boot"
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center z-[60] bg-black"
                    >
                        {/* Intense Noise for Boot Phase */}
                        <StaticNoise isVisible={true} className="z-[70] opacity-40 mix-blend-normal" />

                        {/* CRT Turn-on Animation */}
                        <motion.div
                            initial={{ scaleX: 0, scaleY: 0.005, opacity: 0 }}
                            animate={{
                                scaleX: [0, 1, 1],
                                scaleY: [0.005, 0.005, 1],
                                opacity: [0, 1, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                times: [0, 0.2, 1],
                                ease: "easeInOut"
                            }}
                            className="w-full h-full bg-white"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PHASE 2 & 3: HERO & APPS */}
            {phase !== 'boot' && (
                <div className="relative w-full h-full flex flex-col">

                    {/* HEADER (Visible in Hero & Apps) */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50"
                    >
                        <img
                            src={ASSETS.mainLogo}
                            alt="ONORA"
                            className="h-20 md:h-24 object-contain cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => window.location.reload()}
                        />
                        <button
                            onClick={scrollToWaitlist}
                            className="border border-white/20 bg-black/50 backdrop-blur-md px-6 py-2 rounded-full text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                        >
                            Access Waitlist
                        </button>
                    </motion.div>

                    {/* VIDEO BACKGROUND */}
                    <motion.div
                        className="absolute inset-0 z-0"
                        animate={{ opacity: phase === 'apps' ? 0 : 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                        {/* Video with Blend Mode to show noise behind */}
                        <video
                            src={ASSETS.robotVideo}
                            autoPlay
                            muted
                            playsInline
                            onEnded={() => setPhase('apps')}
                            className="w-full h-full object-cover grayscale-[20%] contrast-125 mix-blend-screen"
                        />

                        {/* OVERLAYS (Only in Hero Phase) */}
                        {phase === 'hero' && (
                            <>
                                {/* Scanlines */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none z-10 opacity-30"></div>
                                {/* Vignette */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-10"></div>
                            </>
                        )}
                    </motion.div>

                    {/* APPS GRID (Visible only in Apps Phase) */}
                    {phase === 'apps' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_100%)]"
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16"
                            >
                                <AppCard title="SKriiB" logo={ASSETS.logoSkriib} link="#" />
                                <AppCard title="SiiON" logo={ASSETS.logoSiion} link="#" />
                                <AppCard title="CLiiP" logo={ASSETS.logoCliip} link="#" />
                                <AppCard title="HACKiinG" logo={ASSETS.logoHackiing} link="#" />
                            </motion.div>

                            {/* Scroll Indicator */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5, duration: 1 }}
                                className="absolute bottom-10 flex flex-col items-center gap-2 opacity-50 animate-bounce"
                            >
                                <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
                                <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent"></div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
}