import PageHeader from "@/components/PageHeader";

export default function AksesibilitasPage() {
  return (
    <div>
      <PageHeader badge="AKSESIBILITAS" title="Aksesibilitas" desc="Komitmen kami agar website dapat diakses semua — keyboard, screen reader & kontras." img="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" breadcrumb="Legal / Aksesibilitas" />
      <section className="max-w-[800px] mx-auto px-6 -mt-2">
        <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-card border border-slate-100">
          <h3 className="font-bold text-navy">Standar</h3>
          <p className="text-sm text-slate-600 leading-7 mt-2">Mengacu WCAG 2.1 AA — navigasi keyboard, alt teks, fokus terlihat, kontras 4.5:1.</p>
          <h3 className="font-bold text-navy mt-6">Fitur</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-600"><li>• Navigasi penuh via Tab / Shift+Tab / Enter</li><li>• Skip to content & ARIA label</li><li>• Teks dapat diperbesar 200% tanpa pecah layout</li></ul>
          <h3 className="font-bold text-navy mt-6">Masukan</h3>
          <p className="text-sm text-slate-600 leading-7">Temukan kendala akses? Hubungi <a href="/kontak" className="text-primary-600 underline">Kontak</a> — kami respon 1×24 jam.</p>
        </div>
      </section>
    </div>
  );
}
