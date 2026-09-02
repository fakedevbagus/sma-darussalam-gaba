"use client";
import PageHeader from "@/components/PageHeader";
import { EVENTS, formatDateId } from "@/lib/demo-data";
import { useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const MONTHS = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
const DAYS = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];

const CAT_COLORS: Record<string, string> = {
  Rutin: "bg-primary-50 text-primary-700 border-primary-200",
  PPDB: "bg-sky-50 text-sky-700 border-sky-200",
  Perlombaan: "bg-amber-50 text-amber-700 border-amber-200",
  "Acara Sekolah": "bg-violet-50 text-violet-700 border-violet-200",
  Akademik: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function MiniCalendar({ events }: { events: typeof EVENTS }) {
  const [month, setMonth] = useState(new Date().getMonth());
  const year = new Date().getFullYear();
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1,0).getDate();
  const eventDays = new Set(events.filter(e=> new Date(e.startDate).getMonth()===month).map(e=> new Date(e.startDate).getDate()));
  return (
    <div className="bg-white rounded-[28px] border border-[#ece4d4] p-5 shadow-card">
      <div className="flex justify-between items-center">
        <button onClick={()=>setMonth(m=> m===0?11:m-1)} className="p-1.5 rounded-lg hover:bg-slate-100"><ChevronLeft className="w-4 h-4" /></button>
        <div className="font-bold text-navy">{MONTHS[month]} {year}</div>
        <button onClick={()=>setMonth(m=> m===11?0:m+1)} className="p-1.5 rounded-lg hover:bg-slate-100"><ChevronRight className="w-4 h-4" /></button>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1">
        {DAYS.map(d=> (<div key={d} className="text-center text-[10px] font-bold text-slate-500 py-1">{d}</div>))}
        {Array.from({length:firstDay}).map((_,i)=>(<div key={`e-${i}`} />))}
        {Array.from({length:daysInMonth}).map((_,i)=>{
          const day=i+1;
          const isToday = day===today.getDate() && month===today.getMonth();
          const hasEvent = eventDays.has(day);
          return <div key={day} className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold ${isToday?"bg-navy text-white":hasEvent?"bg-amber-100 text-amber-700":"text-slate-600 hover:bg-slate-50"}`}>{day}</div>;
        })}
      </div>
    </div>
  );
}

export default function AgendaPage() {
  const [cat, setCat] = useState<string|null>(null);
  const cats = [...new Set(EVENTS.map(e=>e.category))];
  const filtered = EVENTS.filter(e=> cat===null||e.category===cat);
  const upcoming = filtered.filter(e=> new Date(e.startDate) >= new Date());
  const past = filtered.filter(e=> new Date(e.startDate) < new Date());

  return (
    <div>
      <PageHeader badge="KALENDER SEKOLAH" title="Agenda &" accent="Kegiatan" desc="Jadwal akademik & non-akademik sekolah" img="https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=800&auto=format&fit=crop" breadcrumb="Informasi / Agenda" />
      <section className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          <div className="space-y-5">
            <MiniCalendar events={EVENTS} />
            <div className="bg-white rounded-[28px] border border-[#ece4d4] p-5 shadow-card lg:sticky lg:top-6 lg:z-20">
              <div className="text-[10px] font-bold tracking-widest text-slate-500">FILTER KATEGORI</div>
              <div className="mt-3 space-y-2">
                <button onClick={()=>setCat(null)} className={`relative w-full text-left px-3 py-2 rounded-xl text-sm font-semibold ${cat===null?"text-primary-700":"text-slate-600 hover:bg-slate-50"}`}>
                  {cat===null && <motion.span layoutId="filter-pill-agenda" className="absolute inset-0 rounded-xl bg-primary-50" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                  <span className="relative z-10">Semua Kategori</span>
                </button>
                {cats.map(c=> (<button key={c} onClick={()=>setCat(c)} className={`relative w-full text-left px-3 py-2 rounded-xl text-sm font-semibold ${cat===c?"text-primary-700":"text-slate-600 hover:bg-slate-50"}`}>
                  {cat===c && <motion.span layoutId="filter-pill-agenda" className="absolute inset-0 rounded-xl bg-primary-50" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                  <span className="relative z-10">{c}</span>
                </button>))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {upcoming.length>0 && (
              <div>
                <div className="text-xs font-bold tracking-widest text-primary-600 mb-4">KEGIATAN MENDATANG</div>
                <div className="space-y-4">
                  {upcoming.map(item=>{
                    const d=new Date(item.startDate);
                    const end=new Date(item.endDate);
                    const daysLeft=Math.ceil((d.getTime()-Date.now())/(1000*60*60*24));
                    return (
                      <Link key={item.id} href={`/agenda/${item.slug}`} className="flex gap-5 bg-white rounded-2xl p-5 shadow-card border border-[#ece4d4] hover:shadow-3d hover:-translate-y-0.5 transition text-left">
                        <div className="w-16 h-16 rounded-xl border-2 border-primary-600 bg-primary-50 flex flex-col items-center justify-center shrink-0">
                          <span className="text-xl font-extrabold text-primary-700 leading-none">{d.getDate()}</span>
                          <span className="text-[10px] font-bold tracking-widest text-slate-500">{MONTHS_SHORT[d.getMonth()]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap gap-2 items-center"><span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${CAT_COLORS[item.category] ?? "bg-slate-100 border-slate-200 text-slate-600"}`}>{item.category}</span><span className="flex gap-1.5 items-center text-xs text-slate-500"><CalendarDays className="w-3.5 h-3.5 text-primary-600" /> {formatDateId(item.startDate)}{d.getTime()!==end.getTime()?` – ${formatDateId(item.endDate)}`:""}</span></div>
                          <h3 className="font-bold text-navy mt-1.5">{item.title}</h3>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2">{item.description}</p>
                          <div className="flex justify-between items-center mt-2"><span className="flex gap-1.5 items-center text-xs text-slate-500"><MapPin className="w-3.5 h-3.5 text-primary-600" /> {item.location}</span><span className="bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-[10px] font-bold">{daysLeft<=0?"Hari ini":`${daysLeft} hari lagi`}</span></div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {past.length>0 && (
              <div>
                <div className="text-xs font-bold tracking-widest text-slate-500 mb-4">TELAH BERLALU</div>
                <div className="space-y-3">
                  {past.map(item=>{
                    const d=new Date(item.startDate);
                    return (
                      <div key={item.id} className="flex gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200 opacity-70">
                        <div className="w-12 h-12 rounded-lg border border-slate-200 bg-white flex flex-col items-center justify-center shrink-0">
                          <span className="font-bold text-slate-600 leading-none">{d.getDate()}</span>
                          <span className="text-[9px] font-bold text-slate-500">{MONTHS_SHORT[d.getMonth()]}</span>
                        </div>
                        <div><div className="font-bold text-navy text-sm">{item.title}</div><div className="text-[10px] text-slate-500">{item.category} • {item.location}</div></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {upcoming.length===0 && past.length===0 && <div className="bg-white rounded-2xl p-10 text-center border border-dashed border-slate-200"><p className="text-sm text-slate-500">Belum ada agenda.</p></div>}
          </div>
        </div>
      </section>
    </div>
  );
}
