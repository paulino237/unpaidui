import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React Bits Pro - SaaS Template",
  description:
    "Build faster, ship with confidence. The modern SaaS template for high-growth teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-accent selection:text-black">
        {/* Subtle decorative outer frame */}
        <div aria-hidden="true" className="site-frame site-frame--top hidden lg:block" />
        <div aria-hidden="true" className="site-frame site-frame--bottom hidden lg:block" />
        <div aria-hidden="true" className="site-frame site-frame--left hidden lg:block" />
        <div aria-hidden="true" className="site-frame site-frame--right hidden lg:block" />
        {children}
      </body>
    </html>
  );
}
