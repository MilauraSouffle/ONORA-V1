import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Zap, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';

const modules = [
  {
    icon: Sparkles,
    title: 'Branding & Site Web',
    description: 'Crée une image qui vend.',
    slug: 'branding-site-web',
    gradient: 'from-[#FF7F50] to-[#FFB380]'
  },
  {
    icon: MapPin,
    title: 'Visibilité Locale & Réseaux',
    description: 'Sois visible partout.',
    slug: 'visibilite-locale-reseaux',
    gradient: 'from-[#FFB380] to-[#FF7F50]'
  },
  {
    icon: Zap,
    title: 'Automatisations & IA',
    description: 'Automatise ton business.',
    slug: 'automatisations-ia',
    gradient: 'from-[#FF7F50] to-[#FFB380]'
  },
  {
    icon: Waves,
    title: 'Vibe Coding',
    description: 'Aligne ton business sur ta fréquence.',
    subtitle: 'Le Vibe Coding ajuste message, offre et énergie pour attirer naturellement les bons clients.',
    slug: 'vibe-coding',
    gradient: 'from-[#FFB380] to-[#FF7F50]'
  }
];

const Modules = () => {
  return (
    <section id="modules" className="py-24 px-6 bg-gradient-to-b from-[#001a3d] to-[#002C5F]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Les 4 leviers SkriiB pour accélérer la croissance de ton <span className="text-gradient">entreprise</span>.
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Chaque module SkriiB agit comme une app : tu l'actives, et ton business s'accélère.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <Link to={`/modules/${module.slug}`} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group h-full relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#FF7F50]/50 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 flex-grow flex flex-col">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${module.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-white transition-all">
                    {module.title}
                  </h3>
                  
                  <p className="text-lg text-white/80 mb-2">
                    {module.description}
                  </p>
                  
                  {module.subtitle && (
                    <p className="text-sm text-white/60 italic mt-auto pt-4">
                      {module.subtitle}
                    </p>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Modules;