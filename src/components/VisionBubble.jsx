// src/components/VisionBubble.jsx
// Le Design "Master" : Fenêtre Gris Sombre/Glass, compatible texte noir.

import React from "react";
import { motion } from "framer-motion";

export default function VisionBubble({
  children,
  className = "",
  maxWidth = "max-w-7xl",
  padding = "p-8 md:p-12", // Padding ajusté pour éviter les espaces vides
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`
        w-full ${maxWidth} mx-auto
        rounded-[2.5rem]
        bg-black/5            /* Le fameux "Gris Sombre" subtil */
        backdrop-blur-3xl     /* Flou intense pour l'effet matière */
        border border-white/15
        shadow-[0_30px_80px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)_inset]
        flex flex-col justify-center
        ${padding}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}