import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Doodles from "@/components/Doodles";
import Link from "next/link";
import { SCHOOL } from "@/config/school";
import { Construction, Clock, GraduationCap, UserRound, Users, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Portal Akademik — Dalam Pengembangan",
  description: `Portal akademik ${SCHOOL.name} (e-raport, jadwal, pengumuman kelas) sedang dalam tahap pengembangan.`,
};

const ROLES = [
  { icon: GraduationCap, title: "Untuk Siswa", desc: "Lihat e-raport, jadwal pelajaran & pengumuman kelas." },
  { icon: UserRound, title: "Untuk Guru", desc: "Input nilai, presensi harian & materi pembelajaran." },
  { icon: Users, title: "Untuk Orang Tua", desc: "Pantau perkembangan akademik & kehadiran anak." },
];

const ROADMAP = [
  { fase: "Tahap 1", desc: "Perancangan struktur data & halaman login peran (siswa/guru/ortu)." },
  { fase: "Tahap 2", desc: "Pengumuman kelas, jadwal pelajaran & kalender akademik digital." },
  { fase: "Tahap 3", desc: "E-Raport digital — input nilai guru, akses rapor siswa & orang tua." },
];

export default function ERaportPage() {
  return (
    <div>
      <PageHeader badge="PORTAL AKADEMIK" title="Portal" accent="Akademik" desc="Layanan digital sekolah — e-raport, jadwal, dan pengumuman kelas. Saat ini masih dalam tahap pengembangan." img="https://images.unsplash.com/photo-1454165205744-3b78555e5572?q=80&w=800&auto=format&fit=crop" breadcrumb="Layanan / Portal Akademik" />

      <section className="max-w-[820px] mx-auto px-6 pb-16">
        {/* Kartu status */}
        <div className="relative card-warm p-8 md:p-10 text-center overflow-hidden">
          <Doodles soft className="!absolute" />
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-sun to-amber-500 text-white flex items-center justify-center mx-auto shadow-float">
              <Construction className="w-10 h-10" />
            </div>
            <span className="mt-5 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-full px-4 py-1.5 text-[11px] font-extrabold tracking-widest uppercase">
              <Clock className="w-3.5 h-3.5" /> Dalam Tahap Pengembangan
            </span>
            <h2 className="font-display font-semibold text-2xl md:text-3xl text-navy mt-4 leading-tight">
              Portal Akademik <span className="gradient-text">Segera Hadir</span>
            </h2>
            <p className="text-sm md:text-[15px] leading-7 text-slate-600 mt-3 max-w-xl mx-auto">
              Kami sedang menyiapkan portal akademik digital untuk memudahkan siswa, guru, dan orang tua.
              Layanan ini <b>belum dapat difungsikan</b> — mohon kesabarannya. Info peluncuran akan diumumkan
              di halaman berita &amp; pengumuman.
            </p>
          </div>
        </div>

        {/* Fitur per peran */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {ROLES.map(r => (
            <div key={r.title} className="card-warm p-5 text-center">
              <span className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto"><r.icon className="w-5 h-5" /></span>
              <div className="font-bold text-navy text-sm mt-3">{r.title}</div>
              <p className="text-xs text-slate-500 mt-1.5 leading-5">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Roadmap */}
        <div className="mt-8 card-warm p-6 md:p-8">
          <div className="flex items-center gap-2 font-display font-semibold text-navy">
            <ShieldCheck className="w-5 h-5 text-primary-600" /> Rencana Pengembangan
          </div>
          <div className="mt-5 space-y-4">
            {ROADMAP.map((r, i) => (
              <div key={r.fase} className="flex gap-4">
                <span className="w-9 h-9 rounded-xl bg-primary-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0">{i + 1}</span>
                <div>
                  <div className="text-xs font-extrabold tracking-widest text-primary-500 uppercase">{r.fase}</div>
                  <p className="text-sm text-slate-600 leading-6 mt-0.5">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/kontak" className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-primary-600 transition">Hubungi Admin <ArrowRight className="w-4 h-4" /></Link>
          <Link href="/pengumuman" className="inline-flex items-center gap-2 bg-white border border-[#ece4d4] px-6 py-3 rounded-full text-sm font-bold text-navy hover:bg-softblue transition">Lihat Pengumuman</Link>
        </div>
      </section>
    </div>
  );
}
