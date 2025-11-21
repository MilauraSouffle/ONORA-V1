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

// 1) À REMPLIR AVEC TES VALEURS
// Copie l'URL exacte de la fonction dans Edge Functions > waitlist-submit > Details
const WAITLIST_FUNCTION_URL = 'https://vdvozheydssbkpzupgmr.supabase.co/functions/v1/waitlist-submit';

// Copie la clé "anon public" depuis Settings > API Keys
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkdm96aGV5ZHNzYmtwenVwZ21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MjI2OTIsImV4cCI6MjA3ODM5ODY5Mn0.OiJPWBspCWZ2atYxftY70hpYAWEpwMsfPwghwXy_Gho';

const Waitlist = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    sector: '',
    email: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation simple
    if (!formData.company || !formData.website || !formData.sector || !formData.email) {
      toast({
        title: 'Champs manquants',
        description: 'Merci de remplir tous les champs obligatoires.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(WAITLIST_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // autorisation via la clé anon (safe côté front)
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          company: formData.company,
          website: formData.website,
          sector: formData.sector,
          email: formData.email,
          source: 'site_horizon'
        })
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        const errorMessage =
          data?.error?.message ||
          data?.error ||
          'Une erreur est survenue pendant l’enregistrement.';

        throw new Error(errorMessage);
      }

      setSubmitted(true);

      toast({
        title: 'Merci ! 🎉',
        description: "Ton audit est en préparation. Tu seras notifié dès qu'il sera prêt."
      });
    } catch (error) {
      console.error('Erreur waitlist:', error);

      toast({
        title: 'Oups…',
        description:
          "Impossible d’enregistrer ton audit pour le moment. Réessaie dans quelques minutes, ou contacte SkriiB si le problème persiste.",
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <section
        id="waitlist"
        className="py-24 px-6 bg-gradient-to-b from-[#001a3d] to-[#002C5F]"
      >
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-[#FF7F50]/30"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-[#FF7F50] to-[#FFB380] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✓</span>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-gradient">Merci !</h3>
            <p className="text-xl text-white/80">
              Ton audit est en préparation. Tu seras notifié dès qu&apos;il sera prêt.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="waitlist"
      className="py-24 px-6 bg-gradient-to-b from-[#001a3d] to-[#002C5F]"
    >
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Rejoins la première <span className="text-gradient">waitlist IA</span> du
            Luxembourg
          </h2>
          <p className="text-xl text-white/70">
            Inscris ta société, accède à un espace dédié, reçois ton audit et ton plan
            d&apos;action personnalisé.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="company" className="text-white">
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
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              placeholder="Ma Super Entreprise"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-white">
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
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              placeholder="https://monsite.lu"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sector" className="text-white">
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
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
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
            <Label htmlFor="email" className="text-white">
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
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              placeholder="contact@monentreprise.lu"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#FF7F50] to-[#FFB380] text-white font-semibold py-6 text-lg hover:shadow-xl hover:shadow-[#FF7F50]/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Envoi en cours…' : 'Lancer mon audit gratuit'}
          </Button>

          <p className="text-center text-sm text-white/60">
            Tu recevras ton audit personnalisé sous 24 à 48h.
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default Waitlist;