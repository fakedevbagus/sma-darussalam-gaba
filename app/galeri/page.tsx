"use client";
import PageHeader from "@/components/PageHeader";
import { GALLERY } from "@/lib/demo-data";
import { SCHOOL } from "@/config/school";
import { useState } from "react";
import { Camera, Film, Expand, ChevronLeft, ChevronRight } from "lucide-react";

export default function GaleriPage() {
  const [filter, setFilter] = useState<"all"|"foto"|"video">("all");
  const [idx, setIdx] = useState<number|null>(null);
  const items = filter==="all"?GALLERY: filter==="video"? GALLERY.filter(i=>!!i.videoUrl): GALLERY.filter(i=>!i.videoUrl);
  const viewing = idx!==null? items[idx]: null;

  return (
    <div>
      <PageHeader badge="DOKUMENTASI • FOTO & VIDEO" title="Momen Ceria" accent="Tak Terlupakan" desc="Kegiatan, prestasi & keseharian — foto pilihan + video YouTube. Data demo siap ganti." img="https://images.unsplash.com/photo-1516450360452-9312abbf6f7e?q=80&w=800&auto=format&fit=crop" breadcrumb="Kesiswaan / Galeri" />

      <section className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-2">
          {(["all","foto","video"] as const).map(f=> (
            <button key={f} onClick={()=>{setFilter(f); setIdx(null)}} className={`px-5 py-2.5 rounded-full text-xs font-bold border flex gap-2 items-center ${filter===f?"bg-navy text-white border-navy":"bg-white text-slate-600 border-slate-200"}`}>
              {f==="foto"&& <Camera className="w-3.5 h-3.5" />} {f==="video"&& <Film className="w-3.5 h-3.5" />} {f==="all"?"Semua": f==="foto"?"Foto":"Video"}
            </button>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((item,i)=> (
            <button key={item.id} onClick={()=>setIdx(i)} className={`group relative text-left bg-white rounded-[28px] p-3 pb-5 shadow-card border border-[#ece4d4] hover:shadow-3d hover:-translate-y-1 transition overflow-hidden ${i%4===0?"rotate-[0.5deg]": i%4===1?"-rotate-[0.5deg]": i%4===2?"rotate-[0.3deg]":"-rotate-[0.3deg]"}`}>
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 relative">
                <img loading="lazy" src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <span className="absolute right-2 top-2 w-7 h-7 bg-white/90 rounded-lg flex items-center justify-center shadow-card opacity-0 group-hover:opacity-100 transition">
                  {item.videoUrl? <Film className="w-3.5 h-3.5" />: <Expand className="w-3.5 h-3.5" />}
                </span>
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
              <div className="font-bold text-navy text-sm mt-3 truncate">{item.title}</div>
              <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">{item.category}</div>
              <div className="text-xs text-slate-600 mt-1 line-clamp-1">{item.caption}</div>
            </button>
          ))}
        </div>

        {items.length===0 && <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-200 mt-8"><Camera className="w-10 h-10 mx-auto text-slate-300" /><p className="text-sm text-slate-500 mt-3">Belum ada foto.</p></div>}

        {viewing && (
          <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur flex items-center justify-center p-4" onClick={()=>setIdx(null)}>
            <div className="bg-white rounded-[28px] overflow-hidden max-w-3xl w-full shadow-3d" onClick={e=>e.stopPropagation()}>
              <div className="relative bg-black">
                {viewing.videoUrl ? <iframe src={viewing.videoUrl} className="w-full aspect-video" allowFullScreen title={viewing.title} /> : <img loading="lazy" src={viewing.imageUrl} alt={viewing.title} className="w-full max-h-[65vh] object-contain" />}
                <button onClick={()=> setIdx(idx===0? items.length-1 : (idx!-1))} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-card"><ChevronLeft className="w-5 h-5" /></button>
                <button onClick={()=> setIdx(idx===items.length-1?0: (idx!+1))} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-card"><ChevronRight className="w-5 h-5" /></button>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-[10px] font-bold shadow-card">{(idx??0)+1} / {items.length}</span>
              </div>
              <div className="p-6">
                <div className="font-bold text-navy text-lg">{viewing.title}</div>
                <div className="text-[10px] font-bold tracking-widest text-primary-600">{viewing.category}</div>
                <p className="text-sm text-slate-600 mt-2">{viewing.caption}</p>
                <button onClick={()=>setIdx(null)} className="mt-4 bg-navy text-white px-5 py-2.5 rounded-full text-xs font-bold">Tutup</button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 bg-white rounded-[36px] p-8 shadow-card border border-[#ece4d4]">
          <h3 className="font-extrabold text-navy">Video Pilihan</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {GALLERY.filter(g=>g.videoUrl).slice(0,3).map(v=> (
              <button key={v.id} onClick={()=> setIdx(GALLERY.findIndex(x=>x.id===v.id))} className="rounded-[28px] overflow-hidden bg-navy text-white relative aspect-video flex items-center justify-center group">
                <img loading="lazy" src={v.imageUrl} alt={v.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700" />
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
