import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Hero from '@/components/Hero';
import Modules from '@/components/Modules';
import Waitlist from '@/components/Waitlist';
import Portfolio from '@/components/Portfolio';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // 'substring(1)' to remove the '#'
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>SkriiB - Human. Digital. Intelligent. | Sites & IA</title>
        <meta name="description" content="SkriiB crée des sites qui convertissent, booste votre visibilité locale et met en place des automatisations IA. Transformons votre business." />
      </Helmet>
      <Hero />
      <Modules />
      <Waitlist />
      <Portfolio />
    </motion.div>
  );
};

export default Home;