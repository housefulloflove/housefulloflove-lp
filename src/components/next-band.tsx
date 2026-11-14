import Link from "next/link";
import { ventures } from "@/lib/site";

// Where a page hands the reader on: a tinted band with two panels, so no
// page is a dead end. Never points at the home page. Hardcoded: each page
// picks its two from `next` below.
type Panel = { title: string; line: string; href: string };

const abandonAdulting = ventures[1];

export const next = {
  // his sentence from the Core page
  core: {
    title: "The Core",
    line: "Here is the core of our awareness towards running any and all experiments within this venture.",
    href: "/core",
  },
  blog: {
    title: "Blog",
    line: "A log of all the experiments I run and things I do.",
    href: "/blog",
  },
  team: {
    title: "Team",
    line: "The people who run House Full Of Love.",
    href: "/team",
  },
  abandonAdulting: {
    title: abandonAdulting.name,
    line: abandonAdulting.description,
    href: abandonAdulting.href,
  },
} satisfies Record<string, Panel>;

export function NextBand({ panels }: { panels: readonly Panel[] }) {
  return (
    <nav className="band next" aria-label="Next">
      <p className="lbl">Next</p>
      <div className="doors">
        {panels.map((p) =>
          p.href.startsWith("/") ? (
            <Link className="door" key={p.href} href={p.href}>
              <strong>{p.title}</strong>
              <span>{p.line}</span>
            </Link>
          ) : (
            <a className="door" key={p.href} href={p.href}>
              <strong>{p.title}</strong>
              <span>{p.line}</span>
            </a>
          ),
        )}
      </div>
    </nav>
  );
}
