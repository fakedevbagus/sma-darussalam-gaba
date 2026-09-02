"use client";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { DOWNLOADS } from "@/lib/demo-data";
import { useState, useMemo } from "react";
import { Search, Filter, FileText, Download, HardDrive, Calendar } from "lucide-react";

export default function UnduhanPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string|null>(null);
  const cats = useMemo(()=> [...new Set(DOWNLOADS.map(d=>d.category))].sort(), []);
  const filtered = DOWNLOADS.filter(d=> {
    const mCat = cat===null||d.category===cat;
    const mQ = q===""||d.name.toLowerCase().includes(q.toLowerCase());
    return mCat&&mQ;
  });
  const lastUpdated = DOWNLOADS.length>0 ? new Date(Math.max(...DOWNLOADS.map(d=> new Date(d.updatedAt).getTime()))).toLocaleDateString("id-ID",{month:"long",year:"numeric"}) : null;
  return (
    <div>
      <PageHeader badge="PUSAT DOKUMEN" title="Unduhan" accent="Dokumen" desc="Formulir & dokumen resmi sekolah — gratis diunduh" img="https://images.unsplash.com/photo-1454165205744-3b78555e5572?q=80&w=800&auto=format&fit=crop" breadcrumb="Informasi / Unduhan" />
      <section className="max-w-[1280px] mx-auto px-6">
        <div className="bg-white rounded-2xl p-4 shadow-card border border-[#ece4d4] flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-600">
          <span className="flex gap-2 items-center"><HardDrive className="w-4 h-4 text-primary-600" /> {DOWNLOADS.length} Dokumen</span>
          <span className="w-px bg-slate-200 hidden sm:block" />
          <span className="flex gap-2 items-center"><Download className="w-4 h-4 text-amber-500" /> Siap Unduh</span>
          {lastUpdated && <><span className="w-px bg-slate-200 hidden sm:block" /><span className="flex gap-2 items-center"><Calendar className="w-4 h-4 text-emerald-500" /> Update: {lastUpdated}</span></>}
        </div>

        <div className="mt-6 max-w-lg mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari dokumen..." className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-semibold shadow-card focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={()=>setCat(null)} className={`px-4 py-2 rounded-full text-xs font-bold border ${cat===null?"bg-navy text-white border-navy":"bg-white border-slate-200 text-slate-600"}`}><Filter className="w-3.5 h-3.5 inline mr-1"/> Semua</button>
          {cats.map(c=> (<button key={c} onClick={()=>setCat(c)} className={`px-4 py-2 rounded-full text-xs font-bold border ${cat===c?"bg-primary-600 text-white border-primary-600":"bg-white border-slate-200 text-slate-600"}`}>{c}</button>))}
        </div>

        <div className="text-center text-xs font-bold tracking-widest text-slate-500 mt-6">{filtered.length} dokumen ditemukan</div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {filtered.map((doc, i)=> (
            <Reveal key={doc.id} delay={Math.min(i * 0.06, 0.4)}>
            <div className="bg-white rounded-[28px] p-5 shadow-card border border-[#ece4d4] hover:shadow-3d hover:-translate-y-0.5 transition flex flex-col">
              <div className="flex justify-between items-start">
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${doc.fileType==="PDF"?"bg-red-50 text-red-500":"bg-slate-100 text-slate-500"}`}><FileText className="w-5 h-5" /></span>
                <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-[10px] font-bold tracking-widest">{doc.fileType}</span>
              </div>
              <h3 className="font-bold text-navy mt-4 text-sm leading-snug">{doc.name}</h3>
              <div className="mt-3 text-[10px] font-semibold text-slate-500 flex gap-2">{doc.fileSize} • {doc.category}</div>
              <button disabled className="mt-4 w-full bg-slate-100 text-slate-500 py-2.5 rounded-xl text-xs font-bold flex gap-2 justify-center items-center cursor-not-allowed"><Download className="w-3.5 h-3.5" /> Segera Tersedia</button>
              <div className="text-[10px] text-slate-400 mt-2 text-center">Dokumen dapat diminta melalui admin</div>
            </div>
            </Reveal>
          ))}
        </div>

        <p className="text-center text-xs text-slate-500 mt-8">Butuh dokumen tertentu? Hubungi admin via <a href="/kontak" className="text-primary-600 font-bold underline">Kontak</a>.</p>
      </section>
    </div>
  );
}
