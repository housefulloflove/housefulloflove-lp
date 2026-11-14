import type { Metadata } from "next";
import Link from "next/link";
import { NextBand, next } from "@/components/next-band";
import { ids, site } from "@/lib/site";
import { listed as posts } from "./posts";

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
      {/* The two lines Naman cut from the home letter (13 Nov), which were
          about this log. The first is trimmed of "Following which will
          come", flagged to him before building. */}
      <p>A log of all the experiments I run and things I do.</p>
      <p>
        The wins, the failures, the learnings, all of it shared transparently.
      </p>
      {posts.length > 0 && (
        <ul className="posts">
          {posts.map((p) => (
            <li key={p.path}>
              <Link href={p.path}>
                <span className="lbl">
                  {p.eyebrow} · {p.dateLabel}
                </span>
                <strong>{p.heading}</strong>
                <span>{p.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <NextBand panels={[next.core, next.team]} />
    </>
  );
}
