import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Audit from '@/pages/Audit';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Legal from '@/pages/Legal';
import Merci from '@/pages/Merci';
import PortfolioPage from '@/pages/PortfolioPage';
import ProjectPage from '@/pages/portfolio/ProjectPage';
import { Toaster } from '@/components/ui/toaster';
import { AnimatePresence } from 'framer-motion';
import ModulePage from '@/pages/modules/ModulePage';

function App() {
  const location = useLocation();
  const siteUrl = "https://www.skriib.lu"; // Replace with your actual domain

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SkriiB",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`, // Replace with your actual logo URL
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+352-000-000", // Replace with your actual phone number
      "contactType": "customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Luxembourg",
      "addressCountry": "LU"
    },
    "sameAs": [
      // "https://twitter.com/yourprofile", // Replace with your social media
      // "https://www.linkedin.com/company/yourcompany"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>SkriiB - Human. Digital. Intelligent. | Agence IA Luxembourg</title>
        <meta name="description" content="SkriiB accélère la croissance des PME au Luxembourg avec des sites web performants, une visibilité locale optimisée et des automatisations IA sur-mesure." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="SkriiB - Human. Digital. Intelligent. | Agence IA Luxembourg" />
        <meta property="og:description" content="Sites web, visibilité locale et automatisations IA pour les PME." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteUrl} />
        <meta property="twitter:title" content="SkriiB - Human. Digital. Intelligent. | Agence IA Luxembourg" />
        <meta property="twitter:description" content="Sites web, visibilité locale et automatisations IA pour les PME." />
        <meta property="twitter:image" content="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" />

        {/* Favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      </Helmet>
      <Header />
      <main className="pt-20 bg-gradient-to-br from-[#002C5F] via-[#001a3d] to-[#000814]">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions-legales" element={<Legal />} />
            <Route path="/merci" element={<Merci />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:slug" element={<ProjectPage />} />
            <Route path="/modules/:slug" element={<ModulePage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster />
    </HelmetProvider>
  );
}

export default App;