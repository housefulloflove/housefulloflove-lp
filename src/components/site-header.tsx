"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  ["Blog", "/blog"],
  ["The Core", "/core"],
  ["Team", "/team"],
] as const;

// Every page except / gets the name (the way home) and three links, the
// current one underlined. The home page has its own letterhead with no
// links, so nothing interrupts its opening.
export function SiteHeader({ name }: { name: string }) {
  const path = usePathname();
  if (path === "/") return null;
  return (
    <header className="head">
      <Link href="/" className="name">
        {name}
      </Link>
      <nav>
        {nav.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            aria-current={path.startsWith(href) ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
