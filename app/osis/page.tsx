import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { OSIS_DATA } from "@/lib/demo-data";
import { Users, Target, Activity, Mail } from "lucide-react";

export default function OsisPage() {
  const osis = OSIS_DATA;
  return (
    <div>
      <PageHeader badge="KESISWAAN • OSIS" title={osis.title} desc={osis.description} img="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" breadcrumb="Kesiswaan / OSIS" />
      <section className="max-w-[1280px] mx-auto px-6 space-y-10">
        <div className="bg-white rounded-[36px] p-8 shadow-card border border-[#ece4d4]">
          <div className="flex gap-3 items-center"><span className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center"><Target className="w-5 h-5" /></span><h2 className="font-display font-extrabold text-xl text-navy">Visi & Misi</h2></div>
          <div className="mt-6">
            <div className="text-xs font-bold tracking-widest text-primary-700">VISI</div>
            <p className="text-sm text-slate-600 mt-2 leading-6">{osis.vision}</p>
          </div>
          <div className="mt-6">
            <div className="text-xs font-bold tracking-widest text-primary-700">MISI</div>
            <ul className="mt-2 space-y-2">{osis.mission.map((m,i)=> (<li key={i} className="flex gap-3 text-sm text-slate-600"><span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2" />{m}</li>))}</ul>
          </div>
        </div>

        <div>
          <h3 className="font-display font-extrabold text-xl text-navy">Struktur Organisasi</h3>
          {osis.structure.length === 0 ? (
            <div className="mt-6">
              <EmptyState title="Struktur OSIS segera hadir" />
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-600 mt-1">Periode {osis.structure[0].year}</p>
              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {osis.structure.map((p,i)=> (
                  <div key={i} className="bg-white rounded-2xl p-4 shadow-card border border-[#ece4d4] flex gap-4 items-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-600 to-accent flex items-center justify-center text-white font-bold text-lg">{p.name.split(" ").slice(0,2).map(w=>w[0]).join("")}</div>
                    <div><div className="font-bold text-navy text-sm">{p.name}</div><div className="text-[10px] font-bold tracking-widest text-primary-600 uppercase">{p.position}</div></div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <h3 className="font-display font-extrabold text-xl text-navy">Program Kerja</h3>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {osis.programs.map((prog,i)=> (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-card border border-[#ece4d4]">
                <div className="inline-flex bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-[10px] font-bold">Program {i+1}</div>
                <div className="font-bold text-navy mt-2">{prog.title}</div>
                <p className="text-xs text-slate-600 mt-1">{prog.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display font-extrabold text-xl text-navy">Kegiatan</h3>
          <div className="mt-6 space-y-3">
            {osis.activities.map((act,i)=> (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-card border border-[#ece4d4] flex gap-4">
                <span className="w-10 h-10 rounded-xl bg-amber-400 text-navy flex items-center justify-center"><Activity className="w-5 h-5" /></span>
                <div><div className="font-bold text-navy text-sm">{act.title}</div><div className="text-xs text-slate-600">{act.description}</div><div className="text-[10px] font-bold text-primary-600 mt-1">{act.date}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-navy text-white rounded-2xl p-6 flex gap-3 items-center">
          <Mail className="w-5 h-5 text-accent" />
          <div><div className="font-bold text-sm">Hubungi OSIS</div><a href={`mailto:${osis.contactEmail}`} className="text-xs text-white/80 hover:text-white">{osis.contactEmail}</a></div>
        </div>
      </section>
    </div>
  );
}
