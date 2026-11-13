import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { author, ids, site } from "@/lib/site";
import { NextBand } from "./next-band";
import { ZoomImage } from "./zoom-image";

// The frame around a blog post's writing: eyebrow, title, date, cover, the
// way back to the Blog — plus the metadata
// and JSON-LD every post needs. A post is a page.mdx that exports
// `postMetadata(post)` and a default layout returning <PostFrame post={post}>;
// the markdown inside is the writing, styled by mdx-components. Anything
// bespoke to one post is inline JSX in that file.

export type PostFacts = {
  path: string;
  /** Full title for <title>, OG and the feed. */
  title: string;
  /** Small italic line above the heading, e.g. "Experiment 1". */
  eyebrow?: string;
  /** What the page shows as its h1 — usually the title minus the eyebrow. */
  heading: string;
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  dateLabel: string;
  /** Free-form, lowercase. Unused by any page today; there for the day an
   *  index by tag or by month is wanted — that's a filter over posts.ts. */
  tags: readonly string[];
};

export function postMetadata(post: PostFacts): Metadata {
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: post.path,
      types: {
        "text/markdown": `${site.url}${post.path}.md`,
        "application/json": `${site.url}${post.path}.json`,
      },
    },
    openGraph: {
      type: "article",
      siteName: site.name,
      url: post.path,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [author.url],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

// BlogPosting + the trail back to the index. Author/publisher point at the
// nodes declared on the home page.
function jsonLd(post: PostFacts) {
  const url = `${site.url}${post.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#post`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: site.language,
        url,
        image: `${url}/opengraph-image.jpg`,
        author: { "@id": ids.person },
        publisher: { "@id": ids.organization },
        isPartOf: { "@id": `${site.url}/blog#blog` },
        mainEntityOfPage: url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Blog",
            item: `${site.url}/blog`,
          },
          { "@type": "ListItem", position: 2, name: post.title, item: url },
        ],
      },
    ],
  };
}

export function PostFrame({
  post,
  cover,
  next,
  children,
}: {
  post: PostFacts;
  /** A handmade cover, colocated with the post and statically imported. */
  cover?: { src: StaticImageData; alt: string };
  /** The two panels the post hands the reader on to. */
  next?: Parameters<typeof NextBand>[0]["panels"];
  children: ReactNode;
}) {
  return (
    <article className="prose">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD from the post's own facts
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(post)) }}
      />
      <header>
        <p className="lbl">
          {post.eyebrow ? `${post.eyebrow} · ` : null}
          <time dateTime={post.date}>{post.dateLabel}</time>
        </p>
        <h1>{post.heading}</h1>
      </header>
      {cover ? (
        <ZoomImage src={cover.src.src} alt={cover.alt}>
          <Image
            src={cover.src}
            alt={cover.alt}
            priority
            sizes="(max-width: 34rem) 100vw, 34rem"
            className="my-4 h-auto w-full"
          />
        </ZoomImage>
      ) : null}
      {children}
      {next ? <NextBand panels={next} /> : null}
    </article>
  );
}
