"use client";
/** Marquee otomatis halus — untuk Galeri (slide otomatis) & Guru (gerak ke kiri pelan) */
export default function Marquee({
  children,
  duration = 40,
  bg = "#f4f9ff",
  className = "",
}: {
  children: React.ReactNode;
  duration?: number;
  bg?: string;
  className?: string;
}) {
  return (
    <div className={`marquee ${className}`} style={{ ["--marquee-duration" as any]: `${duration}s`, ["--marquee-bg" as any]: bg }}>
      <div className="marquee-fade-l" />
      <div className="marquee-fade-r" />
      <div className="marquee-track gap-5 pr-5">
        {children}
        {children}
      </div>
    </div>
  );
}
