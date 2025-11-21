import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const allProjects = [
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
  },
  {
    slug: 'concept-store-bio',
    name: 'Concept Store Bio',
    category: 'Commerce bio',
    imageAlt: 'Organic concept store with natural aesthetic'
  },
  {
    slug: 'studio-wellness',
    name: 'Studio Wellness',
    category: 'Bien-être & santé',
    imageAlt: 'Wellness studio with calming spa atmosphere'
  },
  {
    slug: 'cabinet-expertise',
    name: 'Cabinet Expertise',
    category: 'Services professionnels',
    imageAlt: 'Professional consulting firm office'
  }
];

const PortfolioCard = ({ project, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/portfolio/${project.slug}`} className="block group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#FF7F50]/50 transition-all duration-300 h-full">
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
);

const PortfolioPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-16"
    >
      <Helmet>
        <title>Portfolio - Nos réalisations IA-powered | SkriiB</title>
        <meta name="description" content="Découvrez les projets réalisés par SkriiB, alliant design, performance et intelligence artificielle." />
      </Helmet>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Nos réalisations <span className="text-gradient">IA-powered</span>
        </h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Des projets réels, des résultats mesurables. Explorez comment nous avons transformé les business de nos clients.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allProjects.map((project, index) => (
          <PortfolioCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default PortfolioPage;