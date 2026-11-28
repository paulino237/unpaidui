import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La boite à slides® : l'Agence PowerPoint Certifiée ISO 9001",
  description:
    "La boite à slides® : seule agence au monde certifiée ISO 9001 qui transforme PowerPoint en un puissant levier d'impact pour votre business.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="scroll-smooth">
      <body className="antialiased selection:bg-[#6630ff] selection:text-white">
        {children}
      </body>
    </html>
  );
}
