import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const handleScrollToModules = (e) => {
    e.preventDefault();
    document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      >
        <img 
            class="w-full h-full object-cover" 
            alt="Super-héros digital abstrait"
         src="https://ik.imagekit.io/bupjuxqi6/SkriiB%20copie.png?updatedAt=1762852999529" />
        <div className="absolute inset-0 bg-[#002C5F]/20"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
            Human. Digital. Intelligent.
          </h1>
          
          <h2 className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light">
            Sites qui convertissent, visibilité locale, automatisations IA.
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/audit"
                className="block bg-gradient-to-r from-[#FF7F50] to-[#FFB380] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:shadow-[#FF7F50]/50 transition-all"
              >
                Lancer mon audit gratuit
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#modules"
                onClick={handleScrollToModules}
                className="block border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm"
              >
                Découvrir les modules IA
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-white/60 text-sm font-light">Slide pour booster</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="w-6 h-6 text-[#FF7F50]" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;