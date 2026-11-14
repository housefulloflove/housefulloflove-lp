// Single source of truth for site identity. Metadata, sitemap, robots, feed,
// and JSON-LD all read from here so the domain or name changes in one place.

export const site = {
  name: "House Full Of Love",
  // NEXT_PUBLIC_SITE_URL lets previews override the canonical host.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://housefulloflove.com",
  // Naman's line (writing/2026-09-03-home-letter.txt), name swapped;
  // "and direct services" cut at his request, 14 Nov 2026.
  description:
    "House Full Of Love believes in doing things where everybody wins. We run multiple ventures spanning events and experiences and software products.",
  email: "hello@housefulloflove.com",
  legalEmail: "legal@housefulloflove.com",
  locale: "en_IN",
  language: "en",
} as const;

// Release version, year then sequence. Same value as package.json.
export const version = "2026.002";

export const linkedin = "https://linkedin.com/in/crazyxnaman";
export const instagram = "https://instagram.com/crazyxnaman";

// The person behind it: one record for metadata authors, JSON-LD, feeds.
export const author = {
  name: "Naman Hajela",
  url: "https://namanhajela.com",
  email: "hey@namanhajela.com",
  twitter: "@crazyxnaman",
  sameAs: [
    "https://namanhajela.com",
    "https://x.com/crazyxnaman",
    linkedin,
    instagram,
  ],
} as const;

export const location = "Indore, Madhya Pradesh, India";

// Only the masked numbers live here, and only /business-info shows them.
export const registrations = {
  gumasta: {
    label: "Shops and Establishments (Gumasta)",
    act: "Madhya Pradesh Shops and Establishments Act, 1958",
    masked: "INDO26••••••••1267",
    office: "District Labour Office, Indore",
    firstRegistered: "2026-10-07",
    amended: "2026-10-22",
    activities: [
      "Events and experiences",
      "Educational workshops and courses",
      "Software products and services",
    ],
  },
  udyam: {
    label: "Udyam (MSME)",
    masked: "UDYAM-MP-23-•••8816",
    enterpriseType: "Micro",
    registered: "2026-10-23",
    incorporated: "2026-10-07",
    nic: [
      { code: "93290", label: "other amusement and recreation activities" },
      { code: "85499", label: "other educational services" },
      { code: "63119", label: "other data processing and hosting activities" },
    ],
  },
} as const;

// The ventures, by hand. Add one here when a new one opens.
export const ventures = [
  {
    name: "Happy Mornings Club",
    description:
      "A club that helps people wake up early and build a morning routine habit.",
    href: "https://happymornings.club",
    label: "happymornings.club",
    instagram: "https://instagram.com/happymorningsclub",
    instagramLabel: "@happymorningsclub",
  },
  {
    name: "Abandon Adulting Club",
    description:
      "An events and experiences company that helps people unlock play and enjoy life.",
    href: "https://abandonadulting.club",
    label: "abandonadulting.club",
    instagram: "https://instagram.com/abandonadulting",
    instagramLabel: "@abandonadulting",
  },
] as const;

export const areas: readonly { name: string; detail?: string }[] = [
  {
    name: "Events and experiences",
    detail: "Events, experiences, and clubs.",
  },
  // Registered activity label (Gumasta); no description of his yet.
  { name: "Educational workshops and courses" },
  {
    name: "Software products and services",
    // his words, 11 Oct (writing/2026-10-11-team.txt); second sentence
    // written by Claude at his request, 14 Nov 2026.
    detail:
      "Clubs with digital online experiences and membership sites powering them, where AI could be used. We're also building a new software product of our own, not yet public.",
  },
] as const;

/** Stable @ids so every page's JSON-LD points at the same three nodes. */
export const ids = {
  organization: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  person: `${site.url}/#naman`,
} as const;
