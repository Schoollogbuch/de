"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import { Calendar, BookOpen, User, LogOut, Heart } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState({ name: 'Standard', icon: <BookOpen /> });
  const router = useRouter();

  useEffect(() => {
    // 1. Prüfen, ob der Nutzer eingeloggt ist
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/'); // Wenn nicht eingeloggt, zurück zum Login
      } else {
        setUser(user);
      }
    };
    getUser();

    // 2. Saisonales Theme ermitteln (Dein Wunsch-Feature!)
    const updateTheme = () => {
      const now = new Date();
      const month = now.getMonth() + 1; // Januar ist 0
      const day = now.getDate();

      if (month === 2 && day === 14) {
        setTheme({ name: 'Valentinstag', class: 'bg-pink-50 border-pink-200', text: 'text-pink-600', icon: <Heart className="text-pink-500" /> });
      } else if ([12, 1, 2].includes(month)) {
        setTheme({ name: 'Winter-Modus', class: 'bg-blue-50 border-blue-200', text: 'text-blue-600', icon: <Calendar className="text-blue-500" /> });
      } else {
        setTheme({ name: 'Standard', class: 'bg-gray-50 border-gray-200', text: 'text-gray-600', icon: <BookOpen /> });
      }
    };
    updateTheme();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (!user) return <div className="p-10 text-center">Lädt...</div>;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme.class}`}>
      {/* Navigation */}
      <nav className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 font-black text-xl tracking-tight">
          <div className="p-2 bg-black text-white rounded-lg">SL</div>
          Schoollog
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
          <LogOut size={20} /> Abmelden
        </button>
      </nav>

      <main className="max-w-4xl mx-auto p-6">
        {/* Willkommens-Banner */}
        <div className="bg-white rounded-3xl p-8 border shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-2xl bg-opacity-10 ${theme.class}`}>
              {theme.icon}
            </div>
            <span className={`text-sm font-bold uppercase tracking-widest ${theme.text}`}>
              {theme.name} ist aktiv
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Hallo, {user.email.split('@')[0]}! 👋</h2>
          <p className="text-gray-500 mt-2">Willkommen in deinem digitalen Logbuch für die **cskiel.org**.</p>
        </div>

        {/* Platzhalter für Funktionen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border hover:shadow-md transition-shadow cursor-pointer">
            <h3 className="font-bold text-lg mb-1">Mein Stundenplan</h3>
            <p className="text-gray-400 text-sm">Sieh nach, was heute ansteht.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border hover:shadow-md transition-shadow cursor-pointer">
            <h3 className="font-bold text-lg mb-1">Hausaufgaben</h3>
            <p className="text-gray-400 text-sm">2 Aufgaben noch offen.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
