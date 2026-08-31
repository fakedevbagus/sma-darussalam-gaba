"use client";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";
import Link from "next/link";
import { ANNOUNCEMENTS, formatDateId } from "@/lib/demo-data";
import { SCHOOL } from "@/config/school";
import { Calendar, Tag, Search, Pin, ArrowRight } from "lucide-react";

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
  const pinned = ANNOUNCEMENTS.find(a=>a.pinned) ?? null;

  return (
    <div>
      <PageHeader badge="INFORMASI • BERITA & PENGUMUMAN" title="Kabar Terbaru" accent={SCHOOL.shortName} desc="Ikuti kabar terkini — prestasi, kegiatan & info resmi sekolah. Semua data demo siap diganti." img="https://images.unsplash.com/photo-1494172961521-33799ddd43a5?q=80&w=800&auto=format&fit=crop" breadcrumb="Informasi / Berita" />

      <section className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari berita atau pengumuman..." className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-semibold shadow-card focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {FILTERS.map(f=> (
            <button key={f.label} onClick={()=>setFilter(f.value)} className={`px-5 py-2 rounded-full text-xs font-bold border ${filter===f.value?"bg-navy text-white border-navy":"bg-white border-slate-200 text-slate-600"}`}>{f.label}</button>
          ))}
        </div>

        {filter==="all" && pinned && !q && (
          <Link href={`/berita/${pinned.slug}`} className="mt-8 block bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-[28px] p-6 md:p-8 shadow-3d hover:shadow-glow transition">
            <div className="flex gap-4">
              <span className="w-14 h-14 rounded-xl bg-white text-primary-700 flex items-center justify-center shrink-0"><Pin className="w-6 h-6" /></span>
              <div>
                <div className="inline-flex bg-white/20 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest">{pinned.category.toUpperCase()} • PIN</div>
                <h3 className="font-display font-extrabold text-xl mt-2 leading-tight">{pinned.title}</h3>
                <p className="text-sm text-white/80 mt-2 line-clamp-2">{pinned.content}</p>
                <div className="text-xs text-white/60 mt-3">{formatDateId(pinned.createdAt)} • {pinned.authorName}</div>
              </div>
            </div>
          </Link>
        )}

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {filtered.map(a=> (
            <Link key={a.id} href={`/berita/${a.slug}`} className="group bg-white rounded-[28px] overflow-hidden shadow-card border border-[#ece4d4] hover:shadow-3d transition">
              {a.coverUrl && <div className="h-48 overflow-hidden"><img loading="lazy" src={a.coverUrl} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" /></div>}
              <div className="p-6">
                <div className="flex gap-2 items-center text-xs"><span className="bg-primary-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest">{a.category}</span><span className="text-slate-500 flex gap-1 items-center"><Calendar className="w-3.5 h-3.5" /> {formatDateId(a.createdAt)}</span></div>
                <h3 className="font-bold text-navy mt-3 leading-tight group-hover:text-primary-700 transition line-clamp-2">{a.title}</h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-6">{a.content}</p>
                <div className="mt-4 text-xs font-bold text-primary-600 flex gap-1 items-center">Baca <ArrowRight className="w-3 h-3" /></div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length===0 && <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-200 mt-8"><p className="text-sm text-slate-500">Tidak ada hasil untuk “{q}”.</p></div>}

        <div className="mt-10 bg-slate-50 border border-slate-200 rounded-[28px] p-6 text-center">
          <p className="text-sm text-slate-600">Butuh pengumuman resmi? Cek juga halaman <Link href="/pengumuman" className="text-primary-600 font-bold underline">Pengumuman</Link> & <Link href="/agenda" className="text-primary-600 font-bold underline">Agenda</Link>.</p>
        </div>
      </section>
    </div>
  );
}
