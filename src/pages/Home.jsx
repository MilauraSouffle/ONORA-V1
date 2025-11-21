import React from 'react';
import OnoraIntro from '../components/OnoraIntro';

const Section = ({ title, children, bg = "bg-black" }) => (
  <div className={`min-h-screen w-full ${bg} flex flex-col items-center justify-center p-10 border-t border-white/5 relative`}>
    {/* Petite friture de fond optionnelle ici aussi si tu veux */}
    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter z-10">{title}</h2>
    <div className="max-w-2xl text-gray-400 text-center leading-relaxed z-10">
      {children}
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="bg-black min-h-screen">

      {/* SECTION 1: HERO CRT */}
      <section className="h-screen w-full relative sticky top-0 z-0">
        <OnoraIntro />
      </section>

      {/* SECTION 2: VISION */}
      <div className="relative z-10 bg-black">
        <Section title="L'AGENCE EST MORTE." bg="bg-[#050505]">
          <p className="text-lg">
            Dans un monde saturé de bruit, ONORA apporte le signal. <br /><br />
            Nous ne sommes pas des prestataires créatifs. <br />
            Nous sommes les architectes de votre infrastructure de croissance.
          </p>
        </Section>

        {/* SECTION 3: WAITLIST */}
        <Section title="JOIN THE 100." bg="bg-black">
          <p className="mb-10">
            L'accès V1 est restreint. Seuls 100 partenaires fondateurs auront accès à la technologie.
          </p>
          <div className="flex flex-col md:flex-row gap-4 w-full max-w-md mx-auto">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 bg-white/5 border border-white/20 rounded-none px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button className="bg-white text-black font-bold uppercase tracking-widest px-8 py-3 hover:bg-gray-200 transition-colors">
              Accès
            </button>
          </div>
        </Section>

        <footer className="w-full py-10 border-t border-white/10 text-center text-gray-600 text-xs uppercase tracking-widest bg-black">
          © 2025 ONORA STUDIO. SYSTEM ONLINE.
        </footer>
      </div>

    </div>
  );
};

export default Home;