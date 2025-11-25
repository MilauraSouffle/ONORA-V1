// src/components/ModulesGrid.jsx

import React from "react";

const modules = [

  {

    id: "skriib",

    name: "SKRIIB",

    logo: "/logos/skriib.png",

    tagline: "Studio contenu & sites web",

  },

  {

    id: "siion",

    name: "SIION",

    logo: "/logos/siion.png",

    tagline: "Stratégie, vision & offres",

  },

  {

    id: "cliip",

    name: "CLiiP",

    logo: "/logos/cliip.png",

    tagline: "Vidéo, shorts & assets média",

  },

  {

    id: "hackiing",

    name: "HACKiinG",

    logo: "/logos/hackiing.png",

    tagline: "Growth, tracking & automatisation",

  },

];

export default function ModulesGrid() {

  return (

    <div className="w-full mt-16">

      <p className="text-xs tracking-[0.35em] uppercase text-gray-400 mb-6 text-center">

        ONORA · MODULES

      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">

        {modules.map((m) => (

          <div

            key={m.id}

            className="group flex flex-col items-center gap-4 cursor-pointer"

          >

            {/* Icône type app */}

            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_0_50px_rgba(0,0,0,0.9)]">

              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_0%,rgba(0,229,255,0.25),transparent),radial-gradient(circle_at_80%_100%,rgba(255,107,0,0.3),transparent)] opacity-60" />

              <img

                src={m.logo}

                alt={m.name}

                className="relative w-full h-full object-contain"

              />

            </div>

            {/* Nom + tagline */}

            <div className="flex flex-col items-center gap-1">

              <span className="text-xs tracking-[0.35em] uppercase text-gray-200">

                {m.name}

              </span>

              <span className="text-[11px] text-gray-500 text-center max-w-[12rem] leading-snug">

                {m.tagline}

              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

