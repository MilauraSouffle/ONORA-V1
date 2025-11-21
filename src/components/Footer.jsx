import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Audit', path: '/audit' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
    { name: 'Mentions légales', path: '/mentions-legales' },
  ];

  return (
    <footer className="bg-[#000814] py-12 px-6 border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6">
          
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white/60 hover:text-[#FF7F50] transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <p className="text-white/60 text-sm text-center">
            Propulsé par IA. Créé avec SkriiB.
          </p>

          <p className="text-white/40 text-sm">
            © {currentYear} SkriiB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;