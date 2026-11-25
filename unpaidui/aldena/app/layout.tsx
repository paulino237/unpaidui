import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Baskervville } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const baskervville = Baskervville({
  variable: "--font-baskervville",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aldena — Brand & Editorial Studio",
  description:
    "Aldena is a brand and editorial studio for companies that would rather be understood than noticed. We build identities, publications, and content systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${baskervville.variable} min-h-screen bg-[#0a0a0a] text-[#f5f4f0] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
