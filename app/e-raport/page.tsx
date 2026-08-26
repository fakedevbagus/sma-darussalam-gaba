import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { Shield, Clock, ArrowRight } from "lucide-react";

export default function ERaportPage() {
  return (
    <div>
      <PageHeader badge="PORTAL AKADEMIK • SEGERA HADIR" title="E-Raport" accent="Digital" desc="Portal akademik (nilai, presensi, rapor) — sengaja non-aktif di versi demo production ini. Aktifkan nanti saat backend siap." img="https://images.unsplash.com/photo-1454165205744-3b78555e5572?q=80&w=800&auto=format&fit=crop" breadcrumb="Layanan / E-Raport" />
      <section className="max-w-[800px] mx-auto px-6 -mt-2">
        <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-card border border-slate-100 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto"><Shield className="w-8 h-8" /></div>
          <h2 className="font-display font-extrabold text-2xl text-navy mt-4">Portal Akademik Dinonaktifkan</h2>
          <p className="text-sm leading-6 text-slate-600 mt-3 max-w-xl mx-auto">
            Sesuai permintaan — <b>tanpa portal akademik dahulu</b>. Halaman E-Raport ini tampil sebagai placeholder production-ready. 
            Saat siap, hubungkan ke <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">/e-raport</code> dengan autentikasi (Convex / Laravel) dan role guru/siswa/orang_tua.
          </p>
          <div className="mt-6 inline-flex gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full text-xs font-bold text-amber-800 items-center"><Clock className="w-3.5 h-3.5" /> Mode Demo Production — data aman diganti</div>
          <div className="mt-8 grid sm:grid-cols-3 gap-3 text-left">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100"><div className="font-bold text-navy text-sm">Untuk Siswa</div><div className="text-xs text-slate-600 mt-1">Lihat nilai & rapor semester</div></div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100"><div className="font-bold text-navy text-sm">Untuk Guru</div><div className="text-xs text-slate-600 mt-1">Input nilai & presensi</div></div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100"><div className="font-bold text-navy text-sm">Untuk Ortu</div><div className="text-xs text-slate-600 mt-1">Pantau perkembangan anak</div></div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/kontak" className="bg-navy text-white px-6 py-3 rounded-full text-sm font-bold inline-flex gap-2 items-center">Hubungi Admin <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/" className="bg-white border border-slate-200 px-6 py-3 rounded-full text-sm font-bold text-navy">← Kembali ke Beranda</Link>
          </div>
          <p className="text-xs text-slate-500 mt-6">Ingin aktifkan? Set <code>ENABLE_PORTAL=true</code> dan hubungkan provider data — lihat dokumentasi darussalam <code>FUTURE_PORTALS.md</code>.</p>
        </div>
      </section>
    </div>
  );
}
