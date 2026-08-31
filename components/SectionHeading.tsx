import Reveal from "@/components/Reveal";

export function SectionHeading({ eyebrow, title, desc, number }: { eyebrow: string; title: string; desc?: string; number?: string }) {
  return (
    <Reveal>
      <div>
        <div className="flex items-center gap-3">
          {number && <span className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold">{number}</span>}
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h2 className="h-display mt-2">{title}</h2>
        {desc && <p className="lead mt-2 max-w-2xl">{desc}</p>}
      </div>
    </Reveal>
  );
}
