// src/components/Waitlist.jsx
// Composant UI officiel pour la waitlist - Utilise waitlistService
// Version "Candidature" avec champ motivation

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { submitWaitlist } from '@/lib/waitlistService';

const Waitlist = ({ hideHeader = false }) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    sector: '',
    email: '',
    motivation: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation simple - inclure motivation
    if (!formData.company || !formData.website || !formData.sector || !formData.email || !formData.motivation) {
      toast({
        title: 'Champs manquants',
        description: 'Merci de remplir tous les champs obligatoires, notamment ta motivation.',
        variant: 'destructive'
      });
      return;
    }

    // Vérifier que motivation n'est pas vide après trim
    if (!formData.motivation.trim()) {
      toast({
        title: 'Motivation requise',
        description: 'Merci d\'expliquer pourquoi ton business mérite une place dans le système ONORA.',
        variant: 'destructive'
      });
      return;
    }

    // Réinitialiser les états
    setIsSubmitting(true);
    setError(null);

    try {
      // Construire le payload propre
      const payload = {
        company: formData.company.trim(),
        website: formData.website.trim(),
        sector: formData.sector,
        email: formData.email.trim(),
        motivation: formData.motivation.trim(),
        source: 'site_onora'
      };

      // Appeler le service centralisé
      await submitWaitlist(payload);

      // Succès : réinitialiser et afficher le message de succès
      setSubmitted(true);
      setFormData({ company: '', website: '', sector: '', email: '', motivation: '' });

      toast({
        title: 'Candidature reçue ✓',
        description: "Ton dossier vient d'entrer dans le système."
      });
    } catch (err) {
      // Gérer l'erreur
      const errorMessage =
        err.message || 'Une erreur est survenue. Réessaie dans quelques instants.';
      setError(errorMessage);

      toast({
        title: 'Oups…',
        description:
          errorMessage ||
          "Impossible d'enregistrer ta candidature pour le moment. Réessaie dans quelques minutes, ou contacte-nous si le problème persiste.",
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Écran de succès - Nouveau message "Candidature reçue"
  if (submitted) {
    return (
      <section id="waitlist" className="w-full py-16 md:py-24 px-4 md:px-6 relative">
        <div className="absolute inset-0 bg-black/15 backdrop-blur-sm pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-[#FF7F50]/30 text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-[#FF7F50] to-[#FFB380] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✓</span>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Candidature reçue.</h3>
            <p className="text-base md:text-lg text-gray-900 mb-2">
              Merci, ton dossier vient d'entrer dans le système.
            </p>
            <p className="text-base md:text-lg text-gray-900 mb-2">
              Si ton profil matche avec ce qu'on construit, tu recevras un audit détaillé + un plan d'attaque sous 24 à 48h.
            </p>
            <p className="mt-4 text-sm text-gray-900">
              Je préfère te dire non franchement plutôt que te laisser dans l'attente. Tu sauras exactement où tu en es.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  // Si hideHeader, on retourne juste le contenu sans wrapper
  if (hideHeader) {
    return (
      <div className="w-full">
        {/* Contenu sans wrapper section */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-black/30 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/10 space-y-6 max-w-2xl mx-auto"
        >
          {/* Message d'erreur */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="company" className="text-gray-900">
              Nom de la société *
            </Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  company: e.target.value
                })
              }
              className="bg-white/10 border-white/20 text-gray-900 placeholder:text-gray-900/40"
              placeholder="Ma Super Entreprise"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-gray-900">
              Site web *
            </Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  website: e.target.value
                })
              }
              className="bg-white/10 border-white/20 text-gray-900 placeholder:text-gray-900/40"
              placeholder="https://monsite.lu"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sector" className="text-gray-900">
              Secteur d&apos;activité *
            </Label>
            <Select
              value={formData.sector}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  sector: value
                })
              }
              disabled={isSubmitting}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-gray-900">
                <SelectValue placeholder="Sélectionner un secteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="restauration">Restauration</SelectItem>
                <SelectItem value="commerce">Commerce</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="artisanat">Artisanat</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-900">
              Email professionnel *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value
                })
              }
              className="bg-white/10 border-white/20 text-gray-900 placeholder:text-gray-900/40"
              placeholder="contact@monentreprise.lu"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Nouveau champ motivation */}
          <div className="space-y-2">
            <Label htmlFor="motivation" className="text-gray-900">
              Pourquoi toi, en 2 phrases max ? *
            </Label>
            <textarea
              id="motivation"
              value={formData.motivation}
              onChange={(e) =>
                setFormData({ ...formData, motivation: e.target.value })
              }
              className="bg-white/10 border-white/20 text-gray-900 placeholder:text-gray-900/40 w-full h-28 p-3 rounded-lg resize-none focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="Explique-moi en quoi ton business mérite une place dans le système ONORA."
              required
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-900/40">
              Écris avec tes mots. N'utilise pas d'IA, je le verrai. Je veux comprendre qui tu es.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#FF7F50] to-[#FFB380] text-gray-900 font-semibold py-6 text-lg hover:shadow-xl hover:shadow-[#FF7F50]/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Envoi en cours…
              </span>
            ) : (
              'Lancer mon audit gratuit'
            )}
          </Button>

          <p className="text-center text-sm text-gray-900/60">
            Tu recevras ton audit personnalisé sous 24 à 48h.
          </p>
        </motion.form>
      </div>
    );
  }

  return (
    <section
      id="waitlist"
      className="w-full py-16 md:py-24 px-4 md:px-6 relative"
    >
      <div className="absolute inset-0 bg-black/15 backdrop-blur-sm pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {!hideHeader && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-xs tracking-[0.35em] uppercase text-gray-900 mb-4">
                WAITLIST · AUDIT IA
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                Rejoins la waitlist ONORA
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-900 max-w-2xl mx-auto mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Audit site + visibilité + IA offert pour les 100 premiers.
              </p>
              <p className="text-sm md:text-base text-gray-900 max-w-2xl mx-auto">
                Tu recevras ton audit sous 24–48h.
              </p>
            </motion.div>

            {/* Micro-copie */}
            <p className="text-center text-xs md:text-sm text-gray-900 mb-4 max-w-2xl mx-auto">
              On te répond à la main, pas avec un robot.
            </p>
          </>
        )}

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-black/30 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/10 space-y-6 max-w-2xl mx-auto"
        >
          {/* Message d'erreur */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="company" className="text-gray-900">
              Nom de la société *
            </Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  company: e.target.value
                })
              }
              className="bg-white/10 border-white/20 text-gray-900 placeholder:text-gray-900/40"
              placeholder="Ma Super Entreprise"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-gray-900">
              Site web *
            </Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  website: e.target.value
                })
              }
              className="bg-white/10 border-white/20 text-gray-900 placeholder:text-gray-900/40"
              placeholder="https://monsite.lu"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sector" className="text-gray-900">
              Secteur d&apos;activité *
            </Label>
            <Select
              value={formData.sector}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  sector: value
                })
              }
              disabled={isSubmitting}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-gray-900">
                <SelectValue placeholder="Sélectionner un secteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="restauration">Restauration</SelectItem>
                <SelectItem value="commerce">Commerce</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="artisanat">Artisanat</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-900">
              Email professionnel *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value
                })
              }
              className="bg-white/10 border-white/20 text-gray-900 placeholder:text-gray-900/40"
              placeholder="contact@monentreprise.lu"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Nouveau champ motivation */}
          <div className="space-y-2">
            <Label htmlFor="motivation" className="text-gray-900">
              Pourquoi toi, en 2 phrases max ? *
            </Label>
            <textarea
              id="motivation"
              value={formData.motivation}
              onChange={(e) =>
                setFormData({ ...formData, motivation: e.target.value })
              }
              className="bg-white/10 border-white/20 text-gray-900 placeholder:text-gray-900/40 w-full h-28 p-3 rounded-lg resize-none focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder="Explique-moi en quoi ton business mérite une place dans le système ONORA."
              required
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-900/40">
              Écris avec tes mots. N'utilise pas d'IA, je le verrai. Je veux comprendre qui tu es.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#FF7F50] to-[#FFB380] text-gray-900 font-semibold py-6 text-lg hover:shadow-xl hover:shadow-[#FF7F50]/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Envoi en cours…
              </span>
            ) : (
              'Lancer mon audit gratuit'
            )}
          </Button>

          <p className="text-center text-sm text-gray-900/60">
            Tu recevras ton audit personnalisé sous 24 à 48h.
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default Waitlist;
