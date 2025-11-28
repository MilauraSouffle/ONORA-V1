# Optimisations SEO ONORA - Documentation

## ✅ Sitemap.xml automatique

Le sitemap est **généré automatiquement** lors de chaque build via le script `tools/generate-sitemap.js`.

### Comment ça fonctionne :

1. **Extraction automatique** : Le script lit `src/App.jsx` et extrait toutes les routes définies dans `<Route path="..." />`
2. **Génération** : Crée un fichier `public/sitemap.xml` avec toutes les URLs, priorités et fréquences de mise à jour
3. **Intégration** : Le sitemap est généré **avant** chaque build avec `npm run build`

### Commandes disponibles :

```bash
# Générer le sitemap manuellement
npm run sitemap

# Build complet (génère le sitemap + build)
npm run build
```

### Configuration :

- **URL de base** : Modifiez `BASE_URL` dans `tools/generate-sitemap.js` (actuellement : `https://onora.studio`)
- **Priorités** : Ajustées automatiquement selon le type de route :
  - `/` : 1.0 (daily)
  - `/studios/*` : 0.9 (weekly)
  - `/about`, `/usecases` : 0.9 (weekly)
  - `/contact` : 0.8 (monthly)
  - `/legal` : 0.5 (yearly)

### Ajout de nouvelles routes :

**Le sitemap se met à jour automatiquement !** Ajoutez simplement votre route dans `App.jsx` :

```jsx
<Route path="/nouvelle-page" element={<NouvellePage />} />
```

Lors du prochain build, elle sera automatiquement incluse dans le sitemap.

---

## ✅ Robots.txt

Fichier créé à `public/robots.txt` permettant l'indexation de toutes les pages et référençant le sitemap.

**Important** : Modifiez l'URL du sitemap si votre domaine change.

---

## ✅ Optimisations SEO implémentées

### 1. Structure HTML sémantique

#### Home.jsx
- ✅ **H1 unique** : "Tu n'embauches pas une agence. Tu branches un système."
- ✅ **H2 structurés** sur chaque slide (Studios, MVP IA, Use Cases, Origin)
- ✅ Sections sémantiques avec `<section>` et rôles ARIA

#### Pages de destination
- ✅ **H1 unique** sur chaque page
- ✅ **H2/H3** hiérarchisés correctement
- ✅ Structure logique et cohérente

#### Pages Studios
- ✅ **H1** (sr-only pour garder le design) + titre visible
- ✅ **H2** pour les sections principales
- ✅ **H3** pour les sous-sections

### 2. Meta tags optimisés

Toutes les pages incluent :
- ✅ `<title>` unique et descriptif
- ✅ `<meta name="description">` optimisée (150-160 caractères)
- ✅ `<meta name="keywords">` pertinents
- ✅ Open Graph (`og:title`, `og:description`, `og:type`)
- ✅ Twitter Cards

### 3. Images optimisées

- ✅ **Alt text descriptifs** : Chaque image a un alt text informatif (pas juste "logo")
- ✅ **Dimensions** : Attributs `width` et `height` pour éviter le layout shift
- ✅ **Lazy loading** : `loading="lazy"` sur les images non-critiques
- ✅ **Eager loading** : `loading="eager"` sur les images critiques (logo, hero)

### 4. Accessibilité (ARIA)

- ✅ **aria-label** sur tous les liens et boutons interactifs
- ✅ **aria-hidden="true"** sur les icônes décoratives
- ✅ Navigation clavier fonctionnelle

### 5. Liens internes

- ✅ **Slugs propres** : `/studios/skriib`, `/usecases`, etc.
- ✅ **Liens logiques** : Navigation claire entre les pages
- ✅ **Ancres descriptives** : Textes de liens explicites

### 6. Performance

- ✅ Images WebP pour le logo principal
- ✅ Lazy loading stratégique
- ✅ Code optimisé avec React et Vite

---

## 📋 Checklist pour nouvelles pages

Lors de la création d'une nouvelle page, assurez-vous de :

### Structure HTML
- [ ] **Un seul H1** par page (le titre principal)
- [ ] **H2/H3** hiérarchisés correctement
- [ ] Sections sémantiques (`<section>`, `<article>`, etc.)

### Meta tags (react-helmet-async)
```jsx
<Helmet>
  <title>Nom de la page · ONORA</title>
  <meta
    name="description"
    content="Description optimisée de 150-160 caractères..."
  />
  <meta name="keywords" content="mot-clé1, mot-clé2, ONORA" />
  <meta property="og:title" content="Titre pour réseaux sociaux" />
  <meta property="og:description" content="Description pour réseaux sociaux" />
  <meta property="og:type" content="website" />
</Helmet>
```

### Images
- [ ] **Alt text descriptif** : "Logo SKRiiB - Studio architecture digitale" (pas juste "logo")
- [ ] **Dimensions** : `width` et `height` définis
- [ ] **Loading** : `loading="lazy"` sauf pour images critiques

### Accessibilité
- [ ] **aria-label** sur liens et boutons
- [ ] **aria-hidden="true"** sur icônes décoratives
- [ ] Navigation clavier testée

### Route
- [ ] Ajoutée dans `App.jsx` : `<Route path="/nouvelle-page" element={<NouvellePage />} />`
- [ ] Le sitemap sera généré automatiquement au prochain build

---

## 🔍 Vérification SEO

### Outils recommandés :
1. **Google Search Console** : Soumettez le sitemap.xml
2. **Google Lighthouse** : Testez les performances et SEO
3. **Schema.org** : Ajoutez du structured data si nécessaire (futur)

### URLs importantes :
- Sitemap : `https://onora.studio/sitemap.xml`
- Robots.txt : `https://onora.studio/robots.txt`

---

## 📝 Notes importantes

- **Le sitemap se met à jour automatiquement** : Aucune action manuelle nécessaire
- **SEO on-page optimisé** : Toutes les pages respectent les bonnes pratiques
- **Performance** : Images optimisées, lazy loading, code minifié
- **Accessibilité** : ARIA labels, navigation clavier, sémantique HTML

---

*Dernière mise à jour : Automatique via build*
