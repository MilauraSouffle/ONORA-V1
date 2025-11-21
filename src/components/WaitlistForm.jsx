import React, { useState, useEffect } from 'react';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { motion } from 'framer-motion';
import { Loader2, Check, AlertCircle, Building2, Globe, Mail, Briefcase, Layers } from 'lucide-react';

const getEnv = (key) => {
    try { return import.meta.env[key]; } catch (e) { return ''; }
};

export default function WaitlistForm() {
    const [formData, setFormData] = useState({
        company_name: '',
        website_url: '',
        email: '',
        sector: '',
        needs: [] // Array pour multiselect
    });

    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const [supabase, setSupabase] = useState(null);

    useEffect(() => {
        const url = getEnv('VITE_SUPABASE_URL');
        const key = getEnv('VITE_SUPABASE_ANON_KEY');
        if (url && key) setSupabase(createClient(url, key));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setStatus('idle');
    };

    const toggleNeed = (need) => {
        setFormData(prev => {
            const needs = prev.needs.includes(need)
                ? prev.needs.filter(n => n !== need)
                : [...prev.needs, need];
            return { ...prev, needs };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!supabase) return setMessage("Erreur technique: Base de données injoignable.");

        setStatus('loading');

        try {
            const { error } = await supabase
                .from('waitlist')
                .insert([{
                    company_name: formData.company_name,
                    website_url: formData.website_url,
                    email: formData.email,
                    sector: formData.sector,
                    needs: formData.needs
                }]);

            if (error) throw error;

            setStatus('success');
            setMessage("Dossier reçu. Analyse en cours par ONORA AI.");
            setFormData({ company_name: '', website_url: '', email: '', sector: '', needs: [] });

        } catch (error) {
            console.error(error);
            setStatus('error');
            setMessage(error.code === '23505' ? "Cette entreprise est déjà enregistrée." : "Erreur lors de l'envoi.");
        }
    };

    const needsOptions = ["Branding & Design", "Site Web / E-com", "Automatisation IA", "Vidéo & Contenu", "Audit Stratégique"];

    return (
        <div className="w-full max-w-2xl mx-auto bg-[#0A0A0A] border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">

            {/* Titre Formulaire */}
            <div className="mb-8 text-center">
                <h3 className="text-xl font-bold text-white tracking-widest uppercase mb-2">Candidature Partenaire</h3>
                <p className="text-gray-500 text-sm">Remplissez ce formulaire pour initialiser votre fiche client.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Ligne 1 : Entreprise & Site */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 flex items-center gap-2">
                            <Building2 className="w-3 h-3" /> Entreprise
                        </label>
                        <input
                            required name="company_name" value={formData.company_name} onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-blue-500 focus:outline-none rounded transition-colors"
                            placeholder="Nom de la structure"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 flex items-center gap-2">
                            <Globe className="w-3 h-3" /> Site Web (Optionnel)
                        </label>
                        <input
                            name="website_url" value={formData.website_url} onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-blue-500 focus:outline-none rounded transition-colors"
                            placeholder="https://..."
                        />
                    </div>
                </div>

                {/* Ligne 2 : Email & Secteur */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 flex items-center gap-2">
                            <Mail className="w-3 h-3" /> Email Pro
                        </label>
                        <input
                            required type="email" name="email" value={formData.email} onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-blue-500 focus:outline-none rounded transition-colors"
                            placeholder="contact@entreprise.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500 flex items-center gap-2">
                            <Briefcase className="w-3 h-3" /> Secteur
                        </label>
                        <select
                            required name="sector" value={formData.sector} onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-blue-500 focus:outline-none rounded transition-colors appearance-none"
                        >
                            <option value="" className="bg-black">Sélectionner...</option>
                            <option value="e-commerce" className="bg-black">E-commerce</option>
                            <option value="services" className="bg-black">Services / Agence</option>
                            <option value="tech" className="bg-black">Tech / SaaS</option>
                            <option value="retail" className="bg-black">Retail Physique</option>
                            <option value="autre" className="bg-black">Autre</option>
                        </select>
                    </div>
                </div>

                {/* Ligne 3 : Besoins (Tags) */}
                <div className="space-y-3">
                    <label className="text-xs uppercase tracking-widest text-gray-500 flex items-center gap-2">
                        <Layers className="w-3 h-3" /> Besoins Prioritaires
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {needsOptions.map(need => (
                            <button
                                key={need} type="button"
                                onClick={() => toggleNeed(need)}
                                className={`px-4 py-2 text-xs uppercase tracking-wide border rounded transition-all ${formData.needs.includes(need)
                                        ? 'bg-blue-500 border-blue-500 text-white'
                                        : 'bg-transparent border-white/20 text-gray-400 hover:border-white/50'
                                    }`}
                            >
                                {need}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bouton Submit */}
                <button
                    type="submit" disabled={status === 'loading' || status === 'success'}
                    className={`w-full py-4 font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 rounded mt-4 ${status === 'success' ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-gray-200'
                        }`}
                >
                    {status === 'loading' ? <Loader2 className="animate-spin" /> : status === 'success' ? <Check /> : "SOUMETTRE LE DOSSIER"}
                </button>

                {/* Feedback */}
                {message && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-center text-xs font-mono mt-4 ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                        {message}
                    </motion.div>
                )}

            </form>

            {/* Déco technique */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        </div>
    );
}