// src/components/ui/IACursor.jsx
// Curseur custom ONORA avec effet IA

import React, { useEffect, useRef, useState } from "react";

export default function IACursor() {
  const cursorRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Vérifier si on est sur mobile/touch device
  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) {
      setIsVisible(false);
      return;
    }

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Vérifier si on survole un élément interactif
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest(".cursor-hover");
      setIsHovering(isInteractive);
    };

    // Vérifier si on focus un input
    const handleFocusIn = (e) => {
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.tagName === "SELECT"
      ) {
        setIsVisible(false);
      }
    };

    const handleFocusOut = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);

    // Animation avec interpolation (lerp)
    const lerp = (start, end, factor) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      positionRef.current.x = lerp(
        positionRef.current.x,
        targetRef.current.x,
        0.15
      );
      positionRef.current.y = lerp(
        positionRef.current.y,
        targetRef.current.y,
        0.15
      );

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px) translate(-50%, -50%)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] transition-all duration-[120ms] ease-out ${
        isHovering ? "scale-[1.2]" : "scale-100"
      }`}
      style={{
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className={`relative w-[14px] h-[14px] md:w-[16px] md:h-[16px] rounded-full border-2 transition-all duration-[120ms] ${
          isHovering
            ? "border-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.6)]"
            : "border-transparent bg-gradient-to-br from-cyan-400/60 to-orange-500/60 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
        }`}
        style={{
          background: isHovering
            ? "rgba(34, 211, 238, 0.2)"
            : "rgba(34, 211, 238, 0.12)",
          backdropFilter: "blur(4px)",
          borderImage: isHovering
            ? "none"
            : "linear-gradient(135deg, rgba(34,211,238,0.8), rgba(255,107,0,0.8)) 1",
        }}
      >
        {/* Point central */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-[120ms] ${
            isHovering
              ? "w-1 h-1 bg-cyan-400"
              : "w-0.5 h-0.5 bg-white/80"
          }`}
        />
      </div>
    </div>
  );
}

