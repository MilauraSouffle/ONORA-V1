import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleAnchorLink = (e, anchorId) => {
    if (location.pathname === '/' && !location.hash) {
      e.preventDefault();
      document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
    }
    // If we are on a different page, the Link will navigate to '/' and the hash will be handled by the browser.
    // A useEffect in the Home component could handle scrolling if needed.
  };

  const navLinkClass = ({ isActive }) =>
    `transition-colors font-medium ${isActive ? 'text-[#FF7F50] font-semibold' : 'text-white/80 hover:text-[#FF7F50]'}`;

  const menuItems = (
    <>
      <NavLink to="/" className={navLinkClass} end>
        Accueil
      </NavLink>
      <NavLink to="/audit" className={navLinkClass}>
        Audit
      </NavLink>
      <Link to="/#modules" className={navLinkClass({isActive: location.hash === '#modules' && location.pathname === '/' })} onClick={(e) => handleAnchorLink(e, 'modules')}>
        Modules
      </Link>
      <Link to="/#portfolio" className={navLinkClass({isActive: location.hash === '#portfolio' && location.pathname === '/' })} onClick={(e) => handleAnchorLink(e, 'portfolio')}>
        Portfolio
      </Link>
      <NavLink to="/a-propos" className={navLinkClass}>
        À propos
      </NavLink>
      <NavLink to="/contact" className={navLinkClass}>
        Contact
      </NavLink>
    </>
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-white/10 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src="https://ik.imagekit.io/bupjuxqi6/Design%20sans%20titre%20(1).png?updatedAt=1762788166002" 
              alt="SkriiB Logo" 
              className="h-12 w-auto"
            />
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8 mx-auto">
            {menuItems}
          </nav>
          
          <div className="hidden lg:flex items-center flex-shrink-0">
            <Link 
              to="/audit" 
              className="bg-gradient-to-r from-[#FF7F50] to-[#FFB380] text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-[#FF7F50]/50 transition-all"
            >
              Lancer mon audit gratuit
            </Link>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="text-white">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-to-br from-[#002C5F] via-[#001a3d] to-[#000814] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-12">
                <Link to="/" className="flex items-center">
                  <img 
                    src="https://ik.imagekit.io/bupjuxqi6/Design%20sans%20titre%20(1).png?updatedAt=1762788166002" 
                    alt="SkriiB Logo" 
                    className="h-10 w-auto"
                  />
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="text-white/80 hover:text-white">
                  <X size={28} />
                </button>
              </div>

              <nav className="flex flex-col items-center gap-8 text-2xl">
                {menuItems}

                <Link 
                  to="/audit" 
                  className="mt-8 bg-gradient-to-r from-[#FF7F50] to-[#FFB380] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-[#FF7F50]/50 transition-all text-xl"
                >
                  Lancer mon audit gratuit
                </Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;