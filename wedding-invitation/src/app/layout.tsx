import type { Metadata } from "next";
import "./globals.css";

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
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-cinzel bg-cream text-burgundy antialiased">
        {children}
      </body>
    </html>
  );
}
