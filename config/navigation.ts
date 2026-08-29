/**
 * Central navigation — struktur setara smadarussalam.sch.id:
 * Beranda | Profil Kami ▾ | Program Jurusan ▾ | Lainnya ▾ | WA + CTA Daftar
 * Visual tetap tema Biru Ceria. Single source of truth Navbar & Footer.
 */

export interface NavItem {
  label: string;
  href: string;
  desc?: string;
  children?: NavItem[];
}

export const PUBLIC_NAV: NavItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Profil Kami",
    href: "/profil",
    children: [
      { label: "Profil Sekolah", href: "/profil", desc: "Tentang sekolah" },
      { label: "Visi dan Misi", href: "/profil/visi-misi", desc: "Arah & tujuan" },
      { label: "Identitas Sekolah", href: "/profil/identitas", desc: "Data resmi & NPSN" },
      { label: "Sejarah Singkat", href: "/profil/sejarah", desc: "Perjalanan sejak 2005" },
      { label: "Fasilitas", href: "/fasilitas", desc: "Sarana & prasarana" },
      { label: "Guru dan Tenaga Kependidikan", href: "/guru", desc: "Pendidik & staf" },
    ],
  },
  {
    label: "Program Jurusan",
    href: "/jurusan",
    children: [
      { label: "MIPA", href: "/jurusan/mipa", desc: "Matematika & Ilmu Pengetahuan Alam" },
      { label: "IPS", href: "/jurusan/ips", desc: "Ilmu Pengetahuan Sosial" },
    ],
  },
  {
    label: "Lainnya",
    href: "/berita",
    children: [
      { label: "Ekstrakurikuler", href: "/ekskul", desc: "Kegiatan minat bakat" },
      { label: "Kontak", href: "/kontak", desc: "Hubungi kami" },
      { label: "Berita & Artikel", href: "/berita", desc: "Kabar terkini" },
      { label: "Galeri", href: "/galeri", desc: "Foto & video kegiatan" },
      { label: "Kenangan", href: "/kenangan", desc: "Memories siswa" },
      { label: "Prestasi", href: "/prestasi", desc: "Rekam juara" },
      { label: "Alumni", href: "/alumni", desc: "Cerita lulusan" },
      { label: "Portal Akademik", href: "/e-raport", desc: "E-Raport & layanan digital — dalam pengembangan" },
    ],
  },
];

export const WA_LINK = "https://wa.me/6281234567890";
export const DAFTAR_LINK = "/ppdb";

export const FOOTER_QUICK = [
  { label: "Profil Sekolah", href: "/profil" },
  { label: "Program Jurusan", href: "/jurusan" },
  { label: "Ekstrakurikuler", href: "/ekskul" },
  { label: "Berita & Artikel", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Pencarian", href: "/cari" },
  { label: "Portal Akademik", href: "/e-raport" },
  { label: "Kontak Kami", href: "/kontak" },
];

export const FOOTER_INFO = [
  { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
  { label: "Syarat & Ketentuan", href: "/ketentuan-penggunaan" },
  { label: "Aksesibilitas", href: "/aksesibilitas" },
];
