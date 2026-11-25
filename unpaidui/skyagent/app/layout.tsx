import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkyAgent",
  description: "Your template for building AI-powered agents with Magic UI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-secondary selection:text-white">
        {children}
      </body>
    </html>
  );
}
