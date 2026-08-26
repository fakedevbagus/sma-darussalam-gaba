# SMA Biru Ceria — Website Sekolah (Production-Ready Demo)

Website profil sekolah **tema biru akademik • playful • friendly • profesional** dengan visual 3D (mesh gradient, glassmorphism, card-3d, floating animation).

Seluruh **menu, halaman, dan fitur** dipindahkan dari `sma-darussalam-mimo-main` (React Router + Convex) ke stack ini (**Next.js 14 App Router**, statis) — **tanpa portal akademik dahulu**.

## Stack

Next.js 14 (App Router) • Tailwind CSS • Framer Motion • Lucide Icons — tanpa database, semua konten statis, siap deploy Vercel/Netlify.

## Struktur Menu (mengikuti Darussalam)

| Menu | Halaman |
|---|---|
| **Beranda** | `/` — Hero 3D, stats, sambutan kepsek, program, why-choose, prestasi, berita+pin, galeri carousel, fasilitas, guru, alumni, testimoni, CTA PPDB, kontak singkat |
| **Profil** | `/profil`, `/profil/visi-misi`, `/profil/sejarah`, `/profil/identitas`, `/profil/kepala-sekolah`, `/guru`, `/fasilitas` |
| **Akademik** | `/program`, `/program/[slug]`, `/prestasi` |
| **Kesiswaan** | `/ekskul`, `/osis`, `/tata-tertib`, `/galeri` (+lightbox), `/alumni` |
| **Informasi** | `/berita` (+search/filter/pin), `/berita/[slug]`, `/pengumuman`, `/pengumuman/[slug]`, `/agenda` (+mini kalender), `/agenda/[slug]`, `/unduhan` |
| **Layanan** | `/ppdb` (4 langkah, kuota per jalur, persyaratan, pilih jalur, formulir lengkap + nomor registrasi, cek status, FAQ), `/faq`, `/kontak` |
| **Portal (nonaktif)** | `/e-raport` — placeholder production-ready, bisa diaktifkan nanti |
| **Legal** | `/kebijakan-privasi`, `/ketentuan-penggunaan`, `/aksesibilitas` |

Redirect backward-compatible: `/tentang/* → /profil/*`, `/akademik/* → /program/*`.

## Data Demo Production

Semua data demo terpusat dan mudah diganti:

- `config/school.ts` — identitas sekolah (nama, NPSN, alamat, telp/WA/email, sosmed, visi, misi, stats, kepala sekolah). **Cukup edit file ini untuk rebranding.**
- `lib/demo-data.ts` — berita/pengumuman, fasilitas, ekskul, prestasi, guru/staf, agenda, galeri, unduhan, FAQ, program, alumni, OSIS, tata tertib.
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
