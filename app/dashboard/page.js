"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import { Calendar, BookOpen, User, LogOut, Heart, PlusCircle, Users } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false); // Neuer Status für Lehrer
  const [theme, setTheme] = useState({ name: 'Standard' });
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/');
      } else {
        setUser(user);
        // Einfache Prüfung: Wenn "teacher" in der Mail steht oder ein spezielles Metadata-Feld gesetzt ist
        // Später machen wir das über eine Datenbank-Tabelle "profiles"
        if (user.user_metadata?.role === 'teacher' || user.email.includes('admin')) {
          setIsTeacher(true);
        }
      }
    };
    checkUser();

    // Valentinstag-Logik (14. Februar)
    const now = new Date();
    if (now.getMonth() === 1 && now.getDate() === 14) {
      setTheme({ 
        name: 'Valentinstag', 
        class: 'bg-pink-50 border-pink-100', 
        text: 'text-pink-600', 
        icon: <Heart className="text-pink-500" /> 
      });
    } else {
      setTheme({ 
        name: 'Winter-Modus', 
        class: 'bg-blue-50 border-blue-100', 
        text: 'text-blue-600', 
        icon: <Calendar className="text-blue-500" /> 
      });
    }
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (!user) return <div className="p-10 text-center font-bold">Lade Schoollog...</div>;

  return (
    <div className={`min-h-screen ${theme.class} transition-colors duration-700`}>
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-gray-900">
            <span className="bg-black text-white px-2 py-1 rounded-lg">S</span> Schoollog
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-500 uppercase">
              {isTeacher ? 'Lehrer-Account' : 'Schüler-Account'}
            </span>
            <button onClick={handleLogout} className="p-2 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-all">
              <LogOut size={22} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Begrüßung */}
        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-white">
          <div className="flex items-center gap-3 mb-4">
            {theme.icon}
            <span className={`text-xs font-black uppercase tracking-[0.2em] ${theme.text}`}>
              {theme.name} Edition
            </span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 leading-tight">
            Moin, {user.email.split('@')[0]}!
          </h1>
          <p className="text-gray-500 font-medium mt-1">Hier ist dein Überblick für heute.</p>
        </div>

        {/* Bedingte Ansicht: Lehrer-Tools */}
        {isTeacher && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-[2rem] text-white shadow-lg shadow-indigo-200">
              <Users className="mb-4" size={32} />
              <h3 className="text-xl font-bold">Klassenbuch</h3>
              <p className="text-indigo-100 text-sm mt-1">Anwesenheit für 9c eintragen.</p>
              <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-bold transition-all">
                Jetzt öffnen
              </button>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center hover:border-indigo-300 transition-all group cursor-pointer">
              <PlusCircle className="text-gray-300 group-hover:text-indigo-500 mb-2" size={32} />
              <span className="font-bold text-gray-400 group-hover:text-indigo-600">Hausaufgabe aufgeben</span>
            </div>
          </div>
        )}

        {/* Schüler-Ansicht (immer sichtbar) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:translate-y-[-4px] transition-all">
            <Calendar className="text-blue-500 mb-3" />
            <h4 className="font-bold">Stundenplan</h4>
            <p className="text-xs text-gray-400">Nächste Stunde: Mathe (R102)</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:translate-y-[-4px] transition-all">
            <BookOpen className="text-green-500 mb-3" />
            <h4 className="font-bold">Notenspiegel</h4>
            <p className="text-xs text-gray-400">Schnitt: 2.1</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:translate-y-[-4px] transition-all">
            <User className="text-orange-500 mb-3" />
            <h4 className="font-bold">Profil</h4>
            <p className="text-xs text-gray-400">Klasse 10b</p>
          </div>
        </div>
      </main>
    </div>
  );
}
