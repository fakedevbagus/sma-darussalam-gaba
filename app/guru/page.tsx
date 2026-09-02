"use client";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import GlowCard from "@/components/GlowCard";
import { useState, useMemo } from "react";
import Image from "next/image";
import { STAFF } from "@/lib/demo-data";
import { Search, Filter, BookOpen, BadgeCheck } from "lucide-react";

export default function GuruPage() {
  const [q, setQ] = useState("");
  const [pos, setPos] = useState<string | null>(null);
  const positions = useMemo(() => [...new Set(STAFF.map(s => s.position))].sort(), []);
  const filtered = STAFF.filter(s => {
    const mPos = pos === null || s.position === pos;
    const mQ = q === "" || s.name.toLowerCase().includes(q.toLowerCase()) || s.subject.toLowerCase().includes(q.toLowerCase());
    return mPos && mQ;
  });

  return (
    <div>
      <PageHeader badge="PENDIDIK & TENAGA KEPENDIDIKAN" title="Guru &" accent="Staf" desc="Mengenal lebih dekat para pendidik profesional berdedikasi tinggi yang membimbing siswa setiap hari." img="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=800&auto=format&fit=crop" breadcrumb={[{ label: "Profil", href: "/profil" }, { label: "Guru & Tendik" }]} />

      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-4">
        <div className="max-w-lg mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari nama atau mapel..." aria-label="Cari guru" className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold shadow-card focus:outline-none focus:ring-2 focus:ring-primary-400" />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => setPos(null)} className={`px-4 py-2 rounded-full text-xs font-extrabold border transition ${pos === null ? "bg-navy text-white border-navy shadow-pop" : "bg-white border-slate-200 text-slate-600 hover:border-primary-300"}`}><Filter className="w-3.5 h-3.5 inline mr-1" /> Semua</button>
          {positions.map(p => (<button key={p} onClick={() => setPos(p)} className={`px-4 py-2 rounded-full text-xs font-extrabold border transition ${pos === p ? "bg-primary-500 text-white border-primary-500 shadow-pop" : "bg-white border-slate-200 text-slate-600 hover:border-primary-300"}`}>{p}</button>))}
        </div>
        <p className="text-center text-[11px] font-extrabold tracking-widest text-slate-500 uppercase mt-6">{filtered.length} staf ditampilkan</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((s, i) => (
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
                  <p className="mt-1 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-wide">
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
