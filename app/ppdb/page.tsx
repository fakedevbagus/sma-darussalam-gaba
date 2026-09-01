"use client";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";
import Link from "next/link";
import { SCHOOL } from "@/config/school";
import {
  Check, Clock, Wallet, Gift, HelpCircle, ChevronDown, Phone, FileText, ArrowRight,
  Search, Users, ClipboardCheck, BadgeCheck, CalendarCheck, PartyPopper, CheckCircle2,
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
  { q: "Bagaimana cek status?", a: "Gunakan kolom Cek Status di bagian bawah halaman ini, masukkan nomor registrasi Anda." },
  { q: "Apakah ada beasiswa?", a: "Ya! Beasiswa prestasi akademik, tahfidz & ekonomi hingga 100% uang pangkal + SPP." },
];

export default function PPDBPage() {
  const [jalur, setJalur] = useState<string>("zonasi");
  const [sent, setSent] = useState(false);
  const [regNumber, setRegNumber] = useState("");
  const [nama, setNama] = useState("");
  const [openFaq, setOpenFaq] = useState<number|null>(0);
  const [statusNo, setStatusNo] = useState("");
  const [statusResult, setStatusResult] = useState<null | { found: boolean; name?: string; jalurLabel?: string; statusLabel?: string }>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("website")) { setSent(true); return; } // honeypot anti-spam
    setNama(String(f.get("nama") || "Calon Siswa"));
    const num = `PPDB-2026-${String(Math.floor(Math.random()*900)+100).padStart(4,"0")}`;
    setRegNumber(num);
    setSent(true);
  }

  function checkStatus() {
    if (!statusNo.trim()) return;
    // Demo: PPDB-2026-0001 s/d 0003 dikenali
    const known: Record<string, { name: string; jalurLabel: string; statusLabel: string }> = {
      "PPDB-2026-0001": { name: "Aisyah Rahmadani Putri", jalurLabel: "Zonasi", statusLabel: "Menunggu Verifikasi" },
      "PPDB-2026-0002": { name: "Bagas Prakoso", jalurLabel: "Prestasi", statusLabel: "Terverifikasi" },
      "PPDB-2026-0003": { name: "Citra Ayu Lestari", jalurLabel: "Afirmasi", statusLabel: "Diterima" },
    };
    const r = known[statusNo.trim().toUpperCase()];
    setStatusResult(r ? { found: true, ...r } : { found: false });
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
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex gap-3"><Check className="w-5 h-5 text-emerald-600 shrink-0" /> <span><b>Gratis</b> trial class 1 minggu</span></div>
              <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 flex gap-3"><Clock className="w-5 h-5 text-primary-600 shrink-0" /> <span>Pengumuman <b>3 hari</b> setelah tes</span></div>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3"><Gift className="w-5 h-5 text-amber-600 shrink-0" /> <span><b>Cashback</b> 500rb ajak teman</span></div>
            </div>
          </div>

          <div id="biaya" className="lg:col-span-5 space-y-4">
            <div className="bg-gradient-to-br from-navy to-primary-800 text-white rounded-[36px] p-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/70"><Wallet className="w-4 h-4" /> BIAYA PENDIDIKAN</div>
                <div className="mt-3">
                  <div className="text-sm text-white/70 line-through">Uang pangkal Rp12.000.000</div>
                  <div className="text-3xl font-extrabold">Rp8,4 Jt<span className="text-sm font-semibold text-white/70"> / diskon 30%</span></div>
                  <div className="text-xs bg-white text-navy inline-block px-2 py-1 rounded-full font-bold mt-2">HEMAT 3,6 JT • G1</div>
                </div>
                <div className="mt-5 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/15 text-sm">
                  <div className="flex justify-between"><span>SPP / bulan</span><b>Rp1,2 Jt</b></div>
                  <div className="flex justify-between mt-2"><span>Seragam 3 stel</span><b>Rp1,1 Jt</b></div>
                </div>
              </div>
            </div>
            <div id="beasiswa" className="bg-white rounded-[28px] p-6 shadow-card border border-[#ece4d4]">
              <h4 className="font-bold text-navy flex items-center gap-2"><Gift className="w-4 h-4 text-amber-600" /> Beasiswa Hingga 100%</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Akademik (rank 1–3 SMP)</li>
                <li>• Tahfidz 5+ juz</li>
                <li>• Prestasi olahraga/seni nasional</li>
                <li>• Ekonomi (KIP/SKTM)</li>
              </ul>
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
                  <div className="flex gap-3"><Phone className="w-4 h-4 mt-0.5" /> 0812-3456-7890 (Bu Sari)</div>
                  <div className="flex gap-3"><Clock className="w-4 h-4 mt-0.5" /> Senin–Sabtu 08.00–16.00</div>
                </div>
                <div className="mt-6 bg-white/15 backdrop-blur rounded-2xl p-4 border border-white/20 relative">
                  <div className="text-xs font-bold">SISA KUOTA GELOMBANG 1</div>
                  <div className="text-2xl font-extrabold mt-1">37 / 180</div>
                  <div className="h-2 bg-white/20 rounded-full mt-3 overflow-hidden"><div className="h-full w-[21%] bg-amber-400" /></div>
                </div>
              </div>

              <div className="lg:col-span-7 p-8">
                {sent ? (
                  <div className="py-14 text-center">
                    <span className="w-16 h-16 mx-auto rounded-full bg-primary-50 text-primary-700 flex items-center justify-center"><PartyPopper className="w-8 h-8" /></span>
                    <h2 className="font-display font-extrabold text-2xl text-navy mt-5">Pendaftaran Berhasil!</h2>
                    <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">Simpan nomor pendaftaran untuk cek status selanjutnya.</p>
                    <div className="mt-5 inline-flex bg-navy text-white px-5 py-3 rounded-2xl font-mono font-bold tracking-widest rotate-[-1deg]">{regNumber}</div>
                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                      <a href={`https://wa.me/${SCHOOL.whatsapp}?text=${encodeURIComponent(`Halo panitia PPDB SMA Darussalam 👋\n\nSaya ${nama}, baru saja mendaftar online dengan nomor ${regNumber}.\nMohon informasi langkah selanjutnya untuk verifikasi berkas.\n\nTerima kasih.`)}`} target="_blank" rel="noopener noreferrer" className="btn-gold">Konfirmasi via WhatsApp</a>
                      <Link href="/" className="btn-navy">Kembali ke Beranda</Link>
                      <button onClick={()=>{setStatusNo(regNumber); checkStatus();}} className="btn-outline">Cek Status Sekarang</button>
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
                    <button className="sm:col-span-2 inline-flex justify-center items-center gap-2 bg-navy text-white py-4 rounded-xl font-bold hover:bg-primary-800 transition"><Send2 /> Kirim Pendaftaran</button>
                    <p className="sm:col-span-2 text-xs text-slate-500 text-center flex gap-2 justify-center items-start"><CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" /> Data demo — tidak dikirim ke server. Dengan mendaftar, Anda menyetujui syarat & ketentuan PPDB.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Cek Status */}
        <section id="cek-status" className="mt-12">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex gap-2 items-center bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-xs font-bold"><Search className="w-3.5 h-3.5" /> CEK STATUS PENDAFTARAN</div>
            <h2 className="font-display font-extrabold text-2xl text-navy mt-4">Sudah Mendaftar?</h2>
            <p className="text-sm text-slate-600 mt-2">Masukkan nomor pendaftaran untuk melihat status verifikasi & hasil seleksi.</p>
            <div className="mt-5 flex gap-2">
              <input value={statusNo} onChange={e=>{setStatusNo(e.target.value); setStatusResult(null);}} placeholder="cth. PPDB-2026-0001" className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-bold uppercase text-center focus:outline-none focus:ring-2 focus:ring-primary-500" onKeyDown={e=>e.key==="Enter"&&checkStatus()} />
              <button onClick={checkStatus} disabled={!statusNo.trim()} className="bg-navy text-white px-6 rounded-xl text-sm font-bold disabled:opacity-40">Cek</button>
            </div>

            {statusResult && !statusResult.found && (
              <div className="mt-5 bg-white rounded-2xl border border-slate-200 p-5 text-sm text-slate-600">Nomor pendaftaran tidak ditemukan. Coba contoh demo: <b>PPDB-2026-0001</b>.</div>
            )}
            {statusResult?.found && (
              <div className="mt-5 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card text-left">
                <div className="bg-emerald-50 text-emerald-700 px-6 py-4 font-bold text-sm flex gap-2 items-center"><BadgeCheck className="w-5 h-5" /> {statusResult.statusLabel}</div>
                <div className="divide-y divide-slate-100 px-6">
                  {[["Nomor",statusNo.toUpperCase()],["Nama",statusResult.name||"-"],["Jalur",statusResult.jalurLabel||"-"]].map(([k,v])=> (
                    <div key={k} className="flex justify-between py-3 text-sm"><span className="text-slate-500">{k}</span><b className="text-navy">{v}</b></div>
                  ))}
                </div>
              </div>
            )}
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
