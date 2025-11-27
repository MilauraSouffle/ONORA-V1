// src/pages/Socials.jsx
// Page des réseaux sociaux ONORA

import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Twitter, Linkedin, Youtube } from "lucide-react";

const socialLinks = [
  {
    name: "Twitter / X",
    icon: Twitter,
    url: "#", // À remplacer par les vraies URLs
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-500/30",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(29,161,242,0.5)]",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "#", // À remplacer par les vraies URLs
    color: "text-blue-500",
    bgColor: "bg-blue-600/20",
    borderColor: "border-blue-600/30",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(0,119,181,0.5)]",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "#", // À remplacer par les vraies URLs
    color: "text-red-500",
    bgColor: "bg-red-500/20",
    borderColor: "border-red-500/30",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(255,0,0,0.5)]",
  },
];

export default function Socials() {
  return (
    <>
      <Helmet>
        <title>Nos réseaux · ONORA</title>
        <meta
          name="description"
          content="Suivez ONORA sur Twitter, LinkedIn et YouTube. Actualités, cas d'usage, tutoriels IA et no-code."
        />
      </Helmet>

      <div className="w-full min-h-full py-8 md:py-12 px-4 md:px-6">
        {/* Bouton retour */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Retour à l'accueil</span>
        </Link>

        {/* Contenu */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nos réseaux
            </h1>
            <p className="text-lg text-gray-900 max-w-2xl mx-auto">
              Suivez ONORA pour découvrir nos actualités, cas d'usage et
              tutoriels IA & no-code.
            </p>
          </motion.div>

          {/* Grid des réseaux */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`
                    relative flex flex-col items-center justify-center gap-6
                    bg-white/10 backdrop-blur-2xl rounded-[2rem] border border-white/15
                    p-8 md:p-12
                    transition-all duration-300
                    ${social.bgColor} ${social.borderColor}
                    ${social.hoverGlow}
                    cursor-pointer
                  `}
                >
                  <div
                    className={`w-20 h-20 rounded-full ${social.bgColor} border-2 ${social.borderColor} flex items-center justify-center`}
                  >
                    <Icon className={`w-10 h-10 ${social.color}`} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center">
                    {social.name}
                  </h2>
                  <span className="text-sm text-gray-900">
                    Suivre ONORA
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

