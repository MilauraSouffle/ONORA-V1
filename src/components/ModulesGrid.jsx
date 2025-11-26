// src/components/ModulesGrid.jsx

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const modules = [
  {
    id: "skriib",
    name: "SKRIIB",
    logo: "/logos/skriib.png",
    tagline: "Human. Digital. Intelligent.",
    color: "cyan",
    path: "/studios/skriib",
  },
  {
    id: "cliip",
    name: "CLiiP",
    logo: "/logos/cliip.png",
    tagline: "Design. Motion. Impact.",
    color: "orange",
    path: "/studios/cliip",
  },
  {
    id: "siion",
    name: "SIION",
    logo: "/logos/siion.png",
    tagline: "Intelligence augmentée.",
    color: "emerald",
    path: "/studios/siion",
  },
  {
    id: "hackiing",
    name: "HACKiinG",
    logo: "/logos/hackiing.png",
    tagline: "Ton temps, multiplié.",
    color: "purple",
    path: "/studios/hackiing",
  },
];

export default function ModulesGrid() {

  return (

    <div className="w-full mt-16">

      <p className="text-xs tracking-[0.35em] uppercase text-gray-400 mb-6 text-center">

        ONORA · MODULES

      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 place-items-center">
        {modules.map((m) => (
          <Link
            key={m.id}
            to={m.path}
            className="group flex flex-col items-center gap-4 cursor-pointer cursor-hover"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.2 }}
              className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_60px_rgba(0,0,0,0.9)] group-hover:border-white/30"
            >
              <div
                className={`absolute inset-0 pointer-events-none opacity-60 ${
                  m.color === "cyan"
                    ? "bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.3),transparent),radial-gradient(circle_at_80%_100%,rgba(255,107,0,0.2),transparent)]"
                    : m.color === "orange"
                    ? "bg-[radial-gradient(circle_at_20%_0%,rgba(255,107,0,0.3),transparent),radial-gradient(circle_at_80%_100%,rgba(34,211,238,0.2),transparent)]"
                    : m.color === "emerald"
                    ? "bg-[radial-gradient(circle_at_20%_0%,rgba(16,185,129,0.3),transparent),radial-gradient(circle_at_80%_100%,rgba(34,211,238,0.2),transparent)]"
                    : "bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.3),transparent),radial-gradient(circle_at_80%_100%,rgba(34,211,238,0.2),transparent)]"
                }`}
              />

              <img
                src={m.logo}
                alt={m.name}
                className="relative w-full h-full object-contain p-4"
              />
            </motion.div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-sm md:text-base tracking-[0.25em] uppercase text-white font-semibold">
                {m.name}
              </span>
              <span className="text-xs md:text-sm text-gray-400 text-center max-w-[12rem] leading-snug">
                {m.tagline}
              </span>
            </div>
          </Link>
        ))}
      </div>

    </div>

  );

}

