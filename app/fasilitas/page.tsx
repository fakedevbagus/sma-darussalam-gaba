"use client";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { useState, useMemo } from "react";
import { Search, Filter, MapPin } from "lucide-react";
import { FACILITIES } from "@/lib/demo-data";
import { BookOpen, FlaskConical, Cpu, Music, Moon, Building2, Dumbbell, Utensils, Heart, Sprout } from "lucide-react";

const iconMap: Record<string, any> = { book: BookOpen, flask: FlaskConical, cpu: Cpu, music: Music, moon: Moon, building: Building2, volleyball: Dumbbell, utensils: Utensils, heart: Heart, tree: Sprout };

export default function FasilitasPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const cats = useMemo(() => [...new Set(FACILITIES.map(f => f.category))].sort(), []);
  const filtered = FACILITIES.filter(f => {
    const mCat = cat === null || f.category === cat;
    const mQ = q === "" || f.name.toLowerCase().includes(q.toLowerCase()) || f.description.toLowerCase().includes(q.toLowerCase());
    return mCat && mQ;
  });
  return (
    <div>
      <PageHeader badge="SARANA & PRASARANA" title="Fasilitas" accent="Premium" desc="Lingkungan belajar lengkap, nyaman & modern untuk mendukung seluruh aktivitas akademik maupun non-akademik siswa." img="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=800&auto=format&fit=crop" breadcrumb="Profil Kami / Fasilitas" />
      <section className="max-w-[1280px] mx-auto px-5 md:px-6 pb-4">
        <div className="max-w-lg mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari fasilitas..." aria-label="Cari fasilitas" className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold shadow-card focus:outline-none focus:ring-2 focus:ring-primary-400" />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => setCat(null)} className={`px-4 py-2 rounded-full text-xs font-extrabold border transition ${cat === null ? "bg-navy text-white border-navy shadow-pop" : "bg-white border-slate-200 text-slate-600 hover:border-primary-300"}`}><Filter className="w-3.5 h-3.5 inline mr-1" /> Semua</button>
          {cats.map(c => (<button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full text-xs font-extrabold border transition ${cat === c ? "bg-primary-500 text-white border-primary-500 shadow-pop" : "bg-white border-slate-200 text-slate-600 hover:border-primary-300"}`}>{c}</button>))}
        </div>
        <p className="text-center text-[11px] font-extrabold tracking-widest text-slate-500 uppercase mt-6">{filtered.length} fasilitas ditampilkan</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((f, i) => {
            const Icon = iconMap[f.icon] ?? Building2;
            return (
              <Reveal key={f.id} delay={Math.min(i * 0.06, 0.4)}>
              <div className={`group bg-white rounded-[28px] overflow-hidden shadow-card border border-[#ece4d4] hover:shadow-3d hover:-translate-y-0.5 transition flex flex-col ${i % 3 === 1 ? "lg:rotate-[0.6deg]" : "lg:-rotate-[0.6deg]"} hover:rotate-0`}>
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" src={f.image} alt={f.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 glass rounded-full px-3 py-1.5 text-[10px] font-extrabold tracking-widest text-navy uppercase shadow">{f.category}</span>
                  <span className="absolute bottom-3 right-3 w-11 h-11 rounded-2xl bg-white/95 text-primary-600 flex items-center justify-center shadow-float group-hover:rotate-6 group-hover:scale-110 transition">
                    <Icon className="w-5 h-5" />
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-navy text-lg leading-snug group-hover:text-primary-600 transition">{f.name}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600 flex-1">{f.description}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-[11px] font-extrabold text-primary-500 uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5" /> {SCHOOL_LOC}
                  </div>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-[28px] p-12 text-center border border-dashed border-slate-200 mt-8">
            <Search className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm text-slate-500 mt-3">Tidak ada fasilitas yang cocok.</p>
          </div>
        )}
      </section>
    </div>
  );
}

const SCHOOL_LOC = "Lingkungan SMA Darussalam";
