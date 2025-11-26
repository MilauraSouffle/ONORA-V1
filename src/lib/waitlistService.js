// src/lib/waitlistService.js
// Service centralisé pour la gestion de la waitlist et de l'audit.
// Supporte Edge Function (via VITE_WAITLIST_EDGE_URL) ou fallback Supabase direct.

import { supabase } from './customSupabaseClient';

/**
 * Soumet une entrée waitlist (via Edge Function ou Supabase direct)
 * @param {Object} payload - Données du formulaire
 * @param {string} payload.company - Nom de la société
 * @param {string} payload.website - URL du site web
 * @param {string} payload.sector - Secteur d'activité
 * @param {string} payload.email - Email professionnel
 * @param {string} payload.motivation - Pourquoi toi, en 2 phrases max
 * @param {string} [payload.source] - Source de la soumission (optionnel)
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 * @throws {Error} En cas d'erreur
 */
export async function submitWaitlist(payload) {
  const edgeUrl = import.meta.env.VITE_WAITLIST_EDGE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // 1. Tentative via Edge Function si configurée
  if (edgeUrl && edgeUrl.trim() !== '') {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      // On n'ajoute l'Authorization que si la clé est dispo dans l'env
      if (supabaseAnonKey && supabaseAnonKey.trim() !== '') {
        headers.Authorization = `Bearer ${supabaseAnonKey}`;
      }

      const response = await fetch(edgeUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          company: payload.company,
          website: payload.website,
          sector: payload.sector,
          email: payload.email,
          motivation: payload.motivation,
          source: payload.source || 'site_onora',
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || data?.ok === false) {
        const errorMessage =
          data?.error?.message ||
          data?.error ||
          "Une erreur est survenue pendant l'enregistrement.";
        throw new Error(errorMessage);
      }

      return { success: true, data };
    } catch (error) {
      // Ici on laisse l'erreur remonter
      // Si tu veux un fallback auto Supabase quand l'Edge plante,
      // tu peux enlever le "throw error" et laisser continuer vers le bloc suivant.
      throw error;
    }
  }

  // 2. Fallback : insertion directe en Supabase
  try {
    const { error } = await supabase.from('waitlist').insert([
      {
        company_name: payload.company,
        website_url: payload.website,
        email: payload.email,
        sector: payload.sector,
        motivation: payload.motivation,
        source: payload.source || 'site_onora',
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      if (error.code === '23505') {
        throw new Error('Cette entreprise est déjà enregistrée.');
      }
      throw new Error(
        error.message ||
          "Une erreur est survenue lors de l'enregistrement."
      );
    }

    return { success: true };
  } catch (error) {
    throw error;
  }
}