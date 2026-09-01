import Link from "next/link";
import { SCHOOL, DAPODIK, DAPO_URL } from "@/config/school";
import {
  ANNOUNCEMENTS, ACHIEVEMENTS, ACHIEVEMENT_IMAGES, JURUSAN, GALLERY, STAFF, HERO_STATS,
} from "@/lib/demo-data";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import PpdbPopup from "@/components/PpdbPopup";
import CountUp from "@/components/CountUp";
import { SectionHeading } from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TestimoniSlider from "@/components/TestimoniSlider";
import GaleriSlider from "@/components/GaleriSlider";
import {
  ArrowRight, Play, Quote, BookOpen, Heart, Building2, Trophy, Users, Eye, CheckCircle2, Sparkles,
  GraduationCap, UserRound, DoorOpen, MapPin, ExternalLink, Navigation,
  FileText, ClipboardCheck, Megaphone, CalendarCheck,
} from "lucide-react";

const KENAPA = [
  { title: "Kurikulum", accent: "Merdeka", desc: "Pembelajaran adaptif, kreatif dan relevan dengan masa depan.", icon: BookOpen, color: "from-primary-400 to-accent" },
  { title: "Karakter &", accent: "Religius", desc: "Membentuk karakter berakhlak mulia dan berjiwa santun.", icon: Heart, color: "from-mint to-emerald-400" },
  { title: "Fasilitas", accent: "Lengkap", desc: "Laboratorium, internet, sarana belajar modern dan nyaman.", icon: Building2, color: "from-sun to-amber-400" },
  { title: "Prestasi", accent: "Gemilang", desc: "Raihan prestasi di tingkat kabupaten, provinsi dan nasional.", icon: Trophy, color: "from-rose-400 to-pink-500" },
  { title: "Ekstrakurikuler", accent: "Beragam", desc: "Salurkan minat dan bakat melalui berbagai kegiatan unggulan.", icon: Users, color: "from-violet-400 to-indigo-400" },
  { title: "Lingkungan", accent: "Kondusif", desc: "Lingkungan bersih, aman dan mendukung proses belajar optimal.", icon: Eye, color: "from-cyan-400 to-primary-500" },
];

const FASILITAS_HOME = [
  "Laboratorium Komputer & Sains",
  "Perpustakaan Digital Terpadu",
  "Ruang Kelas Ber-AC & Nyaman",
  "Lapangan Olahraga & Masjid Luas",
];

const FASILITAS_FOTO = [
  { name: "Auditorium", img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop" },
  { name: "Lapangan Basket", img: "https://images.unsplash.com/photo-1574629810360-214f3774381b?q=80&w=600&auto=format&fit=crop" },
  { name: "Perpustakaan", img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop" },
  { name: "Ruang Musik", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop" },
  { name: "Lab Komputer", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop" },
];

export default function Home() {
  const latestNews = ANNOUNCEMENTS.slice(0, 4);
  const prestasiTop = ACHIEVEMENTS.slice(0, 4);

  return (
    <div className="overflow-x-clip">
      <Hero />
      <PpdbPopup />

      {/* ══════ STATISTIK DAPODIK — strip di bawah hero ══════ */}
      <section className="relative z-10 -mt-12 pb-4">
        <div className="max-w-[1100px] mx-auto px-5 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {HERO_STATS.map((s, i) => (
              <div key={s.label} className={`card-warm px-4 py-6 text-center ${i % 2 ? "lg:translate-y-2" : ""}`}>
                <div className="flex justify-center mb-2">
                  <span className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                    {i === 0 ? <GraduationCap className="w-5 h-5" /> : i === 1 ? <UserRound className="w-5 h-5" /> : i === 2 ? <DoorOpen className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                  </span>
                </div>
                <div className="font-display font-semibold text-3xl text-navy">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-1 text-[11px] font-bold tracking-wider uppercase text-slate-500 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SAMBUTAN KEPALA SEKOLAH ══════ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pt-4 pb-16 md:pb-20">
        <Reveal className="bg-white rounded-[36px] shadow-card border border-[#ece4d4] p-6 sm:p-8 md:p-10 grid lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full pattern-dots opacity-70" />
          <div className="lg:col-span-5 relative">
            <div className="relative arch overflow-hidden shadow-3d border-4 border-white tilt">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src={SCHOOL.principal.imageUrl} alt={SCHOOL.principal.name} className="w-full aspect-[4/5] sm:aspect-[5/6] object-cover object-top" />
              <div className="absolute bottom-3 left-3 glass rounded-xl px-3 py-2 text-xs font-extrabold text-navy">Kepala Sekolah</div>
            </div>
            <div className="absolute -bottom-5 -right-3 w-20 h-20 rounded-2xl bg-gradient-to-br from-sun to-amber-400 shadow-float hidden lg:flex items-center justify-center rotate-6">
              <Quote className="w-9 h-9 text-white" />
            </div>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="text-[11px] font-extrabold tracking-[0.22em] text-primary-600 uppercase">Sambutan</div>
            <h2 className="mt-1 font-display font-bold text-2xl md:text-3xl text-navy uppercase leading-tight">Kepala Sekolah</h2>
            <p className="mt-4 text-sm md:text-[15px] leading-7 text-slate-600">{SCHOOL.principal.sambutan.split("\n").filter(Boolean)[1]}</p>
            <div className="mt-5">
              <div className="font-display font-bold text-navy">{SCHOOL.principal.name}</div>
              <div className="text-xs font-bold text-primary-500">{SCHOOL.principal.title}</div>
            </div>
            <Link href="/profil/kepala-sekolah" className="link-more mt-5">Baca Selengkapnya <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </Reveal>
      </section>

      {/* ══════ PILIHAN JURUSAN ══════ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-16 md:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-extrabold tracking-[0.22em] text-primary-600 uppercase">Pilihan Jurusan</div>
            <h2 className="mt-1 font-display font-bold text-2xl md:text-3xl text-navy">{JURUSAN.length} Jurusan</h2>
          </div>
          <Link href="/jurusan" className="text-sm font-extrabold text-primary-600 inline-flex gap-1 items-center hover:gap-2 transition-all">Lihat Semua <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <Reveal className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {JURUSAN.map((j, i) => (
            <Link key={j.slug} href={`/jurusan/${j.slug}`} className={`group relative rounded-[28px] overflow-hidden shadow-card hover:shadow-3d transition border-4 border-white block ${i % 2 ? "lg:-rotate-1" : "lg:rotate-1"} hover:rotate-0`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src={j.image} alt={j.name} className="w-full h-[240px] sm:h-[260px] object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <div className="font-display font-bold text-lg leading-tight group-hover:text-cyan-300 transition">{j.name}</div>
                <div className="text-xs text-white/80 mt-1 leading-5">{j.full}</div>
              </div>
              <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-primary-600 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition"><ArrowRight className="w-4 h-4" /></span>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* ══════ PRESTASI TERKINI — kartu dengan GAMBAR ══════ */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-primary-50/60 to-transparent">
        <div className="absolute inset-0 pattern-dots opacity-60" />
        <div className="relative max-w-[1280px] mx-auto px-5 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-[11px] font-extrabold tracking-[0.22em] text-primary-600 uppercase">Kebanggaan</div>
              <h2 className="mt-1 font-display font-bold text-2xl md:text-3xl text-navy">Prestasi Terkini</h2>
            </div>
            <Link href="/prestasi" className="text-sm font-extrabold text-primary-600 inline-flex gap-1 items-center hover:gap-2 transition-all">Lihat Semua <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <Reveal className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {prestasiTop.map(a => (
              <div key={a.id} className="group bg-white rounded-[28px] overflow-hidden shadow-card border border-[#ece4d4] hover:shadow-3d hover:-translate-y-1.5 transition flex flex-col">
                <div className="relative h-40 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" src={ACHIEVEMENT_IMAGES[a.id] ?? "https://picsum.photos/seed/prestasi-fallback/640/420"} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/55 to-transparent" />
                  <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-extrabold tracking-widest uppercase text-white shadow ${a.rank === "Juara 1" ? "bg-gradient-to-r from-sun to-amber-500" : "bg-primary-500"}`}>
                    {a.rank} • {a.year}
                  </span>
                  {a.rank === "Juara 1" && <Trophy className="absolute top-3 right-3 w-5 h-5 text-sun drop-shadow" />}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[10px] font-extrabold tracking-widest text-primary-500 uppercase">{a.category}</span>
                  <h3 className="mt-1.5 font-display font-bold text-navy text-sm leading-snug line-clamp-3 flex-1">{a.title}</h3>
                  <p className="mt-2 text-xs text-slate-500 line-clamp-2">{a.description}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══════ KENAPA HARUS SMA DARUSSALAM? ══════ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-16 md:pb-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-navy leading-tight">Kenapa Harus<br /><span className="gradient-text">SMA Darussalam?</span></h2>
          <p className="mt-3 text-slate-600 text-sm md:text-base leading-6">Tempat terbaik untuk tumbuh, belajar dan meraih cita-citamu.</p>
          <Link href="/profil" className="link-more mt-5">Lihat Profil Sekolah <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <Reveal className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {KENAPA.map(k => (
            <div key={k.title} className="group bg-white rounded-[28px] p-6 shadow-card border border-[#ece4d4] card-3d relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-primary-50 opacity-70 group-hover:opacity-100 group-hover:scale-125 transition duration-500" />
              <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${k.color} text-white flex items-center justify-center shadow-md group-hover:rotate-6 group-hover:scale-110 transition`}><k.icon className="w-6 h-6" /></div>
              <h3 className="relative mt-4 font-display font-bold text-navy text-lg leading-tight">{k.title}<br />{k.accent}</h3>
              <p className="relative mt-2 text-sm leading-6 text-slate-600">{k.desc}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ══════ VIDEO PROFIL — kartu ══════ */}
      <section id="video-profil" className="max-w-[1280px] mx-auto px-5 md:px-6 pb-20 md:pb-24">
        <div className="relative rounded-[36px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(20,26,94,0.45)] border-[8px] border-white group bg-navy">
          {SCHOOL.profileVideoUrl ? (
            <iframe src={SCHOOL.profileVideoUrl} title="Video Profil Sekolah" allowFullScreen className="w-full aspect-video" loading="lazy" />
          ) : (
            <div className="relative w-full aspect-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src={SCHOOL.heroImageUrl} alt={`Suasana ${SCHOOL.name}`} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <span className="w-16 h-16 rounded-full bg-white text-primary-600 flex items-center justify-center shadow-float mb-4 group-hover:scale-110 transition"><Play className="w-7 h-7 ml-0.5" /></span>
                <h3 className="font-display font-bold text-white text-xl md:text-2xl">Video Profil {SCHOOL.name}</h3>
                <p className="mt-2 text-white/80 text-sm max-w-md">Dokumentasi video suasana sekolah akan segera hadir. Untuk sementara, jelajahi galeri foto kegiatan kami.</p>
                <Link href="/galeri" className="mt-4 inline-flex items-center gap-2 bg-white text-primary-700 px-5 py-2.5 rounded-full text-sm font-extrabold hover:scale-[1.03] transition">Lihat Galeri <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>
          )}
          <div className="absolute top-4 left-4 glass-dark rounded-full px-4 py-2 text-white text-[11px] font-extrabold tracking-widest uppercase flex gap-2 items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Video Profil {SCHOOL.name}
          </div>
        </div>
      </section>

      {/* ══════ BERITA TERBARU ══════ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-16 md:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-navy">Berita Terbaru</h2>
          <Link href="/berita" className="text-sm font-extrabold text-primary-600 inline-flex gap-1 items-center hover:gap-2 transition-all">Lihat Semua <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <Reveal className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {latestNews.map(b => (
            <Link key={b.id} href={`/berita/${b.slug}`} className="group bg-white rounded-[28px] overflow-hidden shadow-card border border-[#ece4d4] hover:shadow-3d hover:-translate-y-1 transition flex flex-col">
              <div className="h-40 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src={b.coverUrl} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <span className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[9px] font-extrabold tracking-widest uppercase shadow ${b.category === "pengumuman" ? "bg-sun text-navy" : "bg-primary-600 text-white"}`}>{b.category}</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="text-[11px] font-bold text-slate-400">{new Date(b.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</div>
                <h3 className="mt-1.5 font-display font-bold text-navy text-sm leading-snug line-clamp-3 group-hover:text-primary-600 transition flex-1">{b.title}</h3>
                <span className="mt-3 text-xs font-extrabold text-primary-600">Baca Selengkapnya →</span>
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* ══════ GALERI — SLIDE OTOMATIS ══════ */}
      <section className="py-16 md:py-20 bg-white border-y border-[#ece4d4] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-6 flex flex-wrap items-end justify-between gap-3 mb-8">
          <div>
            <div className="text-[11px] font-extrabold tracking-[0.22em] text-primary-600 uppercase">Dokumentasi</div>
            <h2 className="mt-1 font-display font-bold text-2xl md:text-3xl text-navy">Galeri Kegiatan</h2>
          </div>
          <Link href="/galeri" className="text-sm font-extrabold text-primary-600 inline-flex gap-1 items-center hover:gap-2 transition-all">Lihat Semua <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <GaleriSlider />
      </section>

      {/* ══════ FASILITAS ══════ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 py-16 md:py-20 grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-navy leading-tight">Fasilitas Lengkap<br />untuk Menunjang<br /><span className="gradient-text">Potensi Siswa!</span></h2>
          <ul className="mt-6 space-y-3">
            {FASILITAS_HOME.map(f => (
              <li key={f} className="flex gap-3 items-center text-sm font-bold text-navy bg-white rounded-2xl px-4 py-3 shadow-soft border border-[#ece4d4]"><CheckCircle2 className="w-5 h-5 text-mint shrink-0" /> {f}</li>
            ))}
          </ul>
          <Link href="/fasilitas" className="link-more mt-6">Lihat Semua Fasilitas <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {FASILITAS_FOTO.map((f, i) => (
            <div key={f.name} className={`rounded-[20px] overflow-hidden shadow-card border-4 border-white relative group ${i === 0 ? "col-span-2 sm:col-span-1" : ""} ${i % 2 ? "rotate-1" : "-rotate-1"} hover:rotate-0 hover:shadow-3d transition`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src={f.img} alt={f.name} className={`w-full object-cover group-hover:scale-110 transition duration-700 ${i === 0 ? "h-[180px] sm:h-[160px]" : "h-[130px] sm:h-[150px]"}`} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-3"><span className="text-white text-xs font-extrabold">{f.name}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ GURU & TENDIK — MARQUEE OTOMATIS KE KIRI (pelan) ══════ */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-primary-50/70 to-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-6 mb-10 flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-xl">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-navy">Guru &amp; Tenaga Kependidikan</h2>
            <p className="mt-2 text-sm md:text-base leading-6 text-slate-600">Tim pendidik profesional berdedikasi tinggi untuk mencetak generasi unggul.</p>
          </div>
          <Link href="/guru" className="text-sm font-extrabold text-primary-600 inline-flex gap-1 items-center hover:gap-2 transition-all">Lihat Semua <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <Marquee duration={80} bg="transparent" className="pb-2">
          {STAFF.map(s => (
            <div key={s.id} className="group shrink-0 w-[170px] sm:w-[190px] bg-white rounded-[20px] overflow-hidden border border-[#ece4d4] shadow-card hover:shadow-3d hover:-translate-y-1 transition">
              <div className="aspect-square overflow-hidden bg-primary-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src={s.photoUrl} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-3.5">
                <h3 className="font-display font-bold text-navy text-[13px] uppercase leading-snug truncate">{s.name}</h3>
                <p className="text-[11px] font-extrabold text-primary-500 mt-0.5">{s.position}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Mapel: {s.subject}</p>
              </div>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ══════ TESTIMONI ALUMNI ══════ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-16 md:pb-20">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-navy">Testimoni Alumni</h2>
          <Link href="/alumni" className="text-sm font-extrabold text-primary-600 inline-flex gap-1 items-center">Semua Alumni <ArrowRight className="w-4 h-4" /></Link>
        </div>
        {/* Slide testimoni — otomatis */}
        <div className="mt-8">
          <TestimoniSlider />
        </div>
      </section>

      {/* ══════ ALUR PPDB ══════ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-16 md:pb-20">
        <SectionHeading eyebrow="PPDB 2026/2027" title="Alur Pendaftaran" desc="Empat langkah mudah untuk bergabung dengan keluarga besar SMA Darussalam." />
        <Reveal className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: FileText, title: "Daftar Online", desc: "Isi formulir dari HP — 5 menit selesai." },
            { icon: ClipboardCheck, title: "Verifikasi Berkas", desc: "Panitia memverifikasi dokumen Anda." },
            { icon: Megaphone, title: "Pengumuman", desc: "Hasil seleksi diumumkan 3 hari setelah tes." },
            { icon: CalendarCheck, title: "Daftar Ulang", desc: "Lengkapi administrasi & siap masuk sekolah." },
          ].map((s, i) => (
            <div key={i} className="relative card-warm p-6">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sun to-amber-500 text-navy font-display font-semibold text-lg flex items-center justify-center shadow-yellow">{i + 1}</span>
              <div className="mt-4 font-bold text-navy text-sm flex items-center gap-2"><s.icon className="w-4 h-4 text-primary-600" /> {s.title}</div>
              <p className="text-xs text-slate-500 mt-1.5 leading-5">{s.desc}</p>
            </div>
          ))}
        </Reveal>
        <div className="mt-7 text-center">
          <Link href="/ppdb" className="btn-navy">Mulai Pendaftaran <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>

      {/* ══════ CTA PPDB ══════ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-16 md:pb-20">
        <div className="relative rounded-[36px] overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-accent p-8 md:p-12 text-white shadow-3d">
          <div className="absolute inset-0 pattern-stripes opacity-70" />
          <div className="absolute -top-20 -right-20 w-[380px] h-[380px] bg-white/10 rounded-full blur-3xl" />
          <div className="relative grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-[11px] font-extrabold tracking-widest border border-white/25"><Sparkles className="w-3.5 h-3.5" /> PPDB 2026/2027 GELOMBANG 1</div>
              <h3 className="mt-4 font-display font-bold text-2xl md:text-3xl leading-tight">Siap Jadi Bagian dari<br />Keluarga Besar Darussalam?</h3>
              <p className="mt-3 text-white/85 max-w-xl text-sm md:text-base leading-6">Daftar sekarang — proses mudah, bisa dari HP. Konsultasi gratis via WhatsApp.</p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link href="/ppdb" className="bg-white text-primary-700 px-6 py-4 rounded-full font-extrabold text-center shadow-float hover:scale-[1.02] transition">DAFTAR SEKARANG →</Link>
              <a href={SCHOOL.social.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-6 py-4 rounded-full font-extrabold text-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-[1.02] transition">Hubungi CS PPDB</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ LOKASI KAMI — peta di atas footer ══════ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-20">
        <div className="relative bg-white rounded-[36px] overflow-hidden shadow-3d border border-[#ece4d4]">
          <div className="grid lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 relative p-8 md:p-10 flex flex-col justify-center overflow-hidden">
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 rounded-full px-4 py-2 text-[11px] font-extrabold tracking-widest uppercase w-fit">
                <MapPin className="w-3.5 h-3.5" /> Lokasi Kami
              </div>
              <h2 className="mt-4 font-display font-semibold text-2xl md:text-3xl text-navy leading-tight">Temukan Kami di<br /><span className="gradient-text">Gedung Aji Baru</span></h2>
              <p className="mt-4 text-sm md:text-[15px] leading-7 text-slate-600">{SCHOOL.address}</p>
              <p className="mt-2 text-xs font-bold text-slate-400 tracking-wide">Koordinat: {DAPODIK.koordinat.lat}, {DAPODIK.koordinat.lng}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={SCHOOL.mapOpenUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-navy text-white px-5 py-3 rounded-full text-sm font-extrabold hover:bg-primary-600 hover:-translate-y-0.5 transition">Rute ke Sekolah <Navigation className="w-4 h-4" /></a>
                <a href={DAPO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 border border-primary-100 px-5 py-3 rounded-full text-sm font-extrabold hover:bg-softblue transition">Verifikasi Dapodik <ExternalLink className="w-4 h-4" /></a>
              </div>
            </div>
            <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[420px]">
              <iframe src={SCHOOL.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" title={`Lokasi ${SCHOOL.name}`} className="w-full h-full absolute inset-0" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
