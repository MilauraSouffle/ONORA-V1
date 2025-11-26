import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StaticNoise from './StaticNoise';

// --- ASSETS ---
const ASSETS = {
    robotVideo: "https://ik.imagekit.io/bupjuxqi6/Design%20sans%20titre.mp4",
    mainLogo: "https://ik.imagekit.io/bupjuxqi6/ONORA%20log%20de%CC%81toure%CC%81.png?updatedAt=1763629897161",
    logoSkriib: "https://ik.imagekit.io/bupjuxqi6/logo%20SkriiB%20(1).png?updatedAt=1763629897296",
    logoSiion: "https://ik.imagekit.io/bupjuxqi6/logo%20SiioN%20(1).png?updatedAt=1763629897489",
    logoCliip: "https://ik.imagekit.io/bupjuxqi6/logo%20CliiP%20(1)%20copie.png?updatedAt=1763629897294",
    logoHackiing: "https://ik.imagekit.io/bupjuxqi6/Logo%20HackiinG%20(1).png?updatedAt=1763629897494"
};

// --- CARTE APP ---
const AppCard = ({ title, logo, link }) => (
    <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        className="relative group cursor-pointer flex flex-col items-center justify-center"
    >
        {/* Image seule, sans cadre, taille augmentée */}
        <img
            src={logo}
            alt={title}
            className="w-32 h-32 md:w-56 md:h-56 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-500 group-hover:drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
        />
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
                            className="h-32 md:h-48 object-contain cursor-pointer hover:opacity-80 transition-opacity"
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
                        initial={{ opacity: 0 }}
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
                            className="absolute inset-0 z-20 flex flex-col items-center justify-center overflow-hidden"
                        >
                            {/* Dynamic AI Background (Aurora Effect) */}
                            <div className="absolute inset-0 bg-black">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 15, -15, 0],
                                    }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_50%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.15)_0%,transparent_50%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15)_0%,transparent_50%)] blur-[100px]"
                                />
                            </div>

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 relative z-10"
                            >
                                <AppCard title="SKriiB" logo={ASSETS.logoSkriib} link="#" />
                                <AppCard title="SiiON" logo={ASSETS.logoSiion} link="#" />
                                <AppCard title="CLiiP" logo={ASSETS.logoCliip} link="#" />
                                <AppCard title="HACKiinG" logo={ASSETS.logoHackiing} link="#" />
                            </motion.div>

                            {/* Modern Scroll Indicator (Mouse Animation) */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2, duration: 1 }}
                                className="absolute bottom-6 flex flex-col items-center gap-3 z-20 opacity-60 mix-blend-difference"
                            >
                                <div className="w-[20px] h-[32px] border-[1.5px] border-white/80 rounded-full flex justify-center p-1">
                                    <motion.div
                                        animate={{ y: [0, 6, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        className="w-[2px] h-[6px] bg-white rounded-full"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
}