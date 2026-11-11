import type { Metadata } from "next";
import { author, location, site, ventures } from "@/lib/site";

// Plumbing, not Naman's voice, so written plainly. DRAFT until he has read
// it (11 Oct 2026). Each venture keeps its own contact page.

const description = "How to reach House Full Of Love and each of its ventures.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contact",
    description,
  },
};

export default function Contact() {
  return (
    <>
      <h1>Contact</h1>
      <p>
        Write to <a href={`mailto:${site.email}`}>{site.email}</a> for anything
        about {site.name}. Email is the best way to reach us.
      </p>

      <h2>{site.name}</h2>
      <p>
        <span className="fine">Email</span>
        <br />
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <p>
        <span className="fine">Legal and privacy</span>
        <br />
        <a href={`mailto:${site.legalEmail}`}>{site.legalEmail}</a>
      </p>
      <p>
        <span className="fine">Proprietor</span>
        <br />
        {author.name}
      </p>
      <p>
        <span className="fine">City</span>
        <br />
        {location}
      </p>

      <h2>Our ventures</h2>
      <p>
        For memberships, events and bookings, write to the venture directly.
      </p>
      {ventures.map((v) => (
        <p key={v.name}>
          <span className="fine">{v.name}</span>
          <br />
          <a href={`${v.href}/contact`}>Contact</a>
        </p>
      ))}
    </>
  );
}
