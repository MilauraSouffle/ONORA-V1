import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Réseaux', path: '/socials' },
    { name: 'Mentions légales', path: '/legal' },
  ];

  return (
    <footer className="w-full py-8 md:py-12 px-4 md:px-6 border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          
          <nav className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-900 hover:text-cyan-400 transition-colors text-xs md:text-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <p className="text-gray-900 text-xs md:text-sm text-center">
            Propulsé par IA. Créé avec ONORA.
          </p>

          <p className="text-gray-900 text-xs">
            © {currentYear} ONORA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;