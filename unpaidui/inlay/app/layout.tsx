import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Inlay — Every piece of you, on one page",
  description:
    "Inlay is a link in bio you arrange like a gallery wall: posters, playlists, posts, products and bookings on one page that also pays you.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Inlay — Every piece of you, on one page",
    description:
      "Inlay is a link in bio you arrange like a gallery wall: posters, playlists, posts, products and bookings on one page that also pays you.",
    siteName: "Inlay",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Inlay — Every piece of you, on one page",
    description:
      "Inlay is a link in bio you arrange like a gallery wall: posters, playlists, posts, products and bookings on one page that also pays you.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
