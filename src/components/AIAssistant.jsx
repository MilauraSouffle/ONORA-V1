// src/components/AIAssistant.jsx
// Bouton Assistant IA + Sidebar

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

export default function AIAssistant({ isActive, onToggle }) {
  return (
    <>
      {/* Bouton dans le header */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 text-xs md:text-sm text-gray-300 hover:text-white"
      >
        <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
        <span className="hidden sm:inline">Assistant IA</span>
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isActive && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-96 z-50 bg-black/95 backdrop-blur-xl border-l border-white/10 shadow-2xl"
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">
                      Assistant IA
                    </h3>
                  </div>
                  <button
                    onClick={onToggle}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4">
                    <p className="text-xs text-gray-400 mb-2">STATUS</p>
                    <p className="text-sm text-gray-300">
                      Prototype. Version LLM à venir.
                    </p>
                  </div>

                  {/* Placeholder chat */}
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <p className="text-sm text-gray-400 mb-2">Assistant IA</p>
                      <p className="text-gray-300">
                        Bonjour ! Je suis l'assistant IA ONORA. Comment puis-je
                        vous aider ?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

