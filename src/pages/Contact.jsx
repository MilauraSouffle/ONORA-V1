import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16"
  >
    {children}
  </motion.div>
);

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée.",
      description: "Mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochain prompt ! 🚀",
    });
  };
  
  return (
    <PageWrapper>
      <Helmet>
        <title>Contact ONORA · Metz & Luxembourg</title>
        <meta name="description" content="Contactez ONORA : studio IA & no-code à Metz et Luxembourg. Prise de RDV, audit, sprint 48h. Discutons de votre projet et des opportunités IA pour votre business." />
        <meta name="keywords" content="contact ONORA, Metz, Luxembourg, studio IA, audit, sprint 48h, rendez-vous" />
      </Helmet>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contacte un expert <span className="text-gradient">SkriiB</span>
        </h1>
        <p className="text-xl text-gray-900/70 max-w-3xl mx-auto">
          Discutons de ton projet et des opportunités IA pour ton business.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-start max-w-6xl mx-auto">
        {/* Form Section */}
        <div className="lg:col-span-3 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Envoyez-nous un message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-900/80">Nom</Label>
              <Input id="name" placeholder="Votre nom complet" className="bg-transparent text-gray-900 border-white/20 focus:ring-[#FF7F50] focus:border-[#FF7F50]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900/80">Email</Label>
              <Input id="email" type="email" placeholder="Votre email professionnel" className="bg-transparent text-gray-900 border-white/20 focus:ring-[#FF7F50] focus:border-[#FF7F50]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-900/80">Message</Label>
              <Textarea id="message" placeholder="Parlez-nous de votre projet..." className="bg-transparent text-gray-900 border-white/20 focus:ring-[#FF7F50] focus:border-[#FF7F50]" />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-[#FF7F50] to-[#FFB380] text-gray-900 font-semibold py-3 text-base hover:shadow-xl hover:shadow-[#FF7F50]/50 transition-all"
            >
              Envoyer
            </Button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-start gap-4">
            <Mail className="w-8 h-8 text-[#FF7F50] flex-shrink-0 mt-1"/>
            <div>
              <h3 className="font-bold text-lg">Email</h3>
              <a href="mailto:contact@skriib.lu" className="text-gray-900/70 hover:text-[#FF7F50] break-all">contact@skriib.lu</a>
            </div>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-start gap-4">
            <MapPin className="w-8 h-8 text-[#FF7F50] flex-shrink-0 mt-1"/>
            <div>
              <h3 className="font-bold text-lg">Adresse</h3>
              <p className="text-gray-900/70">Luxembourg, G.D.</p>
              <p className="text-sm text-gray-900/50">Disponible sur rendez-vous</p>
            </div>
          </div>
           <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
             <h3 className="font-bold text-lg mb-4">Réseaux sociaux</h3>
             <div className="flex items-center gap-4">
               <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-900/70 hover:text-[#FF7F50] transition-colors p-2 bg-white/5 rounded-full"><Linkedin className="w-5 h-5" /></a>
               <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-900/70 hover:text-[#FF7F50] transition-colors p-2 bg-white/5 rounded-full"><Twitter className="w-5 h-5" /></a>
             </div>
           </div>
           <div className="aspect-w-16 aspect-h-9 bg-gray-700 rounded-lg overflow-hidden border border-white/10">
              <iframe
                title="SkriiB Location on OpenStreetMap"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://www.openstreetmap.org/export/embed.html?bbox=6.1243,49.6063,6.1343,49.6163&layer=mapnik&marker=49.6113,6.1293">
              </iframe>
            </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Contact;