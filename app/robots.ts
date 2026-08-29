import type { MetadataRoute } from "next";
import { SCHOOL } from "@/config/school";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/e-raport"],
    },
    sitemap: `${SCHOOL.url}/sitemap.xml`,
  };
}