import React, { useState } from 'react';
// Ces imports devraient maintenant fonctionner car les fichiers sont régénérés
import OnoraIntro from '../components/OnoraIntro';
import WaitlistForm from '../components/WaitlistForm';

import StaticNoise from '../components/StaticNoise';

const Section = ({ title, children, bg = "bg-transparent", id = "" }) => (
  <div id={id} className={`min-h-screen w-full ${bg} flex flex-col items-center justify-center p-10 border-t border-white/5 relative`}>
    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter z-10 text-center">{title}</h2>
    <div className="max-w-2xl text-gray-400 text-center leading-relaxed z-10">
      {children}
    </div>
  </div>
);

const Home = () => {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="min-h-screen relative">
      <StaticNoise isVisible={!introFinished} />

      {/* SECTION 1: HERO CRT */}
      <section className="h-screen w-full relative sticky top-0 z-0">
        <OnoraIntro onComplete={() => setIntroFinished(true)} />
      </section>

      {/* SECTION 2: VISION */}
      <div className="relative z-10">
        <Section title="L'AGENCE EST MORTE." bg="bg-black/50 backdrop-blur-sm">
          <p className="text-lg font-light">
            Dans un monde saturé de bruit, ONORA apporte le signal. <br /><br />
            Nous ne sommes pas des prestataires créatifs. <br />
            Nous sommes les architectes de votre infrastructure de croissance.
          </p>
        </Section>

        {/* SECTION 3: WAITLIST */}
        <Section title="JOIN THE 100." bg="bg-black/50 backdrop-blur-sm" id="join-the-100">
          <p className="mb-10 text-lg">
            L'accès V1 est restreint. Seuls 100 partenaires fondateurs auront accès à la technologie.
          </p>

          {/* Le formulaire connecté */}
          <WaitlistForm />

        </Section>

        <footer className="w-full py-10 border-t border-white/10 text-center text-gray-600 text-xs uppercase tracking-widest bg-black/50 backdrop-blur-sm font-mono">
          © 2025 ONORA STUDIO. SYSTEM ONLINE.
        </footer>
      </div>

    </div>
  );
};

export default Home;