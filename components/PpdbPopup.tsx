"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles } from "lucide-react";
import Doodles from "@/components/Doodles";

/** Popup promo PPDB — muncul sekali per sesi (ala PpdbPopup Darussalam) */
export default function PpdbPopup() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sessionStorage.getItem("ppdb-popup-closed")) {
      const t = setTimeout(() => setOpen(true), 3500);
      return () => clearTimeout(t);
    }
  }, []);
  function close() {
    sessionStorage.setItem("ppdb-popup-closed", "1");
    setOpen(false);
  }
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.85, y: 30, rotate: -2 }} animate={{ scale: 1, y: 0, rotate: 0 }} exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-[28px] shadow-3d overflow-hidden"
          >
            {/* Poster pondok: arch mihrab + pattern nijar + doodle */}
            <div className="relative bg-gradient-to-br from-navy via-primary-700 to-primary-500 p-6 pt-8 text-white text-center overflow-hidden">
              <Doodles className="opacity-10" />
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-sun via-white/60 to-sun" />
              <button onClick={close} aria-label="Tutup" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center transition z-10"><X className="w-4 h-4" /></button>

              {/* Bingkai arch mihrab dengan logo */}
              <div className="relative w-24 h-28 mx-auto">
                <div className="absolute inset-0 arch-sm bg-white/15 border-2 border-sun/70" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="" className="absolute inset-0 m-auto w-14 h-14 object-contain drop-shadow" />
              </div>

              <div className="relative mt-3 inline-flex items-center gap-1.5 bg-sun text-navy rounded-full px-3 py-1 text-[10px] font-extrabold tracking-widest uppercase shadow-yellow">
                <Sparkles className="w-3 h-3" /> Gelombang 1 Dibuka
              </div>
              <h3 className="relative font-display font-semibold text-2xl mt-3 leading-tight">PPDB 2026/2027<br /><span className="text-sun">Telah Dibuka!</span></h3>
              <p className="relative text-xs text-white/80 mt-2">Kuota terbatas — 7 rombongan belajar • Yayasan Darussalam Simpang Mesir</p>
            </div>

            <div className="relative p-6 text-center">
              <div className="grid grid-cols-3 gap-2 text-navy">
                {[
                  { v: "30%", l: "Diskon Pangkal" },
                  { v: "1 Mg", l: "Trial Class" },
                  { v: "4", l: "Jalur PPDB" },
                ].map(b => (
                  <div key={b.l} className="rounded-2xl bg-primary-50 border border-primary-100 py-3">
                    <div className="font-display font-semibold text-lg">{b.v}</div>
                    <div className="text-[9px] font-bold tracking-wider uppercase text-slate-500 leading-tight mt-0.5">{b.l}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-6 mt-4">Daftar sekarang & amankan kursi di <b>angkatan 2026/2027</b> — proses mudah, bisa dari HP.</p>
              <Link href="/ppdb" onClick={close} className="mt-5 inline-flex w-full justify-center items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white py-3.5 rounded-2xl font-extrabold shadow-float hover:shadow-glow hover:scale-[1.02] transition">
                Daftar Sekarang <ArrowRight className="w-4 h-4" />
              </Link>
              <button onClick={close} className="mt-2 text-xs font-bold text-slate-400 hover:text-slate-600">Nanti saja</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
