// src/components/CarouselPager.jsx
// Navigation carrousel avec points + pilule bleue pour l'actif

import React from "react";

export default function CarouselPager({
  totalSlides,
  activeIndex,
  onSlideChange,
  className = "",
}) {
  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      role="tablist"
      aria-label="Navigation du carrousel"
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`
            transition-all duration-300 ease-out
            ${
              activeIndex === index
                ? "w-8 h-2 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                : "w-2 h-2 bg-white/30 hover:w-4 hover:bg-white/50"
            }
            rounded-full
            focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent
          `}
          aria-label={`Aller à la slide ${index + 1}`}
          aria-selected={activeIndex === index}
          role="tab"
        />
      ))}
    </div>
  );
}



