import type { MetadataRoute } from "next";
import { SCHOOL } from "@/config/school";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SCHOOL.url}/sitemap.xml`,
  };
}