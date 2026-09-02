"use client";
import { useEffect, useState } from "react";

/**
 * Statistik pengunjung ASLI via GoatCounter (paket gratis).
 *
 * Prasyarat:
 *  1. NEXT_PUBLIC_GOATCOUNTER_CODE terisi kode situs GoatCounter.
 *  2. Di GoatCounter > Settings, opsi "Allow adding visitor counts on your
 *     website" HARUS dinyalakan (bawaannya mati).
 *
 * Catatan: GoatCounter men-cache angka counter hingga 4 jam, jadi kunjungan
 * baru tidak langsung terlihat. Ini normal.
 */
const GC: string = "smadarussalam";

/** GoatCounter mengembalikan angka sebagai teks berformat; jadikan format id-ID. */
function toIdNumber(raw: string) {
  const n = parseInt(raw.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n.toLocaleString("id-ID") : raw;
}

async function fetchCount(start?: string): Promise<string | null> {
  try {
    const q = start ? `?start=${encodeURIComponent(start)}` : "";
    const res = await fetch(`https://${GC}.goatcounter.com/counter/TOTAL.json${q}`);
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data?.count === "string" ? toIdNumber(data.count) : null;
  } catch {
    return null;
  }
}

export default function VisitorStats() {
  const [total, setTotal] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);

  useEffect(() => {
    if (!GC) return;
    let alive = true;
    (async () => {
      const [t, m] = await Promise.all([fetchCount(), fetchCount("month")]);
      if (!alive) return;
      setTotal(t);
      setMonth(m);
    })();
    return () => {
      alive = false;
    };
  }, []);

  /* Belum dikonfigurasi atau layanan tidak menjawab → jangan tampilkan apa pun. */
  if (!GC || (total === null && month === null)) return null;

  return (
    <div>
      <h3 className="font-bold text-sm mb-4">Statistik Pengunjung</h3>
      <ul className="space-y-2 text-sm">
        {month !== null && (
          <li className="flex justify-between bg-white/5 rounded-xl px-4 py-2.5 border border-white/10">
            <span className="text-white/70">Bulan Ini</span>
            <b className="tabular-nums">{month}</b>
          </li>
        )}
        {total !== null && (
          <li className="flex justify-between bg-white/5 rounded-xl px-4 py-2.5 border border-white/10">
            <span className="text-white/70">Total Kunjungan</span>
            <b className="tabular-nums">{total}</b>
          </li>
        )}
      </ul>
    </div>
  );
}
