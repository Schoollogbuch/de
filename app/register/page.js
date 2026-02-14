"use client";

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import { UserPlus, Mail, Lock, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [teacherCode, setTeacherCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Das ist dein geheimer Code - den kannst du hier jederzeit ändern!
  const SECRET_TEACHER_CODE = "CSK-2026";

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check, ob es eine Schul-E-Mail ist
    if (!email.endsWith('@cskiel.org')) {
      alert("Bitte verwende deine offizielle @cskiel.org Adresse.");
      setLoading(false);
      return;
    }

    // Rolle festlegen
    const role = teacherCode === SECRET_TEACHER_CODE ? 'teacher' : 'student';

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Wir speichern die Rolle direkt in den Nutzer-Metadaten
        data: {
          role: role,
          display_name: email.split('@')[0]
        }
      }
    });

    if (error) {
      alert("Fehler: " + error.message);
    } else {
      alert(role === 'teacher' 
        ? "Lehrer-Account erfolgreich erstellt!" 
        : "Schüler-Account erfolgreich erstellt!");
      router.push('/'); // Zurück zum Login
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="card w-full max-w-md p-8 bg-white rounded-[2.5rem] shadow-xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-black mb-6 transition-colors">
          <ArrowLeft size={16} /> Zurück zum Login
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Beitreten</h1>
          <p className="text-gray-500 mt-2">Erstelle dein Schoollog-Konto</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
            <input 
              type="email" 
              placeholder="E-Mail (@cskiel.org)"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
            <input 
              type="password" 
              placeholder="Passwort (min. 6 Zeichen)"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="pt-4 border-t border-gray-50">
            <label className="text-xs font-bold text-gray-400 uppercase ml-2 mb-2 block">Lehrer-Option</label>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              <input 
                type="text" 
                placeholder="Lehrer-Code (optional)"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-indigo-500 outline-none transition-all bg-indigo-50/30"
                value={teacherCode}
                onChange={(e) => setTeacherCode(e.target.value)}
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-2 ml-2 italic">
              Nur auszufüllen, wenn du eine Lehrkraft bist.
            </p>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white flex items-center justify-center gap-2 text-lg py-4 rounded-2xl font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
          >
            <UserPlus size={22} /> {loading ? 'Registrierung...' : 'Konto erstellen'}
          </button>
        </form>
      </div>
    </div>
  );
}
