/*
  layout.tsx — Server Component.

  Los providers de cliente van en ClientProviders.tsx.
  Aquí solo: fuentes, metadata, html shell, y el import de ClientProviders.
  Sin dynamic() ni ssr: false en este archivo.
*/

import type { Metadata, Viewport } from "next";
import { Cormorant, DM_Sans } from "next/font/google";
import ClientProviders from "@/components/layout/ClientProviders";
import { siteDescription, siteKeywords, siteName, siteTitle, siteUrl } from "@/lib/seo";
import "./globals.css";

/* ── Fuentes ──────────────────────────────────────────────────────────── */

const cormorant = Cormorant({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600"],
  style:    ["normal", "italic"],
  variable: "--font-display",
  display:  "swap",
  preload:  true,
});

const dmSans = DM_Sans({
  subsets:  ["latin"],
  weight:   ["300", "400", "500"],
  variable: "--font-body",
  display:  "swap",
  preload:  true,
});

/* ── Metadata ─────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s — Elian Mejia",
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  applicationName: siteName,
  category: "portfolio",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${siteName} — Full-Stack Product Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@elianmejia",
    title: siteTitle,
    description: siteDescription,
  },
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Elian Mejia",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F4" },
    { media: "(prefers-color-scheme: dark)",  color: "#08080B" },
  ],
  width:        "device-width",
  initialScale: 1,
};

/* ── Layout ───────────────────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/*
          ClientProviders contiene:
          - Navbar (Client Component con scroll suave)
          - SmoothScrollProvider (Lenis + GSAP)
          - CustomCursor (RAF, window APIs)
        */}
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}