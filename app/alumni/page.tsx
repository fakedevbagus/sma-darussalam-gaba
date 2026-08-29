import PageHeader from "@/components/PageHeader";
import { ALUMNI } from "@/lib/demo-data";
import { Quote, User } from "lucide-react";

const STATS = [
  { value: "3", label: "Angkatan Lulusan" },
  { value: "500+", label: "Total Alumni" },
  { value: "80%", label: "Lanjut ke PT" },
  { value: "2022", label: "Lulusan Pertama" },
];

export default function AlumniPage() {
  return (
    <div>
      <PageHeader badge="KESISWAAN • ALUMNI" title="Alumni &" accent="Testimoni" desc="Jejak langkah lulusan yang sukses di berbagai bidang & perguruan tinggi terkemuka — inspirasi untuk adik kelas." img="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" breadcrumb="Kesiswaan / Alumni" />
      <section className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(s=> (
            <div key={s.label} className="bg-white rounded-2xl p-5 text-center shadow-card border border-[#ece4d4]">
              <div className="text-2xl font-extrabold gradient-text">{s.value}</div>
              <div className="text-xs font-bold text-slate-600 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <h3 className="font-display font-extrabold text-2xl text-navy mt-10">Cerita Alumni</h3>
        <p className="text-sm text-slate-600 mt-2">Testimoni lulusan — demo, bisa ganti foto & quotes via lib/demo-data.ts</p>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALUMNI.map(a=> (
            <div key={a.id} className="bg-white rounded-[24px] overflow-hidden shadow-card border border-[#ece4d4] hover:shadow-3d transition">
              <div className="h-[220px] relative overflow-hidden">
                <img src={a.photoUrl} alt={a.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <Quote className="w-6 h-6 text-primary-200" />
                <p className="text-sm leading-6 text-slate-600 italic mt-1">“{a.quote}”</p>
                <div className="mt-4 border-t border-dashed border-slate-200 pt-4">
                  <div className="font-bold text-navy text-sm">{a.name}</div>
                  <div className="text-xs text-slate-500">Lulusan {a.graduationYear} • {a.university}</div>
                  <div className="text-[10px] font-bold text-primary-600 mt-1">{a.major}</div>
                  <div className="mt-2 inline-flex bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full text-[10px] font-bold">{a.currentStatus}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
