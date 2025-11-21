import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/customSupabaseClient';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="container mx-auto px-6 py-16"
  >
    {children}
  </motion.div>
);

const Audit = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const { error } = await supabase
      .from('audits')
      .insert([
        { 
          company_name: data.companyName, 
          website_url: data.website,
          activity_sector: data.activitySector,
          email: data.email
        },
      ]);

    setLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erreur lors de la soumission",
        description: "Une erreur s'est produite. Veuillez réessayer.",
      });
    } else {
      navigate('/merci');
    }
  };

  return (
    <PageWrapper>
      <Helmet>
        <title>Audit IA SkriiB — Découvrez vos opportunités digitales</title>
        <meta name="description" content="Inscrivez votre société pour recevoir un audit complet de votre présence en ligne (site, visibilité, automatisation) par les experts IA de SkriiB." />
      </Helmet>

      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Audit IA <span className="text-gradient">SkriiB</span> — Découvrez vos opportunités digitales.
        </h1>
        <p className="text-xl text-white/70">
          Inscrivez votre société pour recevoir un audit complet (site, visibilité, automatisation).
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-xl mx-auto mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-white/80">Nom de la société</Label>
            <Input id="companyName" name="companyName" placeholder="Votre société S.A." required className="bg-transparent text-white border-white/20 focus:ring-[#FF7F50] focus:border-[#FF7F50]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website" className="text-white/80">Site web</Label>
            <Input id="website" name="website" placeholder="https://example.com" className="bg-transparent text-white border-white/20 focus:ring-[#FF7F50] focus:border-[#FF7F50]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="activitySector" className="text-white/80">Secteur d’activité</Label>
            <Input id="activitySector" name="activitySector" placeholder="E-commerce, Restauration, etc." className="bg-transparent text-white border-white/20 focus:ring-[#FF7F50] focus:border-[#FF7F50]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">Email professionnel</Label>
            <Input id="email" name="email" type="email" placeholder="contact@example.com" required className="bg-transparent text-white border-white/20 focus:ring-[#FF7F50] focus:border-[#FF7F50]" />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-[#FF7F50] to-[#FFB380] text-white font-semibold py-3 text-base hover:shadow-xl hover:shadow-[#FF7F50]/50 transition-all"
            disabled={loading}
          >
            {loading ? 'Envoi en cours...' : 'Recevoir mon audit gratuit'}
          </Button>
        </form>
      </motion.div>
    </PageWrapper>
  );
};

export default Audit;