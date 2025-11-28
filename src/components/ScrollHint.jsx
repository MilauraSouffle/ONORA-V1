// src/components/ScrollHint.jsx
// Icône souris animée pour indiquer le scroll horizontal - Version compacte à côté des points

import React from "react";
import { motion } from "framer-motion";

export default function ScrollHint() {
  return (
    <div className="flex items-center pointer-events-none">
      <motion.div
        className="w-6 h-8 rounded-full border border-gray-900/30 bg-gray-900/10 backdrop-blur-sm flex items-start justify-center p-1"
        animate={{
          y: [0, 3, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="w-0.5 h-1.5 rounded-full bg-gray-900/70"
          animate={{
            y: [0, 12, 0],
            opacity: [1, 0.3, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}

