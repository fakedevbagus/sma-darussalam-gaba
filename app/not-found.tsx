import Link from "next/link";
import { SCHOOL } from "@/config/school";
import Doodles from "@/components/Doodles";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-5">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 pattern-grid" />
      <Doodles soft />
      <div className="blob w-[400px] h-[400px] bg-primary-300/40 -top-20 -left-20" />
      <div className="relative text-center max-w-lg">
        <div className="font-display font-semibold text-[100px] sm:text-[140px] leading-none gradient-text animate-float">404</div>
        <h1 className="h-display mt-2">Halaman Tidak Ditemukan</h1>
        <p className="mt-3 text-sm md:text-base text-slate-600 leading-6">
          Oops! Halaman yang kamu cari tidak ada atau sudah dipindahkan. Yuk kembali menjelajah {SCHOOL.name}.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-navy"><Home className="w-4 h-4" /> Kembali ke Beranda</Link>
          <Link href="/berita" className="btn-outline"><SearchX className="w-4 h-4" /> Lihat Berita</Link>
        </div>
      </div>
    </div>
  );
}
