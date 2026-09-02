"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { TESTIMONI } from "@/lib/demo-data";
import EmptyState from "@/components/EmptyState";
import { Quote } from "lucide-react";

/** Testimoni alumni — slide otomatis (Swiper autoplay, loop, pagination) */
export default function TestimoniSlider() {
  if (TESTIMONI.length === 0) {
    return (
      <EmptyState
        title="Testimoni alumni segera hadir"
        desc="Kami sedang mengumpulkan cerita dari para alumni."
      />
    );
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      spaceBetween={20}
      loop
      autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      pagination={{ clickable: true }}
      breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 2.5 } }}
      className="!pb-12"
    >
      {TESTIMONI.map((t) => (
        <SwiperSlide key={t.name} className="h-auto">
          <div className="card-warm p-6 flex flex-col h-full">
            <Quote className="w-7 h-7 text-primary-200" />
            <p className="mt-3 text-sm leading-6 text-slate-600 italic flex-1">“{t.text}”</p>
            <div className="mt-5 flex items-center gap-3 border-t border-dashed border-slate-200 pt-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-500 to-accent text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-md">
                {t.name.split(" ").slice(0, 2).map(w => w[0]).join("")}
              </div>
              <div>
                <div className="font-bold text-navy text-sm">{t.name}</div>
                <div className="text-[11px] text-slate-500">{t.year} • {t.kelas}</div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}