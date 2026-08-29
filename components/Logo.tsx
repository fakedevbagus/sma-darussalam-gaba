import { SCHOOL } from "@/config/school";

export default function Logo({ dark = false, white = false, size = 44 }: { dark?: boolean; white?: boolean; size?: number }) {
  return (
    <span className="flex items-center gap-2.5 group">
      <span className="relative inline-flex">
        {!white && <span className="absolute inset-0 rounded-2xl bg-primary-400/40 blur-lg opacity-50 group-hover:opacity-80 transition" />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SCHOOL.logoUrl}
          alt={`Logo ${SCHOOL.name}`}
          width={size}
          height={size}
          className={`relative object-contain group-hover:scale-105 group-hover:-rotate-3 transition ${white ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]" : ""}`}
        />
      </span>
      <span className="leading-tight text-left">
        <span className={`block font-display font-semibold tracking-tight ${white ? "text-white" : dark ? "text-white" : "text-navy"}`}>
          SMA <span className={white ? "text-primary-200" : "text-primary-500"}>DARUSSALAM</span>
        </span>
        <span className={`block text-[10px] font-bold uppercase tracking-[0.14em] ${white ? "text-white/70" : dark ? "text-white/60" : "text-slate-500"}`}>
          Yayasan Darussalam Simpang Mesir
        </span>
      </span>
    </span>
  );
}
