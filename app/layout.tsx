import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollToTop, WhatsAppFloat } from "@/components/Floats";
import { SCHOOL, DAPODIK } from "@/config/school";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL(SCHOOL.url),
  title: {
    default: `${SCHOOL.name} — ${SCHOOL.motto}`,
    template: `%s • ${SCHOOL.name}`,
  },
  description: SCHOOL.description,
  icons: { icon: SCHOOL.faviconUrl },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: SCHOOL.name,
    description: SCHOOL.description,
    siteName: SCHOOL.name,
    locale: "id_ID",
    type: "website",
    images: [SCHOOL.heroImageUrl],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: SCHOOL.name,
  alternateName: "SMA Darussalam Simpang Mesir",
  url: SCHOOL.url,
  logo: `${SCHOOL.url}${SCHOOL.logoUrl}`,
  email: SCHOOL.email,
  npsn: SCHOOL.npsn,
  foundingDate: `${SCHOOL.founded}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: SCHOOL.address,
    addressLocality: SCHOOL.kabupaten,
    addressRegion: SCHOOL.provinsi,
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: DAPODIK.koordinat.lat,
    longitude: DAPODIK.koordinat.lng,
  },
  sameAs: [SCHOOL.social.instagram, SCHOOL.social.youtube, SCHOOL.social.facebook].filter((u) => u && u !== "#"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased selection:bg-primary-200 selection:text-primary-900">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div aria-hidden className="global-deco" />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ScrollToTop />
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  );
}
