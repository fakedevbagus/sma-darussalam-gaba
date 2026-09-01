/**
 * SMA DARUSSALAM — School Identity Configuration
 * Data resmi disinkronkan dengan DAPO Kemendikdasmen (NPSN 70000262).
 *
 *  - Yayasan : Yayasan Darussalam Simpang Mesir
 *  - Sekolah : SMA Darussalam
 *  - Alamat  : Desa Simpang Mesir, Kec. Gedung Aji Baru,
 *              Kab. Tulang Bawang, Lampung
 *  - NPSN    : 70000262 (Swasta — Yayasan)
 *  - Kepsek  : Muzaki Ariffin Affandi
 *  - Dapodik : https://dapo.kemendikdasmen.go.id/sekolah?npsn=70000262
 *
 * Panduan ganti data real: lihat PANDUAN-IDENTITAS.md
 */

export type VerificationStatus = "dummy" | "needs_verification" | "verified";

export interface SchoolIdentity {
  yayasan: string;
  name: string;
  shortName: string;
  motto: string;
  tagline: string;
  description: string;
  logoUrl: string;
  faviconUrl: string;
  heroVideoUrl: string;
  heroPosterUrl: string;
  heroImageUrl: string;
  profileVideoUrl: string;
  address: string;
  dusun: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kodePos: string;
  phone: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  hours: string;
  akreditasi: string;
  bentukPendidikan: string;
  statusKepemilikan: string;
  skPendirian: string;
  tanggalSkPendirian: string;
  skIzinOperasional: string;
  tanggalSkIzinOperasional: string;
  founded: number;
  npsn: string;
  mapEmbedUrl: string;
  mapOpenUrl: string;
  psbUrl: string;
  social: {
    instagram: string;
    instagramHandle: string;
    tiktok: string;
    tiktokHandle: string;
    facebook: string;
    youtube: string;
    youtubeHandle: string;
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
  developer: { name: string; role: string };
  copyright: string;
}

export const SCHOOL: SchoolIdentity = {
  yayasan: "Yayasan Darussalam Simpang Mesir",
  name: "SMA Darussalam",
  shortName: "SMA Darussalam",
  motto: "Cerdas • Berkarakter • Berdaya Saing",
  tagline:
    "Membentuk generasi yang cerdas, berkarakter, dan siap menghadapi masa depan.",
  description:
    "Website resmi SMA Darussalam Simpang Mesir, Gedung Aji Baru, Tulang Bawang, Lampung. Sekolah menengah atas swasta di bawah Yayasan Darussalam Simpang Mesir — berkomitmen mencetak generasi cerdas, berkarakter, dan berdaya saing.",
  logoUrl: "/logo.png",
  faviconUrl: "/favicon.png",
  heroVideoUrl: "",
  heroPosterUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop",
  heroImageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop",
  profileVideoUrl: "",
  address: "Desa Simpang Mesir, Kec. Gedung Aji Baru, Kab. Tulang Bawang, Lampung",
  dusun: "Simpang Mesir",
  desa: "Simpang Mesir",
  kecamatan: "Gedung Aji Baru",
  kabupaten: "Tulang Bawang",
  provinsi: "Lampung",
  kodePos: "34596",
  phone: "(+62) xxx-xxxx-xxxx",
  whatsapp: "6281234567890",
  whatsappDisplay: "0812-3456-7890",
  email: "info@smadarussalamsimpangmesir.sch.id",
  hours: "Senin – Jumat, 07.00 – 15.00 WIB",
  akreditasi: "Belum terdata di Dapodik",
  bentukPendidikan: "SMA",
  statusKepemilikan: "Yayasan — Yayasan Darussalam Simpang Mesir",
  skPendirian: "118.4/YSDM/SMA-DS/X/2019",
  tanggalSkPendirian: "30 Oktober 2019",
  skIzinOperasional: "463/1370/V.16/2020",
  tanggalSkIzinOperasional: "10 Februari 2020",
  founded: 2019,
  npsn: "70000262",
  mapEmbedUrl: "https://www.google.com/maps?q=-4.2199,105.5949&z=15&output=embed",
  mapOpenUrl: "https://www.google.com/maps?q=-4.2199,105.5949",
  psbUrl: "/ppdb",
  social: {
    whatsapp: "https://wa.me/6281234567890",
    instagram: "#",
    instagramHandle: "@smadarussalam",
    tiktok: "#",
    tiktokHandle: "@smadarussalam",
    facebook: "#",
    youtube: "#",
    youtubeHandle: "@smadarussalam",
  },
  /* Ganti ke domain .sch.id resmi begitu domain sudah aktif. */
  url: "https://sma-darussalam-glm53.vercel.app",

  principal: {
    name: "Muzaki Ariffin Affandi",
    title: "Kepala SMA Darussalam",
    quote:
      "Pendidikan bukan sekadar transfer ilmu, tetapi pembentukan karakter yang cerdas, berkarakter, dan berdaya saing.",
    sambutan: `Assalamualaikum warahmatullahi wabarakatuh.

Puji syukur ke hadirat Tuhan Yang Maha Esa atas rahmat dan karunia-Nya kepada kita semua.

Selamat datang di website resmi SMA Darussalam Simpang Mesir, Gedung Aji Baru, Tulang Bawang, Lampung. Website ini hadir sebagai media informasi dan komunikasi antara sekolah, siswa, orang tua, dan masyarakat luas.

SMA Darussalam merupakan sekolah menengah atas swasta yang dikelola Yayasan Darussalam Simpang Mesir, berdiri sejak 30 Oktober 2019. Dengan dukungan 11 guru dan tenaga kependidikan profesional, kami membina 246 peserta didik dalam 7 rombongan belajar untuk menjadi generasi yang cerdas, berkarakter, dan berdaya saing.

Kami terus berbenah meningkatkan kualitas pendidikan, fasilitas, dan sumber daya manusia. Semoga melalui website ini, kita dapat saling mengenal, berkomunikasi, dan bekerja sama demi kemajuan pendidikan di SMA Darussalam.

Wassalamualaikum warahmatullahi wabarakatuh.`,
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
  },
  visi: "Terwujudnya peserta didik yang beriman, berkarakter, cerdas, terampil, dan berdaya saing.",
  misi: [
    "Menyelenggarakan pembelajaran yang bermakna, aktif, dan menyenangkan.",
    "Membentuk peserta didik yang beriman, bertakwa, dan berkarakter Pancasila.",
    "Mengembangkan potensi akademik dan non-akademik sesuai minat dan bakat.",
    "Menumbuhkan budaya literasi, gotong royong, dan kepedulian lingkungan.",
  ],
  stats: [
    { value: "246", label: "Peserta Didik" },
    { value: "11", label: "Guru & Tendik" },
    { value: "7", label: "Rombongan Belajar" },
    { value: "2019", label: "Tahun Berdiri" },
  ],
  developer: { name: "Humas SMA Darussalam", role: "Web Developer" },
  copyright: "© 2026 SMA Darussalam Simpang Mesir. All rights reserved.",
};

/* ═══════════════════════════════════════════════════════════════
   DATA POKOK PENDIDIKAN (DAPODIK) — sinkron NPSN 70000262
   Sumber: https://dapo.kemendikdasmen.go.id/sekolah?npsn=70000262
   ═══════════════════════════════════════════════════════════════ */

export const DAPO_URL = "https://dapo.kemendikdasmen.go.id/sekolah?npsn=70000262";

export const DAPODIK = {
  status: "Swasta",
  bentukPendidikan: "SMA",
  kepemilikan: "Yayasan",
  koordinat: { lat: -4.2199, lng: 105.5949 },
  pesertaDidik: { total: 246, lakiLaki: 112, perempuan: 134 },
  rombel: 7,
  ptk: { total: 11, guru: 8, tendik: 3 },
  /** Rekap sarana & prasarana (semester aktif) — kondisi menurut Dapodik */
  sarana: [
    { nama: "Ruang Kelas", jumlah: 8, kondisi: "Sedang" },
    { nama: "Ruang Perpustakaan", jumlah: 1, kondisi: "Sedang" },
    { nama: "Ruang Kepala Sekolah", jumlah: 1, kondisi: "Sedang" },
    { nama: "Laboratorium Komputer", jumlah: 1, kondisi: "Sedang" },
    { nama: "Toilet Siswa", jumlah: 2, kondisi: "Sedang" },
    { nama: "Toilet Guru", jumlah: 2, kondisi: "Sedang" },
  ],
  /** Indikator kualitas Dapodik (%) — skor = rata-rata keseluruhan */
  indikator: {
    skor: 77.49,
    kelengkapan: 91.42,
    validitas: 71.58,
    mutakhir: 71.43,
    rincian: {
      kelengkapan: [
        { label: "Bangunan", value: 100 }, { label: "Tanah", value: 100 },
        { label: "Ruang", value: 84.85 }, { label: "Sekolah", value: 100 },
        { label: "Peserta Didik", value: 65.12 }, { label: "PTK", value: 90 },
        { label: "Rombongan Belajar", value: 100 },
      ],
      validitas: [
        { label: "Bangunan", value: 50 }, { label: "Tanah", value: 80 },
        { label: "Ruang", value: 40 }, { label: "Sekolah", value: 75 },
        { label: "Peserta Didik", value: 75.41 }, { label: "PTK", value: 93.18 },
        { label: "Rombongan Belajar", value: 87.5 },
      ],
      mutakhir: [
        { label: "Bangunan", value: 100 }, { label: "Tanah", value: 100 },
        { label: "Ruang", value: 0 }, { label: "Sekolah", value: 100 },
        { label: "Peserta Didik", value: 0 }, { label: "PTK", value: 100 },
        { label: "Rombongan Belajar", value: 100 },
      ],
    },
  },
};

export const IS_DEMO = false;

/* ═══════════════════════════════════════════════════════════════
   PENJAGA DATA PLACEHOLDER
   Selama nilai kontak masih contoh, elemen terkait disembunyikan.
   Begitu diisi data asli, elemen muncul kembali otomatis.
   ═══════════════════════════════════════════════════════════════ */

/** Nomor WhatsApp contoh yang masih terpasang di config. */
export const PLACEHOLDER_WHATSAPP = "6281234567890";

/** true = nomor WhatsApp sudah diganti data asli. */
export const WHATSAPP_READY = SCHOOL.whatsapp !== PLACEHOLDER_WHATSAPP;

/** true = tautan sosial media sudah diisi (bukan "#" atau kosong). */
export function isLiveLink(href?: string) {
  const s = (href ?? "").trim();
  return s !== "" && s !== "#";
}


