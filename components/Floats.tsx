"use client";
import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { SCHOOL } from "@/config/school";

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Kembali ke atas"
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-2xl bg-navy text-white shadow-3d flex items-center justify-center hover:bg-primary-600 hover:-translate-y-1 transition-all ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

/** WA mengambang — di kanan-bawah, bertumpuk DI ATAS tombol back-to-top */
export function WhatsAppFloat() {
  return (
    <a
      href={SCHOOL.social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      className="fixed bottom-[76px] right-6 z-40 flex items-center gap-2.5 group flex-row-reverse"
    >
      <span className="relative flex w-12 h-12">
        <span className="absolute inset-0 rounded-2xl bg-[#25D366] animate-ping opacity-25" />
        <span className="relative w-12 h-12 rounded-2xl bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] flex items-center justify-center group-hover:scale-110 transition">
          <MessageCircle className="w-6 h-6" />
        </span>
      </span>
      <span className="hidden sm:block bg-white text-navy text-xs font-extrabold rounded-xl px-3 py-2 shadow-card opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition">
        Butuh bantuan? Chat kami!
      </span>
    </a>
  );
}
