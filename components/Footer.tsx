import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "@/components/Logo";
import SocialLinks from "@/components/SocialLinks";
import { FOOTER_QUICK, FOOTER_INFO } from "@/config/navigation";
import { SCHOOL, WHATSAPP_READY } from "@/config/school";
import VisitorStats from "@/components/VisitorStats";
import CopyButton from "@/components/CopyButton";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white mt-16">
      {/* Wave pemisah dari body */}
      <svg aria-hidden viewBox="0 0 1440 48" preserveAspectRatio="none" className="absolute top-0 inset-x-0 w-full h-8 md:h-12 text-[#f6f8fe]" fill="currentColor"><path d="M0 0h1440v10c-220 30-460 38-720 22C480 16 220 8 0 26V0Z" /></svg>
      {/* Watermark logo */}
      <Image src="/logo.png" alt="" aria-hidden width={288} height={288} className="absolute -bottom-10 -right-8 w-56 md:w-72 h-auto opacity-[0.05] pointer-events-none select-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-primary-600/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6 pt-14 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Logo dark size={48} />
            <p className="mt-5 text-sm leading-6 text-white/70">Membentuk generasi yang cerdas, kreatif, berkarakter dan siap menghadapi masa depan.</p>
            <div className="mt-5"><SocialLinks variant="solid" size={36} whatsapp={false} /></div>
          </div>

          {/* Tautan Cepat */}
          <div>
            <h3 className="font-bold text-sm mb-4">Tautan Cepat</h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              {FOOTER_QUICK.map(l => (
                <li key={l.href}><Link href={l.href} className="hover:text-white transition inline-flex gap-2 items-center group"><span className="w-1.5 h-1.5 rounded-full bg-accent transition-all group-hover:w-3 group-hover:bg-sun" /> {l.label}</Link></li>
              ))}
              <li className="pt-2 mt-2 border-t border-white/10">
                <a href="https://kemendikdasmen.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-white transition inline-flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-sun" /> Kemendikdasmen ↗</a>
              </li>
              <li>
                <a href="https://dapo.kemendikdasmen.go.id/sekolah?npsn=70000262" target="_blank" rel="noopener noreferrer" className="hover:text-white transition inline-flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-sun" /> Dapodik — NPSN 70000262 ↗</a>
              </li>
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h3 className="font-bold text-sm mb-4">Hubungi Kami</h3>
            <div className="space-y-3 text-sm text-white/70">
              <p className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" /> {SCHOOL.address}</p>
              {WHATSAPP_READY && (
                <a href={SCHOOL.social.whatsapp} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white transition"><Phone className="w-4 h-4 text-accent shrink-0" /> {SCHOOL.whatsappDisplay}</a>
              )}
              <div className="flex items-center gap-1 min-w-0">
                <a href={`mailto:${SCHOOL.email}`} className="flex gap-3 hover:text-white transition min-w-0"><Mail className="w-4 h-4 text-accent shrink-0" /> {SCHOOL.email}</a>
                <CopyButton value={SCHOOL.email} label="Email" className="text-white/50 hover:text-sun hover:bg-white/10" />
              </div>
            </div>
          </div>

          {/* Statistik Pengunjung */}
          <VisitorStats />
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/50">
          <div>{SCHOOL.copyright} • Data terverifikasi Dapodik NPSN {SCHOOL.npsn}</div>
          <div className="flex gap-4">
            {FOOTER_INFO.map(l => (<Link key={l.href} href={l.href} className="hover:text-white">{l.label}</Link>))}
          </div>
        </div>
      </div>
    </footer>
  );
}
