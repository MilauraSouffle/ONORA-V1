// src/components/VisionBubble.jsx
// Design : TRANSPARENT GLASS (Uniformisé avec les pages de destination)

import React from "react";
import { motion } from "framer-motion";

export default function VisionBubble({
  children,
  className = "",
  maxWidth = "max-w-7xl",
  padding = "p-8 md:p-12",
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
        /* DESIGN GLASS TRANSPARENT (Comme les pages de destination) */
        bg-white/5           
        backdrop-blur-3xl     
        border border-white/15
        shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset]
        
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