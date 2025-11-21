import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const allProjects = {
  'milaura': { name: 'Milaura', category: 'E-commerce émotionnel', imageAlt: 'Modern luxury e-commerce website with emotional branding' },
  'ia-reparation': { name: 'iA-Réparation', category: 'Service tech automatisé', imageAlt: 'Tech repair service website with AI automation' },
  'les-little-poms': { name: 'Les Little Pom\'s', category: 'Micro-crèche moderne', imageAlt: 'Modern daycare center website with playful design' },
  'concept-store-bio': { name: 'Concept Store Bio', category: 'Commerce bio', imageAlt: 'Organic concept store with natural aesthetic' },
  'studio-wellness': { name: 'Studio Wellness', category: 'Bien-être & santé', imageAlt: 'Wellness studio with calming spa atmosphere' },
  'cabinet-expertise': { name: 'Cabinet Expertise', category: 'Services professionnels', imageAlt: 'Professional consulting firm office' }
};

const ProjectPage = () => {
  const { slug } = useParams();
  const project = allProjects[slug];

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-6">
        <h1 className="text-4xl font-bold text-white mb-4">Projet non trouvé</h1>
        <p className="text-white/70 mb-8">Désolé, le projet que vous cherchez n'existe pas.</p>
        <Button asChild>
          <Link to="/portfolio" className="flex items-center gap-2">
            <ArrowLeft size={20} />
            Retour au portfolio
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-16"
    >
      <Helmet>
        <title>{project.name} - Projet SkriiB</title>
        <meta name="description" content={`Découvrez notre travail pour ${project.name}, un projet de type ${project.category}.`} />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-white/60 hover:text-[#FF7F50] transition-colors">
                <ArrowLeft size={18} />
                Retour au portfolio
            </Link>
        </div>
        
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-white/10">
           <img
              alt={project.imageAlt}
              className="w-full h-full object-cover"
             src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <span className="text-[#FF7F50] font-semibold">{project.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient my-4">{project.name}</h1>
            <div className="prose prose-invert text-white/80 max-w-none">
              <p>Le contenu détaillé de l'étude de cas pour {project.name} est en cours de rédaction.</p>
              <p>Nous y décrirons les défis, notre approche stratégique et les résultats obtenus grâce à nos solutions IA-powered.</p>
              <p>Revenez bientôt pour découvrir l'histoire complète de ce projet passionnant !</p>
            </div>
          </div>
          <div className="md:col-span-1">
             <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h3 className="font-bold text-xl mb-4">Infos Projet</h3>
                <ul className="space-y-3 text-white/80">
                  <li><strong>Client:</strong> {project.name}</li>
                  <li><strong>Service:</strong> {project.category}</li>
                  <li><strong>Année:</strong> 2025</li>
                </ul>
                <Button asChild className="w-full mt-6 bg-gradient-to-r from-[#FF7F50] to-[#FFB380] text-white">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Visiter le site <ExternalLink size={16} className="ml-2"/>
                  </a>
                </Button>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectPage;