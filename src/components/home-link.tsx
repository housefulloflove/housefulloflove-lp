"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// No nav bar: every page except / gets one fine-print link back home.
export function HomeLink({ name }: { name: string }) {
  if (usePathname() === "/") return null;
  return (
    <p className="fine">
      <Link href="/">{name}</Link>
    </p>
  );
}
