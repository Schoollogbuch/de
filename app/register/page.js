"use client";
import React, { useState } from 'react';
import { UserPlus, School, Mail, Lock, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    schoolCode: '', // Der Code vom Admin
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Hier wird später die Logik eingebaut:
    // 1. Prüfen ob schoolCode in der Datenbank existiert
    // 2. Nutzer bei Supabase Auth anlegen
    // 3. Profil in der Tabelle 'profile' erstellen
    
    alert(`Registrierung gestartet für ${formData.fullName}. Supabase-Anbindung wird aktiv sobald Vercel live ist!`);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Zurück zum Login */}
      <Link href="/" className="mb-6 flex items-center gap-2 text-sm opacity-50 hover:opacity-100 transition">
        <ArrowLeft size={16} /> Zurück zum Login
      </Link>

      <div className="card w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-opacity-10 bg-current mb-4">
            <UserPlus size={40} className="text-[var(--accent)]" />
          </div>
          <h1 className="text-3xl font-black">Konto erstellen</h1>
          <p className="opacity-60 mt-2">Tritt deiner Schule bei</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider opacity-50 ml-1">Vollständiger Name</label>
            <div className="relative mt-1">
              <input 
                type="text" 
                placeholder="Max Mustermann"
                className="w-full p-4 pl-4 rounded-xl border-2 border-gray-50 focus:border-[var(--accent)] outline-none transition-all text-black"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider opacity-50 ml-1">Schul-E-Mail</label>
            <div className="relative mt-1">
              <input 
                type="email" 
                placeholder="name@cskiel.org"
                className="w-full p-4 pl-4 rounded-xl border-2 border-gray-50 focus:border-[var(--accent)] outline-none transition-all text-black"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider opacity-50 ml-1">Dein Schul-Code</label>
            <div className="relative mt-1">
              <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--accent)]" size={20} />
              <input 
                type="text" 
                placeholder="z.B. KIEL-2026"
                className="w-full p-4 pl-4 rounded-xl border-2 border-gray-50 focus:border-[var(--accent)] outline-none transition-all font-mono font-bold text-black"
                onChange={(e) => setFormData({...formData, schoolCode: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider opacity-50 ml-1">Passwort wählen</label>
            <div className="relative mt-1">
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full p-4 pl-4 rounded-xl border-2 border-gray-50 focus:border-[var(--accent)] outline-none transition-all text-black"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full py-4 mt-4 text-lg shadow-lg shadow-[var(--accent)]/20"
          >
            {loading ? 'Wird erstellt...' : 'Konto erstellen'}
          </button>
        </form>
      </div>

      <p className="mt-8 text-sm opacity-50">
        Mit der Registrierung akzeptierst du die Nutzungsbedingungen für Schulen.
      </p>
    </div>
  );
}
