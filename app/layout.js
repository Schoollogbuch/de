import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Schoollog',
  description: 'Das digitale Logbuch für deine Schule',
}

export default function RootLayout({ children }) {
  // Wir ermitteln den Monat (0 = Jan, 1 = Feb, etc.)
  // Februar (dein Startmonat) = 1
  const month = new Date().getMonth();
  
  let seasonClass = "winter-theme";
  if (month >= 2 && month <= 4) seasonClass = "spring-theme";
  else if (month >= 5 && month <= 7) seasonClass = "summer-theme";
  else if (month >= 8 && month <= 10) seasonClass = "autumn-theme";

  return (
    <html lang="de">
      <body className={`${inter.className} ${seasonClass}`}>
        {children}
      </body>
    </html>
  )
}
