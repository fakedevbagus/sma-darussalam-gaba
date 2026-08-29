/** Wallpaper doodle kreatif — tema pondok-sekolah (pasang di section manapun) */
export default function Doodles({ soft = false, className = "" }: { soft?: boolean; className?: string }) {
  return <div aria-hidden className={`doodle-layer ${soft ? "doodle-layer-soft" : ""} ${className}`} />;
}