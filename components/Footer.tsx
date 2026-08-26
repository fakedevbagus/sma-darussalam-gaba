import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "@/components/Logo";
import SocialLinks from "@/components/SocialLinks";
import { FOOTER_QUICK, FOOTER_INFO } from "@/config/navigation";
import { SCHOOL } from "@/config/school";
import VisitorStats from "@/components/VisitorStats";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white mt-16">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-60" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-primary-600/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6 pt-14 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Logo dark size={48} />
            <p className="mt-5 text-sm leading-6 text-white/70">Membentuk generasi yang cerdas, kreatif, berkarakter dan siap menghadapi masa depan.</p>
            <div className="mt-5"><SocialLinks variant="solid" size={36} /></div>
          </div>

          {/* Tautan Cepat */}
          <div>
            <h3 className="font-bold text-sm mb-4">Tautan Cepat</h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              {FOOTER_QUICK.map(l => (
                <li key={l.href}><Link href={l.href} className="hover:text-white transition inline-flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> {l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h3 className="font-bold text-sm mb-4">Hubungi Kami</h3>
            <div className="space-y-3 text-sm text-white/70">
              <p className="flex gap-3"><MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" /> {SCHOOL.address}</p>
              <a href={SCHOOL.social.whatsapp} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white transition"><Phone className="w-4 h-4 text-accent shrink-0" /> {SCHOOL.whatsapp}</a>
              <a href={`mailto:${SCHOOL.email}`} className="flex gap-3 hover:text-white transition"><Mail className="w-4 h-4 text-accent shrink-0" /> {SCHOOL.email}</a>
            </div>
          </div>

          {/* Statistik Pengunjung */}
          <VisitorStats />
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/50">
          <div>© 2026 SMA Biru Ceria. All Rights Reserved. • Data demo production — siap disesuaikan</div>
          <div className="flex gap-4">
            {FOOTER_INFO.map(l => (<Link key={l.href} href={l.href} className="hover:text-white">{l.label}</Link>))}
          </div>
        </div>
      </div>
    </footer>
  );
}
