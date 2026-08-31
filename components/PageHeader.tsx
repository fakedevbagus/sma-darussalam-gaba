import Doodles from "@/components/Doodles";

export default function PageHeader({ badge, title, accent, desc, img, breadcrumb }: { badge: string; title: string; accent?: string; desc: string; img: string; breadcrumb?: string }) {
  return (
    <section className="relative overflow-hidden pt-40 pb-12">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 pattern-grid" />
      <Doodles soft />
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-primary-300/30 blur-[80px] rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] bg-accent/20 blur-[70px] rounded-full" />
      <div className="max-w-[1280px] mx-auto px-5 md:px-6 relative">
        {breadcrumb && <div className="text-[11px] font-extrabold tracking-[0.18em] text-primary-600 uppercase mb-3">{breadcrumb}</div>}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex bg-white shadow-card border border-[#ece4d4] px-4 py-2 rounded-full text-[11px] font-extrabold tracking-widest text-primary-700 uppercase">{badge}</div>
            <h1 className="mt-4 font-display font-bold text-3xl sm:text-4xl md:text-5xl text-navy leading-[1.05]">
              {title} {accent && <span className="gradient-text">{accent}</span>}
            </h1>
            <p className="mt-4 text-slate-600 leading-7 max-w-xl text-sm md:text-base">{desc}</p>
          </div>
          <div className="lg:col-span-5 hidden sm:block relative">
            <div aria-hidden className="absolute -inset-2 arch-sm border-2 border-sun/50 -rotate-2" />
            <div className="relative arch-sm overflow-hidden shadow-3d border-4 border-white rotate-1 tilt">
              <img loading="lazy" src={img} alt="" className="w-full h-[240px] md:h-[300px] object-cover object-top" />
              <span className="absolute bottom-3 left-3 chip bg-white/95 text-navy shadow-card">SMA Darussalam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
