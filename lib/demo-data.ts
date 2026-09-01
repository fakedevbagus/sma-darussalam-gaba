/**
 * Demo data production-ready — disajikan sebagai static data (tanpa database).
 * Semua foto, nama, alamat demo — mudah diganti via file ini.
 */

function iso(daysAgo: number) {
  const d = new Date(); d.setDate(d.getDate() - daysAgo); return d.toISOString();
}
function isoFuture(daysFromNow: number) {
  const d = new Date(); d.setDate(d.getDate() + daysFromNow); return d.toISOString();
}

export const ANNOUNCEMENTS = [
  {
    id: "ann-001", slug: "ppdb-2026-2027-dibuka", category: "pengumuman" as const,
    title: "PPDB Tahun Ajaran 2026/2027 Resmi Dibuka — Gelombang 1",
    coverUrl: "https://picsum.photos/seed/sbc-ppdb/900/500",
    content: "SMA Darussalam membuka PPDB TA 2026/2027. Pendaftaran daring via portal. Jalur: Zonasi, Afirmasi, Prestasi, Perpindahan Tugas Orang Tua.\n\nJadwal:\n• Pendaftaran: 1–30 Sep 2026\n• Verifikasi: 1–7 Okt 2026\n• Pengumuman: 10 Okt 2026\n• Daftar ulang: 11–18 Okt 2026",
    authorName: "Panitia PPDB", pinned: true, createdAt: iso(1),
  },
  {
    id: "ann-002", slug: "siswa-raih-emas-osn-matematika", category: "berita" as const,
    title: "Siswa SMA Darussalam Raih Medali Emas OSN Matematika 2025",
    coverUrl: "https://picsum.photos/seed/sbc-osn/900/500",
    content: "Muhammad Rizky Pratama (XII MIPA 1) meraih emas OSN Matematika di Jakarta. Pembinaan intensif tim olimpiade + lab modern.",
    authorName: "Humas", pinned: false, createdAt: iso(4),
  },
  {
    id: "ann-003", slug: "jadwal-pas-genap-2025-2026", category: "pengumuman" as const,
    title: "Jadwal Penilaian Akhir Semester Genap 2025/2026",
    coverUrl: "https://picsum.photos/seed/sbc-pas/900/500",
    content: "PAS Genap: 25 Mei – 6 Juni 2026, 07.30–12.00 WIB di ruang kelas masing-masing. Bawa kartu peserta & alat tulis.",
    authorName: "Wakasek Kurikulum", pinned: false, createdAt: iso(6),
  },
  {
    id: "ann-004", slug: "tim-robotik-juara-kri", category: "berita" as const,
    title: "Tim Robotik Juara Umum Kontes Robot Indonesia Regional",
    coverUrl: "https://picsum.photos/seed/sbc-robot/900/500",
    content: "Tim robotik 5 siswa X-XI tampilkan robot line-follower AI sederhana dan sabet juara umum KRI regional Bandung.",
    authorName: "Humas", pinned: false, createdAt: iso(9),
  },
  {
    id: "ann-005", slug: "gelar-karya-bazar-2026", category: "berita" as const,
    title: "Gelar Karya & Bazar Kewirausahaan 2026: Pentas Seni Nusantara",
    coverUrl: "https://picsum.photos/seed/sbc-bazar/900/500",
    content: "Gelar karya P5 se-jenjang, pentas seni, bazar kuliner & pameran kewirausahaan — halaman utama sekolah.",
    authorName: "OSIS", pinned: false, createdAt: iso(12),
  },
  {
    id: "ann-006", slug: "pembagian-rapor-genap-2026", category: "pengumuman" as const,
    title: "Pembagian Rapor Semester Genap & Pertemuan Orang Tua",
    coverUrl: "https://picsum.photos/seed/sbc-rapor/900/500",
    content: "Pembagian rapor 14 Juni 2026, 08.00–12.00 WIB + pertemuan wali kelas & orang tua.",
    authorName: "Wakasek Kesiswaan", pinned: false, createdAt: iso(15),
  },
];

export const FACILITIES = [
  { id: "fac-01", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=640&auto=format&fit=crop", name: "Perpustakaan Digital", description: "12.000+ buku cetak + e-book & jurnal digital. Ruang baca nyaman ber-AC.", category: "Akademik", icon: "book" },
  { id: "fac-02", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=640&auto=format&fit=crop", name: "Lab IPA Terpadu", description: "Fisika, Kimia, Biologi modern untuk praktikum & riset.", category: "Akademik", icon: "flask" },
  { id: "fac-03", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=640&auto=format&fit=crop", name: "Lab Komputer & Robotik", description: "60 PC + 3D printing + bengkel robotik untuk Informatika & ekskul.", category: "Teknologi", icon: "cpu" },
  { id: "fac-04", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=640&auto=format&fit=crop", name: "Studio Musik & Seni", description: "Akustik, alat musik lengkap & ruang seni rupa.", category: "Seni", icon: "music" },
  { id: "fac-05", image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=640&auto=format&fit=crop", name: "Masjid & Ruang Ibadah", description: "Masjid 2 lantai — pusat pembinaan karakter religius.", category: "Religi", icon: "moon" },
  { id: "fac-06", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=640&auto=format&fit=crop", name: "Aula Serbaguna", description: "Kapasitas 800 orang — seminar, pentas & wisuda.", category: "Umum", icon: "building" },
  { id: "fac-07", image: "https://images.unsplash.com/photo-1574629810360-214f3774381b?q=80&w=640&auto=format&fit=crop", name: "Lapangan Olahraga", description: "Basket, futsal, voli standar + trek lari.", category: "Olahraga", icon: "volleyball" },
  { id: "fac-08", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=640&auto=format&fit=crop", name: "Kantin Sehat", description: "Makanan bergizi, halal, higienis & terjangkau.", category: "Umum", icon: "utensils" },
  { id: "fac-09", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=640&auto=format&fit=crop", name: "UKS", description: "Tenaga medis + P3K + layanan kesehatan berkala.", category: "Kesehatan", icon: "heart" },
  { id: "fac-10", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=640&auto=format&fit=crop", name: "Green House Edukasi", description: "Kebun edukasi & urban farming untuk Biologi & lingkungan.", category: "Lingkungan", icon: "tree" },
];

export const EXTRACURRICULARS = [
  { id: "ek-01", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=640&auto=format&fit=crop", name: "Pramuka", description: "Kepramukaan, kedisiplinan & kepemimpinan + bakti sosial.", schedule: "Jumat, 14.00–16.00", coach: "Kak Rina Amalia, S.Pd.", category: "Kepemimpinan", icon: "tree" },
  { id: "ek-02", image: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?q=80&w=640&auto=format&fit=crop", name: "Paskibra", description: "Baris-berbaris & pengibaran bendera upacara & HUT RI.", schedule: "Kamis, 15.30–17.30", coach: "Kapten Bambang S.", category: "Kepemimpinan", icon: "flag" },
  { id: "ek-03", image: "https://images.unsplash.com/photo-1574629810360-214f3774381b?q=80&w=640&auto=format&fit=crop", name: "Futsal", description: "Teknik, taktik & sportivitas — juara kota 2025.", schedule: "Selasa & Kamis 15.30–17.00", coach: "Andi Firmansyah, S.Or.", category: "Olahraga", icon: "volleyball" },
  { id: "ek-04", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=640&auto=format&fit=crop", name: "Basket", description: "Putra & putri — rutin kejuaraan antar-sekolah.", schedule: "Senin & Rabu 15.30–17.00", coach: "Dewi Lestari, S.Pd.", category: "Olahraga", icon: "dumbbell" },
  { id: "ek-05", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=640&auto=format&fit=crop", name: "Paduan Suara", description: "Tampil acara resmi & festival musik daerah.", schedule: "Rabu 15.30–17.30", coach: "Yusuf Hidayat, S.Sn.", category: "Seni", icon: "mic" },
  { id: "ek-06", image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=640&auto=format&fit=crop", name: "Tari Tradisional", description: "Tari nusantara dari dasar hingga mahir.", schedule: "Jumat 15.30–17.30", coach: "Sri Wahyuni, S.Sn.", category: "Seni", icon: "music" },
  { id: "ek-07", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=640&auto=format&fit=crop", name: "Robotik", description: "Rakit & program robot untuk kompetisi & inovasi.", schedule: "Sabtu 08.00–11.00", coach: "Denny Kurniawan, S.T.", category: "Teknologi", icon: "cpu" },
  { id: "ek-08", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=640&auto=format&fit=crop", name: "KIR", description: "Riset & karya ilmiah untuk OSN & publikasi.", schedule: "Sabtu 08.00–11.00", coach: "Dr. Fitri Handayani, M.Si.", category: "Akademik", icon: "microscope" },
  { id: "ek-09", image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=640&auto=format&fit=crop", name: "Jurnalistik & Fotografi", description: "Tulis berita, foto & kelola medsos sekolah.", schedule: "Kamis 15.30–17.00", coach: "Rendra Wicaksono, M.I.Kom.", category: "Komunikasi", icon: "camera" },
  { id: "ek-10", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=640&auto=format&fit=crop", name: "Pecinta Alam", description: "Alam terbuka, konservasi & survival SAR.", schedule: "Minggu (agenda)", coach: "Hadi Susanto, S.Pd.", category: "Lingkungan", icon: "mountain" },
];

export const ACHIEVEMENTS = [
  { id: "ach-01", title: "Medali Emas OSN Matematika 2025", description: "Rizky Pratama XII MIPA 1 — OSN Jakarta.", category: "Akademik", year: "2025", rank: "Juara 1" },
  { id: "ach-02", title: "Juara Umum Futsal Se-Kota", description: "Tim futsal putra — 32 sekolah.", category: "Olahraga", year: "2025", rank: "Juara 1" },
  { id: "ach-03", title: "Best Innovation KRI Regional", description: "Tim robotik — KRI Bandung.", category: "Teknologi", year: "2025", rank: "Juara 1" },
  { id: "ach-04", title: "Juara 2 Paduan Suara Nasional", description: "Festival remaja tingkat nasional.", category: "Seni", year: "2024", rank: "Juara 2" },
  { id: "ach-05", title: "Finalis Debat Bahasa Inggris Provinsi", description: "Tim debat — final provinsi.", category: "Akademik", year: "2024", rank: "Finalis" },
  { id: "ach-06", title: "Paskibraka Kota HUT RI", description: "2 siswa terpilih Paskibraka Kota.", category: "Kepemimpinan", year: "2024", rank: "Terpilih" },
];

export const STAFF = [
  { id: "stf-01", name: "Muzaki Ariffin Affandi, S.Pd.", position: "Kepala Sekolah", subject: "Manajemen Pendidikan", bio: "Memimpin SMA Darussalam dengan visi cerdas, berkarakter, dan berdaya saing.", photoUrl: "https://i.pravatar.cc/300?img=15" },
  { id: "stf-02", name: "Fitri Handayani, S.Pd.", position: "Guru", subject: "Biologi", bio: "Pengembangan kurikulum & pembinaan akademik.", photoUrl: "https://i.pravatar.cc/300?img=26" },
  { id: "stf-03", name: "Bambang Sutrisno, S.Pd.", position: "Guru", subject: "Sejarah", bio: "Pembinaan karakter & organisasi siswa.", photoUrl: "https://i.pravatar.cc/300?img=33" },
  { id: "stf-04", name: "Ratna Wulandari, S.Pd.", position: "Guru", subject: "Matematika", bio: "Pembina OSN Matematika & pengembangan numerasi.", photoUrl: "https://i.pravatar.cc/300?img=29" },
  { id: "stf-05", name: "Budi Santoso, S.Pd.", position: "Guru", subject: "Fisika", bio: "Praktikum IPA & pembinaan kompetisi sains.", photoUrl: "https://i.pravatar.cc/300?img=12" },
  { id: "stf-06", name: "Sari Dewi, S.Pd.", position: "Guru", subject: "Bahasa Inggris", bio: "Literasi bahasa & English Club.", photoUrl: "https://i.pravatar.cc/300?img=5" },
  { id: "stf-07", name: "Denny Kurniawan, S.Kom.", position: "Guru", subject: "Informatika", bio: "Lab komputer & literasi digital.", photoUrl: "https://i.pravatar.cc/300?img=8" },
  { id: "stf-08", name: "Andi Firmansyah, S.Or.", position: "Guru", subject: "PJOK", bio: "Pembinaan olahraga & prestasi atlet pelajar.", photoUrl: "https://i.pravatar.cc/300?img=18" },
  { id: "stf-09", name: "Kholil Fawaid, S.Sos.I.", position: "Kepala Tata Usaha", subject: "Tendik", bio: "Administrasi & tata usaha sekolah.", photoUrl: "https://i.pravatar.cc/300?img=53" },
  { id: "stf-10", name: "Hasib Fawaid, S.Kom.", position: "Tenaga Teknis", subject: "Tendik", bio: "Sistem informasi & dukungan teknis sekolah.", photoUrl: "https://i.pravatar.cc/300?img=59" },
  { id: "stf-11", name: "Riza Ainur Rofiq, S.Kom.", position: "Tenaga Teknis", subject: "Tendik", bio: "Dapodik, perpustakaan & dukungan laboratorium.", photoUrl: "https://i.pravatar.cc/300?img=68" },
];

export const EVENTS = [
  { id: "evt-01", title: "Upacara Bendera & Apel Pagi", slug: "upacara-bendera", description: "Upacara rutin Senin pagi seluruh warga sekolah.", startDate: isoFuture(2), endDate: isoFuture(2), location: "Lapangan Utama", category: "Rutin" },
  { id: "evt-02", title: "Sosialisasi PPDB 2026/2027", slug: "sosialisasi-ppdb", description: "Tata cara & jalur PPDB untuk calon siswa & orang tua.", startDate: isoFuture(5), endDate: isoFuture(5), location: "Aula Serbaguna", category: "PPDB" },
  { id: "evt-03", title: "Lomba Robotik & Science Fair", slug: "lomba-robotik", description: "Pekan sains — robotik, KIR & pameran inovasi.", startDate: isoFuture(12), endDate: isoFuture(14), location: "Lab Komputer & Lapangan", category: "Perlombaan" },
  { id: "evt-04", title: "Gelar Karya P5 & Bazar", slug: "gelar-karya-p5", description: "Pentas seni, produk kewirausahaan & kuliner nusantara.", startDate: isoFuture(20), endDate: isoFuture(20), location: "Halaman Utama", category: "Acara Sekolah" },
  { id: "evt-05", title: "PAS Ganjil 2026/2027", slug: "pas-ganjil", description: "Penilaian Akhir Semester Ganjil semua jenjang.", startDate: isoFuture(34), endDate: isoFuture(45), location: "Ruang Kelas", category: "Akademik" },
  { id: "evt-06", title: "Pembagian Rapor", slug: "pembagian-rapor", description: "Rapor ganjil + pertemuan wali & orang tua.", startDate: isoFuture(50), endDate: isoFuture(50), location: "Ruang Kelas", category: "Rutin" },
];

export const GALLERY = [
  { id: "gal-01", title: "Upacara Bendera", caption: "Khidmat di lapangan utama.", category: "Kegiatan", imageUrl: "https://picsum.photos/seed/sbc-upacara/900/650", photos: ["https://picsum.photos/seed/sbc-upacara/900/650", "https://picsum.photos/seed/sbc-upacara2/900/650", "https://picsum.photos/seed/sbc-upacara3/900/650"], videoUrl: "" },
  { id: "gal-02", title: "Latihan Paskibra", caption: "Menjelang HUT RI 81.", category: "Ekstrakurikuler", imageUrl: "https://picsum.photos/seed/sbc-paskibra/900/650", photos: ["https://picsum.photos/seed/sbc-paskibra/900/650", "https://picsum.photos/seed/sbc-paskibra2/900/650", "https://picsum.photos/seed/sbc-paskibra3/900/650"], videoUrl: "" },
  { id: "gal-03", title: "Pentas Seni Gelar Karya", caption: "Tari tradisional XI.", category: "Acara", imageUrl: "https://picsum.photos/seed/sbc-pentas/900/650", photos: ["https://picsum.photos/seed/sbc-pentas/900/650", "https://picsum.photos/seed/sbc-pentas2/900/650", "https://picsum.photos/seed/sbc-pentas3/900/650", "https://picsum.photos/seed/sbc-pentas4/900/650"], videoUrl: "" },
  { id: "gal-04", title: "Bazar Kewirausahaan", caption: "Produk P5 siswa.", category: "Acara", imageUrl: "https://picsum.photos/seed/sbc-bazar/900/650", photos: ["https://picsum.photos/seed/sbc-bazar/900/650", "https://picsum.photos/seed/sbc-bazar2/900/650", "https://picsum.photos/seed/sbc-bazar3/900/650"], videoUrl: "" },
  { id: "gal-05", title: "OSN Matematika", caption: "Finalis & pembimbing.", category: "Prestasi", imageUrl: "https://picsum.photos/seed/sbc-osn2/900/650", photos: ["https://picsum.photos/seed/sbc-osn2/900/650", "https://picsum.photos/seed/sbc-osn2b/900/650", "https://picsum.photos/seed/sbc-osn2c/900/650"], videoUrl: "" },
  { id: "gal-06", title: "Kunjungan Edukasi", caption: "Kelas X ke pusat sains.", category: "Kegiatan", imageUrl: "https://picsum.photos/seed/sbc-kunjungan/900/650", photos: ["https://picsum.photos/seed/sbc-kunjungan/900/650", "https://picsum.photos/seed/sbc-kunjungan2/900/650", "https://picsum.photos/seed/sbc-kunjungan3/900/650", "https://picsum.photos/seed/sbc-kunjungan4/900/650"], videoUrl: "" },
  { id: "gal-07", title: "Jumat Bersih", caption: "Gotong royong lingkungan.", category: "Kegiatan", imageUrl: "https://picsum.photos/seed/sbc-bersih/900/650", photos: ["https://picsum.photos/seed/sbc-bersih/900/650", "https://picsum.photos/seed/sbc-bersih2/900/650", "https://picsum.photos/seed/sbc-bersih3/900/650"], videoUrl: "" },
  { id: "gal-08", title: "Perkemahan Pramuka", caption: "Persami bumi perkemahan.", category: "Ekstrakurikuler", imageUrl: "https://picsum.photos/seed/sbc-pramuka/900/650", photos: ["https://picsum.photos/seed/sbc-pramuka/900/650", "https://picsum.photos/seed/sbc-pramuka2/900/650", "https://picsum.photos/seed/sbc-pramuka3/900/650", "https://picsum.photos/seed/sbc-pramuka4/900/650"], videoUrl: "" },
  { id: "gal-09", title: "Video: Sambutan Kepsek", caption: "Pembukaan TA baru.", category: "Video", imageUrl: "https://picsum.photos/seed/sbc-vid1/900/500", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: "gal-10", title: "Video: Tour Virtual", caption: "Jelajahi fasilitas.", category: "Video", imageUrl: "https://picsum.photos/seed/sbc-vid2/900/500", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: "gal-11", title: "Video: Basket Final", caption: "Final antar-kelas.", category: "Video", imageUrl: "https://picsum.photos/seed/sbc-vid3/900/500", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: "gal-12", title: "Video: Festival Seni", caption: "Pentas tahunan.", category: "Video", imageUrl: "https://picsum.photos/seed/sbc-vid4/900/500", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
];

export const DOWNLOADS = [
  { id: "dl-01", name: "Panduan PPDB 2026/2027", category: "PPDB", fileType: "PDF", fileSize: "2.4 MB", updatedAt: iso(5) },
  { id: "dl-02", name: "Formulir PPDB", category: "PPDB", fileType: "PDF", fileSize: "1.1 MB", updatedAt: iso(5) },
  { id: "dl-03", name: "Jadwal Pelajaran Genap", category: "Akademik", fileType: "PDF", fileSize: "890 KB", updatedAt: iso(30) },
  { id: "dl-04", name: "Kalender Akademik 2025/2026", category: "Akademik", fileType: "PDF", fileSize: "1.5 MB", updatedAt: iso(60) },
  { id: "dl-05", name: "Struktur Organisasi", category: "Umum", fileType: "PDF", fileSize: "520 KB", updatedAt: iso(90) },
];

export const FAQS = [
  { id: "faq-01", question: "Bagaimana cara daftar PPDB online?", answer: "Via halaman PPDB — isi form, unggah berkas, tunggu verifikasi panitia. Semua daring.", category: "PPDB" },
  { id: "faq-02", question: "Jalur apa saja tersedia?", answer: "Zonasi, Afirmasi, Prestasi, Perpindahan Tugas Orang Tua — masing-masing ada kuota.", category: "PPDB" },
  { id: "faq-03", question: "Cara cek status pendaftaran?", answer: "Di halaman PPDB → Cek Status → masukkan nomor registrasi.", category: "PPDB" },
  { id: "faq-04", question: "Apakah menerima luar kota?", answer: "Ya, via jalur Prestasi & Perpindahan Tugas Orang Tua.", category: "Umum" },
  { id: "faq-05", question: "Bagaimana akses portal siswa?", answer: "Portal akademik (E-Raport) akan diaktifkan setelah daftar ulang — saat ini showroom / demo mode.", category: "Portal" },
  { id: "faq-06", question: "Apakah ada beasiswa?", answer: "Ada beasiswa prestasi & ekonomi — info di Profil & PPDB.", category: "Akademik" },
  { id: "faq-07", question: "Jam sekolah?", answer: "07.00–16.00 WIB, ekstrakurikuler sampai 17.30 WIB.", category: "Umum" },
];

export const PROGRAMS = [
  { slug: "kurikulum-merdeka", name: "Kurikulum Merdeka", description: "Kurikulum nasional + P5 — proyek nyata & profil pelajar Pancasila.", category: "Akademik", icon: "Brain", featured: true, subjects: ["Matematika","IPA","IPS"], activities: ["Proyek P5","Literasi"] },
  { slug: "olimpiade-sains", name: "Olimpiade Sains", description: "Bina OSN intensif oleh guru berpengalaman + lab riset.", category: "Akademik", icon: "Trophy", featured: true, subjects: ["Matematika","Fisika","Kimia","Biologi"], activities: ["Tryout","Karentina"] },
  { slug: "teknologi-robotik", name: "Teknologi & Robotik", description: "60 PC, 3D printing, robotik — informatika & kompetisi.", category: "STEM", icon: "Cpu", featured: false, subjects: ["Informatika","Fisika"], activities: ["Robotik","Coding"] },
  { slug: "pembinaan-karakter", name: "Pembinaan Karakter", description: "Keagamaan, bakti sosial & leadership — akhlak mulia.", category: "Karakter", icon: "Heart", featured: false, subjects: ["PAI"], activities: ["Tahfiz","Baksos"] },
  { slug: "bahasa-global", name: "Bahasa & Global", description: "English aktif — debat & exchange.", category: "Bahasa", icon: "Globe", featured: false, subjects: ["Bahasa Inggris"], activities: ["Debat","Exchange"] },
  { slug: "kewirausahaan", name: "Kewirausahaan", description: "Jiwa usaha via P5 & bazar.", category: "Seni", icon: "Lightbulb", featured: false, subjects: ["Ekonomi"], activities: ["Bazar"] },
];

export const ALUMNI = [
  { id: "a-01", name: "Ahmad Fadillah", graduationYear: 2023, university: "Universitas Lampung", major: "Kedokteran", quote: "Fondasi karakter & semangat belajar dari SMA Darussalam jadi bekal terbaik.", currentStatus: "Mahasiswa Kedokteran", photoUrl: "https://i.pravatar.cc/300?img=22" },
  { id: "a-02", name: "Siti Nurhaliza", graduationYear: 2023, university: "Universitas Lampung", major: "Teknik Informatika", quote: "Guru SMA Darussalam menginspirasi kecintaan pada sains sejak dini.", currentStatus: "Mahasiswa Informatika", photoUrl: "https://i.pravatar.cc/300?img=32" },
  { id: "a-03", name: "Rizky Pratama", graduationYear: 2024, university: "UM Metro", major: "Ekonomi", quote: "OSIS & kegiatan sekolah membentuk kepemimpinan & mental.", currentStatus: "Mahasiswa Ekonomi", photoUrl: "https://i.pravatar.cc/300?img=11" },
  { id: "a-04", name: "Dewi Anggraini", graduationYear: 2024, university: "Universitas Malahayati", major: "Hukum", quote: "Lingkungan belajar yang mendukung buka pintu prestasi.", currentStatus: "Mahasiswa Hukum", photoUrl: "https://i.pravatar.cc/300?img=9" },
  { id: "a-05", name: "Andi Prasetyo", graduationYear: 2022, university: "Politeknik Negeri Lampung", major: "Teknik Mesin", quote: "Lab komputer SMA Darussalam awal petualangan teknologi saya.", currentStatus: "Mahasiswa Polinela", photoUrl: "https://i.pravatar.cc/300?img=19" },
  { id: "a-06", name: "Maya Sari", graduationYear: 2025, university: "Universitas Lampung", major: "Keguruan & Ilmu Pendidikan", quote: "Disiplin & kepedulian di SMA Darussalam siap hadapi dunia kerja.", currentStatus: "Mahasiswa KIP", photoUrl: "https://i.pravatar.cc/300?img=16" },
];

export const OSIS_DATA = {
  title: "OSIS SMA Darussalam",
  description: "Organisasi Siswa Intra Sekolah — wadah kepemimpinan, kreativitas & pengabdian.",
  vision: "Menjadikan OSIS yang aktif, kreatif, berkarakter & inspiratif bagi seluruh warga sekolah.",
  mission: ["Meningkatkan keimanan & ketakwaan", "Menumbuhkan jiwa kepemimpinan & tanggung jawab", "Mengembangkan minat bakat via kegiatan positif", "Mempererat persaudaraan & kepedulian sosial"],
  structure: [
    { name: "Nayla Putri", position: "Ketua OSIS", year: "2025/2026", photoUrl: "" },
    { name: "Bima Saputra", position: "Wakil Ketua", year: "2025/2026", photoUrl: "" },
    { name: "Aisyah K.", position: "Sekretaris", year: "2025/2026", photoUrl: "" },
    { name: "Rafi H.", position: "Bendahara", year: "2025/2026", photoUrl: "" },
  ],
  programs: [
    { title: "Bulan Bahasa", description: "Lomba puisi, cerpen & debat." },
    { title: "Class Meeting", description: "Turnamen antar-kelas tiap semester." },
    { title: "Bakti Sosial", description: "Aksi peduli lingkungan & panti." },
    { title: "Festival Seni", description: "Pentas seni tahunan sekolah." },
  ],
  activities: [
    { title: "LDKS", description: "Latihan Dasar Kepemimpinan Siswa", date: "Sep 2025" },
    { title: "HUT Sekolah", description: "Perayaan HUT ke-20", date: "Okt 2025" },
  ],
  contactEmail: "osis@smadarussalamsimpangmesir.sch.id",
};

export const TATA_TERTIB = {
  title: "Tata Tertib Siswa",
  categories: [
    { name: "Kehadiran & Kedisiplinan", rules: ["Hadir paling lambat 06.45 WIB", "Seragam lengkap sesuai jadwal", "Izin tidak hadir via wali kelas", "Terlambat >15 menit ikut pembinaan"] },
    { name: "Kegiatan Belajar", rules: ["Ikuti KBM dengan tertib & aktif", "Tugas dikumpulkan tepat waktu", "Jaga kebersihan & fasilitas kelas", "Dilarang gadget saat KBM tanpa izin"] },
    { name: "Sikap & Perilaku", rules: ["Hormati guru, staf & sesama", "Berbahasa santun & tidak bullying", "Jaga nama baik sekolah di dalam/luar", "Ikut pembinaan karakter & ibadah"] },
    { name: "Sanksi & Penghargaan", rules: ["Pelanggaran ringan: teguran lisan", "Sedang: panggilan orang tua", "Berat: skorsing & pembinaan", "Berprestasi: penghargaan & beasiswa"] },
  ],
};

export function formatDateId(isoStr: string) {
  return new Date(isoStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

/* ══════════ DATA TAMBAHAN (ala smadarussalam.sch.id) ══════════ */

export const JURUSAN = [
  {
    slug: "mipa",
    name: "MIPA",
    full: "Matematika dan Ilmu Pengetahuan Alam",
    desc: "Fokus pada sains eksak: Matematika, Fisika, Kimia, Biologi — jalur favorit menuju kedokteran, teknik & IT.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
    subjects: ["Matematika", "Fisika", "Kimia", "Biologi", "Bahasa Indonesia", "Bahasa Inggris"],
    careers: ["Kedokteran", "Teknik", "Farmasi", "IT & Data Science"],
  },
  {
    slug: "ips",
    name: "IPS",
    full: "Ilmu Pengetahuan Sosial",
    desc: "Memahami masyarakat, ekonomi & geografi — bekal kuat menuju hukum, ekonomi, dan ilmu pemerintahan.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    subjects: ["Ekonomi", "Sosiologi", "Geografi", "Sejarah", "Bahasa Indonesia", "Bahasa Inggris"],
    careers: ["Hukum", "Ekonomi & Manajemen", "Hubungan Internasional", "Administrasi Negara"],
  },
];

export const TESTIMONI = [
  { name: "Nabila Yesy Puspitasari", year: "Alumni 2025", kelas: "XII MIPA 1", text: "SMA Darussalam memberikan pengalaman belajar yang luar biasa. Guru-gurunya ramah, profesional, dan selalu membimbing siswa untuk terus berkembang. Lingkungan sekolah yang nyaman membuat proses belajar menyenangkan." },
  { name: "Alya Putri Safa Azzahra", year: "Alumni 2025", kelas: "XII MIPA 2", text: "Sekolah ini memiliki banyak kegiatan akademik maupun non-akademik yang membantu siswa mengembangkan potensi dan bakatnya. Dukungan dari para guru membuat saya lebih percaya diri meraih prestasi." },
  { name: "Melani Selviana Putri", year: "Alumni 2025", kelas: "XII IPS 1", text: "Lingkungan bersih, nyaman, dan penuh semangat belajar. Berbagai kegiatan akademik, organisasi, dan ekstrakurikuler membuat siswa dapat mengembangkan kemampuan sesuai minat bakatnya." },
  { name: "Wahyu Agung Nugroho", year: "Alumni 2025", kelas: "XII IPS 2", text: "Saya bangga menjadi bagian dari SMA Darussalam. Selain ilmu pengetahuan, saya belajar kedisiplinan, tanggung jawab, dan nilai karakter yang menjadi bekal penting masa depan." },
];

export const HERO_STATS = [
  { value: "246", label: "Peserta Didik" },
  { value: "11", label: "Guru & Tenaga Kependidikan" },
  { value: "7", label: "Rombongan Belajar" },
  { value: "2019", label: "Tahun Berdiri" },
];

/* ══════════ UPGRADE: gambar prestasi + slogan hero ══════════ */

export const ACHIEVEMENT_IMAGES: Record<string, string> = {
  "ach-01": "https://picsum.photos/seed/medali-emas/640/420",
  "ach-02": "https://picsum.photos/seed/futsal-juara/640/420",
  "ach-03": "https://picsum.photos/seed/robotik-juara/640/420",
  "ach-04": "https://picsum.photos/seed/paduan-suara/640/420",
  "ach-05": "https://picsum.photos/seed/debat-inggris/640/420",
  "ach-06": "https://picsum.photos/seed/paskibraka/640/420",
};

export const HERO_SLOGANS = ["Berkarakter", "Berprestasi", "Kreatif & Inovatif", "Mandiri", "Berwawasan Global"];
