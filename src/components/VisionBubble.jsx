// src/components/VisionBubble.jsx
// Bulle VisionOS réutilisable, sans scroll interne, pour les cartes du carrousel

import React from "react";
import { motion } from "framer-motion";

export default function VisionBubble({
  children,
  className = "",
      maxWidth = "max-w-7xl",
      padding = "p-12 md:p-16 lg:p-20",
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`
        w-full ${maxWidth} mx-auto
        rounded-[2rem]
        bg-white/10
        backdrop-blur-2xl
        border border-white/15
        shadow-[0_30px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)_inset]
        ${padding}
        ${className}
      `}
      style={{
        height: 'calc(82vh - 40px)', // Hauteur augmentée significativement
        display: 'flex',
        flexDirection: 'column',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

