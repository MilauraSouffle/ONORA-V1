import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Sparkles, MapPin, Zap, Waves, ArrowLeft } from 'lucide-react';

const modulesData = {
  'branding-site-web': {
    icon: Sparkles,
    title: 'Branding & Site Web',
    description: 'De la création de votre identité de marque à un site web performant qui convertit les visiteurs en clients.'
  },
  'visibilite-locale-reseaux': {
    icon: MapPin,
    title: 'Visibilité Locale & Réseaux',
    description: 'Positionnez votre entreprise au sommet des résultats locaux et engagez votre communauté sur les réseaux sociaux.'
  },
  'automatisations-ia': {
    icon: Zap,
    title: 'Automatisations & IA',
    description: 'Libérez du temps et optimisez vos processus grâce à des automatisations intelligentes et des solutions IA sur-mesure.'
  },
  'vibe-coding': {
    icon: Waves,
    title: 'Vibe Coding',
    description: 'Alignez l\'énergie de votre business avec votre message et vos offres pour attirer naturellement vos clients idéaux. Une approche unique qui mêle stratégie et intuition.'
  }
};

const ModulePage = () => {
  const { slug } = useParams();
  const module = modulesData[slug];

  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-6">
        <h1 className="text-4xl font-bold text-white mb-4">Module non trouvé</h1>
        <p className="text-white/70 mb-8">Désolé, le module que vous cherchez n'existe pas.</p>
        <Link to="/" className="flex items-center gap-2 bg-gradient-to-r from-[#FF7F50] to-[#FFB380] text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-[#FF7F50]/50 transition-all">
          <ArrowLeft size={20} />
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  const Icon = module.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-16"
    >
      <Helmet>
        <title>{module.title} - Module SkriiB</title>
        <meta name="description" content={`Découvrez le module ${module.title} de SkriiB pour accélérer votre croissance.`} />
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
            <Link to="/#modules" className="inline-flex items-center gap-2 text-white/60 hover:text-[#FF7F50] transition-colors">
                <ArrowLeft size={18} />
                Retour aux modules
            </Link>
        </div>

        <div className="text-center bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#FF7F50] to-[#FFB380] flex items-center justify-center mb-8 mx-auto">
            <Icon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">{module.title}</span>
          </h1>
          <p className="text-xl text-white/80 mb-8">
            {module.description}
          </p>
          <p className="text-lg font-semibold text-white">Contenu détaillé à venir...</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ModulePage;