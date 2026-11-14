import type { Metadata } from "next";
import { NextBand, next } from "@/components/next-band";
import { author, ids, instagram, linkedin, site } from "@/lib/site";

const description = "The people who run House Full Of Love.";

export const metadata: Metadata = {
  title: "Team",
  description,
  alternates: { canonical: "/team" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "/team",
    title: "Team",
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": ids.person,
      name: author.name,
      jobTitle: "Founder",
      url: author.url,
      sameAs: author.sameAs,
      worksFor: { "@id": ids.organization },
    },
    {
      "@type": "Person",
      name: "Simran Khanduja",
      jobTitle: "Founding Member",
      worksFor: { "@id": ids.organization },
    },
  ],
};

export default function Team() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD from our own config
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1>Team</h1>

      <h2 className="name">{author.name}</h2>
      <p className="fine">Founder</p>
      <p>
        <a href={author.url}>Naman Hajela</a> is the founder. He doesn&rsquo;t
        really like the word &ldquo;founder&rdquo;, but it works when business
        talk happens. He looks at himself as an artist and a builder, someone
        who wants to build a house full of love, and of products and experiences
        that truly benefit people and everyone in the ecosystem.
      </p>
      {/* Written by Claude at Naman's request, 14 Nov 2026. */}
      <p>He works on House Full Of Love full-time.</p>
      <p className="fine">
        <a href={author.url}>Website</a> · <a href={linkedin}>LinkedIn</a> ·{" "}
        <a href={instagram}>Instagram</a>
      </p>

      <h2 className="name">Simran Khanduja</h2>
      <p className="fine">Founding Member</p>
      <p>
        Simran is a creative generalist who contributes across strategy,
        marketing and operations. She&rsquo;s our golden retriever and good luck
        charm.
      </p>
      <NextBand panels={[next.core, next.blog]} />
    </>
  );
}
