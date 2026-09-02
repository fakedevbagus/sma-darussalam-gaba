"use client";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ANNOUNCEMENTS, formatDateId } from "@/lib/demo-data";
import { SCHOOL } from "@/config/school";
import { Calendar, Tag, Search, ArrowRight } from "lucide-react";

const FILTERS = [
  { value: "all" as const, label: "Semua" },
  { value: "berita" as const, label: "Berita" },
  { value: "pengumuman" as const, label: "Pengumuman" },
];

export default function BeritaPage() {
  const [filter, setFilter] = useState<"all"|"berita"|"pengumuman">("all");
  const [q, setQ] = useState("");
  const filtered = ANNOUNCEMENTS.filter(a=>{
    const mCat = filter==="all"||a.category===filter;
    const mQ = q===""||a.title.toLowerCase().includes(q.toLowerCase())||a.content.toLowerCase().includes(q.toLowerCase());
    return mCat&&mQ;
  });
  // G5-5 (opsi a): artikel pinned menjadi kartu featured — blok pinned terpisah
  // dihapus supaya artikel yang sama tidak tampil dua kali. Featured hanya aktif
  // saat hasil ≥ 3; bila lebih sedikit, semua dirender sebagai kartu normal.
  const featured = filtered.length >= 3
    ? (filtered.find(a=>a.pinned) ?? filtered[0])
    : null;
  const rest = featured ? filtered.filter(a=>a.id!==featured.id) : filtered;
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <PageHeader badge="INFORMASI • BERITA & PENGUMUMAN" title="Kabar Terbaru" accent={SCHOOL.shortName} desc="Ikuti kabar terkini — prestasi, kegiatan & info resmi sekolah." img="https://images.unsplash.com/photo-1494172961521-33799ddd43a5?q=80&w=800&auto=format&fit=crop" breadcrumb="Informasi / Berita" />

      <section className="max-w-[1280px] mx-auto px-6">
        <div className="sticky top-0 z-20 -mx-6 px-6 py-3 bg-pale/85 backdrop-blur supports-[backdrop-filter]:bg-pale/70 sticky-filter">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari berita atau pengumuman..." className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-semibold shadow-card focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {FILTERS.map(f=> (
              <button key={f.label} onClick={()=>setFilter(f.value)} className={`relative px-5 py-2 rounded-full text-xs font-bold border ${filter===f.value?"text-white border-navy":"bg-white border-slate-200 text-slate-600"}`}>
                {filter===f.value && <motion.span layoutId="filter-pill-berita" className="absolute inset-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${q}-${filter}`}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {/* G5-5 — Kartu featured: artikel pinned (atau terbaru) sebagai kartu lebar
              (md:col-span-2). Token desain sama persis dengan kartu normal; hanya
              proporsi & tata letaknya yang berbeda (gambar kiri, teks kanan di md+). */}
          {featured && (
            <Reveal key={featured.id} className="md:col-span-2">
            <Link href={`/berita/${featured.slug}`} className="group bg-white rounded-[28px] overflow-hidden shadow-card border border-[#ece4d4] hover:shadow-3d hover:-translate-y-0.5 transition flex flex-col md:flex-row h-full">
              {featured.coverUrl && <div className="relative h-52 md:h-auto md:w-[42%] shrink-0 overflow-hidden bg-slate-100"><Image src={featured.coverUrl} alt={featured.title} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover group-hover:scale-110 transition duration-700" /></div>}
              <div className="p-6 md:p-7 flex flex-col justify-center min-w-0">
                <div className="flex gap-2 items-center text-xs"><span className="bg-primary-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest">{featured.category}</span><span className="text-slate-500 flex gap-1 items-center"><Calendar className="w-3.5 h-3.5" /> {formatDateId(featured.createdAt)}</span></div>
                <h3 className="font-bold text-navy mt-3 leading-tight group-hover:text-primary-700 transition line-clamp-2 text-xl md:text-2xl">{featured.title}</h3>
                <p className="text-xs md:text-sm text-slate-600 mt-2 line-clamp-2 leading-6">{featured.content}</p>
                <div className="mt-4 text-xs font-bold text-primary-600 flex gap-1 items-center">Baca <ArrowRight className="w-3 h-3" /></div>
              </div>
            </Link>
            </Reveal>
          )}

          {rest.map((a, i)=> (
            <Reveal key={a.id} delay={Math.min(i * 0.06, 0.4)}>
            <Link href={`/berita/${a.slug}`} className="group bg-white rounded-[28px] overflow-hidden shadow-card border border-[#ece4d4] hover:shadow-3d hover:-translate-y-0.5 transition">
              {a.coverUrl && <div className="relative h-48 overflow-hidden bg-slate-100"><Image src={a.coverUrl} alt={a.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition duration-700" /></div>}
              <div className="p-6">
                <div className="flex gap-2 items-center text-xs"><span className="bg-primary-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest">{a.category}</span><span className="text-slate-500 flex gap-1 items-center"><Calendar className="w-3.5 h-3.5" /> {formatDateId(a.createdAt)}</span></div>
                <h3 className="font-bold text-navy mt-3 leading-tight group-hover:text-primary-700 transition line-clamp-2">{a.title}</h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-6">{a.content}</p>
                <div className="mt-4 text-xs font-bold text-primary-600 flex gap-1 items-center">Baca <ArrowRight className="w-3 h-3" /></div>
              </div>
            </Link>
            </Reveal>
          ))}
        </div>

        {filtered.length===0 && <div className="md:col-span-3 bg-white rounded-2xl p-12 text-center border border-dashed border-slate-200"><p className="text-sm text-slate-500">Tidak ada hasil untuk “{q}”.</p></div>}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 bg-slate-50 border border-slate-200 rounded-[28px] p-6 text-center">
          <p className="text-sm text-slate-600">Butuh pengumuman resmi? Cek juga halaman <Link href="/pengumuman" className="text-primary-600 font-bold underline">Pengumuman</Link> & <Link href="/agenda" className="text-primary-600 font-bold underline">Agenda</Link>.</p>
        </div>
      </section>
    </div>
  );
}
