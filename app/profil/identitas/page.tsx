import PageHeader from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { SCHOOL } from "@/config/school";
import { Building2, Hash, Award, Globe, MapPin, Phone, Mail } from "lucide-react";

export default function IdentitasPage() {
  const items = [
    { icon: Building2, label: "Nama Sekolah", value: SCHOOL.name },
    { icon: Hash, label: "NPSN", value: SCHOOL.npsn },
    { icon: Award, label: "Akreditasi", value: SCHOOL.akreditasi },
    { icon: Globe, label: "Tahun Berdiri", value: String(SCHOOL.founded) },
    { icon: MapPin, label: "Alamat", value: SCHOOL.address },
    { icon: Phone, label: "Telepon", value: SCHOOL.phone },
    { icon: Mail, label: "Email", value: SCHOOL.email },
  ];
  return (
    <div>
      <PageHeader badge="PROFIL • IDENTITAS" title="Identitas" accent="Sekolah" desc="Data resmi & identitas lembaga yang dapat diverifikasi." img="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop" breadcrumb="Profil / Identitas" />
      <section className="max-w-[1280px] mx-auto px-6 -mt-2">
        <SectionHeading eyebrow="Identitas" title="Data Resmi" desc="Informasi lembaga — edit via config/school.ts" number="01" />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {items.map((it) => (
            <div key={it.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-card flex gap-4 hover:shadow-3d transition w-full min-w-0">
              <span className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center shrink-0"><it.icon className="w-5 h-5" /></span>
              <div className="min-w-0"><div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">{it.label}</div><div className="font-bold text-navy mt-1 text-sm break-words">{it.value}</div></div>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-3xl mx-auto">
          <SectionHeading eyebrow="Lokasi" title="Peta & Lokasi" number="02" />
          <div className="mt-6 rounded-[24px] overflow-hidden border-4 border-white shadow-3d">
            <iframe src={SCHOOL.mapEmbedUrl} width="100%" height="360" style={{ border: 0 }} loading="lazy" title={`Lokasi ${SCHOOL.name}`} />
          </div>
          <a href={SCHOOL.mapOpenUrl} target="_blank" className="mt-4 inline-flex bg-navy text-white px-5 py-2.5 rounded-full text-xs font-bold">Buka di Google Maps →</a>
        </div>
      </section>
    </div>
  );
}
