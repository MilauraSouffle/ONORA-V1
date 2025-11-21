import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const projects = [
  {
    slug: 'milaura',
    name: 'Milaura',
    category: 'E-commerce émotionnel',
    imageAlt: 'Modern luxury e-commerce website with emotional branding'
  },
  {
    slug: 'ia-reparation',
    name: 'iA-Réparation',
    category: 'Service tech automatisé',
    imageAlt: 'Tech repair service website with AI automation'
  },
  {
    slug: 'les-little-poms',
    name: 'Les Little Pom\'s',
    category: 'Micro-crèche moderne',
    imageAlt: 'Modern daycare center website with playful design'
  }
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 px-6 bg-gradient-to-b from-[#001a3d] to-[#000814]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nos réalisations <span className="text-gradient">IA-powered</span>
          </h2>
          <p className="text-xl text-white/70">
            Des projets réels, des résultats mesurables.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/portfolio/${project.slug}`} className="block group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#FF7F50]/50 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    alt={project.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </div>
                
                <div className="p-6">
                  <span className="text-sm text-[#FF7F50] font-medium">{project.category}</span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-3">{project.name}</h3>
                  
                  <div className="flex items-center gap-2 text-white/60 group-hover:text-[#FF7F50] transition-colors">
                    <span className="text-sm">Voir le projet</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-[#FF7F50]/0 to-[#FFB380]/0 group-hover:from-[#FF7F50]/10 group-hover:to-[#FFB380]/10 transition-all duration-300 pointer-events-none"></div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button asChild className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm inline-flex items-center gap-2">
            <Link to="/portfolio">
              Découvrir le portfolio complet
              <ExternalLink className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;