import Link from "next/link";
import { site } from "@/lib/site";

const pages = [
  ["Blog", "/blog"],
  ["The Core", "/core"],
  ["Team", "/team"],
] as const;

const company = [
  ["Contact", "/contact"],
  ["Business info", "/business-info"],
  ["Terms", "/terms"],
  ["Privacy", "/privacy"],
  ["Refunds", "/refunds"],
] as const;

// Same on every page: who this is and how to write to them on the left,
// the site's pages in ink and the company/legal pages in grey on the right.
export function LetterFooter() {
  return (
    <footer className="fine foot">
      <div>
        <strong>{site.name}</strong>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </div>
      <div>
        <p className="pages">
          {pages.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </p>
        <p>
          {company.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </p>
      </div>
    </footer>
  );
}
