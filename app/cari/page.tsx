"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { SCHOOL } from "@/config/school";
import {
  ANNOUNCEMENTS, PROGRAMS, JURUSAN, FACILITIES, EXTRACURRICULARS, EVENTS, FAQS,
} from "@/lib/demo-data";
import { Search, ArrowRight, FileText, BookOpen, Map, HelpCircle, Calendar, Sparkles } from "lucide-react";

/* Pencarian global lintas konten — setara fitur search modern, melebihi smadarussalam.sch.id */

type Hit = { title: string; desc: string; href: string; group: string; icon: React.ComponentType<{ className?: string }> };

const CORPUS: Hit[] = [
  ...ANNOUNCEMENTS.map((a) => ({ title: a.title, desc: a.content.slice(0, 140), href: `/berita/${a.slug}`, group: "Berita & Pengumuman", icon: FileText })),
  ...PROGRAMS.map((p) => ({ title: p.name, desc: p.description, href: `/program/${p.slug}`, group: "Program", icon: Sparkles })),
  ...JURUSAN.map((j) => ({ title: `${j.name} — ${j.full}`, desc: j.desc, href: `/jurusan/${j.slug}`, group: "Jurusan", icon: BookOpen })),
  ...FACILITIES.map((f) => ({ title: f.name, desc: f.description, href: "/fasilitas", group: "Fasilitas", icon: Map })),
  ...EXTRACURRICULARS.map((e) => ({ title: e.name, desc: e.description, href: "/ekskul", group: "Ekstrakurikuler", icon: Sparkles })),
  ...EVENTS.map((e) => ({ title: e.title, desc: e.description, href: "/agenda", group: "Agenda", icon: Calendar })),
  ...FAQS.map((f) => ({ title: f.question, desc: f.answer, href: "/faq", group: "FAQ", icon: HelpCircle })),
];

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

function SearchInner() {
  const params = useSearchParams();
  const q = params.get("q") || "";
  const [query, setQuery] = useState(q);

  useEffect(() => setQuery(q), [q]);

  const hits = q.trim().length >= 2
    ? CORPUS.filter((h) => {
        const needle = normalize(q).split(/\s+/).filter(Boolean);
        const hay = normalize(`${h.title} ${h.desc} ${h.group}`);
        return needle.every((w) => hay.includes(w));
      }).slice(0, 24)
    : [];

  return (
    <div>
      <PageHeader badge="LAYANAN • PENCARIAN" title="Pencarian" accent="Global" desc={`Cari berita, program, jurusan, fasilitas, ekskul, agenda & FAQ di seluruh situs ${SCHOOL.name}.`} img="https://images.unsplash.com/photo-1494172961521-33799ddd43a5?q=80&w=800&auto=format&fit=crop" breadcrumb="Layanan / Pencarian" />
      <section className="max-w-[860px] mx-auto px-6 pb-16">
        <form action="/cari" className="relative mt-6">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            name="q" defaultValue={q} autoFocus
            placeholder="Ketik kata kunci… (mis. PPDB, ekstrakurikuler, lab)"
            className="w-full bg-white rounded-full border border-slate-200 shadow-card py-4 pl-14 pr-5 text-sm font-semibold text-navy placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-400"
          />
        </form>

        {q.trim().length >= 2 ? (
          <>
            <p className="mt-6 text-sm font-bold text-slate-600">{hits.length} hasil untuk “{q}”</p>
            <div className="mt-4 space-y-3">
              {hits.map((h) => (
                <Link key={`${h.group}-${h.title}`} href={h.href} className="group bg-white rounded-2xl border border-[#ece4d4] p-5 shadow-card hover:shadow-3d hover:-translate-y-0.5 transition flex gap-4">
                  <span className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center shrink-0"><h.icon className="w-5 h-5" /></span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-extrabold tracking-widest text-primary-500 uppercase">{h.group}</div>
                    <div className="font-bold text-navy text-sm mt-0.5">{h.title}</div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{h.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary-400 ml-auto shrink-0 self-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
                </Link>
              ))}
              {hits.length === 0 && (
                <div className="bg-white rounded-2xl border border-[#ece4d4] p-8 text-center shadow-card">
                  <Search className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="mt-3 font-bold text-navy">Tidak ada hasil untuk “{q}”</p>
                  <p className="text-sm text-slate-500 mt-1">Coba kata kunci lain atau jelajahi menu utama.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="mt-6 text-sm text-slate-500">Masukkan minimal 2 karakter untuk mulai mencari.</p>
        )}
      </section>
    </div>
  );
}

export default function CariPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh]" />}>
      <SearchInner />
    </Suspense>
  );
}