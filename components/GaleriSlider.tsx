"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";
import { GALLERY } from "@/lib/demo-data";

/** Galeri kegiatan — slide otomatis pelan (Swiper autoplay, loop) */
export default function GaleriSlider() {
  const items = GALLERY.filter(g => !g.videoUrl).slice(0, 8);
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1.15}
      spaceBetween={16}
      loop
      autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
      breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 4 } }}
    >
      {items.map(g => (
        <SwiperSlide key={g.id} className="h-auto">
          <Link href="/galeri" className="group relative block rounded-[28px] overflow-hidden shadow-card border-4 border-white hover:shadow-3d hover:-translate-y-0.5 transition h-full">
            <Image src={g.imageUrl} alt={g.title} width={640} height={210} sizes="(max-width: 640px) 87vw, (max-width: 1024px) 45vw, 300px" className="w-full h-[190px] sm:h-[210px] object-cover group-hover:scale-110 transition duration-700 bg-slate-100" />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-navy/85 to-transparent">
              <div className="text-white font-bold text-sm leading-snug">{g.title}</div>
              <div className="text-white/60 text-[10px] font-extrabold tracking-widest uppercase">{g.category}</div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}