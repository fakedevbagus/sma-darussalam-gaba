"use client";

/**
 * GaleriLightbox — dialog galeri aksesibel tanpa library tambahan.
 *
 * Fitur:
 * - Tutup via Escape, klik backdrop, dan tombol tutup.
 * - Navigasi antar item via tombol panah keyboard, tombol chevron, dan swipe (sentuh).
 * - Fokus terjebak di dalam dialog selama terbuka (focus trap), dan dikembalikan
 *   ke thumbnail pemicu saat ditutup (via `returnFocusRef`).
 * - Scroll body dikunci selama dialog terbuka.
 * - role="dialog" + aria-modal="true".
 * - Menghormati prefers-reduced-motion: hanya fade (tanpa scale/geser).
 *
 * Item video (videoUrl) ditampilkan sebagai pemutar YouTube ter-embed (16:9).
 */
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type LightboxItem = {
  title: string;
  category: string;
  caption: string;
  imageUrl: string;
  videoUrl?: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])';

export default function GaleriLightbox({
  items,
  index,
  onNavigate,
  onClose,
  returnFocusRef,
}: {
  items: LightboxItem[];
  index: number;
  onNavigate: (i: number) => void;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLElement | null>;
}) {
  const item = items[index] ?? null;
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  /* Kunci scroll body selama dialog terbuka. */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* Fokus awal ke tombol tutup; kembalikan fokus ke thumbnail pemicu saat unmount. */
  useEffect(() => {
    const restore = returnFocusRef.current;
    closeBtnRef.current?.focus();
    return () => {
      restore?.focus();
    };
  }, [returnFocusRef]);

  /* Keyboard: Escape tutup, panah navigasi, Tab terjebak di dalam dialog. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onNavigate(index === 0 ? items.length - 1 : index - 1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNavigate(index === items.length - 1 ? 0 : index + 1);
        return;
      }
      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusables = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        const inside = dialog.contains(active);
        if (e.shiftKey && (!inside || active === first)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (!inside || active === last)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onNavigate]);

  if (!item) return null;

  const prev = () => onNavigate(index === 0 ? items.length - 1 : index - 1);
  const next = () => onNavigate(index === items.length - 1 ? 0 : index + 1);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-navy/80 backdrop-blur flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      onTouchStart={(e) => {
        const t = e.touches[0];
        touchStart.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const s = touchStart.current;
        touchStart.current = null;
        if (!s) return;
        const dx = e.changedTouches[0].clientX - s.x;
        const dy = e.changedTouches[0].clientY - s.y;
        /* Swipe horizontal ≥50px dan lebih dominan daripada vertikal. */
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title} — ${index + 1} dari ${items.length}`}
        className="bg-white rounded-[28px] overflow-hidden max-w-3xl w-full shadow-3d"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-black flex items-center justify-center">
          {item.videoUrl ? (
            <iframe
              src={item.videoUrl}
              className="w-full aspect-video"
              allowFullScreen
              title={item.title}
            />
          ) : (
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={900}
              height={650}
              sizes="(max-width: 768px) 100vw, 768px"
              className="w-full max-h-[65vh] object-contain"
            />
          )}

          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Tutup galeri"
            className="absolute right-2 top-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-card hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={prev}
            aria-label="Gambar sebelumnya"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-card hover:bg-slate-100 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Gambar berikutnya"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-card hover:bg-slate-100 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-[10px] font-bold shadow-card tabular-nums">
            {index + 1} / {items.length}
          </span>
        </div>

        <div className="p-6">
          <div className="font-bold text-navy text-lg">{item.title}</div>
          <div className="text-[10px] font-bold tracking-widest text-primary-600">{item.category}</div>
          <p className="text-sm text-slate-600 mt-2">{item.caption}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
