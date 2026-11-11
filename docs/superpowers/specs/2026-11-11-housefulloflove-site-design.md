# House Full Of Love — site design

Date: 2026-11-11 · Status: draft for Naman's approval

## Why

Positive Sum Company is renamed **House Full Of Love**. Both registrations
are now in that name, so the website must match them exactly; that is what
Meta business verification, payment gateways and banks check.

Today the work is split across two sites: `positivesumcompany.com`
(`pscompany-lp`, the company and its legal pages) and
`positivesumexperiments.com` (`positivesumexperiments-lp`, the blog and the
Core). They become **one site at housefulloflove.com**, in a new repo.

The purpose stays the same:
- **The main site is the umbrella** for every initiative.
- **The blog documents everything**: all experiments and learnings.
- Together they make the business easy to verify.
- The core value stays the same: the positive sum mentality, where
  everybody wins and for us to win nobody else has to lose.

The other aim is simplification. Like [sive.rs](https://sive.rs) and
[lossfunk.com](https://lossfunk.com), the site should get people to the
information they want faster. It must be **mobile elegant, not only mobile
compatible**.

## What a visitor gets in the first minute

The home page answers these in this order (Naman's list):
1. The company's name
2. The name of the person running it
3. Everything the company does (ventures and areas of work, as pscompany-lp lists them today)
4. Its general goals and beliefs, and links to the other pages

## Look and feel (decided with mockups)

**The "plain letter" direction, used as is.** Naman compared it against his
current fonts (Young Serif and Instrument Sans) and chose the original
because it reads better.

- **Paper:** warm peach, about `#fdf3e7`. **Ink:** about `#1a1917`.
  **Links:** true blue, about `#0b2bd6`, underlined (1px, offset about 3px).
- **Type:** Newsreader (Google Fonts, through `next/font`) for everything.
  - The name: semibold, about 34px on a phone, larger on wide screens.
  - Byline: italic.
  - Section headings: small, semibold, uppercase and letter-spaced (about
    15px, 0.12em).
  - Body: about 19px with a line height of 1.6.
  - A small sans in muted grey, about `#8b8a83`, only for fine print such
    as the footer and dates.
- **One column on every page.** About 60 characters per line, roughly 22px
  side gutters on a phone. Wide screens get more paper, never more columns.
  Tap targets are comfortable.
- **None of the old decoration:** no hero art, cards, drawn plus mark,
  marigold highlighter or paper grain.
- **Light mode only.** Do not respect `prefers-color-scheme`; set
  `color-scheme: light` so phones in dark mode do not invert or darken the
  page. (Naman's call.)
- **Blog posts use the same plain letter style.** Per-post bespoke design
  is off for now (Naman: "for now").

The approved mockup is the left phone in
`.superpowers/brainstorm/*/content/home-letter-v3.html`. It is copied into
`docs/mockups/home-letter.html` in this repo for reference.

## Pages

Everything is a letter in the style above. Routes:

| Route | From | Notes |
| --- | --- | --- |
| `/` | new | The four answers above. Name; "Run by Naman Hajela" plus Indore, India; the belief; **What we do** (each venture as a linked sentence, then the other areas); **Everything else** (blog, the Core, business info); footer with contact · terms · privacy · refunds · hello@ email |
| `/blog` | experiments `/` and `/blog` | The blog's home, a plain letter in the same style as the rest of the site, in this order:<br>1. The old experiments home page letter ("Hi I'm Naman…"), verbatim with only the name changed<br>2. The Core principles as a numbered list of **eight**: the seven from `positivesumexperiments-lp/src/app/page.tsx` plus "Love before all.", linking to `/core`<br>3. The posts as a plain list of titles (linked) and dates<br>Redesigned to sit cohesively in the new look. The old bordered "Core" frame and hand-note do not carry over (Naman, 2026-11-11) |
| `/blog/<slug>` | experiments | Only `abandon-adulting-club` so far. Same slug, words unchanged, restyled |
| `/blog/<slug>.md`, `.json` | experiments | Keep the "pages as data" routes |
| `/feed.xml` | experiments | RSS for the blog |
| `/core`, `/core.md` | **pscompany's copy** (my call: it's the newer one, 30 Sep, and adds "8. Love before all.", which the experiments copy lacks) | The Core now lives here canonically |
| `/business-info` | pscompany | Rewritten around both registrations (below), as plain lines rather than a grid |
| `/contact`, `/terms`, `/privacy`, `/refunds`, `/team` | pscompany | Carried over and renamed |
| `/llms.txt`, `sitemap.xml`, `robots.txt`, OG images, JSON-LD | both | Carried over, renamed, pointing at the new domain |

Ventures as today, from pscompany-lp's `ventures` array: **Happy Mornings
Club** (happymornings.club, @happymorningsclub) and **Abandon Adulting
Club** (abandonadulting.club, @abandonadulting). Areas of work: events and
experiences; educational workshops and courses; software products and
services; consultation and direct services.

## Business facts (from the certificates, checked 2026-11-11)

Show these on `/business-info`. The name, proprietor, location and email
also go in the home page JSON-LD.

**Registration numbers are shown partly masked (Naman, 2026-11-11).**
Reviewers like Meta and Razorpay take the certificates as uploads, so they
don't need the numbers on the site. A full number lets anyone look up the
certificate, and the Gumasta certificate carries the home address, the photo
and the father's name. So:
- show the masked numbers below, exactly as written
- add a line under the registrations, roughly "Full certificates available
  to verifying partners on request". The exact wording is a placeholder for
  Naman.
- keep the numbers out of JSON-LD and `llms.txt` entirely. Name the
  registrations there without any number.
- keep the full numbers out of this repo altogether: code, docs and commits
  (the repo may be public)

- **Business name:** House Full Of Love
- **Entity type:** Sole proprietorship (Udyam lists it as "Proprietary")
- **Proprietor:** Naman Hajela
- **Shops and Establishments (Gumasta):** registration no.
  **INDO26••••••••1267**
  - Act: Madhya Pradesh Shops and Establishments Act, 1958
  - Office: District Labour Office, Indore
  - First registered 7 Oct 2026; amended to the new name 22 Oct 2026
  - Kind of business: events and experiences, educational workshops and
    courses, software products and services
- **Udyam (MSME):** **UDYAM-MP-23-•••8816**
  - Micro enterprise, registered 23 Oct 2026
  - Date of incorporation and commencement: 7 Oct 2026
  - NIC codes: 93290 (other amusement and recreation activities), 85499
    (other educational services), 63119 (other data processing and hosting
    activities)
- **Location:** Indore, Madhya Pradesh, India. Operating online and across
  India.
- **Email:** hello@housefulloflove.com; legal and privacy at
  legal@housefulloflove.com. Naman is setting up the inbox.

**Never on the site** (Naman confirmed city and state only):
- the residential address (on both certificates)
- PAN, bank details, phone number, the personal Gmail, the photo
- the certificate PDFs themselves

When a reviewer needs the full address, Naman gives it to them privately.

## Words: who writes what

The AI policy in both repos carries over unchanged (`docs/ai-policy.md`).
Naman writes every line a reader sees; AI arranges and builds.

For this migration Naman approved two things:
- **Carry his existing sentences over verbatim**, changing only "Positive
  Sum Company" to "House Full Of Love".
- **Leave unmistakable `[Placeholder — …]` gaps** where new lines are
  needed. Naman fills them before launch.

Known gaps:
- the home page opening, if the old hero line no longer fits
- the `/business-info` intro now covering two registrations
- the descriptions on `/team`
- anything that described the company as "the commercial entity" separate
  from the experiments site

Copy `writing/` from both repos into the new one, merged and deduplicated,
so the provenance log stays whole.

## Domains and redirects

- **housefulloflove.com** (no www) is canonical. `www.` returns a 308 to it.
- **positivesumexperiments.com** (and www) returns 308s to housefulloflove.com:
  - `/` goes to `/blog`
  - `/blog/:slug*`, `/core`, `/core.md` and `/feed.xml` map to the same path
  - anything else goes to the same path
- **positivesumcompany.com, thepositivesumcompany.com** (and www) return
  308s to the same path on housefulloflove.com. They stay until Naman lets
  the domain go.
- **Where the redirects live (Naman, 2026-11-11):** the old repos are not
  archived. Each keeps its own Vercel project and its domains, and is
  reduced to serving the redirects above:
  - `pscompany-lp` serves the positivesumcompany.com and
    thepositivesumcompany.com redirects.
  - `positivesumexperiments-lp` serves the positivesumexperiments.com
    redirects.
  - Each gets a catch-all host redirect in its `next.config.ts` (permanent,
    308) and a README note saying where the site went. Their pages can stay
    in the tree untouched, since the redirect runs before any page.
  - The new project only holds housefulloflove.com and its www.
- Naman does the DNS and Vercel domain changes. The builder supplies a
  checklist in the new repo's README.

## How it gets made (builder's defaults, keep unless there is a reason)

- **New repo** `housefulloflove-lp` (Naman's naming, matching the other
  `-lp` repos) at `C:\Users\naman\SandBox\positivesumlabs\housefulloflove-lp`,
  GitHub `Nhajela/housefulloflove-lp`.
  - Same stack as the two current sites: Next.js 16 App Router (static),
    React 19, Tailwind 4, MDX through `@next/mdx`, Biome, pnpm, Vercel.
  - Start from pscompany-lp's infrastructure: `site.ts`, OG card, JSON-LD
    ids, `llms.txt`.
  - Bring the blog machinery over from positivesumexperiments-lp: `posts.ts`,
    the `[file]` data routes, the feed and `post-frame`.
- **Follow `docs/how-we-build.md`:** hardcode over structure, everything
  static, assets in the repo, small atomic commits.
- **One identity file.** `site.ts` holds name, URL, emails, description,
  both registrations and the author. Everything else reads from it.
- **Delete what the new look no longer uses:** the paper-and-pens tokens,
  the drawn marks, hand-note, the Young Serif, Instrument Sans, Spline Mono
  and Akriti fonts, and the grain.
  - Keep `zoom-image` only if the post uses it.
  - Vendor Newsreader for the Satori OG card.
- **Favicon and logo:** carry over the current icon until Naman provides a
  House Full Of Love mark.
- **Commits:** author is Nhajela. Claude may be credited as co-author with
  no email address (rule in both repos' `CLAUDE.md`).
- **Docs:** `docs/learnings.md` gets a dated entry after each session, as in
  the old repos.

## Goals, non-goals and anti-goals

**Goals:**
- A reviewer can confirm the name, the person, what the business does and
  both registration numbers within a minute on a phone
- Every old URL still resolves
- One repo to maintain

**Non-goals:**
- Per-post custom design
- Dark mode
- A CMS, schemas or tags pages
- New ventures or new copy written by AI

**Anti-goals** (failure even if it works):
- Any AI-written sentence that ships as if Naman wrote it
- The residential address or other personal details appearing anywhere
- A name on the site that does not match the certificates exactly
- A page that only "fits" on a phone without being pleasant to read there

## Left to the builder

- Exact spacing and type sizes within the ranges above
- The OG card layout in the new style
- How `/team` and the legal pages are arranged as letters
- File structure
