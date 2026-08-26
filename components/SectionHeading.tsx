export function SectionHeading({ eyebrow, title, desc, number }: { eyebrow: string; title: string; desc?: string; number?: string }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        {number && <span className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold">{number}</span>}
        <span className="text-xs font-bold tracking-[0.18em] text-primary-700 uppercase">{eyebrow}</span>
      </div>
      <h2 className="mt-2 font-display font-extrabold text-2xl md:text-3xl text-navy leading-tight">{title}</h2>
      {desc && <p className="mt-2 text-sm leading-6 text-slate-600 max-w-2xl">{desc}</p>}
    </div>
  );
}
