"use client";
import { useEffect, useState } from "react";

/** Angka animasi count-up (setara counter stats smadarussalam.sch.id) */
export default function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const target = parseInt(value.replace(/\D/g, ""), 10);
  const isNumber = !isNaN(target);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!isNumber) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isNumber, target]);
  return <span className={`tabular-nums ${className}`}>{isNumber ? n.toLocaleString("id-ID") : value}</span>;
}