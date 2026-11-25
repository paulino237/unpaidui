import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "TLDR – Read smarter, not longer",
  description: "AI-powered summaries for articles, videos, and documents. Save hours every week.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} relative min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <div className="h-screen overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
