"use client";
import PageHeader from "@/components/PageHeader";
import { ANNOUNCEMENTS, formatDateId } from "@/lib/demo-data";
import Link from "next/link";
import { useState } from "react";
import { Search, Pin } from "lucide-react";

export default function PengumumanPage() {
  const [q, setQ] = useState("");
  const list = ANNOUNCEMENTS.filter(a=> a.category==="pengumuman" && (q===""||a.title.toLowerCase().includes(q.toLowerCase())));
  return (
    <div>
      <PageHeader badge="INFORMASI • PENGUMUMAN" title="Pengumuman" accent="Resmi" desc="Info resmi sekolah — jadwal, kebijakan & pengumuman penting untuk siswa & orang tua." img="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop" breadcrumb="Informasi / Pengumuman" />
      <section className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari pengumuman..." className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-semibold shadow-card focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {list.map(a=> (
            <Link key={a.id} href={`/pengumuman/${a.slug}`} className="bg-white rounded-[24px] p-6 shadow-card border border-[#ece4d4] hover:shadow-3d transition group">
              <div className="flex gap-2 items-center text-xs"><span className="bg-amber-400 text-navy px-2.5 py-1 rounded-full font-bold tracking-widest flex gap-1 items-center"><Pin className="w-3 h-3" /> PENGUMUMAN</span><span className="text-slate-500">{formatDateId(a.createdAt)}</span></div>
              <h3 className="font-bold text-navy mt-3 group-hover:text-primary-700 transition">{a.title}</h3>
              <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-6">{a.content}</p>
            </Link>
          ))}
          {list.length===0 && <div className="col-span-2 bg-white rounded-2xl p-12 text-center border border-dashed border-slate-200"><p className="text-sm text-slate-500">Tidak ada pengumuman cocok.</p></div>}
        </div>
      </section>
    </div>
  );
}
