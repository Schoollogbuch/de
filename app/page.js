"use client";

import React, { useState } from 'react';
import { School, Lock, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
// Wir importieren die Supabase-Verbindung
import { supabase } from '../lib/supabase'; 
import { useRouter } from 'next/navigation';

export default function SchoollogLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Hier passiert die echte Anmeldung bei Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert("Login fehlgeschlagen: " + error.message);
    } else {
      alert("Erfolgreich eingeloggt!");
      // Hier leiten wir den Nutzer später zum Dashboard weiter
      // router.push('/dashboard'); 
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="card w-full max-w-md p-8">
        
        {/* Logo Bereich */}
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-3xl bg-opacity-10 bg-current mb-4 text-[var(--accent)]">
            <School size={54} strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900">Schoollog</h1>
          <p className="opacity-60 mt-2 font-medium">Dein digitales Klassenzimmer</p>
        </div>

        {/* Login Formular */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail size={20} />
            </div>
            <input 
              type="email" 
              placeholder="Schul-E-Mail (@cskiel.org)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-[var(--accent)] outline-none transition-all text-black bg-gray-50 focus:bg-white"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={20} />
            </div>
            <input 
              type="password" 
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-[var(--accent)] outline-none transition-all text-black bg-gray-50 focus:bg-white"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4 shadow-lg shadow-[var(--accent)]/20 disabled:opacity-50"
          >
            {loading ? 'Prüfe Daten...' : 'Anmelden'} <ArrowRight size={22} />
          </button>
        </form>

        {/* Link zur Registrierung */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Neu an der Schule? <br/>
            <Link href="/register" className="text-[var(--accent)] font-bold cursor-pointer hover:underline inline-block mt-1">
              Mit Registrierungscode beitreten
            </Link>
          </p>
        </div>
      </div>
      
      {/* Footer Info */}
      <footer className="mt-12 text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold">
        © 2026 Schoollog Platform • Proudly made for Schools
      </footer>
    </div>
  );
}
