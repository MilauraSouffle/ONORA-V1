// src/pages/Login.jsx
// Page de connexion avec picto robot IA

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import PageLayout from "../components/PageLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implémentation avec Supabase
    console.log("Login attempt:", { email, password });
  };

  return (
    <>
      <Helmet>
        <title>Se connecter · ONORA</title>
        <meta
          name="description"
          content="Connectez-vous à votre espace ONORA pour accéder à vos projets et outils IA."
        />
      </Helmet>

      <PageLayout maxWidth="max-w-md">
        <div className="space-y-8">
          {/* Picto Robot IA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
                <Bot className="w-12 h-12 text-cyan-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full border-2 border-black flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
              </div>
            </div>
          </motion.div>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Se connecter
            </h1>
            <p className="text-gray-900">
              Accédez à votre espace ONORA
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-900 placeholder:text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-900 placeholder:text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3.5 rounded-xl bg-cyan-500/90 hover:bg-cyan-500 text-gray-900 font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] active:scale-[0.98]"
            >
              Se connecter
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-900">
              Table Supabase à créer dans un second temps
            </p>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
