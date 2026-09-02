"use client";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { useState, useMemo } from "react";
import { EXTRACURRICULARS } from "@/lib/demo-data";
import { Search, Filter, Clock, UserRound } from "lucide-react";

export default function EkskulPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const cats = useMemo(() => [...new Set(EXTRACURRICULARS.map(e => e.category))].sort(), []);
  const filtered = EXTRACURRICULARS.filter(e => {
    const mCat = cat === null || e.category === cat;
    const mQ = q === "" || e.name.toLowerCase().includes(q.toLowerCase()) || e.description.toLowerCase().includes(q.toLowerCase()) || e.coach.toLowerCase().includes(q.toLowerCase());
    return mCat && mQ;
  });
  return (
    <div>
      <PageHeader badge="PENGEMBANGAN BAKAT" title="Ekstrakurikuler" accent="Pilihan" desc="Wadah minat dan bakat siswa — dari kepemimpinan, olahraga, seni, hingga teknologi. Wajib pilih minimal satu." img="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" breadcrumb="Lainnya / Ekstrakurikuler" />
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-4">
        <div className="max-w-lg mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari ekskul atau pelatih..." aria-label="Cari ekstrakurikuler" className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold shadow-card focus:outline-none focus:ring-2 focus:ring-primary-400" />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => setCat(null)} className={`px-4 py-2 rounded-full text-xs font-extrabold border transition ${cat === null ? "bg-navy text-white border-navy shadow-pop" : "bg-white border-slate-200 text-slate-600 hover:border-primary-300"}`}><Filter className="w-3.5 h-3.5 inline mr-1" /> Semua</button>
          {cats.map(c => (<button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full text-xs font-extrabold border transition ${cat === c ? "bg-primary-500 text-white border-primary-500 shadow-pop" : "bg-white border-slate-200 text-slate-600 hover:border-primary-300"}`}>{c}</button>))}
        </div>
        <p className="text-center text-[11px] font-extrabold tracking-widest text-slate-500 uppercase mt-6">{filtered.length} ekstrakurikuler ditampilkan</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((e, i) => (
            <Reveal key={e.id} delay={Math.min(i * 0.06, 0.4)}>
            <div className={`group bg-white rounded-[28px] overflow-hidden shadow-card border border-[#ece4d4] hover:shadow-3d hover:-translate-y-0.5 transition flex flex-col ${i % 2 ? "lg:rotate-[0.5deg]" : "lg:-rotate-[0.5deg]"} hover:rotate-0`}>
              <div className="relative h-40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src={e.image} alt={e.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 glass rounded-full px-3 py-1.5 text-[10px] font-extrabold tracking-widest text-navy uppercase shadow">{e.category}</span>
                <h3 className="absolute bottom-3 left-4 right-4 font-display font-bold text-white text-lg leading-tight drop-shadow">{e.name}</h3>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-sm leading-6 text-slate-600 flex-1">{e.description}</p>
                <div className="mt-4 space-y-2 border-t border-dashed border-slate-200 pt-3.5 text-xs font-bold text-slate-600">
                  <div className="flex gap-2 items-center"><span className="w-7 h-7 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0"><Clock className="w-3.5 h-3.5" /></span> {e.schedule}</div>
                  <div className="flex gap-2 items-center"><span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"><UserRound className="w-3.5 h-3.5" /></span> {e.coach}</div>
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-[28px] p-12 text-center border border-dashed border-slate-200 mt-8">
            <Search className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm text-slate-500 mt-3">Tidak ada ekstrakurikuler yang cocok.</p>
          </div>
        )}
      </section>
    </div>
  );
}
