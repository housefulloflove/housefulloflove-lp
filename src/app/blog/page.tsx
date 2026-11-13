import type { Metadata } from "next";
import Link from "next/link";
import { ids, site } from "@/lib/site";
import { posts } from "./posts";

// The blog home: just the posts from posts.ts. The letter and the Core's
// eight moved to the home page (13 Nov).
const description = site.description;

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  },
  openGraph: { siteName: site.name, url: "/blog", title: "Blog", description },
  twitter: { card: "summary_large_image", title: "Blog", description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${site.url}/blog#blog`,
  name: `Blog — ${site.name}`,
  description,
  url: `${site.url}/blog`,
  inLanguage: site.language,
  publisher: { "@id": ids.organization },
  isPartOf: { "@id": ids.website },
  blogPost: posts.map((p) => ({
    "@type": "BlogPosting",
    "@id": `${site.url}${p.path}#post`,
    headline: p.title,
    datePublished: p.date,
    url: `${site.url}${p.path}`,
  })),
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD from the hardcoded post list
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1>Blog</h1>
      <ul className="links">
        {posts.map((p) => (
          <li key={p.path}>
            <Link href={p.path} className="font-semibold">
              {p.title}
            </Link>
            <span className="fine">{p.dateLabel}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
