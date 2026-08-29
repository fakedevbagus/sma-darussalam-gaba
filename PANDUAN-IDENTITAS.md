# 📋 PANDUAN IDENTITAS & MEDIA — Ganti Demo ke Data Real

Semua identitas sekolah & media **terpusat** agar mudah diganti. Ikuti panduan ini saat data real tersedia.

---

## 1. 🏫 Identitas Sekolah (SATU FILE UTAMA)

**File:** `config/school.ts`

| Field | Isi Saat Ini | Status |
|---|---|---|
| `yayasan` | Yayasan Darussalam Simpang Mesir | ✅ Real (Dapodik: kepemilikan Yayasan) |
| `name` | SMA Darussalam | ✅ Real |
| `motto` | Cerdas • Berkarakter • Berdaya Saing | ⚠️ Placeholder — ganti moto resmi |
| `tagline` | Membentuk generasi cerdas... | ⚠️ Placeholder |
| `address` | Desa Simpang Mesir, Kec. Gedung Aji Baru, Kab. Tulang Bawang, Lampung | ✅ Real (koordinat Dapodik -4.2199, 105.5949) |
| `phone` / `whatsapp` / `whatsappDisplay` | Demo `0812-3456-7890` | ❌ Demo — ganti nomor resmi (WA format `62xxx` tanpa `+`) |
| `email` | info@smadarussalamsimpangmesir.sch.id | ⚠️ Belum terverifikasi |
| `akreditasi` | "Belum terdata di Dapodik" | ❌ Ganti setelah ada sertifikat BAN-SM |
| `npsn` | 70000262 | ✅ Real Dapodik |
| `status` / `bentukPendidikan` | Swasta / SMA | ✅ Real Dapodik |
| `skPendirian` / tanggal | 118.4/YSDM/SMA-DS/X/2019 — 30 Oktober 2019 | ✅ Real Dapodik |
| `skIzinOperasional` / tanggal | 463/1370/V.16/2020 — 10 Februari 2020 | ✅ Real Dapodik |
| `principal.name` | Muzaki Ariffin Affandi | ✅ Real Dapodik (foto masih placeholder) |
| `stats` / `DAPODIK` | 246 PD (112 L / 134 P), 11 PTK (8 guru, 3 tendik), 7 rombel, sarana & indikator kualitas | ✅ Real Dapodik |
| `mapEmbedUrl` / `mapOpenUrl` | Koordinat -4.2199, 105.5949 | ✅ Real Dapodik |
| `visi` / `misi[]` | Placeholder netral | ❌ Ganti dokumen visi-misi resmi |
| `social.*` | Instagram/TikTok/FB/YouTube = `#` | ❌ Ganti akun resmi |

> ⚠️ `IS_DEMO = true` — set `false` setelah semua data terverifikasi (dipakai penanda di UI bila diperlukan).

---

## 2. 🖼️ Logo & Favicon

| Aset | Lokasi | Catatan |
|---|---|---|
| Logo utama | `public/logo.png` | **Sudah dipotong** (background putih dihapus, ukuran 571×585). Ganti dengan PNG transparan resolusi ≥ 512px |
| Favicon | `public/favicon.png` | Dibuat otomatis dari logo (64×64). Ganti jika punya versi resmi |

**Cara potong background putih sendiri** (jika logo baru):
```bash
python3 - << 'EOF'
from PIL import Image, ImageFilter
img = Image.open("logo-baru.jpg").convert("RGBA")
img.putdata([(r,g,b,0) if r>238 and g>238 and b>238 else (r,g,b,255) for r,g,b,a in img.getdata()])
img.putalpha(img.split()[3].filter(ImageFilter.MinFilter(3)))
img.crop(img.getbbox()).save("public/logo.png")
img.resize((64,64), Image.LANCZOS).save("public/favicon.png")
EOF
```

---

## 3. 🎬 Video

| Field | Dipakai Di | Ganti Dengan |
|---|---|---|
| `heroVideoUrl` | Background video hero (autoplay) | Video suasana sekolah `.mp4` — upload ke hosting video/CDN (Pexels, Cloudflare Stream, YouTube → konversi) lalu tempel URL `.mp4` |
| `heroPosterUrl` | Poster sebelum video termuat | Screenshot/frame video (1600px) |
| `profileVideoUrl` | Section "Video Profil" di beranda | Embed YouTube: `https://www.youtube.com/embed/XXXXX` |

> Video hero harus **mp4/webm langsung** (bukan link YouTube). Jika video gagal dimuat, poster otomatis tampil.

---

## 4. 📸 Foto-Foto (semua masih placeholder)

Semua URL foto ada di **`lib/demo-data.ts`** — cari `images.unsplash.com` / `picsum.photos` / `i.pravatar.cc`:

| Data | Field yang Diganti |
|---|---|
| Berita & Pengumuman | `ANNOUNCEMENTS[].coverUrl` |
| Galeri & Kenangan | `GALLERY[].imageUrl` (+ `videoUrl` untuk video YouTube embed) |
| Fasilitas (kartu bergambar) | `FACILITIES[].image` (rasio 640×360) |
| Ekstrakurikuler (kartu bergambar) | `EXTRACURRICULARS[].image` (rasio 640×360) |
| Prestasi (kartu bergambar) | `ACHIEVEMENT_IMAGES` (rasio 640×420) |
| Guru & Staf | `STAFF[].photoUrl` (rasio 4:5 potret, min 480px) |
| Alumni | `ALUMNI[].photoUrl` |
| Jurusan | `JURUSAN[].image` |
| Fasilitas beranda | `FASILITAS_FOTO` di `app/page.tsx` |
| Header tiap halaman | prop `img=` pada `<PageHeader>` tiap `app/**/page.tsx` |

> 💡 Upload foto real ke folder `public/foto/...` lalu pakai path `/foto/nama.jpg` — lebih cepat & tidak bergantung pihak ketiga.

---

## 5. 🔗 Sosial Media (ikon warna asli brand)

**File:** `config/school.ts` → `social`
```
instagram: "https://instagram.com/akun_sekolah"
tiktok:    "https://tiktok.com/@akun_sekolah"
facebook:  "https://facebook.com/halaman_sekolah"
youtube:   "https://youtube.com/@channel_sekolah"
whatsapp:  "https://wa.me/628xxxxxxxxxx"
```
Warna ikon otomatis mengikuti brand (FB biru, IG pink, YT merah, TikTok hitam, WA hijau) — diatur di `components/BrandIcons.tsx` (SVG path resmi masing-masing platform). Jika perlu ganti warna brand, edit konstanta warna di sana.

### Ikon Sosmed Lain
`components/SocialLinks.tsx` — wrapper yang memilih ikon berdasarkan URL. Tambah akun baru → tambahkan entry di `social` (school.ts) + (jika perlu) path SVG di `BrandIcons.tsx`.

---

## 6. 📝 Konten Lain (semua di `lib/demo-data.ts`)

- `ANNOUNCEMENTS` — berita & pengumuman (judul, isi, penulis, tanggal)
- `FACILITIES` / `EXTRACURRICULARS` — fasilitas & ekskul
- `ACHIEVEMENTS` — prestasi
- `PROGRAMS` — program unggulan
- `JURUSAN` — jurusan (mapel & karier)
- `EVENTS` — agenda (tanggal otomatis relatif; ganti tanggal statis saat real)
- `DOWNLOADS` — dokumen: isi `url: "/file/nama.pdf"` setelah upload ke `public/file/`
- `FAQS` / `TATA_TERTIB` / `OSIS_DATA` / `TESTIMONI`
- `HERO_SLOGANS` — kata yang berganti-ganti di hero

### Statistik Pengunjung (footer)
Dihitung otomatis oleh `components/VisitorStats.tsx` (client): angka hari ini di-seed per tanggal, total bertambah tiap hari + kunjungan pengunjung (localStorage), "Sedang Online" berfluktuasi realistis. Untuk data real dari server, ganti isi `compute()` dengan fetch API hitungan pengunjung Anda.

### Ticker Info Berita
`components/NewsTicker.tsx` — tampil di dalam header fixed (hanya beranda) mengambil 4 pengumuman terbaru dari `ANNOUNCEMENTS`. Konten otomatis ikut berubah saat data berita diganti.

---

## 7. 🎨 Warna & Font

| Elemen | File | Nilai Sekarang |
|---|---|---|
| Palet biru terang | `tailwind.config.ts` → `primary` | 500 `#3392fb`, 600 `#1f74ef` |
| Navy (lebih terang) | `tailwind.config.ts` → `navy` | `#173a6b` |
| Aksen | `accent` cyan `#22c8e6`, `sun` `#ffb020`, `mint` `#2fd48c` | — |
| Font display | Fredoka | ganti di `tailwind.config.ts` + import di `app/globals.css` |
| Font body | Nunito | sama seperti atas |

---

## 8. 🧭 Menu & Navigasi

**File:** `config/navigation.ts` — struktur menu (Profil Kami, Program Jurusan, Lainnya), tautan cepat footer, `WA_LINK`, `DAFTAR_LINK`.

---

## ✅ Checklist Go-Live

- [ ] Ganti semua field `config/school.ts`
- [ ] Logo & favicon real di `public/`
- [ ] Video hero + video profil real
- [ ] Semua foto placeholder diganti (cari `unsplash|picsum|pravatar`)
- [ ] Sosmed + nomor WA real
- [ ] `npm run build` sukses → deploy (Vercel/Netlify/hosting sendiri)

---

## 🛠️ Maintenance Notes

- **Statistik Pengunjung** (`components/VisitorStats.tsx`): client-side, deterministic per-hari + localStorage. Untuk hitungan real dari server, ganti `compute()` dengan `fetch('/api/stats')`.
- **Ticker Beranda** (`components/NewsTicker.tsx`): ambil 4 pengumuman terbaru dari `ANNOUNCEMENTS` di `lib/demo-data.ts`. Otomatis terupdate saat data diganti.
- **Marquee Galeri/Guru** (`components/Marquee.tsx`): durasi animasi 75s (galeri) / 80s (guru) — pause saat hover. Edit di class `animate-[marquee_75s_linear_infinite]`.
- **Ikon Brand**: SVG path resmi di `components/BrandIcons.tsx`. Lisensi: gunakan ikon Simple Icons (CC0) atau buat sendiri sesuai pedoman brand platform.
- **Portal Akademik (E-Raport)**: sementara `/e-raport` adalah placeholder. Aktivasi: tambah menu di `config/navigation.ts`, buat auth + role + backend API sesuai `API_CONTRACTS.md` (dokumen terpisah dari `sma-darussalam-mimo-main`).
- **SEO per-halaman**: edit `export const metadata` di tiap `app/**/page.tsx` (judul, deskripsi, OG image).

---

## ⚠️ Catatan Lisensi Aset

- Foto placeholder saat ini menggunakan **Unsplash** (bebas komersial) dan **Picsum** (bebas).
- Logo & favicon saat ini adalah aset **milik SMA Darussalam** — **jangan diganti** kecuali Anda punya logo resmi baru beresolusi tinggi.
- Ikon sosmed (`BrandIcons.tsx`) implementasi ulang SVG — bebas digunakan kembali.

