import React from 'react';
import PageLayout from '../components/PageLayout';
import { Link } from 'react-router-dom';

export default function Studios() {
  return (
    <PageLayout>
      <main>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Nos studios d'IA augmentée
        </h1>
        
        <p className="text-lg text-gray-900/80 mb-12 max-w-3xl leading-relaxed">
          ONORA regroupe quatre studios spécialisés qui travaillent ensemble pour créer des systèmes intelligents et performants. Chaque studio apporte son expertise unique pour répondre à vos besoins spécifiques.
        </p>

        <div className="space-y-12">
          {/* SKRiiB */}
          <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">SKRiiB</h2>
            <p className="text-gray-900/80 mb-4 leading-relaxed">
              Architecture digitale et contenu stratégique. SKRiiB conçoit et développe des expériences digitales qui racontent votre histoire et convertissent vos visiteurs.
            </p>
            <Link
              to="/studios/skriib"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              Découvrir SKRiiB →
            </Link>
          </section>

          {/* CLiiP */}
          <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">CLiiP</h2>
            <p className="text-gray-900/80 mb-4 leading-relaxed">
              Création rapide et motion design. CLiiP produit des visuels percutants et des animations qui captent l'attention et renforcent votre identité de marque.
            </p>
            <Link
              to="/studios/cliip"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              Découvrir CLiiP →
            </Link>
          </section>

          {/* SIION */}
          <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">SIION</h2>
            <p className="text-gray-900/80 mb-4 leading-relaxed">
              Data et IA avancée. SIION transforme vos données en insights actionnables et développe des solutions d'intelligence artificielle sur mesure pour votre business.
            </p>
            <Link
              to="/studios/siion"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              Découvrir SIION →
            </Link>
          </section>

          {/* HACKiiNG */}
          <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">HACKiiNG</h2>
            <p className="text-gray-900/80 mb-4 leading-relaxed">
              Automations et agents IA. HACKiiNG crée des systèmes automatisés et des agents intelligents qui travaillent 24/7 pour optimiser vos processus et libérer votre temps.
            </p>
            <Link
              to="/studios/hackiing"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              Découvrir HACKiiNG →
            </Link>
          </section>
        </div>
      </main>
    </PageLayout>
  );
}

