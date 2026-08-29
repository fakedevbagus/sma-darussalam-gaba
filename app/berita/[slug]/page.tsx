import { ANNOUNCEMENTS, formatDateId } from "@/lib/demo-data";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, UserRound, Tag } from "lucide-react";

export function generateStaticParams() {
  return ANNOUNCEMENTS.map(a => ({ slug: a.slug }));
}

export default function BeritaDetail({ params }: { params: { slug: string } }) {
  const item = ANNOUNCEMENTS.find(a => a.slug === params.slug);
  if (!item) return notFound();
  return (
    <div>
      <PageHeader badge={item.category.toUpperCase()} title={item.title} desc={`${formatDateId(item.createdAt)} • ${item.authorName}`} img={item.coverUrl || "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?q=80&w=800&auto=format&fit=crop"} breadcrumb={`Berita / ${item.title.slice(0,30)}...`} />
      <section className="max-w-[800px] mx-auto px-6">
        <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-card border border-[#ece4d4]">
          <div className="flex flex-wrap gap-2 items-center text-xs">
            <span className="bg-primary-600 text-white px-3 py-1.5 rounded-full font-bold tracking-widest">{item.category}</span>
            <span className="flex gap-1 items-center text-slate-500"><Calendar className="w-3.5 h-3.5" /> {formatDateId(item.createdAt)}</span>
            <span className="flex gap-1 items-center text-slate-500"><UserRound className="w-3.5 h-3.5" /> {item.authorName}</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl text-navy mt-4 leading-tight">{item.title}</h1>
          {item.coverUrl && <img src={item.coverUrl} alt={item.title} className="w-full h-[380px] object-cover rounded-2xl mt-6" />}
          <div className="mt-6 whitespace-pre-line text-sm leading-7 text-slate-700">{item.content}</div>
          <div className="mt-8 flex gap-3">
            <Link href="/berita" className="bg-white border border-slate-200 px-5 py-2.5 rounded-full text-sm font-bold text-navy">← Semua Berita</Link>
            <Link href="/pengumuman" className="bg-navy text-white px-5 py-2.5 rounded-full text-sm font-bold">Pengumuman</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
