// src/components/NoPortfolio.jsx
// Section "Pas de portfolio. Des résultats." - Style VisionOS

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Zap, ArrowRight } from "lucide-react";

const useCases = [
  {
    id: 1,
    vertical: "Commerce de détail",
    title: "Le click & collect qui ne dort jamais",
    problem: "Je perds des ventes la nuit et je réponds 100 fois la même chose sur Insta.",
    solution: "SiioN + HACKiinG · Shopify rapide + chatbot connecté au stock.",
    result: "+30 % de ventes la nuit, plus de DM “C’est dispo en 42 ?”.",
    color: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400"
  },
  {
    id: 2,
    vertical: "Bâtiment",
    title: "L’artisan qui ne fait plus ses devis le dimanche",
    problem: "Je passe mes week-ends à faire des devis, je rappelle trop tard.",
    solution: "HACKiinG · Formulaire intelligent + pré-devis généré + envoi SMS auto.",
    result: "15 h gagnées par semaine, taux de signature x2.",
    color: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-400"
  },
  {
    id: 3,
    vertical: "Immobilier",
    title: "Le chasseur de mandats 2.0",
    problem: "On a du trafic, mais zéro leads qualifiés.",
    solution: "SiioN + SKRiiB · Site immersif + estimation IA en échange du numéro.",
    result: "+45 mandats en 3 mois, sans pige.",
    color: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-400"
  },
  {
    id: 4,
    vertical: "Restauration",
    title: "Le restaurant qui coupe avec UberEats",
    problem: "UberEats me prend 30 %, je ne maîtrise pas ma base clients.",
    solution: "SKRiiB + HACKiinG · Site de commande directe + campagnes SMS météo.",
    result: "-2 000 € de commissions par mois, fichier client 100 % à soi.",
    color: "from-red-500/20 to-rose-500/20",
    iconColor: "text-rose-400"
  },
  {
    id: 5,
    vertical: "Services B2B",
    title: "L’expert-comptable qui ne fait plus peur",
    problem: "Site austère de 2010, personne ne comprend notre valeur.",
    solution: "SKRiiB + CLiiP · Branding moderne + capsules vidéo pédagogiques.",
    result: "Perçu comme le cabinet “startup friendly”, agenda plein 3 mois.",
    color: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400"
  },
  {
    id: 6,
    vertical: "Santé & bien-être",
    title: "Le coach sans lapins",
    problem: "No-show, appels à répétition pour décaler les séances.",
    solution: "HACKiinG · Réservation en ligne avec empreinte + liste d’attente auto.",
    result: "Planning rempli, zéro créneau perdu.",
    color: "from-teal-500/20 to-cyan-500/20",
    iconColor: "text-teal-400"
  },
  {
    id: 7,
    vertical: "Automobile",
    title: "Le garage suivi comme Domino’s Pizza",
    problem: "Les clients appellent juste pour savoir où en est la voiture.",
    solution: "HACKiinG · Portail client “suivi réparation” + notifications WhatsApp.",
    result: "-80 % d’appels entrants, clients rassurés.",
    color: "from-zinc-500/20 to-slate-500/20",
    iconColor: "text-slate-400"
  },
  {
    id: 8,
    vertical: "E-commerce",
    title: "La machine à scaler",
    problem: "Les ventes montent, mais le coût d’acquisition explose.",
    solution: "SiioN · Optimisation UX + séquences emails IA post-achat.",
    result: "Panier moyen +18 %, réachat +25 %.",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400"
  },
  {
    id: 9,
    vertical: "Formation & coaching",
    title: "Le coach qui passe en mode “Académie”",
    problem: "Je vends mon temps, je suis plafonné à 10 élèves.",
    solution: "SKRiiB + HACKiinG · Espace membre + onboarding et suivi automatisés.",
    result: "x10 de capacité sans travailler plus.",
    color: "from-yellow-500/20 to-orange-500/20",
    iconColor: "text-yellow-400"
  },
  {
    id: 10,
    vertical: "Artisanat d’art",
    title: "La marque artisanale qui devient luxe",
    problem: "Mes pièces sont magnifiques, mon site fait bricolage.",
    solution: "SKRiiB + CLiiP · Site galerie minimaliste + vidéos macro haute qualité.",
    result: "+40 % sur les prix acceptés sans résistance.",
    color: "from-fuchsia-500/20 to-purple-500/20",
    iconColor: "text-fuchsia-400"
  }
];

export default function NoPortfolio() {
  return (
    <section id="use-cases" className="w-full py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
      {/* Fond lumineux subtil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-gray-400 mb-6 backdrop-blur-md">
              Use Cases · Reality Check
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Pas de portfolio.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                Des résultats.
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              On ne vend pas des maquettes. On résout des problèmes business.
              <br className="hidden md:block" />
              Voici ce qui se passe quand on branche le système ONORA.
            </p>
          </motion.div>
        </div>

        {/* Grid Use Cases */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {useCases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
              }}
              className="group relative flex flex-col h-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 overflow-hidden transition-all duration-300"
            >
              {/* Gradient de fond au hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Header Carte */}
              <div className="flex items-center justify-between mb-6">
                <span className={`text-xs font-mono tracking-wider uppercase ${item.iconColor} bg-white/5 px-3 py-1 rounded-full border border-white/5`}>
                  {item.vertical}
                </span>
                <div className={`w-2 h-2 rounded-full ${item.iconColor.replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`} />
              </div>

              {/* Titre */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-tight group-hover:text-white/90 transition-colors">
                {item.title}
              </h3>

              {/* Contenu : Problem / Solution / Result */}
              <div className="mt-auto space-y-6">
                
                {/* Problème */}
                <div className="flex gap-3 items-start opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300 leading-snug">
                    <span className="block text-xs uppercase tracking-wider text-red-400/80 mb-1 font-semibold">Problème</span>
                    {item.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="flex gap-3 items-start opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <Zap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-200 leading-snug">
                    <span className="block text-xs uppercase tracking-wider text-cyan-400/80 mb-1 font-semibold">Solution ONORA</span>
                    {item.solution}
                  </p>
                </div>

                {/* Résultat - Mise en avant */}
                <div className="relative bg-black/20 rounded-xl p-4 border border-white/5 group-hover:border-emerald-500/30 transition-colors duration-300">
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-emerald-400 mb-1 font-semibold">Résultat</span>
                      <p className="text-base font-bold text-white leading-snug">
                        {item.result}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 mb-6 text-sm">
            Vous avez un problème similaire ?
          </p>
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            Lancer un diagnostic <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}