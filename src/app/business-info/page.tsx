import type { Metadata } from "next";
import Link from "next/link";
import { author, location, registrations, site, ventures } from "@/lib/site";

const description = `Who runs ${site.name}, where it operates, and how to reach it.`;

export const metadata: Metadata = {
  title: "Business info",
  description,
  alternates: { canonical: "/business-info" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "/business-info",
    title: "Business info",
    description,
  },
};

const { gumasta, udyam } = registrations;

const fmt = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

const details: [string, string][] = [
  ["Business name", site.name],
  ["Entity type", "Sole proprietorship"],
  ["Proprietor", author.name],
  ["Location", location],
  ["Operations", "Online, and in multiple cities across India"],
  ["Email", site.email],
  ["Legal and privacy", site.legalEmail],
  ["Website", site.url.replace("https://", "")],
];

const pages = [
  ["Contact", "/contact"],
  ["Legal", "/terms"],
  ["Privacy", "/privacy"],
] as const;

export default function BusinessInfo() {
  return (
    <>
      <h1>Business info</h1>
      <p>
        Yes we&rsquo;re real. This page was built for the banks, the AI
        verification agents, and any other wandering curious souls. You can find
        all the important details about us below.
      </p>

      <h2>Details</h2>
      {details.map(([label, value]) => (
        <p key={label}>
          <span className="fine">{label}</span>
          <br />
          {label === "Email" || label === "Legal and privacy" ? (
            <a href={`mailto:${value}`}>{value}</a>
          ) : (
            value
          )}
        </p>
      ))}

      <h2>Registrations</h2>
      <p>
        <span className="fine">{gumasta.label}</span>
        <br />
        {gumasta.masked}
        <br />
        {gumasta.act}
        <br />
        {gumasta.office}
        <br />
        Registered {fmt(gumasta.firstRegistered)}, amended{" "}
        {fmt(gumasta.amended)}
        <br />
        {gumasta.activities.join("; ")}
      </p>
      <p>
        <span className="fine">{udyam.label}</span>
        <br />
        {udyam.masked}
        <br />
        {udyam.enterpriseType} enterprise
        <br />
        Registered {fmt(udyam.registered)}, incorporated{" "}
        {fmt(udyam.incorporated)}
        <br />
        {udyam.nic.map((n) => `${n.code} ${n.label}`).join("; ")}
      </p>
      <p>
        [Placeholder — line saying full certificates are available to verifying
        partners on request]
      </p>

      <h2>Ventures</h2>
      <p>
        Each venture has its own pages. The company&rsquo;s own:{" "}
        {[
          ["contact", "/contact"],
          ["terms", "/terms"],
          ["privacy", "/privacy"],
          ["refunds", "/refunds"],
        ].map(([label, href], i) => (
          <span key={href}>
            {i > 0 && ", "}
            <Link href={href}>{label}</Link>
          </span>
        ))}
        .
      </p>
      {ventures.map((v) => (
        <p key={v.name}>
          {v.name}
          <br />
          {pages.map(([label, path], i) => (
            <span key={label}>
              {i > 0 && " · "}
              <a href={`${v.href}${path}`}>{label}</a>
            </span>
          ))}
        </p>
      ))}
    </>
  );
}
