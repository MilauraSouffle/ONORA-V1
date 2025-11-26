// src/components/HackiingSprint.jsx
// Bloc Sprint 48h HACKiinG avec démo Architecte IA

import React, { useState } from "react";

export default function HackiingSprint() {
  const [formData, setFormData] = useState({
    secteur: "",
    tache: "",
    heures: "",
  });

  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pour l'instant, simulation statique
    // Plus tard connecté à Supabase + gpt-4o
    setResult({
      agent: "Agent IA de gestion client automatisé",
      gainTemps: "8h/semaine",
      roi: "320€/mois économisés",
      description:
        "Un agent IA qui gère les demandes clients récurrentes, planifie les rendez-vous et suit les projets.",
    });
  };

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-6 relative">
      <div className="absolute inset-0 bg-black/15 backdrop-blur-sm pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-gray-400 mb-4">
            HACKiinG · SPRINT 48H
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            MVP IA en 48h, calibré sur ton business.
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Studio "Automations & Agents IA". MVP IA à partir de 300 €.
            L'objectif : faire gagner du temps et mesurer un ROI simple.
          </p>
          <div className="mt-6 text-sm md:text-base text-gray-400">
            À partir de 300 € · places limitées / mois
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Formulaire Démo Architecte HACKiinG */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
              Démo Architecte HACKiinG
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="secteur"
                  className="block text-sm text-gray-300 mb-2"
                >
                  Secteur
                </label>
                <select
                  id="secteur"
                  value={formData.secteur}
                  onChange={(e) =>
                    setFormData({ ...formData, secteur: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="">Sélectionner un secteur</option>
                  <option value="commerce">Commerce</option>
                  <option value="service">Service</option>
                  <option value="restauration">Restauration</option>
                  <option value="artisanat">Artisanat</option>
                  <option value="conseil">Conseil</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="tache"
                  className="block text-sm text-gray-300 mb-2"
                >
                  Tâche la plus chronophage
                </label>
                <input
                  type="text"
                  id="tache"
                  value={formData.tache}
                  onChange={(e) =>
                    setFormData({ ...formData, tache: e.target.value })
                  }
                  placeholder="Ex: Gestion des emails clients"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="heures"
                  className="block text-sm text-gray-300 mb-2"
                >
                  Heures / semaine
                </label>
                <input
                  type="number"
                  id="heures"
                  value={formData.heures}
                  onChange={(e) =>
                    setFormData({ ...formData, heures: e.target.value })
                  }
                  placeholder="Ex: 10"
                  min="1"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400/20 to-orange-500/20 border border-cyan-400/30 text-white font-medium hover:from-cyan-400/30 hover:to-orange-500/30 transition-all duration-300"
              >
                Simuler mon agent IA
              </button>
            </form>
          </div>

          {/* Résultat estimé */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
              Résultat estimé
            </h3>
            {result ? (
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Agent proposé</p>
                  <p className="text-lg text-white font-medium">{result.agent}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Gain de temps</p>
                  <p className="text-2xl text-emerald-400 font-bold">
                    {result.gainTemps}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">ROI estimé</p>
                  <p className="text-2xl text-cyan-400 font-bold">{result.roi}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Description</p>
                  <p className="text-base text-gray-300 leading-relaxed">
                    {result.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px] text-gray-500">
                <p className="text-center">
                  Remplis le formulaire pour voir une simulation
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/30 bg-white/5 backdrop-blur-md text-xs tracking-[0.3em] uppercase text-white/90 hover:bg-white/10 hover:border-white/60 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.6)]"
          >
            Lancer un Sprint 48h
          </a>
        </div>
      </div>
    </section>
  );
}

