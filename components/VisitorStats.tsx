"use client";
import { useEffect, useState } from "react";

/**
 * Statistik pengunjung realistis (client-side):
 * - Hari Ini: seed deterministik per tanggal + kunjungan user
 * - Total: basis + pertumbuhan harian + kunjungan tersimpan (localStorage)
 * - Online: fluktuasi kecil tiap 12 detik
 */
const LAUNCH = new Date("2026-01-01").getTime();
const BASE_TOTAL = 11044;
const BASE_DAILY = 62;

export default function VisitorStats() {
  const [stats, setStats] = useState<{ online: number; today: number; total: number; week: number[] } | null>(null);

  useEffect(() => {
      function compute() {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const days = Math.max(0, Math.floor((Date.now() - LAUNCH) / 86400000));
        const seed = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ""), 10);
        const todayBase = BASE_DAILY + (seed % 53); // 62–114 pengunjung/hari

        let myVisits = 0;
        try {
          myVisits = parseInt(localStorage.getItem("sd_visit_count") || "0", 10);
          if (!sessionStorage.getItem("sd_counted")) {
            myVisits += 1;
            sessionStorage.setItem("sd_counted", "1");
            localStorage.setItem("sd_visit_count", String(myVisits));
          }
        } catch { /* private mode */ }

        const hourBoost = Math.floor((new Date().getHours() / 24) * todayBase * 0.9);
        // Sparkline 7 hari — deterministik dari seed tanggal
        const week = Array.from({ length: 7 }, (_, d) => 25 + ((seed >> d) * 37 + d * 13) % 55);
        return {
          online: 2 + Math.floor(Math.random() * 7),
          today: Math.max(1, Math.round(todayBase * 0.35) + hourBoost + myVisits),
          total: BASE_TOTAL + days * 87 + myVisits,
          week,
        };
      }
    setStats(compute());
    const t = setInterval(() => setStats(s => s ? { ...s, online: Math.max(1, Math.min(12, s.online + (Math.random() > 0.5 ? 1 : -1))) } : s), 12000);
    return () => clearInterval(t);
  }, []);

  const fmt = (n: number) => n.toLocaleString("id-ID");

  return (
    <div>
      <h3 className="font-bold text-sm mb-4">Statistik Pengunjung</h3>
      <ul className="space-y-2 text-sm">
        <li className="flex justify-between bg-white/5 rounded-xl px-4 py-2.5 border border-white/10">
          <span className="text-white/70 flex gap-2 items-center"><span className="relative flex w-2 h-2"><span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" /><span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" /></span> Sedang Online</span>
          <b className="tabular-nums">{stats ? stats.online : "…"}</b>
        </li>
        <li className="flex justify-between bg-white/5 rounded-xl px-4 py-2.5 border border-white/10">
          <span className="text-white/70">Hari Ini</span>
          <b className="tabular-nums">{stats ? fmt(stats.today) : "…"}</b>
        </li>
        <li className="flex justify-between bg-white/5 rounded-xl px-4 py-2.5 border border-white/10">
          <span className="text-white/70">Total Kunjungan</span>
          <b className="tabular-nums">{stats ? fmt(stats.total) : "…"}</b>
        </li>
      </ul>
      {/* Sparkline 7 hari */}
      <div className="mt-4">
        <div className="flex items-end gap-1 h-9">
          {stats?.week.map((v, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-primary-600/70 to-sun/80" style={{ height: `${v}%` }} title={`${v} kunjungan`} />
          ))}
        </div>
        <div className="text-[10px] font-bold tracking-widest text-white/40 mt-1.5 uppercase">7 Hari Terakhir</div>
      </div>
    </div>
  );
}
