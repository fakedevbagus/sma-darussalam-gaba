"use client";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { GALLERY } from "@/lib/demo-data";
import { SCHOOL } from "@/config/school";
import { useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Camera, Film, Expand } from "lucide-react";
import GaleriLightbox from "@/components/GaleriLightbox";

export default function GaleriPage() {
  const [filter, setFilter] = useState<"all"|"foto"|"video">("all");
  const [idx, setIdx] = useState<number|null>(null);
  const triggerRef = useRef<HTMLButtonElement|null>(null);
  const items = filter==="all"?GALLERY: filter==="video"? GALLERY.filter(i=>!!i.videoUrl): GALLERY.filter(i=>!i.videoUrl);
  const viewing = idx!==null? items[idx]: null;
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <PageHeader badge="DOKUMENTASI • FOTO & VIDEO" title="Momen Ceria" accent="Tak Terlupakan" desc="Kegiatan, prestasi & keseharian — foto pilihan + video YouTube" img="https://images.unsplash.com/photo-1516450360452-9312abbf6f7e?q=80&w=800&auto=format&fit=crop" breadcrumb="Kesiswaan / Galeri" />

      <section className="max-w-[1280px] mx-auto px-6">
        <div className="sticky top-0 z-20 -mx-6 px-6 py-3 bg-pale/85 backdrop-blur supports-[backdrop-filter]:bg-pale/70 sticky-filter">
          <div className="flex flex-wrap justify-center gap-2">
            {(["all","foto","video"] as const).map(f=> (
              <button key={f} onClick={()=>{setFilter(f); setIdx(null)}} className={`relative px-5 py-2.5 rounded-full text-xs font-bold border flex gap-2 items-center ${filter===f?"text-white border-navy":"bg-white text-slate-600 border-slate-200"}`}>
                {filter===f && <motion.span layoutId="filter-pill-galeri" className="absolute inset-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                <span className="relative z-10 flex gap-2 items-center">{f==="foto"&& <Camera className="w-3.5 h-3.5" />} {f==="video"&& <Film className="w-3.5 h-3.5" />} {f==="all"?"Semua": f==="foto"?"Foto":"Video"}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={filter}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
        <div className="mt-8 columns-2 md:columns-3 gap-4">
          {items.map((item,i)=> (
            <Reveal key={item.id} delay={Math.min(i * 0.06, 0.4)} className="mb-4 break-inside-avoid">
            <button onClick={(e)=>{triggerRef.current = e.currentTarget; setIdx(i);}} className={`group relative text-left bg-white rounded-[28px] p-3 pb-5 shadow-card border border-[#ece4d4] hover:shadow-3d hover:-translate-y-0.5 transition overflow-hidden ${i%4===0?"rotate-[0.5deg]": i%4===1?"-rotate-[0.5deg]": i%4===2?"rotate-[0.3deg]":"-rotate-[0.3deg]"}`}>
              {/* Video embed: kunci 16:9 agar tidak terdistorsi oleh alur masonry.
                  Foto: rasio asli (picsum 900×650) — tanpa crop/letterbox. */}
              {item.videoUrl ? (
                <div className="aspect-video overflow-hidden rounded-xl bg-slate-100 relative">
                  <Image src={item.imageUrl} alt={item.title} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover group-hover:scale-110 transition duration-700" />
                  <span className="absolute right-2 top-2 w-7 h-7 bg-white/90 rounded-lg flex items-center justify-center shadow-card"><Film className="w-3.5 h-3.5" /></span>
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl bg-slate-100 relative">
                  <Image src={item.imageUrl} alt={item.title} width={900} height={650} sizes="(max-width: 768px) 50vw, 33vw" className="w-full h-auto group-hover:scale-110 transition duration-700" />
                  <span className="absolute right-2 top-2 w-7 h-7 bg-white/90 rounded-lg flex items-center justify-center shadow-card opacity-0 group-hover:opacity-100 transition">
                    <Expand className="w-3.5 h-3.5" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
              )}
              <div className="font-bold text-navy text-sm mt-3 truncate">{item.title}</div>
              <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">{item.category}</div>
              <div className="text-xs text-slate-600 mt-1 line-clamp-1">{item.caption}</div>
            </button>
            </Reveal>
          ))}
        </div>

        {items.length===0 && <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-200 mt-8"><Camera className="w-10 h-10 mx-auto text-slate-300" /><p className="text-sm text-slate-500 mt-3">Belum ada foto.</p></div>}
          </motion.div>
        </AnimatePresence>

        {viewing && (
          <GaleriLightbox
            items={items}
            index={idx ?? 0}
            onNavigate={setIdx}
            onClose={()=>setIdx(null)}
            returnFocusRef={triggerRef}
          />
        )}

        <div className="mt-10 bg-white rounded-[36px] p-8 shadow-card border border-[#ece4d4]">
          <h3 className="font-extrabold text-navy">Video Pilihan</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {GALLERY.filter(g=>g.videoUrl).slice(0,3).map(v=> (
              <button key={v.id} onClick={(e)=>{
                triggerRef.current = e.currentTarget;
                const vi = GALLERY.filter(g=>g.videoUrl).findIndex(x=>x.id===v.id);
                /* Di bawah filter "foto", video tidak ada di daftar aktif — pindah
                   ke filter "video" agar indeks lightbox valid (set batched). */
                if (filter==="foto") setFilter("video");
                setIdx(filter==="all" ? GALLERY.findIndex(x=>x.id===v.id) : vi);
              }} className="rounded-[28px] overflow-hidden bg-navy text-white relative aspect-video flex items-center justify-center group">
                <Image src={v.imageUrl} alt={v.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-60 group-hover:scale-105 transition duration-700" />
                <div className="relative w-12 h-12 bg-white text-navy rounded-full flex items-center justify-center shadow-float">▶</div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-left">
                  <div className="font-bold text-sm">{v.title}</div>
                  <div className="text-xs text-white/70">YouTube • {SCHOOL.shortName}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
