import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f1f1ee",
};

export const metadata: Metadata = {
  title: "Turnout — Moments people show up for",
  description:
    "Turnout designs, builds and films brand experiences: pop-ups, launch nights, community programs and creator trips, each one turned into a season of content.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Turnout — Moments people show up for",
    description:
      "Turnout designs, builds and films brand experiences: pop-ups, launch nights, community programs and creator trips, each one turned into a season of content.",
    siteName: "Turnout",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Turnout — Moments people show up for",
    description:
      "Turnout designs, builds and films brand experiences: pop-ups, launch nights, community programs and creator trips, each one turned into a season of content.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${geist.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.dataset.motion=window.matchMedia("(prefers-reduced-motion: reduce)").matches?"off":"on"}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <div hidden />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
