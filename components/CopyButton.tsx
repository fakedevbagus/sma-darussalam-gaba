"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

/** Tombol salin kecil dengan umpan balik centang selama 2 detik. */
export default function CopyButton({
  value,
  label = "Salin",
  className = "",
  showLabel = false,
}: {
  value: string;
  label?: string;
  className?: string;
  /** true = tampilkan teks label di samping ikon (gaya pill/baris aksi). */
  showLabel?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard tidak tersedia — abaikan tanpa error */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Tersalin" : `${label} ${value}`}
      className={`inline-flex items-center ${showLabel ? "gap-1.5" : "justify-center w-8 h-8 rounded-lg"} text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition shrink-0 ${className}`}
    >
      {copied ? <Check className="w-4 h-4 text-mint" /> : <Copy className="w-4 h-4" />}
      {showLabel && <span className="text-xs font-extrabold">{copied ? "Tersalin!" : label}</span>}
    </button>
  );
}