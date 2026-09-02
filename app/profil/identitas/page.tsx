import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CountUp from "@/components/CountUp";
import { SectionHeading } from "@/components/SectionHeading";
import { SCHOOL, DAPODIK, DAPO_URL, WHATSAPP_READY } from "@/config/school";
import {
  Building2, Hash, Award, Globe, MapPin, Phone, Mail, User, FileText,
  BadgeCheck, Users, GraduationCap, DoorOpen, Landmark, ExternalLink,
  Banknote, MapPinned,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Identitas Sekolah",
  description: `Identitas resmi & data Dapodik ${SCHOOL.name} — NPSN ${SCHOOL.npsn}, ${SCHOOL.kecamatan}, ${SCHOOL.kabupaten}, ${SCHOOL.provinsi}.`,
};

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

export default function IdentitasPage() {
  const pd = DAPODIK.pesertaDidik;
  const pdLaki = Math.round((pd.lakiLaki / pd.total) * 100);
  const pdPerempuan = Math.round((pd.perempuan / pd.total) * 100);
  const ptkGuru = Math.round((DAPODIK.ptk.guru / DAPODIK.ptk.total) * 100);
  const ptkTendik = 100 - ptkGuru;

  const items = [
    { icon: Building2, label: "Nama Sekolah", value: SCHOOL.name },
    { icon: Hash, label: "NPSN", value: SCHOOL.npsn },
    { icon: BadgeCheck, label: "Status", value: `${DAPODIK.status} • ${DAPODIK.bentukPendidikan}` },
    { icon: Landmark, label: "Status Kepemilikan", value: DAPODIK.kepemilikan },
    { icon: User, label: "Kepala Sekolah", value: SCHOOL.principal.name },
    { icon: Globe, label: "Tahun Berdiri", value: String(SCHOOL.founded) },
    { icon: MapPin, label: "Alamat", value: SCHOOL.address },
    ...(WHATSAPP_READY ? [{ icon: Phone, label: "Telepon", value: SCHOOL.phone }] : []),
    { icon: Mail, label: "Email", value: SCHOOL.email },
    { icon: Award, label: "Akreditasi", value: SCHOOL.akreditasi },
  ];

  const legal = [
    { icon: FileText, label: "SK Pendirian", value: SCHOOL.skPendirian, date: SCHOOL.tanggalSkPendirian },
    { icon: FileText, label: "SK Izin Operasional", value: SCHOOL.skIzinOperasional, date: SCHOOL.tanggalSkIzinOperasional },
  ];

    return (
    <div>
      <PageHeader badge="PROFIL • IDENTITAS" title="Identitas" accent="Sekolah" desc="Data resmi & identitas lembaga — tersinkron dengan Data Pokok Pendidikan (Dapodik)." img="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop" breadcrumb={[{ label: "Profil", href: "/profil" }, { label: "Identitas" }]} />

      <section className="max-w-[1280px] mx-auto px-6 pb-16">
        {/* ── 01. Identitas Lembaga ── */}
        <SectionHeading eyebrow="Identitas" title="Data Resmi Lembaga" desc="Informasi lembaga sesuai Dapodik Kemendikdasmen" number="01" />
        <div className="mt-8 max-w-4xl mx-auto bg-white rounded-[28px] border border-[#ece4d4] shadow-card overflow-hidden">
          <dl className="divide-y divide-[#f2ece0]">
            {items.map((it) => (
              <div key={it.label} className="grid sm:grid-cols-[220px_1fr] gap-1 sm:gap-4 px-6 py-4">
                <dt className="flex items-center gap-2.5 text-sm font-bold text-slate-500">
                  <it.icon className="w-4 h-4 text-primary-600 shrink-0" />
                  {it.label}
                </dt>
                <dd className="text-sm font-semibold text-navy break-words">{it.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── 02. Legalitas ── */}
        <div className="mt-12">
          <SectionHeading eyebrow="Legalitas" title="Dokumen Resmi" number="02" />
          <div className="mt-6 max-w-4xl mx-auto bg-gradient-to-br from-primary-50/70 to-white rounded-[20px] border border-primary-100 shadow-card overflow-hidden divide-y divide-primary-100/60">
            {legal.map((l) => (
              <div key={l.label} className="flex gap-4 items-start px-6 py-4">
                <span className="w-10 h-10 rounded-xl bg-white text-primary-700 flex items-center justify-center shrink-0 shadow-card"><l.icon className="w-5 h-5" /></span>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">{l.label}</div>
                  <div className="font-bold text-navy mt-1 text-sm break-words">{l.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Tanggal: {l.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 03. Rekap Dapodik ── */}
        <div className="mt-12">
          <SectionHeading eyebrow="Dapodik" title="Rekap Data Pokok Pendidikan" desc="Data terverifikasi dari portal Dapodik Kemendikdasmen" number="03" />

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {/* Peserta Didik */}
            <div className="bg-white rounded-[28px] p-6 shadow-card border border-[#ece4d4]">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-blue-glow"><GraduationCap className="w-5 h-5" /></span>
                <div><div className="text-2xl font-extrabold text-navy tabular-nums"><CountUp value={String(pd.total)} /></div><div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Peserta Didik</div></div>
              </div>
              <div className="mt-5 space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600"><span>Laki-laki</span><span>{pd.lakiLaki} • {pdLaki}%</span></div>
                  <div className="mt-1"><Bar value={pdLaki} color="bg-primary-500" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600"><span>Perempuan</span><span>{pd.perempuan} • {pdPerempuan}%</span></div>
                  <div className="mt-1"><Bar value={pdPerempuan} color="bg-accent" /></div>
                </div>
              </div>
            </div>
            {/* Rombel */}
            <div className="bg-white rounded-[28px] p-6 shadow-card border border-[#ece4d4]">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-mint text-white flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.4)]"><DoorOpen className="w-5 h-5" /></span>
                <div><div className="text-2xl font-extrabold text-navy tabular-nums"><CountUp value={String(DAPODIK.rombel)} /></div><div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rombongan Belajar</div></div>
              </div>
              <p className="mt-5 text-sm text-slate-600 leading-6">Kelas diorganisasi menjadi {DAPODIK.rombel} rombongan belajar (rombel) lintas tingkat X–XII.</p>
            </div>
            {/* PTK */}
            <div className="bg-white rounded-[28px] p-6 shadow-card border border-[#ece4d4]">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-sun text-navy flex items-center justify-center shadow-yellow"><Users className="w-5 h-5" /></span>
                <div><div className="text-2xl font-extrabold text-navy tabular-nums"><CountUp value={String(DAPODIK.ptk.total)} /></div><div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Guru &amp; Tendik</div></div>
              </div>
              <div className="mt-5 space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600"><span>Guru</span><span>{DAPODIK.ptk.guru} • {ptkGuru}%</span></div>
                  <div className="mt-1"><Bar value={ptkGuru} color="bg-sun" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600"><span>Tenaga Kependidikan</span><span>{DAPODIK.ptk.tendik} • {ptkTendik}%</span></div>
                  <div className="mt-1"><Bar value={ptkTendik} color="bg-primary-400" /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sarana & Prasarana */}
          <div className="mt-6 max-w-5xl mx-auto bg-white rounded-[28px] p-6 shadow-card border border-[#ece4d4]">
            <div className="flex items-center gap-2 text-navy font-display font-bold"><Landmark className="w-5 h-5 text-primary-600" /> Sarana &amp; Prasarana</div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm min-w-[420px]">
                <thead>
                  <tr className="text-left text-[10px] font-extrabold tracking-widest text-slate-500 uppercase border-b border-[#ece4d4]">
                    <th className="py-2 pr-4">Ruang</th><th className="py-2 pr-4">Jumlah</th><th className="py-2">Kondisi*</th>
                  </tr>
                </thead>
                <tbody>
                  {DAPODIK.sarana.map((s) => (
                    <tr key={s.nama} className="border-b border-slate-50 last:border-0">
                      <td className="py-2.5 pr-4 font-bold text-navy">{s.nama}</td>
                      <td className="py-2.5 pr-4 tabular-nums">{s.jumlah} ruang</td>
                      <td className="py-2.5"><span className="rounded-full bg-amber-100 text-amber-700 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">{s.kondisi}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-[11px] text-slate-400">*Kondisi ruang semester aktif menurut rekap Dapodik. Tidak ada ruang dengan kerusakan berat.</p>
            </div>
          </div>

          {/* Indikator Kualitas Dapodik */}
          <div className="mt-6 max-w-5xl mx-auto bg-gradient-to-br from-navy to-primary-800 rounded-[28px] p-6 md:p-8 text-white shadow-3d">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-display font-bold"><Banknote className="w-5 h-5 text-sun" /> Indikator Kualitas Dapodik</div>
              <div className="glass-dark rounded-full px-4 py-2 border border-white/20 flex items-center gap-2">
                <span className="relative flex w-2.5 h-2.5"><span className="absolute inline-flex w-full h-full rounded-full bg-mint opacity-75 animate-ping" /><span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-mint" /></span>
                <span className="text-[11px] font-extrabold tracking-widest uppercase text-white/70">Skor Keseluruhan</span>
                <b className="font-display text-lg tabular-nums text-white">{DAPODIK.indikator.skor}%</b>
              </div>
            </div>
            <div className="mt-5 grid gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/10">
              {[
                { label: "Kelengkapan", value: DAPODIK.indikator.kelengkapan, detail: DAPODIK.indikator.rincian.kelengkapan, bar: "bg-sun" },
                { label: "Validitas", value: DAPODIK.indikator.validitas, detail: DAPODIK.indikator.rincian.validitas, bar: "bg-accent" },
                { label: "Kemutakhiran", value: DAPODIK.indikator.mutakhir, detail: DAPODIK.indikator.rincian.mutakhir, bar: "bg-mint" },
              ].map((ind) => (
                <div key={ind.label} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-extrabold tracking-widest uppercase text-white/70">{ind.label}</span>
                    <span className="font-display font-bold text-xl tabular-nums text-white">{ind.value}%</span>
                  </div>
                  <div className="mt-2"><Bar value={ind.value} color={ind.bar} /></div>
                  <ul className="mt-3 space-y-1.5">
                    {ind.detail.map((d) => (
                      <li key={d.label} className="text-[11px] text-white/75 flex justify-between gap-2">
                        <span>{d.label}</span><span className="tabular-nums font-bold text-white/90">{d.value}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 04. Peta & Verifikasi ── */}
        <div className="mt-12">
          <SectionHeading eyebrow="Lokasi" title="Peta & Verifikasi" number="04" />
          <div className="mt-6 grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="rounded-[28px] overflow-hidden border-4 border-white shadow-3d">
              <iframe src={SCHOOL.mapEmbedUrl} width="100%" height="340" style={{ border: 0 }} loading="lazy" title={`Lokasi ${SCHOOL.name}`} />
            </div>
            <div className="bg-white rounded-[28px] p-6 shadow-card border border-[#ece4d4] flex flex-col">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center"><MapPinned className="w-5 h-5" /></span>
                <div className="font-bold text-navy">Koordinat &amp; Verifikasi</div>
              </div>
              <p className="mt-4 text-sm text-slate-600 leading-6">
                Titik koordinat sekolah: <b className="text-navy">{DAPODIK.koordinat.lat}, {DAPODIK.koordinat.lng}</b> — Desa Simpang Mesir, Kec. {SCHOOL.kecamatan}, Kab. {SCHOOL.kabupaten}, {SCHOOL.provinsi}.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={SCHOOL.mapOpenUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-navy text-white px-4 py-2.5 rounded-full text-xs font-extrabold hover:bg-primary-600 transition">Buka di Google Maps <ExternalLink className="w-3.5 h-3.5" /></a>
                <a href={DAPO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 border border-primary-100 px-4 py-2.5 rounded-full text-xs font-extrabold hover:bg-softblue transition">Verifikasi di Dapodik <ExternalLink className="w-3.5 h-3.5" /></a>
              </div>
              <p className="mt-4 text-[11px] text-slate-400">Seluruh angka di halaman ini bersumber dari rekap portal Dapodik Kemendikdasmen untuk NPSN {SCHOOL.npsn}.</p>
              <Link href="/profil" className="mt-auto pt-4 text-sm font-extrabold text-primary-600 inline-flex gap-1 items-center hover:gap-2 transition-all">Kembali ke Profil Sekolah →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}