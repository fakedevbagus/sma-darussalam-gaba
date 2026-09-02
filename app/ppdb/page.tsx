"use client";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";
import Link from "next/link";
import { SCHOOL } from "@/config/school";
import {
  Check, Clock, Wallet, Gift, HelpCircle, ChevronDown, Phone, FileText, ArrowRight,
  Users, ClipboardCheck, BadgeCheck, CalendarCheck, PartyPopper, CheckCircle2, Loader2,
} from "lucide-react";

const JALUR = [
  { value: "zonasi", label: "Zonasi", desc: "Domisili terdekat dengan sekolah", quota: 40 },
  { value: "afirmasi", label: "Afirmasi", desc: "Keluarga kurang mampu / berkebutuhan khusus", quota: 20 },
  { value: "prestasi", label: "Prestasi", desc: "Juara lomba & nilai rapor", quota: 15 },
  { value: "perpindahan_tugas_orang_tua", label: "Perpindahan Tugas Ortu", desc: "Pindah tugas PNS/TNI/Polri", quota: 5 },
] as const;

const STEPS = [
  { icon: ClipboardCheck, title: "Isi Formulir", desc: "Lengkapi data calon siswa secara daring." },
  { icon: FileText, title: "Verifikasi Berkas", desc: "Panitia memverifikasi NISN & kelengkapan data." },
  { icon: BadgeCheck, title: "Pengumuman", desc: "Hasil seleksi diumumkan via portal & WA." },
  { icon: CalendarCheck, title: "Daftar Ulang", desc: "Calon yang diterima daftar ulang di sekolah." },
];

const REQUIREMENTS = [
  "Ijazah SMP atau sederajat (asli & fotokopi)",
  "SKHUN / rapor semester terakhir",
  "Akta kelahiran",
  "Kartu keluarga",
  "Surat keterangan sehat",
  "Pas foto 3x4 (4 lembar)",
  "Bukti pembayaran formulir pendaftaran",
];

const FAQS = [
  { q: "Bagaimana cara mendaftar?", a: "Isi formulir online di bawah, unggah berkas yang diperlukan, dan tunggu verifikasi panitia — seluruh proses daring." },
  { q: "Apa saja jalur pendaftaran?", a: "Empat jalur: Zonasi, Afirmasi, Prestasi, dan Perpindahan Tugas Orang Tua — masing-masing punya kuota sendiri." },
  { q: "Bagaimana cek status?", a: "Panitia menghubungi setiap pendaftar langsung melalui WhatsApp. Balas pesan pendaftaranmu untuk menanyakan perkembangan." },
  { q: "Apakah ada beasiswa?", a: "Sekolah menyediakan jalur bantuan biaya pendidikan. Kategori dan besarannya ditetapkan setiap tahun ajaran — silakan tanyakan ke panitia PPDB." },
];

export default function PPDBPage() {
  const [jalur, setJalur] = useState<string>("zonasi");
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [nama, setNama] = useState("");
  const [openFaq, setOpenFaq] = useState<number|null>(0);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const f = new FormData(e.currentTarget);
    if (f.get("website")) { setSent(true); return; } // honeypot anti-spam

    const jalurLabel = JALUR.find(j => j.value === f.get("jalur"))?.label ?? String(f.get("jalur") ?? "-");
    const val = (k: string) => String(f.get(k) ?? "-").trim() || "-";

    setNama(val("nama"));

    const lines = [
      "Halo panitia PPDB SMA Darussalam.",
      "Saya ingin mendaftar dengan data berikut:",
      "",
      `Nama calon siswa: ${val("nama")}`,
      `Tempat/tanggal lahir: ${val("tempat_lahir")}, ${val("tanggal_lahir")}`,
      `NISN: ${val("nisn")}`,
      `Asal SMP: ${val("asal_smp")}`,
      `Jalur: ${jalurLabel}`,
      `Nama orang tua/wali: ${val("nama_orangtua")}`,
      `No. HP orang tua: ${val("hp_orangtua")}`,
      `Alamat: ${val("alamat")}`,
      "",
      "Mohon informasi langkah selanjutnya. Terima kasih.",
    ];

    const url = `https://wa.me/${SCHOOL.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    setPending(false);
  }

  return (
    <div>
      <PageHeader
        badge="PPDB 2026/2027 • GELOMBANG 1"
        title="PPDB" accent="Online"
        desc="Pendaftaran Peserta Didik Baru sepenuhnya daring. Isi formulir — panitia verifikasi & umumkan hasil via portal ini."
        img="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop"
        breadcrumb="Layanan / PPDB Online"
      />

      <section className="max-w-[1280px] mx-auto px-6">
        {/* Langkah */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s,i)=> (
            <div key={s.title} className="bg-white rounded-[28px] p-5 shadow-card border border-[#ece4d4] hover:-translate-y-1 transition">
              <div className="text-[10px] font-bold tracking-[0.25em] text-accent">LANGKAH 0{i+1}</div>
              <span className="mt-3 w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center"><s.icon className="w-5 h-5" /></span>
              <h3 className="font-bold text-navy mt-3">{s.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-5">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Kuota per jalur */}
        <div className="mt-8 text-center text-[11px] font-bold tracking-widest text-slate-500 uppercase">Kuota Pendaftaran Per Jalur</div>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {JALUR.map(j=> (
            <div key={j.value} className="bg-white rounded-2xl p-5 text-center shadow-card border border-[#ece4d4] card-3d">
              <span className="w-10 h-10 mx-auto rounded-full bg-primary-50 text-primary-700 flex items-center justify-center"><Users className="w-5 h-5" /></span>
              <div className="text-2xl font-extrabold gradient-text mt-3">{j.quota}</div>
              <div className="font-bold text-navy text-sm mt-1">{j.label}</div>
              <div className="text-xs text-slate-500">Kuota tersedia</div>
            </div>
          ))}
        </div>

        {/* Persyaratan + Biaya */}
        <div className="mt-8 grid lg:grid-cols-12 gap-6">
          <div id="persyaratan" className="lg:col-span-7 bg-white rounded-[36px] p-8 shadow-card border border-[#ece4d4]">
            <h3 className="font-extrabold text-xl text-navy flex gap-2 items-center"><FileText className="w-5 h-5 text-primary-600" /> Persyaratan Berkas</h3>
            <ul className="mt-5 space-y-2.5">
              {REQUIREMENTS.map(r=> (<li key={r} className="flex gap-3 text-sm text-navy"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-primary-600" />{r}</li>))}
            </ul>
            <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex gap-3"><Check className="w-5 h-5 text-emerald-600 shrink-0" /> <span><b>Konsultasi</b> gratis dengan panitia</span></div>
              <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 flex gap-3"><Clock className="w-5 h-5 text-primary-600 shrink-0" /> <span>Pengumuman <b>3 hari</b> setelah tes</span></div>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3"><Gift className="w-5 h-5 text-amber-600 shrink-0" /> <span>Informasi <b>keringanan biaya</b> via panitia</span></div>
            </div>
          </div>

          <div id="biaya" className="lg:col-span-5 space-y-4">
            <div className="bg-gradient-to-br from-navy to-primary-800 text-white rounded-[36px] p-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/70"><Wallet className="w-4 h-4" /> BIAYA PENDIDIKAN</div>
                <div className="mt-3">
                  <div className="text-2xl font-extrabold leading-tight">Informasi biaya menyusul</div>
                  <p className="text-sm text-white/70 mt-2 leading-6">Rincian biaya pendidikan tahun ajaran 2026/2027 sedang difinalisasi. Hubungi panitia PPDB untuk keterangan resmi.</p>
                </div>
                <a href={SCHOOL.social.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 bg-white text-navy px-5 py-3 rounded-full text-sm font-extrabold hover:scale-[1.02] transition">Tanya Panitia PPDB</a>
              </div>
            </div>
            <div id="beasiswa" className="bg-white rounded-[28px] p-6 shadow-card border border-[#ece4d4]">
              <h4 className="font-bold text-navy flex items-center gap-2"><Gift className="w-4 h-4 text-amber-600" /> Program Beasiswa</h4>
              <p className="mt-3 text-sm text-slate-600 leading-6">Sekolah menyediakan jalur bantuan biaya pendidikan. Kategori dan besaran ditetapkan setiap tahun ajaran — tanyakan ke panitia PPDB.</p>
            </div>
          </div>
        </div>

        {/* Pilih Jalur */}
        <div className="mt-8 text-center text-[11px] font-bold tracking-widest text-slate-500 uppercase">Pilih Jalur Pendaftaran</div>
        <div className="mt-4 grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {JALUR.map((j,i)=> (
            <button key={j.value} type="button" onClick={()=>setJalur(j.value)}
              className={`relative text-left rounded-[28px] p-5 border-2 transition bg-white ${jalur===j.value?"border-primary-600 shadow-float":"border-slate-200 hover:border-primary-300"}`}>
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${jalur===j.value?"bg-primary-600 text-white":"bg-slate-100 text-slate-500"}`}>{i+1}</span>
                <div className="font-bold text-navy">{j.label}</div>
              </div>
              <p className="text-sm text-slate-600 mt-2 leading-5">{j.desc}</p>
              {jalur===j.value && <span className="absolute right-4 top-4 w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px]">✓</span>}
            </button>
          ))}
        </div>

        {/* Formulir */}
        <section id="form" className="mt-10">
          <div className="bg-white rounded-[36px] shadow-3d border-2 border-primary-200 overflow-hidden">
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-5 bg-gradient-to-br from-primary-600 to-primary-800 text-white p-8 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
                <h3 className="font-display font-extrabold text-2xl relative">Form Pendaftaran Online</h3>
                <p className="text-white/80 mt-3 text-sm leading-6 relative">Isi data lengkap — admin hubungi via WA dalam 1×24 jam untuk jadwal verifikasi.</p>
                <div className="mt-6 space-y-3 text-sm relative">
                  <div className="flex gap-3"><Phone className="w-4 h-4 mt-0.5" /> Kontak panitia via WhatsApp</div>
                  <div className="flex gap-3"><Clock className="w-4 h-4 mt-0.5" /> Senin–Sabtu 08.00–16.00</div>
                </div>
                <div className="mt-6 bg-white/15 backdrop-blur rounded-2xl p-4 border border-white/20 relative">
                  <div className="text-xs font-bold">DAYA TAMPUNG</div>
                  <div className="text-sm mt-2 leading-6 text-white/85">Kuota per jalur tercantum di bagian atas halaman. Ketersediaan terkini dikonfirmasi oleh panitia.</div>
                </div>
              </div>

              <div className="lg:col-span-7 p-8">
                {sent ? (
                  <div className="py-14 text-center">
                    <span className="w-16 h-16 mx-auto rounded-full bg-primary-50 text-primary-700 flex items-center justify-center"><PartyPopper className="w-8 h-8" /></span>
                    <h2 className="font-display font-extrabold text-2xl text-navy mt-5">Data terkirim ke WhatsApp panitia</h2>
                    <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">Terima kasih, {nama}. Jendela WhatsApp sudah terbuka dengan data pendaftaranmu — tekan kirim di WhatsApp agar panitia menerimanya. Pendaftaran dianggap masuk setelah panitia membalas.</p>
                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                      <a href={SCHOOL.social.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold">Buka WhatsApp Panitia</a>
                      <Link href="/" className="btn-navy">Kembali ke Beranda</Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
                    {/* Honeypot anti-spam — tersembunyi dari manusia */}
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden sm:col-span-2" />
                    <input required minLength={3} name="nama" placeholder="Nama Lengkap Calon Siswa *" className="sm:col-span-2 input" />
                    <input required name="tempat_lahir" placeholder="Tempat Lahir *" className="input" />
                    <input required type="date" name="tanggal_lahir" className="border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    <input required inputMode="numeric" maxLength={10} name="nisn" placeholder="NISN (10 digit) *" className="input" />
                    <input required name="asal_smp" placeholder="Asal SMP *" className="input" />
                    <select name="jalur" value={jalur} onChange={e=>setJalur(e.target.value)} className="sm:col-span-2 input">
                      {JALUR.map(j=> (<option key={j.value} value={j.value}>Jalur {j.label} — {j.desc}</option>))}
                    </select>
                    <input required name="nama_orangtua" placeholder="Nama Orang Tua/Wali *" className="input" />
                    <input required name="hp_orangtua" placeholder="No. HP Orang Tua *" className="input" />
                    <textarea required rows={3} name="alamat" placeholder="Alamat Lengkap *" className="sm:col-span-2 resize-none input" />
                    <button disabled={pending} className="sm:col-span-2 inline-flex justify-center items-center gap-2 bg-navy text-white py-4 rounded-xl font-bold hover:bg-primary-800 transition disabled:opacity-60 disabled:cursor-not-allowed">{pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send2 />} Kirim Pendaftaran</button>
                    <p className="sm:col-span-2 text-xs text-slate-500 text-center flex gap-2 justify-center items-start"><CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" /> Setelah dikirim, data akan diteruskan ke WhatsApp panitia PPDB untuk diverifikasi. Dengan mendaftar, Anda menyetujui syarat & ketentuan PPDB.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-12">
          <h3 className="font-display font-extrabold text-2xl text-navy flex gap-2 items-center justify-center"><HelpCircle className="w-6 h-6 text-primary-600" /> FAQ PPDB</h3>
          <div className="mt-6 max-w-2xl mx-auto space-y-3">
            {FAQS.map((f,i)=> (
              <div key={i} className="bg-white rounded-2xl border border-[#ece4d4] overflow-hidden">
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full flex items-center justify-between gap-3 p-5 text-left">
                  <span className="font-bold text-navy text-sm">{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition shrink-0 ${openFaq===i?"rotate-180":""}`} />
                </button>
                {openFaq===i && <div className="px-5 pb-5 text-sm leading-6 text-slate-600">{f.a}</div>}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="/faq" className="text-sm font-bold text-primary-600">Lihat semua FAQ sekolah →</a>
          </div>
        </section>
      </section>
    </div>
  );
}

function Send2() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>;
}
