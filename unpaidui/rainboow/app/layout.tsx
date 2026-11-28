import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rainboow · Agence de design & développement Webflow / Astro",
  description:
    "Le design au service de votre croissance. Nous concevons des expériences digitales qui ont du sens, captent l'attention et génèrent de vrais résultats.",
  icons: {
    icon: "/img/logo-mark.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0b0710] text-[#f4f0ea] font-sans overflow-x-hidden selection:bg-[#ff007f] selection:text-white">
        {children}
      </body>
    </html>
  );
}
