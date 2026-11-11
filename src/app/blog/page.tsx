import type { Metadata } from "next";
import Link from "next/link";
import { ids, site } from "@/lib/site";
import { posts } from "./posts";

// The blog home. Hardcoded on purpose: the letter, the Core's eight, then
// the posts from posts.ts. Naman's words, verbatim
// (writing/2026-09-03-home-letter.txt; the Core headings are src/app/core/page.mdx).
const description = site.description;

// The seven headings of src/app/core/page.mdx, then the eighth. Update here
// when a value is added there.
const corePrinciples = [
  "Play positive sum games.",
  "Respect time above all else.",
  "Strive to give out disproportionate value.",
  "Have audacious intent, and patient persistence.",
  "Play with the power laws.",
  "Compounding shall be your best friend.",
  "Sincerity over Seriousness",
  "Love before all.",
];

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  },
  openGraph: { title: "Blog", description },
  twitter: { title: "Blog", description },
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
      <h1>For us to win, no one has to lose.</h1>
      <p>
        Hi I&rsquo;m <a href="https://namanhajela.com">Naman</a>, and I&rsquo;m
        running experiments with fundamentals rooted in this positive sum
        philosophy.
      </p>
      <p>
        My goal is to enable everyone involved in each of my initiatives, the
        customers of course, my team, myself, and the wider world.
      </p>
      <p>
        I shall document my learnings and journey here as a giveback for the
        world.
      </p>
      <p>
        I have a few core principles I want to build this on top of,
        they&rsquo;re listed below. Read them first to understand how we
        operate. Following which will come a log of all the experiments I run
        and things I do.
      </p>
      <p>
        The wins, the failures, the learnings, all of it shared transparently.
      </p>
      <p>
        <em>~ Nmn</em>
      </p>

      <h2>The Core</h2>
      <ol className="mb-3.5 list-decimal pl-6">
        {corePrinciples.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ol>
      <p>
        <Link href="/core">Read the Core</Link>
      </p>

      <h2>Posts</h2>
      {posts.map((p) => (
        <p key={p.path}>
          <Link href={p.path}>{p.title}</Link>
          <br />
          <span className="fine">{p.dateLabel}</span>
        </p>
      ))}
    </>
  );
}
