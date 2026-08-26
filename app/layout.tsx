import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollToTop, WhatsAppFloat } from "@/components/Floats";
import { SCHOOL } from "@/config/school";

export const metadata: Metadata = {
  title: {
    default: `${SCHOOL.name} — Berakhlak Mulia, Berprestasi, Berwawasan Global`,
    template: `%s • ${SCHOOL.name}`,
  },
  description: SCHOOL.tagline,
  icons: { icon: SCHOOL.faviconUrl },
  openGraph: {
    title: SCHOOL.name,
    description: SCHOOL.tagline,
    images: [SCHOOL.heroImageUrl],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased selection:bg-primary-200 selection:text-primary-900">
        <div aria-hidden className="global-deco" />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ScrollToTop />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
