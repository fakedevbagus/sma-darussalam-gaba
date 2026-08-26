"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper, X, ArrowRight } from "lucide-react";

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
            <div className="bg-gradient-to-br from-primary-500 to-accent pattern-stripes p-6 text-white text-center relative">
              <button onClick={close} aria-label="Tutup" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center transition"><X className="w-4 h-4" /></button>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-white text-primary-600 flex items-center justify-center shadow-float animate-wiggle"><PartyPopper className="w-7 h-7" /></div>
              <h3 className="font-display font-bold text-xl mt-3">PPDB 2026/2027 Dibuka!</h3>
              <p className="text-xs text-white/85 mt-1">Gelombang 1 • Diskon 30% uang pangkal</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-sm text-slate-600 leading-6">Kuota terbatas! Daftar sekarang & dapatkan <b>gratis trial class 1 minggu</b> untuk pendaftar gelombang 1.</p>
              <Link href="/ppdb" onClick={close} className="mt-5 inline-flex w-full justify-center items-center gap-2 bg-navy text-white py-3.5 rounded-2xl font-extrabold hover:bg-primary-700 transition">
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
