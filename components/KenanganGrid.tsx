"use client";
import { useState } from "react";
import Image from "next/image";
import { GALLERY } from "@/lib/demo-data";
import { Camera, ChevronLeft, ChevronRight, Images } from "lucide-react";

const CAPTIONS = [
  "HUT RI ke-81", "MPLS 2026/2027", "Study Tour Kelas XI", "Pentas Seni Tahunan",
  "Persami Pramuka", "Juara OSN Provinsi", "Class Meeting Semester Genap", "Bakti Sosial OSIS",
];

/** Kartu kenangan dengan galeri mini multi-foto */
function MemoryCard({ item, caption, tilt }: { item: (typeof GALLERY)[number]; caption: string; tilt: string }) {
  const photos = item.photos && item.photos.length > 0 ? item.photos : [item.imageUrl];
  const [i, setI] = useState(0);
  const prev = () => setI(v => (v - 1 + photos.length) % photos.length);
  const next = () => setI(v => (v + 1) % photos.length);

  return (
    <div className={`group relative rounded-[28px] overflow-hidden border-4 border-white shadow-card hover:shadow-3d transition ${tilt}`}>
      <div className="relative h-[250px] bg-slate-100">
        <Image key={photos[i]} src={photos[i]} alt={caption} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover animate-[popIn_.45s_ease_both]" />
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-navy/85 to-transparent">
          <div className="text-white font-bold text-sm leading-snug">{caption}</div>
          <div className="text-white/70 text-xs">{item.category}</div>
        </div>

        {/* Navigasi multi-foto */}
        {photos.length > 1 && (
          <>
            <button onClick={prev} aria-label="Foto sebelumnya" className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-navy flex items-center justify-center shadow-card opacity-0 group-hover:opacity-100 hover:bg-white transition"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={next} aria-label="Foto berikutnya" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-navy flex items-center justify-center shadow-card opacity-0 group-hover:opacity-100 hover:bg-white transition"><ChevronRight className="w-4 h-4" /></button>
            <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/90 text-navy rounded-full px-2 py-0.5 text-[10px] font-extrabold shadow-card">
              <Images className="w-3 h-3" /> {photos.length}
            </span>
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1">
              {photos.map((_, d) => (
                <button key={d} onClick={() => setI(d)} aria-label={`Foto ${d + 1}`} className={`w-1.5 h-1.5 rounded-full transition ${d === i ? "bg-white w-3" : "bg-white/50 hover:bg-white/80"}`} />
              ))}
            </div>
          </>
        )}
        {!photos.length && <Camera className="absolute top-3 right-3 w-5 h-5 text-white drop-shadow" />}
      </div>
    </div>
  );
}

export default function KenanganGrid() {
  const items = GALLERY.filter(g => !g.videoUrl);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {items.map((g, i) => (
        <MemoryCard
          key={g.id}
          item={g}
          caption={CAPTIONS[i % CAPTIONS.length]}
          tilt={i % 5 === 0 ? "rotate-[1deg]" : i % 3 === 0 ? "-rotate-1" : "rotate-[0.5deg]"}
        />
      ))}
    </div>
  );
}