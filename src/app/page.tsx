import type { Metadata } from "next";
import Link from "next/link";
import {
  author,
  ids,
  instagram,
  linkedin,
  registrations,
  site,
  ventures,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: site.name },
  alternates: { canonical: "/" },
  openGraph: { siteName: site.name, url: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ids.organization,
      name: site.name,
      url: site.url,
      description: site.description,
      email: site.email,
      founder: { "@id": ids.person },
      legalName: site.name,
      foundingDate: registrations.udyam.incorporated,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Indore",
        addressRegion: "Madhya Pradesh",
        addressCountry: "IN",
      },
      sameAs: ["https://x.com/crazyxnaman", linkedin, instagram],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: site.email,
        areaServed: "IN",
        availableLanguage: "en",
      },
      subOrganization: ventures.map((v) => ({
        "@type": "Organization",
        name: v.name,
        url: v.href,
        description: v.description,
        sameAs: [v.instagram],
      })),
    },
    {
      "@type": "WebSite",
      "@id": ids.website,
      name: site.name,
      url: site.url,
      inLanguage: site.language,
      publisher: { "@id": ids.organization },
    },
    {
      "@type": "Person",
      "@id": ids.person,
      name: author.name,
      url: author.url,
      email: author.email,
      sameAs: author.sameAs,
      worksFor: { "@id": ids.organization },
    },
  ],
};

// The eight headings of src/app/core/page.mdx, each with the id its heading
// gets there (mdx-components.tsx). Update here when a value is added.
const core = [
  ["Play positive sum games.", "1-play-positive-sum-games"],
  ["Respect time above all else.", "2-respect-time-above-all-else"],
  [
    "Strive to give out disproportionate value.",
    "3-strive-to-give-out-disproportionate-value",
  ],
  [
    "Have audacious intent, and patient persistence.",
    "4-have-audacious-intent-and-patient-persistence",
  ],
  ["Play with the power laws.", "5-play-with-the-power-laws"],
  [
    "Compounding shall be your best friend.",
    "6-compounding-shall-be-your-best-friend",
  ],
  ["Sincerity over Seriousness", "7-sincerity-over-seriousness"],
  ["Love before all.", "8-love-before-all"],
] as const;

// The experiment post behind a venture, where one is written.
// Empty while Experiment 1 is hidden (post.ts); put it back as
// "Abandon Adulting Club": "/blog/abandon-adulting-club".
const thesis: Record<string, string> = {};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD from our own config
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Letterhead: what a verifier needs in one glance, out of the story's
          way. The descriptor is cut from Naman's company sentence. */}
      <header className="head">
        <h1>{site.name}</h1>
        <p>
          Events and experiences and software products ·{" "}
          <Link href="/business-info">Business info</Link>
        </p>
      </header>

      {/* Naman's words, verbatim, trimmed by him on 13 Nov
          (writing/2026-09-03-home-letter.txt). */}
      <p className="belief">
        For us to win,
        <br />
        no one has to lose.
      </p>
      <p>
        Hi I&rsquo;m <a href={author.url}>Naman</a>, and I&rsquo;m running
        experiments with fundamentals rooted in this positive sum philosophy.
      </p>
      <p>
        My goal is to enable everyone involved in each of my initiatives, the
        customers of course, my team, myself, and the wider world.
      </p>
      <p>
        I have a few core principles I want to build this on top of,
        they&rsquo;re listed below. Read them first to understand how we
        operate.
      </p>
      <p className="mt-6">
        <em>~ Nmn</em>
      </p>

      <section className="band">
        <h2>The Core</h2>
        {/* his sentence from the Core page, and his hint line (13 Nov) */}
        <p>
          Here is the core of our awareness towards running any and all
          experiments within this venture.
        </p>
        <p className="hint">Click on any one to read more about it.</p>
        <ol className="core">
          {core.map(([title, id]) => (
            <li key={id}>
              <Link href={`/core#${id}`}>{title}</Link>
            </li>
          ))}
        </ol>
        <p>
          <Link href="/core">Read the Core</Link>
        </p>
      </section>

      {/* writing/2026-09-30-company-page.txt */}
      <h2>What we do</h2>
      <p>
        We run multiple ventures spanning events and experiences and software
        products.
      </p>
      <div className="doors">
        {[...ventures].reverse().map((v) => (
          <div className="door" key={v.name}>
            <h3>{v.name}</h3>
            <p>{v.description}</p>
            <p className="go">
              {thesis[v.name] && (
                <Link href={thesis[v.name]}>Read the thesis</Link>
              )}
              <a href={v.href}>{v.label} →</a>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
