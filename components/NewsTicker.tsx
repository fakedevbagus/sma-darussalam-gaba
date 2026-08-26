"use client";
import { ANNOUNCEMENTS } from "@/lib/demo-data";
import Link from "next/link";
import { Megaphone } from "lucide-react";

/** Running text pengumuman — ala NewsTicker Darussalam */
export default function NewsTicker() {
  const items = ANNOUNCEMENTS.slice(0, 4).map(a => a.title);
  const doubled = [...items, ...items];
  return (
    <div className="relative z-30 bg-gradient-to-r from-primary-600 via-primary-500 to-accent text-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto flex items-center gap-3 px-4 py-2">
        <span className="shrink-0 inline-flex items-center gap-1.5 bg-white text-primary-700 rounded-full px-3 py-1 text-[10px] font-extrabold tracking-widest uppercase shadow">
          <Megaphone className="w-3 h-3" /> Info
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex whitespace-nowrap gap-10 text-xs font-bold animate-ticker">
            {doubled.map((t, i) => (
              <Link key={i} href="/berita" className="hover:underline opacity-95">📢 {t}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
