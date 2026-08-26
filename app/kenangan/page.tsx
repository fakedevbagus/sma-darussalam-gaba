import PageHeader from "@/components/PageHeader";
import { GALLERY } from "@/lib/demo-data";
import { Camera } from "lucide-react";

export const metadata = { title: "Kenangan" };

const CAPTIONS = [
  "HUT RI ke-81", "MPLS 2026/2027", "Study Tour Kelas XI", "Pentas Seni Tahunan",
  "Persami Pramuka", "Juara OSN Provinsi", "Class Meeting Semester Genap", "Bakti Sosial OSIS",
];

export default function KenanganPage() {
  return (
    <div>
      <PageHeader
        badge="MEMORIES • KENANGAN"
        title="Kenangan" accent="Indah"
        desc="Dokumentasi momen berharga perjalanan siswa-siswi SMA Biru Ceria — tawa, prestasi, dan persaudaraan."
        img="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop"
        breadcrumb="Lainnya / Kenangan"
      />
      <section className="max-w-[1280px] mx-auto px-6 -mt-2">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GALLERY.filter(g => !g.videoUrl).map((g, i) => (
            <div key={g.id} className={`group relative rounded-[24px] overflow-hidden border-4 border-white shadow-card hover:shadow-3d transition ${i % 5 === 0 ? "rotate-[1deg]" : i % 3 === 0 ? "-rotate-1" : "rotate-[0.5deg]"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.imageUrl} alt={CAPTIONS[i % CAPTIONS.length]} loading="lazy" className="w-full h-[240px] object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-navy/85 to-transparent">
                <div className="text-white font-bold text-sm leading-snug">{CAPTIONS[i % CAPTIONS.length]}</div>
                <div className="text-white/70 text-xs">{g.category}</div>
              </div>
              <Camera className="absolute top-3 right-3 w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition drop-shadow" />
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">Ingi dokumentasi lengkap? Kunjungi <a href="/galeri" className="font-bold text-primary-600 underline">Galeri</a>.</p>
      </section>
    </div>
  );
}
