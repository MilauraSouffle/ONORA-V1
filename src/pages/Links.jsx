import React from 'react';
import PageLayout from '../components/PageLayout';
import { Link } from 'react-router-dom';

export default function Links() {
  return (
    <PageLayout>
      <main>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Liens rapides ONORA
        </h1>
        
        <p className="text-lg text-gray-900/80 mb-12 max-w-3xl leading-relaxed">
          Accédez rapidement aux ressources et pages principales du système ONORA.
        </p>

        <div className="space-y-4">
          <Link
            to="/studios"
            className="block w-full p-6 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/15 transition-all text-gray-900 font-medium text-lg"
          >
            Nos studios d'IA augmentée
          </Link>
          
          <Link
            to="/sprint-48h"
            className="block w-full p-6 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/15 transition-all text-gray-900 font-medium text-lg"
          >
            MVP IA en 48h
          </Link>
          
          <Link
            to="/contact"
            className="block w-full p-6 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/15 transition-all text-gray-900 font-medium text-lg"
          >
            Nous contacter
          </Link>
          
          <Link
            to="/waitlist"
            className="block w-full p-6 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/15 transition-all text-gray-900 font-medium text-lg"
          >
            Rejoindre la waitlist
          </Link>
        </div>
      </main>
    </PageLayout>
  );
}

