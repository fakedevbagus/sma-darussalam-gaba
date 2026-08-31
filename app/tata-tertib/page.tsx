"use client";
import PageHeader from "@/components/PageHeader";
import { TATA_TERTIB } from "@/lib/demo-data";
import { SCHOOL } from "@/config/school";
import { Shield, BookOpen, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function TataTertibPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <PageHeader badge="KESISWAAN • TATA TERTIB" title="Tata Tertib" accent="Siswa" desc={`Peraturan yang berlaku untuk seluruh siswa ${SCHOOL.name} — demi kedisiplinan & kenyamanan bersama.`} img="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop" breadcrumb="Kesiswaan / Tata Tertib" />
      <section className="max-w-[1280px] mx-auto px-6 space-y-6">
        <div className="bg-white rounded-[36px] p-8 shadow-card border border-[#ece4d4] flex gap-4 items-center">
          <span className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-700 flex items-center justify-center"><Shield className="w-6 h-6" /></span>
          <div><h2 className="font-bold text-navy text-lg">{TATA_TERTIB.title}</h2><p className="text-sm text-slate-600">Berlaku untuk seluruh siswa — demo, mudah disesuaikan.</p></div>
        </div>

        <div className="space-y-4">
          {TATA_TERTIB.categories.map((cat, idx) => {
            const isOpen = open === idx;
            return (
              <div key={idx} className="bg-white rounded-[28px] shadow-card border border-[#ece4d4] overflow-hidden">
                <button onClick={() => setOpen(isOpen ? null : idx)} className="w-full flex gap-4 p-6 text-left hover:bg-slate-50 transition items-center">
                  <span className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center"><BookOpen className="w-5 h-5" /></span>
                  <div className="flex-1"><div className="font-bold text-navy">{cat.name}</div><div className="text-[10px] font-bold tracking-widest text-slate-500">{cat.rules.length} aturan</div></div>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <div className="px-6 pb-6 pt-2 border-t border-[#ece4d4]"><ol className="space-y-2">{cat.rules.map((r,i)=> (<li key={i} className="flex gap-3 text-sm text-slate-600"><span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 shrink-0" /><span>{r}</span></li>))}</ol></div>}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
