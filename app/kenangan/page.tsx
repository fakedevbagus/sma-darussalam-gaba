import PageHeader from "@/components/PageHeader";
import KenanganGrid from "@/components/KenanganGrid";
import { SCHOOL } from "@/config/school";

export const metadata = { title: "Kenangan" };

export default function KenanganPage() {
  return (
    <div>
      <PageHeader
        badge="MEMORIES • KENANGAN"
        title="Kenangan" accent="Indah"
        desc={`Dokumentasi momen berharga perjalanan siswa-siswi ${SCHOOL.name} — tawa, prestasi, dan persaudaraan. Arahkan kursor ke kartu untuk melihat semua fotonya.`}
        img="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop"
        breadcrumb="Lainnya / Kenangan"
      />
      <section className="max-w-[1280px] mx-auto px-6">
        <KenanganGrid />
        <p className="mt-8 text-center text-sm text-slate-500">Ingi dokumentasi lengkap? Kunjungi <a href="/galeri" className="font-bold text-primary-600 underline">Galeri</a>.</p>
      </section>
    </div>
  );
}
