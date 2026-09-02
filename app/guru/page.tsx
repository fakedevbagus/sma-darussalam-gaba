"use client";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import GlowCard from "@/components/GlowCard";
import { useState, useMemo } from "react";
import Image from "next/image";
import { STAFF } from "@/lib/demo-data";
import { Search, Filter, BookOpen, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

// G5-8 — kelompok chip diturunkan dari data STAFF: satu chip per mapel
// (dari staf berposisi "Guru") + satu chip "Tenaga Kependidikan" untuk semua
// peran non-mengajar. Tidak ada nama/posisi individual yang di-hardcode.
const TENDIK_KEY = "tenaga-kependidikan";

export default function GuruPage() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<string | null>(null); // null = Semua
  const subjects = useMemo(
    () => [...new Set(STAFF.filter(s => s.position === "Guru").map(s => s.subject))].sort(),
    []
  );
  const filtered = STAFF.filter(s => {
    const mGroup = group === null || (group === TENDIK_KEY ? s.position !== "Guru" : s.subject === group);
    const mQ = q === "" || s.name.toLowerCase().includes(q.toLowerCase()) || s.subject.toLowerCase().includes(q.toLowerCase());
    return mGroup && mQ;
  });
  // G5-8 — kartu Kepala Sekolah selalu paling atas setiap kali ia lolos filter
  // (sort stabil, urutan staf lain tidak berubah).
  const ordered = useMemo(
    () => [...filtered].sort((a, b) => Number(b.position === "Kepala Sekolah") - Number(a.position === "Kepala Sekolah")),
    [filtered]
  );

  return (
    <div>
      <PageHeader badge="PENDIDIK & TENAGA KEPENDIDIKAN" title="Guru &" accent="Staf" desc="Mengenal lebih dekat para pendidik profesional berdedikasi tinggi yang membimbing siswa setiap hari." img="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=800&auto=format&fit=crop" breadcrumb={[{ label: "Profil", href: "/profil" }, { label: "Guru & Tendik" }]} />

      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-4">
        <div className="max-w-lg mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari nama atau mapel..." aria-label="Cari guru" className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold shadow-card focus:outline-none focus:ring-2 focus:ring-primary-400" />
        </div>
        {/* G5-8 — chip kelompok memakai pola yang sama persis dengan /berita */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => setGroup(null)} className={`relative px-5 py-2 rounded-full text-xs font-bold border ${group === null ? "text-white border-navy" : "bg-white border-slate-200 text-slate-600"}`}>
            {group === null && <motion.span layoutId="filter-pill-guru" className="absolute inset-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            <span className="relative z-10"><Filter className="w-3.5 h-3.5 inline mr-1" /> Semua</span>
          </button>
          {subjects.map(sub => (<button key={sub} onClick={() => setGroup(sub)} className={`relative px-5 py-2 rounded-full text-xs font-bold border ${group === sub ? "text-white border-navy" : "bg-white border-slate-200 text-slate-600"}`}>
            {group === sub && <motion.span layoutId="filter-pill-guru" className="absolute inset-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            <span className="relative z-10">{sub}</span>
          </button>))}
          <button onClick={() => setGroup(TENDIK_KEY)} className={`relative px-5 py-2 rounded-full text-xs font-bold border ${group === TENDIK_KEY ? "text-white border-navy" : "bg-white border-slate-200 text-slate-600"}`}>
            {group === TENDIK_KEY && <motion.span layoutId="filter-pill-guru" className="absolute inset-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            <span className="relative z-10">Tenaga Kependidikan</span>
          </button>
        </div>
        <p className="text-center text-[11px] font-extrabold tracking-widest text-slate-500 uppercase mt-6">{filtered.length} staf ditampilkan</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ordered.map((s, i) => (
            <Reveal key={s.id} delay={Math.min(i * 0.06, 0.4)}>
              <GlowCard className="rounded-[28px]">
              <article className="group relative bg-white rounded-[28px] overflow-hidden shadow-card border border-[#ece4d4] hover:shadow-3d hover:-translate-y-0.5 transition flex flex-col">
              {/* Foto + overlay premium */}
              <div className="relative aspect-[4/5] overflow-hidden bg-primary-50">
                <Image src={s.photoUrl} alt={s.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-cover object-top group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/5 to-transparent" />
                {/* Badge posisi */}
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-[10px] font-extrabold tracking-widest text-navy uppercase shadow">
                  <BadgeCheck className="w-3.5 h-3.5 text-primary-600" /> {s.position}
                </span>
                {/* Nama di atas foto */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                  <h3 className="font-display font-bold text-[15px] uppercase leading-tight drop-shadow">{s.name}</h3>
                  {/* G5-8 — mapel & peran sudah selalu terlihat (terbaca di HP tanpa
                      hover); saat hover hanya diberi penekanan halus tanpa mengubah
                      tampilan diam maupun tinggi kartu */}
                  <p className="mt-1 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-wide group-hover:bg-white/35 transition-colors">
                    <BookOpen className="w-3 h-3" /> {s.subject}
                  </p>
                </div>
                {/* Ring aksen saat hover */}
                <span className="absolute inset-3 rounded-[20px] border-2 border-white/0 group-hover:border-white/40 transition pointer-events-none" />
              </div>
              {/* Bio */}
              <div className="p-4 bg-white flex-1 flex flex-col">
                <p className="text-xs leading-5 text-slate-600 line-clamp-2 flex-1">{s.bio}</p>
                <span className={`mt-3 h-1 rounded-full bg-gradient-to-r ${i % 3 === 0 ? "from-primary-400 to-accent" : i % 3 === 1 ? "from-mint to-emerald-400" : "from-sun to-amber-400"} opacity-70 group-hover:opacity-100 transition`} />
              </div>
              </article>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-[28px] p-12 text-center border border-dashed border-slate-200 mt-8">
            <Search className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm text-slate-500 mt-3">Tidak ada staf yang cocok.</p>
          </div>
        )}
      </section>
    </div>
  );
}
