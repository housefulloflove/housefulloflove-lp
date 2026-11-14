import type { MetadataRoute } from "next";
import { listed as posts } from "@/app/blog/posts";
import { site } from "@/lib/site";

// Hand-kept; later tasks append their routes here.
const routes: string[] = [
  "/",
  "/core",
  "/blog",
  ...posts.map((p) => p.path),
  "/business-info",
  "/contact",
  "/terms",
  "/privacy",
  "/refunds",
  "/team",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route === "/" ? "" : route}`,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
