import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Hand-kept; later tasks append their routes here.
const routes: string[] = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route === "/" ? "" : route}`,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
