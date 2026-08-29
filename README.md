# SMA Darussalam — Website Sekolah (Production-Ready)

Website resmi **SMA Darussalam Simpang Mesir** — Gedung Aji Baru, Tulang Bawang, Lampung (NPSN **70000262**, Swasta/Yayasan Darussalam Simpang Mesir). Tema **biru akademik • playful • friendly • profesional** dengan visual 3D (mesh gradient, glassmorphism, card-3d, floating animation).

Data identitas & statistik **tersinkron dengan Dapodik Kemendikdasmen** (dapo.kemendikdasmen.go.id?npsn=70000262): 246 peserta didik, 11 guru & tendik, 7 rombongan belajar, SK pendirian 30 Oktober 2019.

Seluruh **menu, halaman, dan fitur** dipindahkan dari `sma-darussalam-mimo-main` (React Router + Convex) ke stack ini (**Next.js 14 App Router**, statis) — **tanpa portal akademik dahulu**.

## Stack

Next.js 14 (App Router) • Tailwind CSS • Framer Motion • Lucide Icons — tanpa database, semua konten statis, siap deploy Vercel/Netlify.

## Struktur Menu (setara smadarussalam.sch.id)

| Menu | Halaman |
|---|---|
| **Beranda** | `/` — Hero (poster/count-up stats Dapodik), popup PSPDB, sambutan kepsek, jurusan, prestasi, why-choose, video/fallback, berita+pin, galeri, fasilitas, guru, alumni, testimoni, CTA PPDB |
| **Profil** | `/profil`, `/profil/visi-misi`, `/profil/sejarah` (timeline 2019→2026), `/profil/identitas` (data Dapodik lengkap: rekap PD/PTK/rombel, sarana, indikator kualitas), `/guru`, `/fasilitas` |
| **Akademik** | `/jurusan` (MIPA, IPS), `/jurusan/[slug]`, `/program`, `/program/[slug]`, `/prestasi` |
| **Kesiswaan** | `/ekskul`, `/osis`, `/tata-tertib`, `/galeri` (+lightbox), `/kenangan`, `/alumni` |
| **Informasi** | `/berita` (+search/filter/pin), `/berita/[slug]`, `/pengumuman`, `/pengumuman/[slug]`, `/agenda` (+mini kalender), `/agenda/[slug]`, `/unduhan` |
| **Layanan** | `/ppdb` (4 langkah, kuota per jalur, persyaratan, pilih jalur, formulir lengkap + nomor registrasi, cek status, FAQ), `/faq`, `/kontak`, `/cari` (pencarian global) |
| **Portal (nonaktif)** | `/e-raport` — placeholder production-ready, bisa diaktifkan nanti |
| **Legal** | `/kebijakan-privasi`, `/ketentuan-penggunaan`, `/aksesibilitas` |

SEO & PWA: `app/sitemap.xml`, `app/robots.txt`, `app/manifest.webmanifest`, JSON-LD `School` schema di `app/layout.tsx`.

Redirect backward-compatible: `/tentang/* → /profil/*`, `/akademik/* → /program/*`.

## Data Demo Production

Semua data terpusat dan mudah diganti:

- `config/school.ts` — identitas sekolah **real dari Dapodik** (nama, NPSN 70000262, alamat, SK pendirian/izin, kepala sekolah Muzaki Ariffin Affandi, visi, misi, stats) + objek `DAPODIK` (rekap peserta didik, PTK, rombel, sarana, indikator kualitas). Kontak/WA/sosmed masih demo.
- `lib/demo-data.ts` — berita/pengumuman, fasilitas, ekskul, prestasi, guru/staf (11 PTK), agenda, galeri, unduhan, FAQ, program, alumni, OSIS, tata tertib.
- `config/navigation.ts` — struktur menu Navbar/Footer.

Foto memakai placeholder Unsplash/Picsum/pravatar — ganti URL saat data real tersedia.

## Cara Menjalankan

```bash
cd sma-biru-ceria
npm install        # pertama kali
npm run dev        # http://localhost:3000
npm run build      # build production (✓ 27 halaman static)
npm start          # jalankan hasil build
```

## Aktivasi Portal Akademik (nanti)

1. Tambahkan link E-Raport di `config/navigation.ts` (sudah ada contoh commented).
2. Hubungkan backend (Convex/Laravel sesuai dokumen Darussalam: `API_CONTRACTS.md`, `DOMAIN_MODEL.md`) lalu isi `/e-raport` dengan auth + role.

## Fitur Visual

Mesh gradient & blob blur, card 3D hover (`card-3d`), glassmorphism, floating animation, shadow `3d/float/glow/card`, rounded 24–32px, font Plus Jakarta Sans + Inter.

## Status

✅ Build production lolos — semua halaman prerendered static. Data = dummy/demo, siap disesuaikan.
