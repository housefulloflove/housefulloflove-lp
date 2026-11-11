import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

// Plumbing, not Naman's voice, so written plainly. DRAFT until he has read
// it (11 Oct 2026). Nothing is sold on this site; each venture's own terms
// set its refunds. Happy Mornings Club's are in the "refunds" section of its
// terms page (no anchor on that page, so the link goes to the page).

const description =
  "Cancellations and refunds at House Full Of Love, and each venture's refund policy.";

export const metadata: Metadata = {
  title: "Refunds",
  description,
  alternates: { canonical: "/refunds" },
  openGraph: {
    type: "website",
    url: "/refunds",
    title: "Refunds",
    description,
  },
};

export default function Refunds() {
  return (
    <>
      <h1>Refunds</h1>
      <p>
        Nothing is sold on this website. You pay for a membership, event or
        service on the venture&rsquo;s own site, and that venture&rsquo;s refund
        policy applies.
      </p>

      <h2>Refund policies</h2>
      <p>
        <span className="fine">Happy Mornings Club</span>
        <br />
        <a href="https://happymornings.club/terms">
          Refund policy (see &ldquo;refunds&rdquo;)
        </a>
      </p>

      <h2>Anything else</h2>
      <p>
        If you paid {site.name} directly, for a workshop, course or service, and
        want to cancel or ask for a refund, write to{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> with your name, what
        you paid for and when. Approved refunds go back to the original payment
        method.
      </p>
      <p>
        See also our <Link href="/terms">terms</Link> and{" "}
        <Link href="/contact">contact</Link> pages.
      </p>
    </>
  );
}
