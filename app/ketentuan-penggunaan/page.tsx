import PageHeader from "@/components/PageHeader";
import { SCHOOL } from "@/config/school";

export default function TermsPage() {
  return (
    <div>
      <PageHeader badge="LEGAL • KETENTUAN" title="Ketentuan Penggunaan" desc={`Aturan penggunaan website ${SCHOOL.name}`} img="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop" breadcrumb="Legal / Ketentuan" />
      <section className="max-w-[800px] mx-auto px-6">
        <div className="bg-white rounded-[36px] p-8 md:p-10 shadow-card border border-[#ece4d4]">
          <p className="text-sm text-slate-500">Berlaku sejak 26 Aug 2026</p>
          <h3 className="font-bold text-navy mt-6">Penggunaan Konten</h3>
          <p className="text-sm text-slate-600 leading-7">Konten situs dikelola & diperbarui secara berkala oleh tim sekolah.</p>
          <h3 className="font-bold text-navy mt-6">PPDB & Formulir</h3>
          <p className="text-sm text-slate-600 leading-7">Pengisian form wajib jujur. Panitia berhak verifikasi & membatalkan jika data palsu.</p>
          <h3 className="font-bold text-navy mt-6">Hak Cipta</h3>
          <p className="text-sm text-slate-600 leading-7">© 2026 {SCHOOL.name}. Dilarang menyalin tanpa izin.</p>
        </div>
      </section>
    </div>
  );
}
