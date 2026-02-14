"use client"; // Wichtig für Interaktionen
import React, { useState } from 'react';
import { School, Lock, Mail, ArrowRight } from 'lucide-react';

export default function SchoollogLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login-Versuch für: ${email}. Anbindung an Supabase folgt im nächsten Schritt!`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="card w-full max-w-md p-8">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-2xl bg-opacity-10 bg-current mb-4">
            <School size={48} className="text-[var(--accent)]" />
          </div>
          <h1 className="text-4xl font-black tracking-tight">Schoollog</h1>
          <p className="opacity-60 mt-2 font-medium">Dein digitales Klassenzimmer</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={20} />
            <input 
              type="email" 
              placeholder="Schul-E-Mail (@cskiel.org)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-50 focus:border-[var(--accent)] outline-none transition-all text-black"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={20} />
            <input 
              type="password" 
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 focus:border-[var(--accent)] outline-none transition-all text-black"
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 text-lg">
            Anmelden <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm opacity-70">
            Neu an der Schule? <br/>
            <span className="text-[var(--accent)] font-bold cursor-pointer hover:underline">
              Mit Registrierungscode beitreten
            </span>
          </p>
        </div>
      </div>
      
      <footer className="mt-8 text-[10px] uppercase tracking-widest opacity-40">
        © 2026 Schoollog Platform • Made for Schools
      </footer>
    </div>
  );
}
