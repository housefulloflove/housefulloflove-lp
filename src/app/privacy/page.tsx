import type { Metadata } from "next";
import { author, location, site, ventures } from "@/lib/site";

// The base privacy page: what this site itself does, then each venture's
// own page. Plumbing, not Naman's voice, so written plainly. DRAFT until he
// has read it (1 Oct 2026). The facts are checked against the code: no
// forms, no cookies, no analytics, no third-party scripts.

const description =
  "What housefulloflove.com collects, and where to find the privacy page of each venture.";

export const metadata: Metadata = {
  title: "Privacy",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "/privacy",
    title: "Privacy",
    description,
  },
};

export default function Privacy() {
  return (
    <>
      <h1>Privacy</h1>
      <p>
        This is the privacy page for {site.name} and this website. Each venture
        has its own, linked below.
      </p>

      <h2>This website</h2>
      <p>
        This website has no sign-up, no forms and no accounts. It does not use
        cookies, analytics or advertising trackers, and it loads no third-party
        scripts. We do not collect personal information from people who read it.
      </p>
      <p>
        Like any website, our hosting provider, Vercel, receives technical
        details of each request, such as the IP address and browser type, to
        deliver the pages and keep them secure.
      </p>

      <h2>If you write to us</h2>
      <p>
        If you email <a href={`mailto:${site.email}`}>{site.email}</a>, we use
        your email address and what you tell us only to reply. We do not sell it
        or share it. We keep it until you ask us to delete it.
      </p>

      <h2>Our ventures</h2>
      <p>
        Anything you give a venture, such as an application, is covered by that
        venture&rsquo;s own privacy page.
      </p>
      {ventures.map((v) => (
        <p key={v.name}>
          <span className="fine">{v.name}</span>
          <br />
          <a href={`${v.href}/privacy`}>Privacy</a>
        </p>
      ))}

      <h2>Who runs this</h2>
      <p>
        {site.name} is a sole proprietorship of {author.name}, in {location}.
        Privacy questions:{" "}
        <a href={`mailto:${site.legalEmail}`}>{site.legalEmail}</a>.
      </p>
    </>
  );
}
