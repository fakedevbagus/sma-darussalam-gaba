import PageHeader from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { SCHOOL } from "@/config/school";
import { Eye, ListChecks, CheckCircle2 } from "lucide-react";

export default function VisiMisiPage() {
  return (
    <div>
      <PageHeader badge="PROFIL • VISI & MISI" title="Visi & Misi" accent={SCHOOL.shortName} desc="Arah & tujuan jangka panjang yang menggerakkan seluruh warga sekolah." img="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop" breadcrumb="Profil / Visi & Misi" />

      <section className="max-w-[1280px] mx-auto px-6 space-y-8">
        <div className="bg-gradient-to-br from-navy to-primary-900 text-white rounded-[36px] p-8 md:p-10 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center"><Eye className="w-6 h-6" /></div>
            <h3 className="mt-4 font-display font-extrabold text-2xl">Visi 2030</h3>
            <p className="mt-3 text-white/85 leading-7 max-w-3xl">{SCHOOL.visi}</p>
            <div className="mt-6 inline-flex bg-white text-navy px-4 py-2 rounded-full text-xs font-bold">Akreditasi A • 2024 BAN-SM</div>
          </div>
        </div>

        <div className="bg-white rounded-[36px] p-8 shadow-card border border-[#ece4d4]">
          <SectionHeading eyebrow="Misi" title="Misi Sekolah" desc="Langkah strategis untuk mewujudkan visi" number="02" />
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {SCHOOL.misi.map((m, i) => (
              <div key={i} className="flex gap-3 bg-slate-50 rounded-2xl p-4 border border-[#ece4d4]">
                <span className="w-7 h-7 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                <span className="text-sm leading-6 text-slate-700">{m}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-[28px] p-6 flex gap-3 items-start">
          <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5" />
          <p className="text-sm leading-6 text-amber-900">Nilai inti: <b>Disiplin • Jujur • Peduli • Kreatif • Religius</b> — diinternalisasi via pembiasaan harian & proyek P5.</p>
        </div>
      </section>
    </div>
  );
}
