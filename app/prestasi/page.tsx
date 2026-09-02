"use client";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { useState, useMemo } from "react";
import { ACHIEVEMENTS, ACHIEVEMENT_IMAGES } from "@/lib/demo-data";
import { Search, Filter, Trophy, Medal, Star, Award } from "lucide-react";

export default function PrestasiPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string|null>(null);
  const [year, setYear] = useState<string|null>(null);
  const cats = useMemo(()=> [...new Set(ACHIEVEMENTS.map(a=>a.category))].sort(), []);
  const years = useMemo(()=> [...new Set(ACHIEVEMENTS.map(a=>a.year))].sort().reverse(), []);
  const filtered = ACHIEVEMENTS.filter(a=> {
    const mCat = cat===null||a.category===cat;
    const mYear = year===null||a.year===year;
    const mQ = q===""||a.title.toLowerCase().includes(q.toLowerCase())||a.description.toLowerCase().includes(q.toLowerCase());
    return mCat&&mYear&&mQ;
  });
  const juara1 = ACHIEVEMENTS.filter(a=>a.rank==="Juara 1").length;
  return (
    <div>
      <PageHeader badge="KEBANGGAAN SEKOLAH" title="Prestasi" accent="Juara" desc="Rekam jejak siswa & sekolah di kota, provinsi hingga nasional" img="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" breadcrumb="Akademik / Prestasi" />
      <section className="max-w-[1280px] mx-auto px-6">
        <div className="bg-white rounded-[28px] p-4 shadow-card border border-[#ece4d4] flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-600">
          <span className="flex gap-2 items-center"><Award className="w-4 h-4 text-primary-600" /> <CountUp value={String(ACHIEVEMENTS.length)} /> Prestasi</span>
          <span className="w-px bg-slate-200 hidden sm:block" />
          <span className="flex gap-2 items-center"><Trophy className="w-4 h-4 text-amber-500" /> <CountUp value={String(juara1)} /> Juara 1</span>
          <span className="w-px bg-slate-200 hidden sm:block" />
          <span className="flex gap-2 items-center"><Star className="w-4 h-4 text-emerald-500" /> <CountUp value={String(cats.length)} /> Kategori</span>
        </div>

        <div className="mt-6 max-w-lg mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari prestasi..." className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-semibold shadow-card focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={()=>setCat(null)} className={`px-4 py-2 rounded-full text-xs font-bold border ${cat===null?"bg-navy text-white border-navy":"bg-white border-slate-200 text-slate-600"}`}><Filter className="w-3.5 h-3.5 inline mr-1" /> Semua</button>
          {cats.map(c=> (<button key={c} onClick={()=>setCat(c)} className={`px-4 py-2 rounded-full text-xs font-bold border ${cat===c?"bg-primary-600 text-white border-primary-600":"bg-white border-slate-200 text-slate-600"}`}>{c}</button>))}
        </div>
        {years.length>0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button onClick={()=>setYear(null)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${year===null?"bg-amber-400 text-navy border-amber-400":"bg-white border-slate-200 text-slate-600"}`}>Semua Tahun</button>
            {years.map(y=> (<button key={y} onClick={()=>setYear(y)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${year===y?"bg-amber-400 text-navy border-amber-400":"bg-white border-slate-200 text-slate-600"}`}>{y}</button>))}
          </div>
        )}

        <div className="mt-4 text-center text-xs font-bold tracking-widest text-slate-500">{filtered.length} prestasi ditampilkan</div>

        <div className="mt-6 grid gap-4 max-w-4xl mx-auto">
          {filtered.map((a, i)=> {
            const Icon = a.rank==="Juara 1"?Trophy:Medal;
            const top = a.rank==="Juara 1";
            return (
              <Reveal key={a.id} delay={Math.min(i * 0.06, 0.4)}>
                <div className={`bg-white rounded-[28px] shadow-card border overflow-hidden flex flex-col sm:flex-row hover:shadow-3d hover:-translate-y-0.5 transition ${top?"border-amber-200":"border-[#ece4d4]"}`}>
                <div className="relative sm:w-48 h-40 sm:h-auto shrink-0 overflow-hidden group/img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" src={ACHIEVEMENT_IMAGES[a.id] ?? "https://picsum.photos/seed/prestasi/640/420"} alt={a.title} className="w-full h-full object-cover group-hover/img:scale-110 transition duration-700" />
                  <span className={`absolute top-2 left-2 rounded-full px-2.5 py-1 text-[9px] font-extrabold tracking-widest uppercase text-white shadow ${top?"shine ":""}${top?"bg-gradient-to-r from-sun to-amber-500":"bg-primary-500"}`}>{a.rank}</span>
                </div>
                <div className="flex-1 p-5 flex gap-4 items-center min-w-0">
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-extrabold tracking-widest text-primary-500 uppercase">{a.category} • {a.year}</span>
                    <h3 className="font-bold text-navy mt-0.5 leading-snug">{a.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{a.description}</p>
                  </div>
                  <span className={`w-11 h-11 rounded-xl hidden sm:flex items-center justify-center shrink-0 ${top?"bg-amber-500 text-white":"bg-primary-50 text-primary-600"}`}><Icon className="w-6 h-6" /></span>
                </div>
                </div>
              </Reveal>
            );
          })}
          {filtered.length===0 && <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-200"><Medal className="w-10 h-10 mx-auto text-slate-300" /><p className="text-sm text-slate-500 mt-3">Tidak ada prestasi cocok.</p></div>}
        </div>
      </section>
    </div>
  );
}
