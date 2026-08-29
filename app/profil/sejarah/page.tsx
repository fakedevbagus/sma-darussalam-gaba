import PageHeader from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { SCHOOL } from "@/config/school";
import { Calendar, Award, Lightbulb, Target, Trophy } from "lucide-react";

const MILESTONES = [
  { year: "2019", title: "SK Pendirian Sekolah", desc: "SMA Darussalam resmi didirikan Yayasan Darussalam Simpang Mesir melalui SK Pendirian 118.4/YSDM/SMA-DS/X/2019 tertanggal 30 Oktober 2019 — berlokasi di Desa Simpang Mesir, Gedung Aji Baru, Tulang Bawang, Lampung.", icon: Calendar },
  { year: "2020", title: "SK Izin Operasional", desc: "Pemerintah memberikan izin operasional melalui SK 463/1370/V.16/2020 tertanggal 10 Februari 2020 — sekolah mulai menyelenggarakan layanan pendidikan penuh.", icon: Award },
  { year: "2021", title: "Pembangunan Sarana", desc: "Pembangunan 8 ruang kelas, perpustakaan, laboratorium komputer, dan sarana penunjang lain untuk menunjang proses belajar.", icon: Lightbulb },
  { year: "2024", title: "Tumbuh & Berkembang", desc: "Jumlah peserta didik terus bertambah — 246 siswa dalam 7 rombongan belajar, dibina 8 guru dan 3 tenaga kependidikan.", icon: Target },
  { year: "2026", title: "Transformasi Digital", desc: "Peluncuran website resmi sebagai pusat informasi sekolah — profil, PPDB daring, berita, galeri, dan layanan informasi lainnya.", icon: Trophy },
];

export default function SejarahPage() {
  return (
    <div>
      <PageHeader badge="PROFIL • SEJARAH" title="Sejarah" accent="Perjalanan Kami" desc={`Tonggak penting ${SCHOOL.name} Simpang Mesir sejak SK pendirian 2019 hingga transformasi digital.`} img="https://images.unsplash.com/photo-1461360228754-6e81c478b882?q=80&w=800&auto=format&fit=crop" breadcrumb="Profil / Sejarah" />

      <section className="max-w-[1280px] mx-auto px-6">
        <SectionHeading eyebrow="Timeline" title="Tonggak Sejarah" desc="Perjalanan bertumbuh bersama siswa & orang tua" number="01" />
        <div className="mx-auto mt-8 max-w-3xl relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-primary-200 to-transparent" />
          <div className="space-y-6">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="relative flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border-2 border-primary-600 flex items-center justify-center shadow-card shrink-0 z-10"><m.icon className="w-5 h-5 text-primary-600" /></div>
                <div className="flex-1 bg-white rounded-2xl border border-[#ece4d4] p-5 shadow-card hover:shadow-3d transition">
                  <span className="text-xs font-bold tracking-widest text-accent">{m.year}</span>
                  <h3 className="font-bold text-navy mt-1">{m.title}</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-6">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <SectionHeading eyebrow="Dalam Angka" title="Statistik Sekolah" number="02" />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {SCHOOL.stats.map((s, i) => (
              <div key={s.label} className="bg-white rounded-[20px] p-6 shadow-card border border-[#ece4d4] text-center card-3d">
                <div className="text-xs font-bold tracking-widest text-slate-500">0{i + 1}</div>
                <div className="text-2xl font-extrabold gradient-text mt-2">{s.value}</div>
                <div className="text-sm font-bold text-slate-600 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
