import type { Metadata } from "next";
import {
  areas,
  author,
  ids,
  instagram,
  linkedin,
  location,
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD from our own config
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1>{site.name}</h1>

      {/* Naman's words, verbatim (writing/2026-09-30-company-page.txt) */}
      <p className="lede">
        House Full Of Love believes in doing things where everybody wins. For us
        to win nobody else has to lose.
      </p>
      <p>
        We run multiple ventures spanning events and experiences, software
        products, and direct services.
      </p>

      <h2>What we do</h2>
      {ventures.map((v) => (
        <div className="item" key={v.name}>
          <h3>
            <a href={v.href}>{v.name}</a>
          </h3>
          <p>{v.description}</p>
          <p className="fine">
            <a href={v.instagram}>{v.instagramLabel}</a>
          </p>
        </div>
      ))}
      <div className="areas">
        {areas.map((a) => (
          <div className="item" key={a.name}>
            <h3>{a.name}</h3>
            {a.detail && <p>{a.detail}</p>}
          </div>
        ))}
      </div>

      <h2>Everything else</h2>
      <ul className="links">
        <li>
          <a href="/blog">Blog</a>
        </li>
        <li>
          <a href="/core">The Core</a>
        </li>
        <li>
          <a href="/team">Team</a>
        </li>
        <li>
          <a href="/business-info">Business info</a>
        </li>
      </ul>

      {/* Who and where comes last: a letter is signed at the bottom. */}
      <p className="signoff">
        Run by <a href={author.url}>{author.name}</a>, {location}.
      </p>
    </>
  );
}
