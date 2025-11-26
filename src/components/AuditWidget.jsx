// src/components/AuditWidget.jsx
// Widget audit flottant avec modale

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, X } from "lucide-react";

export default function AuditWidget() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ url: "", email: "" });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder - log ou enregistrer dans Supabase comme Waitlist
    console.log("Audit scan:", formData);
    setShowModal(false);
    setFormData({ url: "", email: "" });
  };

  return (
    <>
      <div className="fixed bottom-20 md:bottom-24 right-4 md:right-6 z-50">
        <div className="relative">
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && !showModal && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-black/80 backdrop-blur-md rounded-lg border border-white/20 text-xs text-white whitespace-nowrap shadow-xl"
              >
                Tes concurrents sont devant toi ? Fais le test.
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/20" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bouton flottant */}
          <button
            onClick={() => {
              setShowModal(true);
              setShowTooltip(false);
            }}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-cyan-400/20 to-orange-500/20 border-2 border-cyan-400/50 flex items-center justify-center text-cyan-400 hover:scale-110 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-pointer cursor-hover"
          >
            <Radar className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      {/* Modale */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Scan IA de ton site
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="audit-url"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    URL du site *
                  </label>
                  <input
                    id="audit-url"
                    type="url"
                    value={formData.url}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    placeholder="https://monsite.lu"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="audit-email"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    Email professionnel *
                  </label>
                  <input
                    id="audit-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="contact@monentreprise.lu"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400/20 to-orange-500/20 border border-cyan-400/50 text-white font-medium hover:from-cyan-400/30 hover:to-orange-500/30 transition-all duration-300 cursor-pointer cursor-hover"
                >
                  Lancer mon scan IA
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

