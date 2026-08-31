import PageHeader from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { SCHOOL } from "@/config/school";
import { Quote } from "lucide-react";

export default function KepalaSekolahPage() {
  const p = SCHOOL.principal;
  return (
    <div>
      <PageHeader badge="PROFIL • KEPALA SEKOLAH" title="Kepala Sekolah" accent="Sambutan" desc={`Sambutan & profil Kepala ${SCHOOL.name} — ${SCHOOL.principal.name}.`} img="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" breadcrumb="Profil / Kepala Sekolah" />
      <section className="max-w-[1280px] mx-auto px-6 space-y-10">
        <div className="max-w-4xl mx-auto bg-white rounded-[36px] overflow-hidden shadow-3d border border-[#ece4d4]">
          <div className="h-[340px] sm:h-[420px] relative overflow-hidden">
            <img loading="lazy" src={p.imageUrl} alt={p.name} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 p-6 sm:p-8 text-white">
              <div className="inline-flex bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold border border-white/20">KEPALA SEKOLAH</div>
              <h2 className="font-display font-extrabold text-2xl mt-2">{p.name}</h2>
              <p className="text-sm text-white/80">{p.title}</p>
            </div>
          </div>
          <div className="p-8">
            <SectionHeading eyebrow="Sambutan" title="Sambutan Kepala Sekolah" number="01" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
              {p.sambutan.split("\n").filter(Boolean).map((para, i) => (<p key={i}>{para}</p>))}
            </div>
            <div className="mt-8 relative bg-gradient-to-br from-primary-50 to-cyan-50 border border-primary-100 rounded-2xl p-6 flex gap-4">
              <Quote className="w-8 h-8 text-primary-300 shrink-0" />
              <div>
                <blockquote className="font-display font-bold italic text-navy leading-6">“{p.quote}”</blockquote>
                <div className="text-xs font-bold text-slate-500 mt-2">— {p.name}, {p.title}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
