"use client";
import PageHeader from "@/components/PageHeader";
import { FAQS } from "@/lib/demo-data";
import { useState, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, HelpCircle, ChevronDown, GraduationCap, BookOpen, Users, Shield, Phone } from "lucide-react";

const icons: Record<string, any> = { PPDB: GraduationCap, Akademik: BookOpen, Kegiatan: Users, Umum: Shield, Kontak: Phone, Portal: HelpCircle };

export default function FaqPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string|null>(null);
  const [open, setOpen] = useState<string|null>(FAQS[0]?.id ?? null);
  const reduceMotion = useReducedMotion();
  const cats = useMemo(()=> [...new Set(FAQS.map(f=>f.category))].sort(), []);
  const filtered = FAQS.filter(f=>{
    const mCat = cat===null||f.category===cat;
    const mQ = q===""||f.question.toLowerCase().includes(q.toLowerCase())||f.answer.toLowerCase().includes(q.toLowerCase());
    return mCat&&mQ;
  });
  return (
    <div>
      <PageHeader badge="BANTUAN • FAQ" title="Pertanyaan" accent="Umum" desc="Jawaban cepat seputar PPDB, akademik & layanan sekolah" img="https://images.unsplash.com/photo-1521791136064-7986c86c6438?q=80&w=800&auto=format&fit=crop" breadcrumb="Layanan / FAQ" />
      <section className="max-w-[800px] mx-auto px-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari pertanyaan..." className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-semibold shadow-card focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={()=>setCat(null)} className={`px-4 py-2 rounded-full text-xs font-bold border flex gap-1.5 items-center ${cat===null?"bg-navy text-white border-navy":"bg-white border-slate-200 text-slate-600"}`}><HelpCircle className="w-3.5 h-3.5" /> Semua</button>
          {cats.map(c=>{
            const Icon = icons[c] ?? HelpCircle;
            return <button key={c} onClick={()=>setCat(c)} className={`px-4 py-2 rounded-full text-xs font-bold border flex gap-1.5 items-center ${cat===c?"bg-primary-600 text-white border-primary-600":"bg-white border-slate-200 text-slate-600"}`}><Icon className="w-3.5 h-3.5" /> {c}</button>;
          })}
        </div>
        <div className="text-center text-xs font-bold tracking-widest text-slate-500 mt-6">{filtered.length} pertanyaan ditemukan</div>

        <div className="mt-6 space-y-3">
          {filtered.map((faq,i)=> (
            <div key={faq.id} className="bg-white rounded-2xl border border-[#ece4d4] shadow-sm overflow-hidden">
              <button
                onClick={()=> setOpen(open===faq.id?null:faq.id)}
                aria-expanded={open===faq.id}
                aria-controls={`faq-panel-${faq.id}`}
                className="w-full flex gap-3 p-5 text-left items-center"
              >
                <span className="w-7 h-7 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center text-[10px] font-bold shrink-0">{String(i+1).padStart(2,"0")}</span>
                <span className="flex-1 font-bold text-navy text-sm">{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition ${open===faq.id?"rotate-180":""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open===faq.id && (
                  <motion.div
                    key="panel"
                    id={`faq-panel-${faq.id}`}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5"><div className="ml-10 border-l-2 border-primary-100 pl-4 text-sm leading-6 text-slate-600">{faq.answer}</div></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          {filtered.length===0 && <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-200"><HelpCircle className="w-10 h-10 mx-auto text-slate-300" /><p className="text-sm text-slate-500 mt-3">Tidak ada pertanyaan cocok.</p></div>}
        </div>

        <div className="mt-10 bg-navy text-white rounded-2xl p-6 text-center">
          <p className="text-sm font-semibold">Tidak menemukan jawaban?</p>
          <a href="/kontak" className="mt-3 inline-flex bg-white text-navy px-5 py-2.5 rounded-full text-sm font-bold">Hubungi Kami →</a>
        </div>
      </section>
    </div>
  );
}
