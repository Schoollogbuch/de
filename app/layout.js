import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  // Logik für automatischen Jahreszeitenwechsel
  const getSeasonClass = () => {
    const month = new Date().getMonth(); // Jan=0, Feb=1...
    if (month >= 2 && month <= 4) return 'spring-theme';
    if (month >= 5 && month <= 7) return 'summer-theme';
    if (month >= 8 && month <= 10) return 'autumn-theme';
    return 'winter-theme'; // Dez, Jan, Feb
  };

  return (
    <html lang="de">
      <body className={`${inter.className} ${getSeasonClass()}`}>
        {/* Hier können wir später eine Navigationsleiste für alle Seiten einbauen */}
        <div className="max-w-6xl mx-auto px-4">
          {children}
        </div>
      </body>
    </html>
  )
}
