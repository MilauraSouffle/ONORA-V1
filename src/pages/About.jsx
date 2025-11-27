import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Feather, BrainCircuit, Users, Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const teamMembers = [
  { name: 'Nom du Fondateur', role: 'Stratège & IA' },
  { name: 'Nom du Développeur', role: 'Développeur Web' },
  { name: 'Nom du Designer', role: 'UX/UI Designer' },
];

const About = () => {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <Helmet>
          <title>À propos d'ONORA · Studio IA & No-Code</title>
          <meta name="description" content="Découvrez ONORA : studio IA & no-code à Metz et Luxembourg. Notre mission : rendre la technologie IA accessible et pragmatique pour les PME du Grand Est." />
          <meta name="keywords" content="ONORA, studio IA, no-code, Metz, Luxembourg, Grand Est, PME, automatisation, agents IA" />
        </Helmet>

        {/* --- H1 & Intro --- */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Notre mission : <span className="text-gradient">humaniser la digitalisation</span> des PME.
          </h1>
          <p className="text-lg text-gray-900/70 max-w-3xl mx-auto">
            Chez SkriiB, nous croyons que la technologie la plus avancée n'est rien sans une compréhension profonde de l'humain qu'elle sert.
          </p>
        </div>

        {/* --- Bloc 1: Histoire --- */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
             <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 p-4">
                <img 
                    className="w-full h-full object-cover rounded-lg"
                    alt="Vue moderne de la ville de Luxembourg avec des superpositions numériques"
                 src="https://images.unsplash.com/photo-1682795946301-1bbbfb220f5c" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-gray-900">
                    <p className="font-bold text-lg">Ancré au Luxembourg</p>
                    <p className="text-sm">Au coeur de l'Europe</p>
                </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Feather className="w-12 h-12 text-[#FF7F50] mb-4"/>
            <h2 className="text-3xl font-bold mb-4">Notre histoire</h2>
            <p className="text-gray-900/80 leading-relaxed">
              Fondé au Luxembourg, SkriiB est né d'un constat simple : les PME locales méritent les mêmes outils que les grandes entreprises, mais avec une approche plus personnelle et agile. Nous avons donc créé un studio qui combine l'excellence technologique avec une connaissance intime du tissu économique local, pour des solutions qui ont un impact réel.
            </p>
          </motion.div>
        </div>

        {/* --- Bloc 2: Approche IA --- */}
        <div className="text-center mb-24">
          <h2 className="text-3xl font-bold mb-4">Une IA pragmatique et à votre service</h2>
          <p className="text-lg text-gray-900/70 max-w-3xl mx-auto mb-12">
            Notre philosophie tient en trois mots :
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 text-center">
              <Users className="w-12 h-12 mx-auto text-[#FF7F50] mb-4"/>
              <h3 className="text-2xl font-bold mb-2">Human.</h3>
              <p className="text-gray-900/70">Votre réalité et vos clients sont toujours notre point de départ.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 text-center">
              <Bot className="w-12 h-12 mx-auto text-[#FF7F50] mb-4"/>
              <h3 className="text-2xl font-bold mb-2">Digital.</h3>
              <p className="text-gray-900/70">Nous créons des écosystèmes en ligne performants et esthétiques.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 text-center">
              <BrainCircuit className="w-12 h-12 mx-auto text-[#FF7F50] mb-4"/>
              <h3 className="text-2xl font-bold mb-2">Intelligent.</h3>
              <p className="text-gray-900/70">L'IA est notre levier pour automatiser, optimiser et accélérer.</p>
            </div>
          </div>
        </div>
        
        {/* --- Bloc 3: Équipe --- */}
        <div className="text-center mb-24">
          <h2 className="text-3xl font-bold mb-4">Une équipe d'experts passionnés</h2>
          <p className="text-lg text-gray-900/70 max-w-3xl mx-auto mb-12">
            La force de SkriiB réside dans son capital humain. Nous sommes un collectif de talents complémentaires.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 p-6 rounded-2xl border border-white/10"
              >
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-white/10">
                   <img 
                    className="w-full h-full object-cover"
                    alt={`Portrait de ${member.name}`}
                     src="https://images.unsplash.com/photo-1589132012505-a2d7a7a39589" />
                </div>
                <h4 className="text-xl font-bold">{member.name}</h4>
                <p className="text-[#FF7F50]">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Bloc 4: CTA --- */}
        <div className="bg-gradient-to-r from-[#FF7F50]/80 to-[#002C5F]/80 p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à passer au niveau supérieur ?</h2>
          <p className="text-gray-900/90 mb-8 max-w-2xl mx-auto">
            Voyons ensemble comment nos modules IA peuvent s'intégrer à votre stratégie pour générer des résultats concrets.
          </p>
          <Button size="lg" asChild className="bg-white text-black font-bold hover:bg-white/90">
            <Link to="/#modules">
              Découvrir nos solutions IA <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>

      </div>
    </PageWrapper>
  );
};

export default About;