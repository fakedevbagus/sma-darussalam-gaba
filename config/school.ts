/**
 * SMA DARUSSALAM — School Identity Configuration
 * Identitas mengikuti logo resmi:
 *  - Yayasan : Yayasan Darussalam Simpang Mesir
 *  - Sekolah : SMA Darussalam
 *  - Alamat  : Simpang Mesir, Sumber Jaya, Gedung Aji Baru, Tulang Bawang
 *
 * >>> SEMUA DATA DI FILE INI ADALAH DEMO & SIAP DIGANTI DATA REAL <<<
 * Panduan lengkap: lihat PANDUAN-IDENTITAS.md
 */

export type VerificationStatus = "dummy" | "needs_verification" | "verified";

export interface SchoolIdentity {
  yayasan: string;
  name: string;
  shortName: string;
  motto: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  heroVideoUrl: string;      // video background hero (mp4/webm)
  heroPosterUrl: string;     // poster fallback video
  heroImageUrl: string;
  profileVideoUrl: string;   // video profil (youtube embed / mp4)
  address: string;
  phone: string;
  whatsapp: string;          // format 62xxx
  whatsappDisplay: string;
  email: string;
  hours: string;
  akreditasi: string;
  founded: number;
  npsn: string;
  mapEmbedUrl: string;
  mapOpenUrl: string;
  social: {
    instagram: string;
    tiktok: string;
    facebook: string;
    youtube: string;
    whatsapp: string;
  };
  url: string;
  principal: {
    name: string;
    title: string;
    quote: string;
    sambutan: string;
    imageUrl: string;
  };
  visi: string;
  misi: string[];
  stats: { value: string; label: string }[];
}

export const SCHOOL: SchoolIdentity = {
  yayasan: "Yayasan Darussalam Simpang Mesir",
  name: "SMA Darussalam",
  shortName: "SMADA Simpang Mesir",
  motto: "Berakhlak Mulia • Berprestasi • Berwawasan Global",
  tagline: "Membentuk generasi yang cerdas, kreatif, berkarakter, dan siap menghadapi masa depan.",
  logoUrl: "/logo.png",
  faviconUrl: "/favicon.png",
  // Ganti dengan video profil sekolah (lihat PANDUAN-IDENTITAS.md)
  heroVideoUrl: "https://www.instagram.com/reel/DcU7AIIiqOg/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
  heroPosterUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop",
  heroImageUrl: "https://www.instagram.com/p/DcJJqx8kX2G/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
  profileVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  address: "Simpang Mesir, Sumber Jaya, Gedung Aji Baru, Kab. Tulang Bawang, Lampung",
  phone: "(0725) 123-456",
  whatsapp: "6285215229165",
  whatsappDisplay: "085215229165",
  email: "info@smadarussalamsimpangmesir.sch.id",
  hours: "Senin – Jumat, 07.00 – 16.00 WIB",
  akreditasi: "Terakreditasi A",
  founded: 2004,
  npsn: "70000262",
  mapEmbedUrl: "https://www.google.com/maps?q=Gedung%20Aji%20Baru%2C%20Tulang%20Bawang%2C%20Lampung&output=embed",
  mapOpenUrl: "https://www.google.com/maps?q=-4.2199,105.5949",
  social: {
    whatsapp: "https://wa.me/6285215229165",
    instagram: "https://www.instagram.com/smadasdarussalam?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",
    tiktok: "#",
    facebook: "#",
    youtube: "#",
  },
  url: "https://smadarussalamsimpangmesir.sch.id",
  principal: {
    name: "Muzaki Ariffin Affandi, S.Pd., M.Pd.",
    title: "Kepala SMA Darussalam",
    quote: "Sekolah bukan hanya tempat belajar, tapi rumah kedua yang menyenangkan — tempat anak tumbuh berakhlak mulia, berprestasi, dan berwawasan global.",
    sambutan: `Assalamualaikum warahmatullahi wabarakatuh. Selamat datang di website resmi SMA Darussalam Simpang Mesir!

Kami berkomitmen mendidik generasi penerus bangsa yang unggul, berakhlak mulia, dan berdaya saing global. Melalui Kurikulum Merdeka, program tahfidz, dan pembinaan prestasi, kami menumbuhkan potensi setiap siswa secara utuh.

Terima kasih atas kepercayaan Bapak/Ibu. Mari bersama membimbing anak-anak kita menuju masa depan yang cerah.`,
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
  },
  visi: "Menjadi sekolah menengah unggulan yang mencetak generasi berakhlak mulia, berprestasi, dan berwawasan global yang siap menghadapi tantangan masa depan.",
  misi: [
    "Menyelenggarakan pembelajaran aktif, kreatif & menyenangkan berbasis Kurikulum Merdeka",
    "Mengembangkan potensi akademik & non-akademik secara seimbang",
    "Menanamkan karakter berakhlak mulia, disiplin, jujur & peduli",
    "Memfasilitasi prestasi hingga level kabupaten, provinsi & nasional",
    "Membangun ekosistem digital & wawasan global siswa",
    "Menjalin kemitraan erat dengan orang tua & masyarakat",
  ],
  stats: [
    { value: "246+", label: "Siswa Aktif" },
    { value: "11", label: "Guru & Tenaga Pendidik" },
    { value: "120+", label: "Prestasi Diraih" },
    { value: "97%", label: "Lulusan Kuliah / Bekerja" },
  ],
};

export const IS_DEMO = false;
