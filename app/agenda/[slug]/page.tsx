import { EVENTS, formatDateId } from "@/lib/demo-data";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin } from "lucide-react";

export function generateStaticParams() { return EVENTS.map(e=> ({ slug: e.slug })); }

export default function AgendaDetail({ params }: { params: { slug: string } }) {
  const item = EVENTS.find(e=> e.slug===params.slug);
  if (!item) return notFound();
  return (
    <div>
      <PageHeader badge={item.category.toUpperCase()} title={item.title} desc={`${formatDateId(item.startDate)} • ${item.location}`} img="https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=800&auto=format&fit=crop" breadcrumb={`Agenda / ${item.title}`} />
      <section className="max-w-[800px] mx-auto px-6">
        <div className="bg-white rounded-[36px] p-8 md:p-10 shadow-card border border-[#ece4d4]">
          <div className="inline-flex bg-navy text-white px-3 py-1.5 rounded-full text-xs font-bold">{item.category}</div>
          <h1 className="font-display font-extrabold text-3xl text-navy mt-4 leading-tight">{item.title}</h1>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="flex gap-1.5 items-center"><CalendarDays className="w-4 h-4 text-primary-600" /> {formatDateId(item.startDate)} – {formatDateId(item.endDate)}</span>
            <span className="flex gap-1.5 items-center"><MapPin className="w-4 h-4 text-primary-600" /> {item.location}</span>
          </div>
          <p className="mt-6 text-sm leading-7 text-slate-700">{item.description}</p>
          <div className="mt-8 flex gap-3">
            <Link href="/agenda" className="bg-white border border-slate-200 px-5 py-2.5 rounded-full text-sm font-bold text-navy">← Semua Agenda</Link>
            <Link href="/kontak" className="bg-navy text-white px-5 py-2.5 rounded-full text-sm font-bold">Tanya Panitia</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
