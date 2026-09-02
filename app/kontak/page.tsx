"use client";
import PageHeader from "@/components/PageHeader";
import { MapPin, Phone, Mail, Clock, Send, Loader2, ExternalLink, Navigation } from "lucide-react";
import { useState } from "react";
import { SCHOOL, DAPODIK, WHATSAPP_READY } from "@/config/school";
import CopyButton from "@/components/CopyButton";

/** Alamat lengkap + kode pos — untuk teks & tombol "Salin Alamat". */
const FULL_ADDRESS = `${SCHOOL.address}, ${SCHOOL.kodePos}`;

/** Tautan rute Google Maps ke koordinat Dapodik sekolah (API gratis, tanpa kunci). */
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${DAPODIK.koordinat.lat},${DAPODIK.koordinat.lng}`;

const FAQ = [
  { q: "Bagaimana mendaftarkan anak?", a: "Via halaman PPDB Online atau hubungi admin pada jam kerja." },
  { q: "Apakah ada beasiswa?", a: "Ya — beasiswa prestasi & ekonomi. Detail di halaman Profil." },
  { q: "Jam sekolah?", a: "Kegiatan belajar 07.00–16.00 WIB, Sabtu 08.00–12.00." },
];

export default function KontakPage() {
  const [open, setOpen] = useState<number|null>(null);
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const f = new FormData(e.currentTarget);
    if (f.get("website")) { setSent(true); return; } // honeypot anti-spam
    const msg = `Halo Admin SMA Darussalam 👋\n\nNama: ${f.get("nama")}\nEmail: ${f.get("email")}\nWA: ${f.get("wa") || "-"}\nSubjek: ${f.get("subjek")}\n\nPesan:\n${f.get("pesan")}`;
    window.open(`https://wa.me/${SCHOOL.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
    setPending(false);
  }

  return (
    <div>
      <PageHeader badge="KONTAK • HUBUNGI KAMI" title="Kami Siap" accent="Membantu" desc="Punya pertanyaan soal PPDB, akademik atau kunjungan? Tim friendly kami jawab dalam 1×24 jam." img="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop" breadcrumb="Layanan / Kontak" />

      <section className="max-w-[1280px] mx-auto px-6">
        {/* Satu kartu info gabungan */}
        <div className="card-warm p-7 md:p-9">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-11 h-11 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-blue-glow"><MapPin className="w-5 h-5" /></span>
            <div>
              <h2 className="font-display font-semibold text-xl text-navy leading-tight">Informasi Kontak</h2>
              <p className="text-xs text-slate-500">Senang mendengar dari Anda — hubungi kami lewat saluran di bawah.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {[
              { icon: MapPin, label: "Alamat", value: SCHOOL.address, href: SCHOOL.mapOpenUrl, cta: "Lihat di Maps", copy: undefined },
              { icon: Phone, label: "Telepon / WhatsApp", value: WHATSAPP_READY ? `${SCHOOL.phone} • WA ${SCHOOL.whatsappDisplay}` : `WA ${SCHOOL.whatsappDisplay}`, href: SCHOOL.social.whatsapp, cta: "Chat WhatsApp", copy: WHATSAPP_READY ? SCHOOL.phone : undefined },
              { icon: Mail, label: "Email", value: SCHOOL.email, href: `mailto:${SCHOOL.email}`, cta: "Kirim Email", copy: SCHOOL.email },
              { icon: Clock, label: "Jam Kerja", value: `${SCHOOL.hours} • Sabtu 08.00–12.00`, copy: undefined },
            ].map((c, i) => (
              <div key={i} className="flex gap-4 min-w-0">
                <span className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center shrink-0"><c.icon className="w-5 h-5" /></span>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">{c.label}</div>
                  <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 mt-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 leading-6 [overflow-wrap:anywhere]">{c.value}</p>
                    {c.copy && <CopyButton value={c.copy} label="Salin" />}
                  </div>
                  {c.href && <a href={c.href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex text-xs font-bold text-primary-600 hover:underline">{c.cta} →</a>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="bg-white rounded-[36px] p-8 shadow-card border border-[#ece4d4]">
            {sent ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">✓</div>
                <h3 className="font-display font-extrabold text-xl text-navy mt-4">Pesan Terkirim! 🎉</h3>
                <p className="text-sm text-slate-600 mt-2">Kami akan merespons maksimal 1×24 jam kerja.</p>
                <button onClick={()=>setSent(false)} className="mt-6 btn-navy">Kirim Pesan Lain</button>
              </div>
            ) : (
              <>
                <h3 className="font-extrabold text-xl text-navy flex gap-2 items-center"><Send className="w-5 h-5 text-primary-600" /> Kirim Pesan</h3>
                <p className="text-sm text-slate-600 mt-2">Isi form berikut — kami balas via email/WA maksimal 1 hari kerja.</p>
                <form onSubmit={submit} className="mt-6 grid sm:grid-cols-2 gap-4">
                  {/* Honeypot anti-spam — tersembunyi dari manusia */}
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                  <input required name="nama" placeholder="Nama Lengkap" className="input" />
                  <input required name="email" type="email" placeholder="Email" className="input" />
                  <input name="wa" placeholder="No. WhatsApp (opsional)" className="input" />
                  <input required name="subjek" placeholder="Subjek" className="input" />
                  <textarea required rows={5} name="pesan" placeholder="Tulis pesan Anda..." className="sm:col-span-2 resize-none input" />
                  <button disabled={pending} className="sm:col-span-2 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl font-bold hover:brightness-105 hover:scale-[1.02] transition shadow-[0_10px_30px_rgba(37,211,102,0.35)] disabled:opacity-60 disabled:cursor-not-allowed">{pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Kirim via WhatsApp</button>
                </form>
              </>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] overflow-hidden shadow-card border border-[#ece4d4] bg-white p-2">
              <iframe title="Peta lokasi SMA Darussalam" src={SCHOOL.mapEmbedUrl} className="w-full h-[220px] rounded-[20px] border-0" loading="lazy" />
              <div className="p-4">
                <div className="text-xs font-bold text-navy">{SCHOOL.name}</div>
                <div className="text-xs text-slate-500 mt-1">{FULL_ADDRESS}</div>
                <p className="mt-2 text-[11px] text-slate-400">Titik koordinat sekolah: <b className="text-navy">{DAPODIK.koordinat.lat}, {DAPODIK.koordinat.lng}</b></p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a href={SCHOOL.mapOpenUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-navy text-white px-4 py-2.5 rounded-full text-xs font-extrabold hover:bg-primary-600 transition">Buka di Google Maps <ExternalLink className="w-3.5 h-3.5" /></a>
                  <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 border border-primary-100 px-4 py-2.5 rounded-full text-xs font-extrabold hover:bg-softblue transition">Petunjuk Arah <Navigation className="w-3.5 h-3.5" /></a>
                  <CopyButton value={FULL_ADDRESS} label="Salin Alamat" showLabel className="!rounded-full border border-primary-100 !px-4 !py-2.5 !bg-primary-50 !text-primary-700 hover:!bg-softblue hover:!text-primary-700" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-lg text-navy mb-4">Pertanyaan Umum</h3>
              <div className="space-y-3">
                {FAQ.map((f,i)=> (
                  <div key={i} className="bg-white rounded-2xl border border-[#ece4d4] overflow-hidden">
                    <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex justify-between p-4 text-left items-center gap-3">
                      <span className="flex gap-3 items-center"><HelpCircleIcon /><span className="font-bold text-navy text-sm">{f.q}</span></span>
                      <span className={`text-slate-400 transition ${open===i?"rotate-180":""}`}>▾</span>
                    </button>
                    {open===i && <div className="px-4 pb-4 text-sm leading-6 text-slate-600">{f.a}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800">
              Ingin kunjungan langsung? Booking via WA admin agar kami siapkan tur kampus privat untuk keluarga Anda.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HelpCircleIcon() {
  return <svg className="w-4 h-4 text-primary-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>;
}
