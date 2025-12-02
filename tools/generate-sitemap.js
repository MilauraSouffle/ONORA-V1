import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BASE_URL = process.env.SITE_URL || 'https://onora.studio'; // À modifier selon votre domaine
const OUTPUT_PATH = path.resolve(__dirname, '../public/sitemap.xml');
const APP_JSX_PATH = path.resolve(__dirname, '../src/App.jsx');

// Toutes les routes publiques du site (extraites de App.jsx)
// Ce script lit automatiquement les routes depuis App.jsx
const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/about', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/legal', priority: '0.5', changefreq: 'yearly' },
  { path: '/merci', priority: '0.6', changefreq: 'monthly' },
  { path: '/scan', priority: '0.7', changefreq: 'monthly' },
  { path: '/usecases', priority: '0.9', changefreq: 'weekly' },
  { path: '/login', priority: '0.6', changefreq: 'monthly' },
  { path: '/socials', priority: '0.7', changefreq: 'monthly' },
  { path: '/studios/skriib', priority: '0.9', changefreq: 'weekly' },
  { path: '/studios/cliip', priority: '0.9', changefreq: 'weekly' },
  { path: '/studios/siion', priority: '0.9', changefreq: 'weekly' },
  { path: '/studios/hackiing', priority: '0.9', changefreq: 'weekly' },
];

// Fonction pour extraire les routes depuis App.jsx
function extractRoutesFromAppJsx() {
  try {
    if (!fs.existsSync(APP_JSX_PATH)) {
      console.warn(`⚠️  App.jsx not found at ${APP_JSX_PATH}`);
      return STATIC_ROUTES;
    }

    const content = fs.readFileSync(APP_JSX_PATH, 'utf8');
    const routes = [];
    
    // Regex pour trouver les <Route path="..." />
    const routeRegex = /<Route\s+path=["']([^"']+)["']/g;
    let match;

    while ((match = routeRegex.exec(content)) !== null) {
      const routePath = match[1];
      
      // Détermine la priorité et changefreq selon le type de route
      let priority = '0.8';
      let changefreq = 'monthly';
      
      if (routePath === '/') {
        priority = '1.0';
        changefreq = 'daily';
      } else if (routePath.startsWith('/studios/')) {
        priority = '0.9';
        changefreq = 'weekly';
      } else if (routePath === '/about' || routePath === '/usecases') {
        priority = '0.9';
        changefreq = 'weekly';
      } else if (routePath === '/contact') {
        priority = '0.8';
        changefreq = 'monthly';
      } else if (routePath === '/legal') {
        priority = '0.5';
        changefreq = 'yearly';
      }

      // Évite les doublons
      if (!routes.find(r => r.path === routePath)) {
        routes.push({ path: routePath, priority, changefreq });
      }
    }

    console.log(`✅ Extracted ${routes.length} routes from App.jsx`);
    return routes.length > 0 ? routes : STATIC_ROUTES;
  } catch (error) {
    console.error(`❌ Error reading App.jsx: ${error.message}`);
    return STATIC_ROUTES;
  }
}

// Génère le XML du sitemap
function generateSitemapXML(routes) {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls = routes.map(route => {
    const url = `${BASE_URL}${route.path}`;
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// Fonction principale
function generateSitemap() {
  console.log('🚀 Generating sitemap.xml...');
  
  // Extrait les routes depuis App.jsx
  const routes = extractRoutesFromAppJsx();
  
  // Génère le XML
  const xml = generateSitemapXML(routes);
  
  // Crée le dossier public s'il n'existe pas
  const publicDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Écrit le fichier
  fs.writeFileSync(OUTPUT_PATH, xml, 'utf8');
  
  console.log(`✅ Sitemap generated successfully at ${OUTPUT_PATH}`);
  console.log(`📄 ${routes.length} URLs included`);
  console.log(`🌐 Base URL: ${BASE_URL}`);
}

// Exécute la génération
generateSitemap();




