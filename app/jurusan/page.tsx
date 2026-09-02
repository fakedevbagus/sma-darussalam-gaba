import PageHeader from "@/components/PageHeader";
import GlowCard from "@/components/GlowCard";
import Link from "next/link";
import Image from "next/image";
import { JURUSAN } from "@/lib/demo-data";
import { ArrowRight, Scale } from "lucide-react";

export const metadata = { title: "Program Jurusan" };

type Jurusan = (typeof JURUSAN)[number];

/**
 * Baris tabel perbandingan — HANYA field yang dimiliki KEDUA entri JURUSAN.
 * `careers` sengaja tidak ditampilkan: daftar prospek karier di demo-data
 * tidak dapat diverifikasi sebagai kebijakan sekolah yang dipublikasikan.
 */
const COMPARISON_ROWS: { label: string; value: (j: Jurusan) => string }[] = [
  { label: "Nama Lengkap", value: (j) => j.full },
  { label: "Fokus Pembelajaran", value: (j) => j.desc },
  { label: "Mata Pelajaran Peminatan", value: (j) => j.subjects.join(", ") },
];

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

        {/* ── Perbandingan MIPA vs IPS (pola tabel sama dengan sarana di /profil/identitas) ── */}
        <div className="mt-6 max-w-5xl mx-auto bg-white rounded-[28px] p-6 shadow-card border border-[#ece4d4]">
          <div className="flex items-center gap-2 text-navy font-display font-bold"><Scale className="w-5 h-5 text-primary-600" /> Perbandingan {JURUSAN[0]?.name} &amp; {JURUSAN[1]?.name}</div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <caption className="text-left text-xs text-slate-500 pb-3">
                Ringkasan berdampingan kedua program jurusan — rincian lengkap tersedia di halaman masing-masing jurusan.
              </caption>
              <thead>
                <tr className="text-left text-[10px] font-extrabold tracking-widest text-slate-500 uppercase border-b border-[#ece4d4]">
                  <th scope="col" className="py-2 pr-4">Aspek</th>
                  {JURUSAN.map((j) => (
                    <th scope="col" key={j.slug} className="py-2 pr-4">
                      {j.name}
                      <span className="block text-[10px] font-semibold normal-case tracking-normal text-slate-400">{j.full}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-slate-50 last:border-0 align-top">
                    <th scope="row" className="py-2.5 pr-4 text-left font-bold text-navy whitespace-nowrap">{row.label}</th>
                    {JURUSAN.map((j) => (
                      <td key={j.slug} className="py-2.5 pr-4 text-slate-600 leading-6">{row.value(j)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-[11px] text-slate-400">
              Pelajari lebih lanjut:{" "}
              {JURUSAN.map((j, i) => (
                <span key={j.slug}>
                  {i > 0 && " · "}
                  <Link href={`/jurusan/${j.slug}`} className="font-bold text-primary-600 hover:underline">{j.name}</Link>
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
