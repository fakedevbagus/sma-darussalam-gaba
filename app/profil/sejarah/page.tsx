import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { SCHOOL } from "@/config/school";
import { Calendar, Award, Lightbulb, Target, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Sejarah Singkat",
  description: `Perjalanan ${SCHOOL.name} sejak ${SCHOOL.founded} — pendirian, izin operasional, dan perkembangan sarana.`,
};

const MILESTONES = [
  { year: "2019", title: "SK Pendirian Sekolah", desc: "Yayasan Darussalam Simpang Mesir resmi mendirikan SMA Darussalam.", icon: Calendar },
  { year: "2020", title: "SK Izin Operasional", desc: "Izin operasional terbit dan kegiatan belajar dimulai.", icon: Award },
  { year: "2021", title: "Pembangunan Sarana", desc: "Penambahan ruang kelas, perpustakaan, dan laboratorium komputer.", icon: Lightbulb },
  { year: "2024", title: "Tumbuh & Berkembang", desc: "Jumlah peserta didik dan rombongan belajar terus bertambah.", icon: Target },
  { year: "2026", title: "Transformasi Digital", desc: "Sekolah mulai membangun kehadiran digital dan layanan online.", icon: Trophy },
];

export default function SejarahPage() {
  return (
    <div>
      <PageHeader badge="PROFIL • SEJARAH" title="Sejarah" accent="Perjalanan Kami" desc={`Tonggak penting ${SCHOOL.name} Simpang Mesir sejak SK pendirian 2019 hingga transformasi digital.`} img="https://images.unsplash.com/photo-1461360228754-6e81c478b882?q=80&w=800&auto=format&fit=crop" breadcrumb={[{ label: "Profil", href: "/profil" }, { label: "Sejarah" }]} />

      <section className="max-w-[1280px] mx-auto px-6">
        <SectionHeading eyebrow="Timeline" title="Tonggak Sejarah" desc="Perjalanan bertumbuh bersama siswa & orang tua" number="01" />
        <div className="mx-auto mt-8 max-w-3xl relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-primary-200 to-transparent" />
          <div className="space-y-5">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="relative flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border-2 border-sun flex items-center justify-center shadow-card shrink-0 z-10"><m.icon className="w-5 h-5 text-sun" /></div>
                <div className="flex-1 bg-white rounded-2xl border border-[#ece4d4] p-4 sm:p-5 shadow-card hover:shadow-3d transition">
                  <span className="text-xs font-bold tracking-widest text-sun">{m.year}</span>
                  <h3 className="font-bold text-navy mt-1">{m.title}</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-6">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Nomor SK pendirian dan izin operasional tercantum lengkap di{" "}
          <Link href="/profil/identitas" className="link-more">halaman Identitas Sekolah</Link>.
        </p>
      </section>
    </div>
  );
}
