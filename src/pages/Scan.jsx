// src/pages/Scan.jsx
// Page dédiée pour le scan de business

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Radar, Sparkles } from "lucide-react";
import { submitWaitlist } from "@/lib/waitlistService";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from "../components/PageLayout";

export default function Scan() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ url: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Utiliser waitlistService pour enregistrer
      await submitWaitlist({
        company: "Scan Audit",
        website: formData.url,
        email: formData.email,
        sector: "autre",
        motivation: `Scan IA demandé pour ${formData.url}`,
        source: "scan_widget",
      });

      toast({
        title: "Scan en cours ✓",
        description: "Ton audit IA est en préparation. Tu recevras les résultats sous 24-48h.",
      });

      // Rediriger vers la waitlist après 2s
      setTimeout(() => {
        navigate("/waitlist");
      }, 2000);
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer ton scan. Réessaie dans quelques instants.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Scan IA de ton Business · ONORA</title>
        <meta
          name="description"
          content="Analyse IA complète de ton site web. Audit de visibilité, SEO, performance et positionnement concurrentiel."
        />
      </Helmet>

      <PageLayout maxWidth="max-w-3xl">
        <div className="space-y-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400/20 to-orange-500/20 border-2 border-cyan-400/50 flex items-center justify-center">
                <Radar className="w-10 h-10 text-cyan-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Tu es sûr d'être devant tes concurrents ?
            </h1>
            <p className="text-lg md:text-xl text-gray-900 max-w-2xl mx-auto">
              Analyse IA complète de ton site. Audit de visibilité, SEO, performance et positionnement concurrentiel.
            </p>
          </motion.div>

          {/* Animation visuelle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative h-48 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-orange-500/10 border border-white/10 flex items-center justify-center overflow-hidden"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 rounded-full border-2 border-cyan-400/30"
                animate={{
                  scale: [0.5, 2, 2.5],
                  opacity: [0.5, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut",
                }}
              />
            ))}
            <Sparkles className="w-16 h-16 text-cyan-400/50" />
          </motion.div>

          {/* Formulaire */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-black/20 rounded-2xl p-6 md:p-8 border border-white/10"
          >
            <div>
              <label
                htmlFor="scan-url"
                className="block text-sm text-gray-900 mb-2 font-medium"
              >
                URL de ton site *
              </label>
              <input
                id="scan-url"
                type="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                placeholder="https://monsite.lu"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-900 placeholder:text-gray-900 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label
                htmlFor="scan-email"
                className="block text-sm text-gray-900 mb-2 font-medium"
              >
                Email professionnel *
              </label>
              <input
                id="scan-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="contact@monentreprise.lu"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-900 placeholder:text-gray-900 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400/20 to-orange-500/20 border border-cyan-400/50 text-gray-900 font-semibold text-lg hover:from-cyan-400/30 hover:to-orange-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Scan en cours...
                </span>
              ) : (
                "Lancer mon scan IA"
              )}
            </button>

            <p className="text-xs text-center text-gray-900">
              Tu recevras ton audit IA détaillé sous 24 à 48h par email.
            </p>
          </motion.form>
        </div>
      </PageLayout>
    </>
  );
}
