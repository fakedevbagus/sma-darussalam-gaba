import PageHeader from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import Link from "next/link";
import { Eye, Calendar, Building2, UserRound, ArrowRight, Award } from "lucide-react";
import { SCHOOL } from "@/config/school";

const SECTIONS = [
  { href: "/profil/visi-misi", icon: Eye, title: "Visi & Misi", desc: "Arah & tujuan jangka panjang" },
  { href: "/profil/sejarah", icon: Calendar, title: "Sejarah", desc: "Perjalanan sejak 2005" },
  { href: "/profil/identitas", icon: Building2, title: "Identitas Sekolah", desc: "Data resmi & NPSN" },
  { href: "/profil/kepala-sekolah", icon: UserRound, title: "Kepala Sekolah", desc: "Sambutan & profil" },
];

export default function ProfilPage() {
  return (
    <div>
      <PageHeader
        badge="TENTANG KAMI • PROFIL SEKOLAH"
        title="Mengenal Lebih Dekat"
        accent="SMA Biru Ceria"
        desc={`${SCHOOL.tagline} Berdiri sejak ${SCHOOL.founded}, akreditasi ${SCHOOL.akreditasi} — mencetak lulusan juara & berkarakter.`}
        img={SCHOOL.heroImageUrl}
        breadcrumb="Beranda / Profil"
      />

      <section className="max-w-[1280px] mx-auto px-6 -mt-4">
        <div className="bg-white rounded-[32px] shadow-card border border-slate-100 p-8 md:p-10">
          <SectionHeading eyebrow="Tentang Kami" title={SCHOOL.name} desc={SCHOOL.tagline} number="01" />
          <div className="mt-8 bg-gradient-to-br from-primary-50 to-cyan-50 border border-primary-100 rounded-[24px] p-8">
            <p className="text-base leading-7 text-navy font-medium">{SCHOOL.motto}. {SCHOOL.visi}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-bold text-navy"><Building2 className="w-3.5 h-3.5" /> {SCHOOL.akreditasi}</span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-bold text-navy"><Calendar className="w-3.5 h-3.5" /> Berdiri {SCHOOL.founded}</span>
              <span className="inline-flex items-center gap-1.5 bg-navy text-white px-3 py-1.5 rounded-full text-xs font-bold">NPSN {SCHOOL.npsn}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 mt-10">
        <SectionHeading eyebrow="Jelajahi" title="Bagian Profil" desc="Pilih bagian untuk detail lebih lengkap" number="02" />
        <div className="mt-8 grid sm:grid-cols-2 gap-5">
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href} className="group bg-white rounded-[24px] p-6 shadow-card border border-slate-100 hover:shadow-3d hover:-translate-y-1 transition flex gap-4 items-start">
              <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-600 to-accent flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-110 transition"><s.icon className="w-5 h-5" /></span>
              <div className="flex-1"><div className="font-bold text-navy">{s.title}</div><div className="text-xs text-slate-500 mt-1">{s.desc}</div></div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition" />
            </Link>
          ))}
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/guru" className="bg-navy text-white rounded-[20px] p-5 flex items-center justify-between hover:shadow-3d transition"><span className="font-bold text-sm">Guru & Staf</span><ArrowRight className="w-4 h-4" /></Link>
          <Link href="/fasilitas" className="bg-white border border-slate-200 rounded-[20px] p-5 flex items-center justify-between hover:shadow-card transition"><span className="font-bold text-sm text-navy">Fasilitas</span><Award className="w-4 h-4 text-primary-600" /></Link>
          <Link href="/program" className="bg-white border border-slate-200 rounded-[20px] p-5 flex items-center justify-between hover:shadow-card transition"><span className="font-bold text-sm text-navy">Program</span><ArrowRight className="w-4 h-4" /></Link>
          <Link href="/prestasi" className="bg-amber-400 text-navy rounded-[20px] p-5 flex items-center justify-between hover:shadow-float transition"><span className="font-bold text-sm">Prestasi</span><ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
    </div>
  );
}
