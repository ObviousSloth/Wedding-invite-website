import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
 


 const fontSlight = localFont({
  src: '../../public/fonts/Slight.otf',
  variable: '--font-slight',
  display: 'swap',
});

 const fontSeasons = localFont({
  src: [
    { path: '../../public/fonts/TheSeasons.woff2',    weight: '400', style: 'normal' },
    // Add bold weights here if you have them
  ],
  variable: '--font-seasons',
  display: 'swap',
});

 const fontCinzel = localFont({
  src: [
    { path: '../../public/fonts/Cinzel-Regular.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-cinzel',
  display: 'swap',
});

 const fontOldStandard = localFont({
  src: [
    { path: '../../public/fonts/OldStandard-Regular.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-oldstandard',
  display: 'swap',
});


 const fontIcon = localFont({
  src: '../../public/fonts/New-Icon-Script.otf',
  variable: '--font-icon',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Jessika & Randy — 19 Diciembre 2026",
  description: "Nos alegra invitarlos a la boda de Jessika y Randy el 19 de diciembre del 2026 en Madrid, España.",
  openGraph: {
    title: "Jessika & Randy — 19 Diciembre 2026",
    description: "Nos alegra invitarlos a nuestra boda",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const fonts = [
    fontSlight.variable,
    fontSeasons.variable,
    fontCinzel.variable,
    fontOldStandard.variable,
    fontIcon.variable,
  ].join(' ');

  return (
    <html lang="es" className={`scroll-smooth ${fonts}`}>
      <body className="font-cinzel bg-cream text-burgundy antialiased">
        {children}
      </body>
    </html>
  );
}
