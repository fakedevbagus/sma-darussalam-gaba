"use client";
import { SCHOOL } from "@/config/school";
import { FacebookIcon, InstagramIcon, TiktokIcon, YoutubeIcon, WhatsappIcon } from "@/components/BrandIcons";

/** Ikon sosmed dengan warna asli brand (SVG resmi) */
export const BRAND_COLORS: Record<string, string> = {
  facebook: "#1877F2",
  instagram: "#E1306C",
  youtube: "#FF0000",
  tiktok: "#010101",
  whatsapp: "#25D366",
};

const ITEMS = [
  { key: "facebook", href: SCHOOL.social.facebook, Icon: FacebookIcon, label: "Facebook" },
  { key: "instagram", href: SCHOOL.social.instagram, Icon: InstagramIcon, label: "Instagram" },
  { key: "tiktok", href: SCHOOL.social.tiktok, Icon: TiktokIcon, label: "TikTok" },
  { key: "youtube", href: SCHOOL.social.youtube, Icon: YoutubeIcon, label: "YouTube" },
  { key: "whatsapp", href: SCHOOL.social.whatsapp, Icon: WhatsappIcon, label: "WhatsApp" },
];

export default function SocialLinks({ variant = "solid", size = 38 }: { variant?: "solid" | "light"; size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      {ITEMS.map(({ key, href, Icon, label }) => (
        <a
          key={key}
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          style={{ backgroundColor: variant === "solid" ? BRAND_COLORS[key] : "rgba(255,255,255,0.16)" }}
          className="rounded-full flex items-center justify-center text-white shadow-md hover:-translate-y-1 hover:scale-110 transition border border-white/20"
        >
          <span style={{ width: size, height: size }} className="flex items-center justify-center">
            <Icon className="w-[46%] h-[46%]" />
          </span>
        </a>
      ))}
    </div>
  );
}
