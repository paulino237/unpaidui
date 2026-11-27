import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kilowatt — Your house runs on the cheapest hour",
  description:
    "Kilowatt decides where your home's energy goes every half hour: solar into the battery, the car onto the cheapest hours, the evening peak sold back to the grid.",
  openGraph: {
    title: "Kilowatt — Your house runs on the cheapest hour",
    description:
      "Kilowatt decides where your home's energy goes every half hour: solar into the battery, the car onto the cheapest hours, the evening peak sold back to the grid.",
    siteName: "Kilowatt",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kilowatt — Your house runs on the cheapest hour",
    description:
      "Kilowatt decides where your home's energy goes every half hour: solar into the battery, the car onto the cheapest hours, the evening peak sold back to the grid.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
      className="space_grotesk_bd733379-module__iqkQUq__variable rethink_sans_e397e536-module__gCn4iW__variable"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.dataset.motion=window.matchMedia("(prefers-reduced-motion: reduce)").matches?"off":"on"}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
