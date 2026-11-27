import type { Metadata, Viewport } from "next";
import { Inter_Tight, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-plates",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hairline UI: Next.js Templates, Blocks & Free shadcn/ui Components",
  description:
    "Engineering-grade landing page templates, blocks and interactive shadcn/ui components. Built for Next.js, moving with every change.",
  openGraph: {
    title: "Hairline UI: Next.js Templates, Blocks & Free shadcn/ui Components",
    description:
      "Engineering-grade landing page templates, blocks and interactive shadcn/ui components. Built for Next.js, moving with every change.",
    siteName: "Hairline UI",
    type: "website",
    images: ["/og/hairline-ui.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hairline UI: Next.js Templates, Blocks & Free shadcn/ui Components",
    description:
      "Engineering-grade landing page templates, blocks and interactive shadcn/ui components. Built for Next.js, moving with every change.",
    images: ["/og/hairline-ui.jpg"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#191919",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${interTight.variable} ${geistSans.variable} ${geistMono.variable} inter_tight_93e42467-module__lxmGHa__variable geist_dda90dae-module__ZZScXa__variable geist_mono_8f04fc5a-module__ZGwrmq__variable scroll-smooth`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-surface text-ink-4 selection:bg-primary/10 selection:text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
