import PageHeader from "@/components/PageHeader";
import { SCHOOL } from "@/config/school";

export default function PrivacyPage() {
  return (
    <div>
      <PageHeader badge="LEGAL • PRIVASI" title="Kebijakan Privasi" desc={`Bagaimana ${SCHOOL.name} mengelola data pengunjung & pendaftar`} img="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop" breadcrumb="Legal / Kebijakan Privasi" />
      <section className="max-w-[800px] mx-auto px-6">
        <div className="bg-white rounded-[36px] p-8 md:p-10 shadow-card border border-[#ece4d4] prose prose-slate max-w-none">
          <p className="text-sm text-slate-500">Terakhir diperbarui: 26 Agustus 2026</p>
          <h3 className="font-bold text-navy mt-6">1. Data yang Kami Kumpulkan</h3>
          <p className="text-sm text-slate-600 leading-7">Form PPDB, kontak, dan newsletter — nama, email, telepon, alamat. Tidak ada portal login yang aktif di versi ini.</p>
          <h3 className="font-bold text-navy mt-6">2. Penggunaan</h3>
          <p className="text-sm text-slate-600 leading-7">Hanya untuk administrasi PPDB, komunikasi sekolah, dan peningkatan layanan. Tidak dijual ke pihak ketiga.</p>
          <h3 className="font-bold text-navy mt-6">3. Penyimpanan</h3>
          <p className="text-sm text-slate-600 leading-7">Data disimpan secara lokal (static). Saat production dengan backend, data terenkripsi & akses berbasis role.</p>
          <h3 className="font-bold text-navy mt-6">4. Hak Anda</h3>
          <p className="text-sm text-slate-600 leading-7">Mintalah koreksi/penghapusan via <a href="/kontak" className="text-primary-600 underline">Kontak</a> • Email {SCHOOL.email}</p>
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800">Konsultasikan dengan penasihat hukum sebelum digunakan sebagai dokumen resmi.</div>
        </div>
      </section>
    </div>
  );
}
