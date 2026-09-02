"use client";

import { type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

/** Kemiringan maksimum kartu dalam derajat — J3: "jangan berlebihan". */
const MAX_TILT = 6;

type GlowCardProps = {
  children: ReactNode;
  /** Diteruskan ke pembungkus — markup kartu asli tidak diubah. */
  className?: string;
  /** Aktifkan tilt 3D lembut (maks 6deg) mengikuti kursor (G4-8). */
  tilt?: boolean;
};

/**
 * Pembungkus tipis untuk kartu:
 * - G4-7: mengatur --gx/--gy saat pointer bergerak → cahaya radial (.glow::before).
 * - G4-8: mengatur --rx/--ry → .card-3d pada kartu di dalamnya miring mengikuti kursor
 *   (custom properties diwariskan ke anak, jadi kartu yang sudah ber-class card-3d
 *   maupun yang ditambahkan card-3d sama-sama berfungsi).
 *
 * Performa: TIDAK memakai React state — handler hanya menulis custom properties
 * langsung ke element.style, sehingga tidak ada re-render per gerakan mouse dan
 * tidak ada layout thrash (custom properties tidak memicu layout ulang).
 * Perangkat sentuh diabaikan sejak awal di handler; guard visual ada di CSS
 * (@media (hover: hover)) sehingga tidak ada glow yang "nyangkut" di HP.
 */
export default function GlowCard({ children, className = "", tilt = false }: GlowCardProps) {
  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const s = el.style;
    s.setProperty("--gx", `${(px * 100).toFixed(2)}%`);
    s.setProperty("--gy", `${(py * 100).toFixed(2)}%`);
    if (tilt) {
      s.setProperty("--ry", `${((px - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`);
      s.setProperty("--rx", `${((0.5 - py) * 2 * MAX_TILT).toFixed(2)}deg`);
    }
  };

  // Saat pointer keluar, hapus variabel tilt → .card-3d kembali ke fallback
  // statis lalu ke datar, dengan transisi yang sama (kembali mulus).
  const handlePointerLeave = tilt
    ? (e: ReactPointerEvent<HTMLDivElement>) => {
        const s = e.currentTarget.style;
        s.removeProperty("--rx");
        s.removeProperty("--ry");
      }
    : undefined;

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`glow${tilt ? " glow-tilt" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
