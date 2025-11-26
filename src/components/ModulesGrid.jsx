// src/components/ModulesGrid.jsx
// Grille d'apps flottantes style VisionOS 2.0

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const modules = [
  {
    id: "skriib",
    name: "SKRIIB",
    logo: "/logos/logo SkriiB.jpg",
    title: "/logos/skriib-title.png",
    tagline: "Human. Digital. Intelligent.",
    color: "cyan",
    path: "/studios/skriib",
  },
  {
    id: "cliip",
    name: "CLiiP",
    logo: "/logos/logo CliiP.jpg",
    title: "/logos/cliip-title.png",
    tagline: "Design. Motion. Impact.",
    color: "orange",
    path: "/studios/cliip",
  },
  {
    id: "siion",
    name: "SIION",
    logo: "/logos/logo SiioN.jpg",
    title: "/logos/siion-title.png",
    tagline: "Intelligence augmentée.",
    color: "emerald",
    path: "/studios/siion",
  },
  {
    id: "hackiing",
    name: "HACKiinG",
    logo: "/logos/logo HackiinG.jpg",
    title: "/logos/hackiing-title.png",
    tagline: "Ton temps, multiplié.",
    color: "purple",
    path: "/studios/hackiing",
  },
];

export default function ModulesGrid() {
  return (
    <div className="w-full mt-16">
      <p className="text-xs tracking-[0.5em] uppercase text-gray-400 mb-8 text-center font-medium">
        ONORA · MODULES
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 place-items-center">
        {modules.map((m, index) => (
          <Link
            key={m.id}
            to={m.path}
            className="group"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="relative w-full max-w-[200px] rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl overflow-hidden transition-all duration-300"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05) inset'
              }}
            >
              {/* Gradient overlay par couleur au hover */}
              <div
                className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  m.color === "cyan"
                    ? "bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15),transparent)]"
                    : m.color === "orange"
                    ? "bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.15),transparent)]"
                    : m.color === "emerald"
                    ? "bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent)]"
                    : "bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent)]"
                }`}
              />

              {/* Surbrillance interne au hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
              </div>

              {/* Contenu de la carte */}
              <div className="relative p-6 space-y-4">
                {/* Logo détouré en grand */}
                <div className="flex justify-center">
                  <img
                    src={m.logo}
                    alt={m.name}
                    className="w-24 h-24 md:w-28 md:h-28 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Title image */}
                <div className="flex justify-center">
                  <img
                    src={m.title}
                    alt={`${m.name} Title`}
                    className="h-8 md:h-10 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>

              {/* Effet de glow au hover */}
              <div
                className={`absolute -inset-1 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300 ${
                  m.color === "cyan"
                    ? "bg-cyan-400"
                    : m.color === "orange"
                    ? "bg-orange-400"
                    : m.color === "emerald"
                    ? "bg-emerald-400"
                    : "bg-purple-400"
                }`}
              />
            </motion.div>

            {/* Slogan en dessous */}
            <div className="flex flex-col items-center gap-1.5 mt-4">
              <span className="text-sm text-gray-200 text-center max-w-[12rem] leading-tight drop-shadow-md">
                {m.tagline}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
