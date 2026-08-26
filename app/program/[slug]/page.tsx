import { PROGRAMS } from "@/lib/demo-data";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PROGRAMS.map(p => ({ slug: p.slug }));
}

export default function ProgramDetail({ params }: { params: { slug: string } }) {
  const program = PROGRAMS.find(p => p.slug === params.slug);
  if (!program) return notFound();
  return (
    <div>
      <PageHeader badge={`${program.category.toUpperCase()} • PROGRAM`} title={program.name} desc={program.description} img="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop" breadcrumb={`Program / ${program.name}`} />
      <section className="max-w-[1280px] mx-auto px-6 -mt-2">
        <div className="bg-white rounded-[32px] p-8 shadow-card border border-slate-100">
          <div className="inline-flex bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold">{program.category}</div>
          <h2 className="font-bold text-navy mt-3 text-lg">Mata Pelajaran Terkait</h2>
          <ul className="mt-3 grid sm:grid-cols-2 gap-2">{program.subjects.map(s=> (<li key={s} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-navy">{s}</li>))}</ul>
          <h3 className="font-bold text-navy mt-6">Kegiatan</h3>
          <div className="mt-2 flex flex-wrap gap-2">{program.activities.map(a=> (<span key={a} className="bg-navy text-white px-3 py-1.5 rounded-full text-xs font-bold">{a}</span>))}</div>
          <div className="mt-8 flex gap-3">
            <Link href="/program" className="bg-white border border-slate-200 px-5 py-2.5 rounded-full text-sm font-bold text-navy">← Kembali</Link>
            <Link href="/ppdb" className="bg-primary-600 text-white px-5 py-2.5 rounded-full text-sm font-bold">Daftar PPDB</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
