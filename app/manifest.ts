import type { MetadataRoute } from "next";
import { SCHOOL } from "@/config/school";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SCHOOL.name,
    short_name: SCHOOL.shortName,
    description: SCHOOL.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f4fafe",
    theme_color: "#2735F5",
    lang: "id",
    icons: [
      { src: "/favicon.png", sizes: "64x64", type: "image/png" },
      { src: "/logo.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}