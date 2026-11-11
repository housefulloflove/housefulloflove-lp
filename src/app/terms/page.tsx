import type { Metadata } from "next";
import Link from "next/link";
import { author, location, site, ventures } from "@/lib/site";

// Plumbing, not Naman's voice, so written plainly. DRAFT until he has read
// it (11 Oct 2026). Covers this website only; each venture has its own.

const description = "The terms for using housefulloflove.com.";

export const metadata: Metadata = {
  title: "Terms",
  description,
  alternates: { canonical: "/terms" },
  openGraph: { type: "website", url: "/terms", title: "Terms", description },
};

export default function Terms() {
  return (
    <>
      <h1>Terms</h1>
      <p>
        These are the terms for using this website. Each venture has its own,
        linked below.
      </p>

      <h2>Who we are</h2>
      <p>
        This website is run by {site.name}, a sole proprietorship of{" "}
        {author.name}, registered under the Madhya Pradesh Shops and
        Establishments Act, 1958, in {location}.
      </p>

      <h2>This website</h2>
      <p>
        This website tells you about {site.name} and its ventures. Nothing is
        sold here. We try to keep it accurate, but it is provided as it is, and
        we may change it at any time.
      </p>
      <p>
        The words, design and marks on this website belong to {site.name}. You
        may link to it and quote it with credit. Please don&rsquo;t copy it
        wholesale or present it as your own.
      </p>
      <p>
        Links to other websites, including our ventures&rsquo;, are there for
        convenience. Those sites have their own terms.
      </p>

      <h2>Our ventures</h2>
      <p>
        When you join, book or pay for anything with a venture, that
        venture&rsquo;s terms apply.
      </p>
      {ventures.map((v) => (
        <p key={v.name}>
          <span className="fine">{v.name}</span>
          <br />
          <a href={`${v.href}/terms`}>Terms</a>
        </p>
      ))}

      <h2>The rest</h2>
      <p>
        How we handle personal information is on our{" "}
        <Link href="/privacy">privacy</Link> page, and cancellations and refunds
        on our <Link href="/refunds">refunds</Link> page. These terms are
        governed by the laws of India, and the courts of Indore, Madhya Pradesh
        have jurisdiction. Questions:{" "}
        <a href={`mailto:${site.legalEmail}`}>{site.legalEmail}</a>.
      </p>
    </>
  );
}
