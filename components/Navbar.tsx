"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import Logo from "@/components/Logo";
import NewsTicker from "@/components/NewsTicker";
import { PUBLIC_NAV, WA_LINK, DAFTAR_LINK } from "@/config/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-3"}`}>
      <div className="mx-auto max-w-[1280px] px-4">
        <div className={`flex items-center justify-between rounded-[20px] px-4 md:px-6 py-3 transition-all duration-500 ${scrolled ? "bg-white/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.12)] border border-white/60" : "bg-white shadow-card border border-slate-100"}`}>
          <Link href="/" className="flex items-center gap-3 group" aria-label="Beranda">
            <Logo />
          </Link>

          {/* Desktop */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {PUBLIC_NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="relative" onMouseEnter={() => setActive(item.label)} onMouseLeave={() => setActive(null)}>
                  <button
                    onClick={() => setActive(active === item.label ? null : item.label)}
                    className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-[13px] font-semibold transition ${active === item.label ? "bg-navy text-white shadow-lg" : "text-slate-700 hover:bg-slate-100"}`}
                  >
                    {item.label} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${active === item.label ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {active === item.label && (
                      <motion.div initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.96 }} transition={{ duration: 0.18 }}
                        className={item.children.length > 4 ? "absolute right-0 top-[52px] w-[340px] p-2" : "absolute left-1/2 -translate-x-1/2 top-[52px] w-[420px] p-2"}>
                        <div className="bg-white rounded-[20px] shadow-[0_25px_60px_rgba(15,23,42,0.18)] border border-slate-100 overflow-hidden p-2">
                          {item.children.map((s) => (
                            <Link key={s.href} href={s.href} className="group/item flex gap-3 p-3 rounded-xl hover:bg-primary-50 transition">
                              <span className="mt-1 w-2 h-2 rounded-full bg-primary-500 shrink-0 group-hover/item:scale-125 transition" />
                              <span>
                                <span className="block text-sm font-bold text-navy group-hover/item:text-primary-700">{s.label}</span>
                                <span className="block text-xs text-slate-500">{s.desc}</span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={item.label} href={item.href} className={`px-4 py-2.5 rounded-full text-[13px] font-semibold transition ${pathname === item.href ? "bg-primary-600 text-white shadow-md" : "text-slate-700 hover:bg-slate-100"}`}>{item.label}</Link>
              )
            )}
          </nav>

          {/* CTA kanan: WA + Daftar */}
          <div className="hidden lg:flex items-center gap-2">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 transition px-3 py-2.5">
              <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><MessageCircle className="w-4 h-4" /></span>
              0812-3456-7890
            </a>
            <Link href={DAFTAR_LINK} className="relative inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-full text-sm font-bold shadow-float hover:shadow-glow hover:scale-[1.02] transition overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              DAFTAR SEKARANG
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} aria-label="Menu" className="lg:hidden w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Ticker info berita — bagian dari header fixed agar tidak tertutup logo */}
        {pathname === "/" && <div className="mt-2 rounded-full overflow-hidden"><NewsTicker /></div>}

        {/* Mobile */}
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="lg:hidden mt-3 bg-white rounded-[24px] shadow-[0_20px_50px_rgba(15,23,42,0.18)] border border-slate-100 overflow-hidden max-h-[75vh] overflow-y-auto">
              <div className="p-2">
                {PUBLIC_NAV.map((item) =>
                  item.children ? (
                    <details key={item.label} className="group">
                      <summary className="flex items-center justify-between px-4 py-3.5 font-bold text-navy cursor-pointer list-none hover:bg-slate-50 rounded-2xl">
                        {item.label} <ChevronDown className="w-4 h-4 group-open:rotate-180 transition" />
                      </summary>
                      <div className="px-2 pb-2 grid gap-1">
                        {item.children.map((s) => (
                          <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl bg-slate-50 hover:bg-primary-50 transition">
                            <span className="text-sm font-bold text-navy block">{s.label}</span>
                            <span className="text-xs text-slate-500">{s.desc}</span>
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className={`block px-4 py-3.5 font-bold rounded-2xl ${pathname === item.href ? "bg-primary-600 text-white" : "text-navy hover:bg-slate-50"}`}>{item.label}</Link>
                  )
                )}
                <div className="p-2 mt-2 grid grid-cols-2 gap-2">
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex gap-2 justify-center items-center bg-emerald-500 text-white py-3.5 rounded-2xl font-bold text-sm"><MessageCircle className="w-4 h-4" /> Hubungi CS</a>
                  <Link href={DAFTAR_LINK} onClick={() => setOpen(false)} className="text-center bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3.5 rounded-2xl font-bold text-sm shadow-float">DAFTAR SEKARANG</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
