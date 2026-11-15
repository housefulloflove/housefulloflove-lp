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

// Naman's words, 15 Nov 2026 (writing/2026-11-15-home-lab.txt). Two
// spellings fixed: "documentation of our journey", "Welcome aboard".
// The name and the line under it are set in the hand font until his real
// handwriting arrives; keep the text in the HTML when it does.
const nav = [
  ["Fundamentals", "/core"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
  ["Business Info", "/business-info"],
] as const;

export default function Home() {
  return (
    <div className="home">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD from our own config
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1>{site.name}</h1>
      <p className="tag">A lab running positive sum experiments.</p>
      <p>
        Hi, I&rsquo;m <a href={author.url}>Naman Hajela</a>, and{" "}
        <em>I believe that for us to win, no one has to lose.</em>
      </p>
      <p>
        Rooted in this core win-win fundamental, we experiment and build
        experiences.
      </p>
      <p>
        Experiences like educational workshops, events, clubs, and software
        products.
      </p>
      <p>
        Experiences that make you feel you&rsquo;re in a house full of love,
        where you&rsquo;re accepted, energized and enabled.
      </p>
      <p>
        This website is the documentation of our journey, of everything we do,
        and what we learn from it.
      </p>
      <p>
        Welcome aboard friend!
        <br />
        Hope we leave you a little warmer and brighter through this :)
      </p>
      <nav>
        {nav.map(([label, href]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
