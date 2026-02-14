import { LogIn } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border-b-4 border-gray-200">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gray-100 rounded-full text-blue-600">
            <LogIn size={40} />
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold text-center mb-2 tracking-tight">Schoollog</h1>
        <p className="text-center text-gray-500 mb-8">Dein digitales Schul-Logbuch</p>
        
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="E-Mail (@cskiel.org)" 
            className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none transition-all"
          />
          <input 
            type="password" 
            placeholder="Passwort" 
            className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none transition-all"
          />
          <button className="w-full py-4 bg-black text-white rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all">
            Anmelden
          </button>
        </div>
        
        <p className="mt-8 text-center text-sm text-gray-400">
          Noch kein Konto? <span className="text-blue-600 font-semibold cursor-pointer underline">Jetzt registrieren</span>
        </p>
      </div>
    </main>
  );
}
