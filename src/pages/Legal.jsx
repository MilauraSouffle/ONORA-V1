import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="container mx-auto px-6 py-16"
  >
    {children}
  </motion.div>
);

const Legal = () => {
  return (
    <PageWrapper>
      <Helmet>
        <title>Mentions Légales & RGPD - SkriiB</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="max-w-4xl mx-auto text-white/80">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center text-white">
          Mentions <span className="text-gradient">Légales</span>
        </h1>

        <div className="space-y-6 prose prose-invert prose-lg">
          <h2 className="text-2xl font-bold text-white">Éditeur du site</h2>
          <p>Les informations sur l'éditeur du site seront bientôt disponibles ici.</p>

          <h2 className="text-2xl font-bold text-white">Hébergement</h2>
          <p>Ce site est hébergé par Hostinger. Pour plus d'informations, veuillez consulter leur site web.</p>

          <h2 className="text-2xl font-bold text-white">Propriété Intellectuelle</h2>
          <p>L'ensemble de ce site relève de la législation internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>

          <h2 className="text-2xl font-bold text-white">Politique de confidentialité (RGPD)</h2>
          <p>Nous nous engageons à ce que la collecte et le traitement de vos données, effectués à partir du site skriib.com, soient conformes au règlement général sur la protection des données (RGPD).</p>
          <p>Chaque formulaire ou téléservice limite la collecte des données personnelles au strict nécessaire et indique notamment :</p>
          <ul>
            <li>quels sont les objectifs du recueil de ces données,</li>
            <li>si ces données sont obligatoires ou facultatives pour la gestion de votre demande,</li>
            <li>qui pourra en prendre connaissance (uniquement SkriiB en principe, sauf précision dans le formulaire lorsqu'une transmission à un tiers est nécessaire à la gestion de votre demande).</li>
          </ul>
          <p>Les données personnelles recueillies dans le cadre des services proposés sur skriib.com sont traitées selon des protocoles sécurisés et permettent à SkriiB de gérer les demandes reçues dans ses applications informatiques.</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Legal;