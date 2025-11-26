// src/components/ModulesGrid.jsx
// Grille de logos flottants style VisionOS 2.0 - Version simplifiée sans cartes

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const modules = [
  {
    id: "skriib",
    name: "SKRIIB",
    logo: "/logos/logo-skriib.png",
    title: "/logos/skriib-title.png",
    tagline: "Human. Digital. Intelligent.",
    color: "cyan",
    path: "/studios/skriib",
  },
  {
    id: "cliip",
    name: "CLiiP",
    logo: "/logos/logo-cliip.png",
    title: "/logos/cliip-title.png",
    tagline: "Design. Motion. Impact.",
    color: "orange",
    path: "/studios/cliip",
  },
  {
    id: "siion",
    name: "SIION",
    logo: "/logos/logo-siion.png",
    title: "/logos/siion-title.png",
    tagline: "Intelligence augmentée.",
    color: "emerald",
    path: "/studios/siion",
  },
  {
    id: "hackiing",
    name: "HACKiinG",
    logo: "/logos/logo-hackiing.png",
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-20 place-items-center">
        {modules.map((m, index) => (
          <Link
            key={m.id}
            to={m.path}
            className="group flex flex-col items-center w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.15 }}
              className="relative flex items-center justify-center w-full"
            >
              {/* Logo seul avec effet glow au hover */}
              <div className="relative">
                <img
                  src={m.logo}
                  alt={m.name}
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain transition-all duration-300 drop-shadow-2xl"
                />
                
                {/* Effet de glow au hover */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300 pointer-events-none ${
                    m.color === "cyan"
                      ? "bg-cyan-400"
                      : m.color === "orange"
                      ? "bg-orange-400"
                      : m.color === "emerald"
                      ? "bg-emerald-400"
                      : "bg-purple-400"
                  }`}
                  style={{
                    transform: 'scale(1.2)',
                  }}
                />
              </div>
            </motion.div>

            {/* Title image EN DEHORS, agrandie x4 */}
            <div className="flex flex-col items-center gap-4 mt-8 w-full">
              <img
                src={m.title}
                alt={`${m.name} Title`}
                className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto object-contain opacity-100 transition-opacity duration-300 group-hover:opacity-90"
              />
              
              {/* Slogan en dessous */}
              <span className="text-sm md:text-base lg:text-lg text-gray-200 text-center max-w-[20rem] leading-tight drop-shadow-md font-medium">
                {m.tagline}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
