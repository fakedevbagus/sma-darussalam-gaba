import { SCHOOL } from "@/config/school";

export default function Logo({ dark = false, size = 44 }: { dark?: boolean; size?: number }) {
  return (
    <span className="flex items-center gap-2.5 group">
      <span className="relative inline-flex">
        <span className="absolute inset-0 rounded-2xl bg-primary-400/50 blur-lg opacity-60 group-hover:opacity-90 transition" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SCHOOL.logoUrl}
          alt={`Logo ${SCHOOL.name}`}
          width={size}
          height={size}
          className="relative rounded-xl object-contain bg-white/90 p-0.5 shadow-md group-hover:scale-105 group-hover:-rotate-3 transition"
        />
      </span>
      <span className="leading-tight text-left">
        <span className={`block font-display font-bold tracking-tight ${dark ? "text-white" : "text-navy"}`}>
          SMA <span className="text-primary-500">DARUSSALAM</span>
        </span>
        <span className={`block text-[10px] font-bold uppercase tracking-[0.14em] ${dark ? "text-white/60" : "text-slate-500"}`}>
          Yayasan Darussalam Simpang Mesir
        </span>
      </span>
    </span>
  );
}
