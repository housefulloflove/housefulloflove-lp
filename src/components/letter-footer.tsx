import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  ["Contact", "/contact"],
  ["Terms", "/terms"],
  ["Privacy", "/privacy"],
  ["Refunds", "/refunds"],
  ["Business info", "/business-info"],
] as const;

export function LetterFooter() {
  return (
    <footer className="fine foot">
      {links.map(([label, href]) => (
        <span key={href}>
          <Link href={href}>{label}</Link>
          {" · "}
        </span>
      ))}
      <a href={`mailto:${site.email}`}>{site.email}</a>
    </footer>
  );
}
