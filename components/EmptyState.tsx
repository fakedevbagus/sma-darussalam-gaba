import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";

type EmptyStateProps = {
  title?: string;
  desc?: string;
  icon?: LucideIcon;
  className?: string;
};

/** Kartu kosong yang rapi — ditampilkan saat data suatu bagian belum tersedia. */
export default function EmptyState({
  title = "Segera hadir",
  desc = "Informasi ini sedang kami siapkan.",
  icon: Icon = Sparkles,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`bg-white rounded-[28px] border border-dashed border-[#ece4d4] shadow-card p-10 md:p-12 text-center ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-700 flex items-center justify-center mx-auto">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-navy mt-4">{title}</h3>
      <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">{desc}</p>
    </div>
  );
}
