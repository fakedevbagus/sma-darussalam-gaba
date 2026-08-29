"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SCHOOL } from "@/config/school";
import SocialLinks from "@/components/SocialLinks";
import { HERO_SLOGANS } from "@/lib/demo-data";
import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % HERO_SLOGANS.length), 3000);
    return () => clearInterval(t);
  }, []);
  const word = HERO_SLOGANS[i];
  const widthClass = word.length > 14 ? "min-w-[9.5em]" : word.length > 10 ? "min-w-[7.5em]" : "min-w-[6em]";
  return (
    <span className={`relative inline-flex justify-center ${widthClass}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className="inline-block text-primary-200"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const { SCHOOL: S } = { SCHOOL };
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* ===== BACKGROUND VIDEO / POSTER ===== */}
      <div className="hero-video-wrap">
        {S.heroVideoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={S.heroPosterUrl}
          >
            <source src={S.heroVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <img src={S.heroPosterUrl} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="hero-overlay" />
        <div className="absolute inset-0 pattern-stripes opacity-60" />
      </div>

      {/* blobs dekoratif */}
      <div className="blob w-[420px] h-[420px] bg-primary-400/30 -top-24 -left-24" />
      <div className="blob w-[380px] h-[380px] bg-accent/25 bottom-0 -right-20" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 pt-40 pb-24 sm:pt-52 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="font-display font-semibold leading-[1.08] tracking-tight text-[34px] sm:text-[44px] md:text-[56px] lg:text-[64px] drop-shadow-[0_4px_18px_rgba(0,0,0,0.4)]"
        >
          Cerdas,<br />
          <RotatingWord />,<br />
          dan Berdaya Saing
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
          className="mt-5 text-sm sm:text-base md:text-lg leading-7 text-white/85 max-w-2xl mx-auto">
          {S.tagline}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
          className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/ppdb" className="group inline-flex items-center gap-3 bg-white text-primary-700 px-7 py-4 rounded-full font-extrabold shadow-3d hover:scale-[1.03] transition">
            Daftar PSPDB 2027
            <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center group-hover:rotate-45 transition"><ArrowRight className="w-4 h-4" /></span>
          </Link>
          <a href="#video-profil" className="inline-flex items-center gap-3 bg-primary-600 px-6 py-4 rounded-full font-bold text-white shadow-float hover:bg-primary-500 hover:scale-[1.03] transition border border-primary-400/50">
            <span className="w-10 h-10 rounded-full bg-white text-primary-600 flex items-center justify-center shadow-md"><Play className="w-4 h-4 ml-0.5" /></span>
            Video Profil
          </a>
        </motion.div>

        {/* Ikuti Kami — FB, IG, TikTok, YouTube (tanpa WA) */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-white/70">Ikuti Kami:</span>
          <SocialLinks variant="light" whatsapp={false} />
        </motion.div>
      </div>
    </section>
  );
}
