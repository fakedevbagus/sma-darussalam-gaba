import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JURUSAN } from "@/lib/demo-data";
import { BookOpen, Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";

export function generateStaticParams() {
  return JURUSAN.map(j => ({ slug: j.slug }));
}

export default function JurusanDetail({ params }: { params: { slug: string } }) {
  const j = JURUSAN.find(x => x.slug === params.slug);
  if (!j) return notFound();
  const others = JURUSAN.filter(x => x.slug !== j.slug);

  return (
    <div>
      <PageHeader badge={`JURUSAN • ${j.name}`} title={j.name} accent="Jurusan" desc={j.full} img={j.image} breadcrumb={`Program Jurusan / ${j.name}`} />

      <section className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-[36px] p-8 shadow-card border border-[#ece4d4]">
          <p className="text-sm leading-7 text-slate-600">{j.desc} Kurikulum Merdeka berbasis proyek (P5) dengan pembinaan intensif menuju PTN favorit.</p>

          <h3 className="mt-8 font-display font-extrabold text-lg text-navy flex gap-2 items-center"><BookOpen className="w-5 h-5 text-primary-600" /> Mata Pelajaran Utama</h3>
          <div className="mt-4 grid sm:grid-cols-3 gap-3">
            {j.subjects.map(s => (
              <div key={s} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-navy">{s}</div>
            ))}
          </div>

          <h3 className="mt-8 font-display font-extrabold text-lg text-navy flex gap-2 items-center"><Briefcase className="w-5 h-5 text-primary-600" /> Prospek Studi Lanjut & Karier</h3>
          <ul className="mt-4 grid sm:grid-cols-2 gap-2">
            {j.careers.map(c => (
              <li key={c} className="flex gap-2 items-start text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" /> {c}</li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-br from-navy to-primary-800 text-white rounded-[36px] p-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="relative">
              <h3 className="font-display font-extrabold text-xl">Tertarik jurusan ini?</h3>
              <p className="text-sm text-white/80 mt-2 leading-6">Daftar PPDB dan pilih {j.name} sebagai pilihan jurusanmu.</p>
              <Link href="/ppdb" className="mt-5 inline-flex w-full justify-center bg-white text-navy px-6 py-3.5 rounded-full text-sm font-extrabold hover:bg-slate-100 transition">DAFTAR SEKARANG →</Link>
              <Link href="/kontak" className="mt-3 inline-flex w-full justify-center bg-white/10 backdrop-blur border border-white/25 px-6 py-3.5 rounded-full text-sm font-bold hover:bg-white/20 transition">Tanya Admin</Link>
            </div>
          </div>

          <div className="bg-white rounded-[28px] p-6 shadow-card border border-[#ece4d4]">
            <h4 className="font-bold text-navy text-sm mb-3">Jelajahi Jurusan Lain</h4>
            <div className="space-y-2">
              {others.map(o => (
                <Link key={o.slug} href={`/jurusan/${o.slug}`} className="flex justify-between items-center bg-slate-50 hover:bg-primary-50 rounded-xl px-4 py-3 transition group">
                  <span className="font-bold text-navy text-sm">{o.name}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
