import { ANNOUNCEMENTS, formatDateId } from "@/lib/demo-data";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return ANNOUNCEMENTS.filter(a=>a.category==="pengumuman").map(a=> ({ slug: a.slug }));
}

export default function PengumumanDetail({ params }: { params: { slug: string } }) {
  const item = ANNOUNCEMENTS.find(a=> a.slug===params.slug && a.category==="pengumuman");
  if (!item) return notFound();
  return (
    <div>
      <PageHeader badge="PENGUMUMAN" title={item.title} desc={`${formatDateId(item.createdAt)} • ${item.authorName}`} img={item.coverUrl || "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?q=80&w=800&auto=format&fit=crop"} breadcrumb={`Pengumuman / Detail`} />
      <section className="max-w-[800px] mx-auto px-6 -mt-2">
        <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-card border border-slate-100">
          <h1 className="font-display font-extrabold text-3xl text-navy leading-tight">{item.title}</h1>
          {item.coverUrl && <img src={item.coverUrl} alt={item.title} className="w-full h-[380px] object-cover rounded-2xl mt-6" />}
          <div className="mt-6 whitespace-pre-line text-sm leading-7 text-slate-700">{item.content}</div>
          <div className="mt-8 flex gap-3">
            <Link href="/pengumuman" className="bg-white border border-slate-200 px-5 py-2.5 rounded-full text-sm font-bold text-navy">← Semua Pengumuman</Link>
            <Link href="/berita" className="bg-navy text-white px-5 py-2.5 rounded-full text-sm font-bold">Berita</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
