import type { MetadataRoute } from "next";
import { posts } from "@/app/blog/posts";
import { site } from "@/lib/site";

// Hand-kept; later tasks append their routes here.
const routes: string[] = ["/", "/core", "/blog", ...posts.map((p) => p.path)];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route === "/" ? "" : route}`,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
