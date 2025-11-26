import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const Merci = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-16 flex items-center justify-center min-h-[calc(100vh-10rem)]"
    >
      <Helmet>
        <title>Merci ! Ton audit est en préparation - ONORA</title>
        <meta name="description" content="Confirmation de ta demande d'audit digital chez ONORA. Notre équipe analyse ton site et te notifie sous 48h." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="text-center bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10 max-w-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
        >
          <CheckCircle className="w-20 h-20 text-[#FF7F50] mx-auto mb-8" />
        </motion.div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-gradient">Merci ! Ton audit est en préparation.</span>
        </h1>
        
        <p className="text-lg text-white/80 mb-8">
          Notre équipe analyse ton site. Tu seras notifié sous 48h.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF7F50] to-[#FFB380] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-[#FF7F50]/50 transition-all"
        >
          <ArrowLeft size={20} />
          Retour à l'accueil
        </Link>
      </div>
    </motion.div>
  );
};

export default Merci;