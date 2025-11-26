import React from 'react';

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
    <div className="w-full">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.35em] uppercase text-gray-400 mb-4">
          PORTFOLIO · PREUVES
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Nos réalisations
        </h2>
        <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
          Des projets réels, des résultats mesurables.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative bg-black/20 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
          >
            <div className="aspect-video overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
              <img
                alt={project.imageAlt}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                src="https://images.unsplash.com/photo-1595872018818-97555653a011"
              />
            </div>
            
            <div className="p-4 md:p-6">
              <span className="text-xs text-cyan-400 font-medium">{project.category}</span>
              <h3 className="text-lg md:text-xl font-bold text-white mt-2 mb-2">{project.name}</h3>
              <p className="text-sm text-gray-400">
                Projet avec impact mesurable et résultats concrets.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;