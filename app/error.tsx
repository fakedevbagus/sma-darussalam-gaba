"use client";
import { useEffect } from "react";
import Link from "next/link";
import { SCHOOL } from "@/config/school";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

/** Error boundary per-route — mencegah layar putih saat komponen gagal */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log untuk diagnosa (bisa dihubungkan ke monitoring)
    console.error("[AppError]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-5">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 pattern-grid" />
      <div className="relative text-center max-w-lg">
        <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-card">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <div className="font-display font-semibold text-3xl text-navy mt-6">Ups, Ada Kendala</div>
        <p className="mt-3 text-sm md:text-base text-slate-600 leading-7">
          Terjadi kesalahan saat menampilkan halaman ini. Tenang — datamu aman.
          Coba muat ulang, atau kembali lagi nanti.
        </p>
        {error.digest && (
          <p className="mt-2 text-[11px] font-mono text-slate-400">Kode: {error.digest}</p>
        )}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="btn-navy"><RefreshCw className="w-4 h-4" /> Coba Lagi</button>
          <Link href="/" className="btn-outline"><Home className="w-4 h-4" /> Beranda</Link>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          Masih bermasalah? Hubungi kami di {SCHOOL.email}
        </p>
      </div>
    </div>
  );
}