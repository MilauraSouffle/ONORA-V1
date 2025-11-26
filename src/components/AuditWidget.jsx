// src/components/AuditWidget.jsx
// Widget audit flottant - Redirige vers /scan

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Radar } from "lucide-react";

export default function AuditWidget() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Link to="/scan" className="fixed bottom-20 md:bottom-24 right-4 md:right-6 z-50">
      <div className="relative flex items-center gap-3">
        {/* Tooltip contextuel élégant */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-xs text-white whitespace-nowrap shadow-xl"
              style={{
                animation: "float 3s ease-in-out infinite"
              }}
            >
              Tu es sûr d'être devant tes concurrents ?
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bouton flottant VisionOS */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-2xl border-2 border-white/20 flex items-center justify-center text-cyan-400 hover:border-cyan-400/50 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] flex-shrink-0"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9), 0 0 30px rgba(34,211,238,0.3)'
          }}
        >
          <Radar className="w-5 h-5 md:w-6 md:h-6" />
        </motion.div>
      </div>
    </Link>
  );
}
