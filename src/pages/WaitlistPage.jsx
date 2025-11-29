// src/pages/WaitlistPage.jsx
// Page dédiée pour le formulaire Waitlist - héberge le composant Waitlist

import React from "react";
import { Helmet } from "react-helmet-async";
import Waitlist from "../components/Waitlist";

export default function WaitlistPage() {
  return (
    <>
      <Helmet>
        <title>Waitlist ONORA – Audit gratuit site + visibilité + IA</title>
        <meta
          name="description"
          content="Rejoins la waitlist ONORA et reçois ton audit gratuit (site + visibilité + IA) sous 24-48h. Pour les 100 premiers entrepreneurs ambitieux."
        />
        <meta
          name="keywords"
          content="waitlist ONORA, audit gratuit, audit site web, audit IA, visibilité web, ONORA studio"
        />
      </Helmet>

      {/* Page dédiée qui héberge le composant Waitlist */}
      <Waitlist />
    </>
  );
}
