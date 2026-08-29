import type { MetadataRoute } from "next";
import { SCHOOL } from "@/config/school";
import { ANNOUNCEMENTS, JURUSAN, PROGRAMS } from "@/lib/demo-data";

const BASE = SCHOOL.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "/profil", "/profil/visi-misi", "/profil/sejarah", "/profil/identitas",
    "/profil/kepala-sekolah", "/guru", "/fasilitas", "/jurusan", "/program",
    "/ekskul", "/osis", "/prestasi", "/alumni", "/kenangan", "/galeri",
    "/berita", "/pengumuman", "/agenda", "/unduhan", "/ppdb", "/faq",
    "/kontak", "/cari", "/kebijakan-privasi", "/ketentuan-penggunaan",
    "/aksesibilitas", "/e-raport",
  ].map((r) => ({
    url: `${BASE}${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.7,
  }));

  const dynamicRoutes = [
    ...ANNOUNCEMENTS.map((a) => ({ url: `${BASE}/berita/${a.slug}`, priority: 0.6 })),
    ...JURUSAN.map((j) => ({ url: `${BASE}/jurusan/${j.slug}`, priority: 0.6 })),
    ...PROGRAMS.map((p) => ({ url: `${BASE}/program/${p.slug}`, priority: 0.5 })),
  ].map((r) => ({
    ...r,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}