// Dies ist die Logik für deine Login-Seite mit Jahreszeiten-Check
import React, { useState, useEffect } from 'react';

export default function LoginPage() {
  const [theme, setTheme] = useState('winter'); // Standard

  useEffect(() => {
    const month = new Date().getMonth(); // 0 = Jan, 1 = Feb...
    if (month >= 2 && month <= 4) setTheme('spring'); // März-Mai
    else if (month >= 5 && month <= 7) setTheme('summer'); // Juni-Aug
    else if (month >= 8 && month <= 10) setTheme('autumn'); // Sept-Nov
    else setTheme('winter'); // Dez-Feb
  }, []);

  const themes = {
    spring: "bg-green-100 border-green-500 text-green-800",
    summer: "bg-yellow-50 border-orange-400 text-orange-900",
    autumn: "bg-orange-100 border-red-700 text-brown-900",
    winter: "bg-blue-50 border-blue-600 text-blue-900"
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-1000 ${themes[theme].split(' ')[0]}`}>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-8 ${themes[theme].split(' ')[1]}">
        <h1 className="text-3xl font-bold text-center mb-2">Schoollog</h1>
        <p className="text-center text-gray-500 mb-8">Willkommen an deiner Schule</p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Schul-E-Mail (@cskiel.org etc.)</label>
            <input type="email" placeholder="name@schule.de" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Passwort</label>
            <input type="password" placeholder="••••••••" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
          </div>
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">
            Anmelden
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p>Neu hier? <span className="text-blue-600 cursor-pointer">Registrieren mit Schulcode</span></p>
        </div>
      </div>
    </div>
  );
}
