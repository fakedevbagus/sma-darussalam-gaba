import PageHeader from "@/components/PageHeader";
import GlowCard from "@/components/GlowCard";
import Link from "next/link";
import Image from "next/image";
import { JURUSAN } from "@/lib/demo-data";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Program Jurusan" };

export default function JurusanPage() {
  return (
    <div>
      <PageHeader
        badge="AKADEMIK • PROGRAM JURUSAN"
        title="Pilihan" accent="Jurusan"
        desc="Empat jurusan pilihan dengan kurikulum Merdeka — temukan jalur belajar yang paling sesuai dengan minat, bakat dan cita-citamu."
        img="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop"
        breadcrumb="Program Jurusan"
      />
      <section className="max-w-[1280px] mx-auto px-6">
        <div className="grid sm:grid-cols-2 gap-6">
          {JURUSAN.map(j => (
            <GlowCard key={j.slug} tilt className="h-full rounded-[28px]">
            <Link href={`/jurusan/${j.slug}`} className="group card-3d h-full bg-white rounded-[28px] overflow-hidden shadow-card border border-[#ece4d4] hover:shadow-3d hover:-translate-y-0.5 transition flex flex-col">
              <div className="h-52 overflow-hidden relative bg-slate-100">
                <Image src={j.image} alt={j.name} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <span className="absolute bottom-3 left-4 font-display font-extrabold text-white text-xl">{j.name}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-navy leading-snug">{j.full}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-6 flex-1">{j.desc}</p>
                <span className="mt-4 text-sm font-bold text-primary-600 inline-flex items-center gap-1">Lihat Detail Jurusan <ArrowRight className="w-4 h-4" /></span>
              </div>
            </Link>
            </GlowCard>
          ))}
        </div>
      </section>
    </div>
  );
}
