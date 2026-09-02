import PageHeader from "@/components/PageHeader";
import GlowCard from "@/components/GlowCard";
import Link from "next/link";
import { PROGRAMS } from "@/lib/demo-data";
import { Brain, Cpu, Heart, Trophy, Lightbulb, Globe, ArrowRight } from "lucide-react";

const iconMap: Record<string, any> = { Brain, Cpu, Heart, Trophy, Lightbulb, Globe };
const colorMap: Record<string, string> = {
  Akademik: "from-blue-500 to-cyan-500",
  STEM: "from-emerald-500 to-teal-500",
  Karakter: "from-rose-500 to-pink-500",
  Bahasa: "from-violet-500 to-indigo-500",
  Seni: "from-pink-500 to-orange-500",
  Olahraga: "from-amber-500 to-orange-500",
};

const METODE = [
  { title: "Problem-Based Learning", desc: "Memecahkan masalah nyata via riset & kolaborasi." },
  { title: "Project-Based Learning", desc: "Proyek nyata menghubungkan kurikulum & kehidupan." },
  { title: "Flipped Classroom", desc: "Mandiri di rumah, diskusi & praktik di kelas." },
  { title: "Cooperative Learning", desc: "Think-Pair-Share & jigsaw berkelompok." },
];

export default function ProgramPage() {
  return (
    <div>
      <PageHeader badge="AKADEMIK • KURIKULUM MERDEKA" title="Program &" accent="Kurikulum" desc="Kurikulum Merdeka + program unggulan yang mencetak siswa berprestasi, berkarakter & siap global." img="https://images.unsplash.com/photo-1509062522246-3755977927d?q=80&w=800&auto=format&fit=crop" breadcrumb="Akademik / Program" />

      <section className="max-w-[1280px] mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map((p, i) => {
            const Icon = iconMap[p.icon] ?? Brain;
            const grad = colorMap[p.category] ?? "from-primary-600 to-accent";
            return (
              <GlowCard key={p.slug} tilt className="h-full rounded-[28px]">
              <div className="card-3d h-full bg-white rounded-[28px] p-6 shadow-card border border-[#ece4d4] hover:shadow-3d hover:-translate-y-0.5 transition">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-white`}><Icon className="w-5 h-5" /></div>
                <div className="flex items-center justify-between mt-3">
                  <h3 className="font-bold text-navy">{p.name}</h3>
                  {p.featured && <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-[10px] font-bold">Unggulan</span>}
                </div>
                <p className="text-sm text-slate-600 mt-2 leading-6">{p.description}</p>
                <div className="mt-4">
                  <div className="text-[10px] font-bold tracking-widest text-slate-500">MATA PELAJARAN</div>
                  <ul className="mt-1 space-y-1">{p.subjects.slice(0,4).map(s=> (<li key={s} className="flex gap-2 text-xs text-slate-600"><span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-1.5" />{s}</li>))}</ul>
                </div>
                {p.activities.length>0 && <div className="mt-3 flex flex-wrap gap-1.5">{p.activities.map(a=> (<span key={a} className="bg-slate-100 border border-slate-200 px-2 py-1 rounded-full text-[10px] font-bold text-slate-600">{a}</span>))}</div>}
                <Link href={`/program/${p.slug}`} className="mt-4 inline-flex gap-1 text-xs font-bold text-primary-600">Lihat Detail <ArrowRight className="w-3 h-3 mt-0.5" /></Link>
              </div>
              </GlowCard>
            );
          })}
        </div>

        <div className="mt-12">
          <h3 className="font-display font-extrabold text-2xl text-navy">Metode Pembelajaran</h3>
          <p className="text-sm text-slate-600 mt-2">Strategi modern berpusat pada siswa.</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {METODE.map((m,i)=> (
              <div key={m.title} className="bg-white rounded-2xl p-5 shadow-card border border-[#ece4d4] flex gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center font-bold text-xs shrink-0">{String(i+1).padStart(2,"0")}</span>
                <div><div className="font-bold text-navy text-sm">{m.title}</div><div className="text-xs text-slate-600 mt-1">{m.desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-600">Tertarik? Yuk daftar PPDB Gelombang 1 diskon 30%.</p>
          <Link href="/ppdb" className="link-more mt-4">Daftar Sekarang <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
    </div>
  );
}
