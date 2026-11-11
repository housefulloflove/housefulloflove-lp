# House Full Of Love Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build housefulloflove.com in `housefulloflove-lp`, merging
pscompany-lp (the company pages) and positivesumexperiments-lp (the blog and
the Core) into one plain-letter site. Then point both old repos at it with
redirects.

**Architecture:** A static Next.js App Router site. Pages are hand-written
TSX or MDX letters in one column. All identity facts live in one module,
`src/lib/site.ts`. The blog keeps the old machinery: `posts.ts`, `post.ts`
per post, `.md`/`.json` data routes and the feed, restyled. Behaviour is
proved by a `node:test` suite. It fetches pages from a production server
(`next start`) and scans tracked files and build output for leaked personal
data.

**Tech Stack:** Next.js 16.2.10, React 19.2.4, Tailwind 4, `@next/mdx` 3,
Biome 2.2.0, TypeScript 5, pnpm, Vercel, `node:test`. Same versions as both
source repos.

**Spec:** `docs/superpowers/specs/2026-11-11-housefulloflove-site-design.md`.
Read it before any task.

**Source repos** (read-only, except Task 9): `../pscompany-lp` (call it P)
and `../positivesumexperiments-lp` (call it E).

## Global Constraints

- **Read the bundled Next docs first.** `AGENTS.md` says this Next.js
  differs from training data: read `node_modules/next/dist/docs/` before
  writing route, metadata, font or redirect code.
- **Naman writes all reader-facing prose.** Carry his sentences verbatim,
  changing only "Positive Sum Company" (or "Positive Sum Experiments" when it
  names the company) to "House Full Of Love".
  - Any new sentence is an unmistakable `[Placeholder — …]`.
  - Navigation labels and legal facts copied from the certificates are not
    prose.
  - Never draft, improve or fill in copy.
- **The name is exactly `House Full Of Love`,** matching the certificates.
- **Masked numbers, exactly:** Gumasta `INDO26••••••••1267`, Udyam
  `UDYAM-MP-23-•••8816`.
  - They appear only on `/business-info`.
  - Never in JSON-LD, `llms.txt`, metadata, the OG card, code comments,
    docs or commit messages.
  - The full numbers must never enter this repo.
- **Never anywhere in the repo or the build:** the residential address,
  PIN, PAN, phone, bank details, personal Gmail, the photo or the
  certificate PDFs. The location is only "Indore, Madhya Pradesh, India".
- **Emails:** `hello@housefulloflove.com`, `legal@housefulloflove.com`.
- **Canonical URL:** `https://housefulloflove.com` (no www).
  `NEXT_PUBLIC_SITE_URL` overrides it for previews, as in P.
- **Look:** plain letter, light only.
  - Paper `#fdf3e7`, ink `#1a1917`, links `#0b2bd6` (underline 1px,
    offset 3px), muted `#8b8a83`, rule `#ecdcc7`.
  - Newsreader for everything, through `next/font/google`, weights 400 and
    600 plus italic 400.
  - Fine print uses the system sans stack
    (`ui-sans-serif, system-ui, sans-serif`), about 13px, muted.
  - Body 19px with line height 1.6. h1 34px on a phone, 44px at `sm` and
    up, weight 600. h2 is 15px, 600, uppercase, letter-spacing 0.12em.
  - One column, `max-width: 34rem`, side padding 22px.
  - `color-scheme: light` on `:root` and `<meta name="color-scheme"
    content="light">`. No `prefers-color-scheme` rules.
  - No grain, hand font, drawn marks, highlighter or cards. The reference is
    the left phone in `docs/mockups/home-letter.html`.
- **Build rules:** follow P's `docs/how-we-build.md`: hardcode over
  structure, everything static, assets in the repo, small atomic commits.
- **Commits:** author `Nhajela`; run `git -c user.name=Nhajela commit`.
  End messages with `Co-Authored-By: Claude Opus 5.5` and no email (P's
  `CLAUDE.md` rule).
- **No pushing to any remote** until Task 10 says so.

## Review Focus

1. **Redirects in the old repos go live before housefulloflove.com
   serves.** Expectation: old sites keep working until Naman confirms the
   new one is live. Task 9 commits on a branch and never pushes or merges.
2. **A full registration number, the address, the PAN or the phone slips
   in** through copied source, `writing/` files, JSON-LD or `llms.txt`.
   Expectation: none of these can ship. Task 1's privacy test scans
   `git ls-files` and `.next/`, and runs in every task's verify.
3. **Dark-mode phones invert or darken the page.** Expectation: warm paper
   always. Task 1 tests the `color-scheme` meta and CSS.
4. **Old deep links.** `positivesumexperiments.com/blog/abandon-adulting-club`,
   `/core.md`, `/feed.xml` and `positivesumcompany.com/terms` must land on
   the same content, not on the home page. Task 9 tests each path with a
   Host header.
5. **A narrow phone (320px) gets horizontal scroll** from a long URL, email
   or masked number. Expectation: everything wraps. Task 1 adds
   `overflow-wrap: anywhere` on the main column; Task 5 checks
   `/business-info` at 320px.

---

## File map

```
housefulloflove-lp/
  package.json, pnpm-lock.yaml, tsconfig.json, biome.json, postcss.config.mjs, next.config.ts, .gitignore
  AGENTS.md, CLAUDE.md, README.md
  docs/ai-policy.md, docs/how-we-build.md, docs/learnings.md, docs/future-changes.md
  writing/                        merged from P and E (Task 1)
  assets/fonts/                   Newsreader .woff for the OG card (Task 2)
  scripts/verify.mjs              build, start, run tests, stop
  tests/privacy.test.mjs          leak scan (repo and build output)
  tests/pages.test.mjs            HTTP assertions per route, grows each task
  src/lib/site.ts                 identity, registrations, ventures, areas, author, ids
  src/lib/og/{card.tsx,fonts.ts}  OG card in the new look
  src/lib/mdx-to-md.ts            from E, unchanged
  src/mdx-components.tsx          markdown → plain-letter elements
  src/components/post-frame.tsx   from E, restyled
  src/components/letter-footer.tsx
  src/app/layout.tsx, globals.css, icon.svg, not-found.tsx, robots.ts, sitemap.ts, opengraph-image.tsx, page.tsx
  src/app/core/{page.mdx,opengraph-image.tsx}, src/app/core.md/route.ts
  src/app/blog/{page.tsx,posts.ts,opengraph-image.tsx}, src/app/blog/[file]/route.ts
  src/app/blog/abandon-adulting-club/{page.mdx,post.ts,cover.jpg,opengraph-image.jpg,opengraph-image.alt.txt}
  src/app/feed.xml/route.ts, src/app/llms.txt/route.ts
  src/app/{business-info,contact,terms,privacy,refunds,team}/{page.tsx,opengraph-image.tsx}
```

---

### Task 1: Scaffold, plain-letter shell, and the test harness

**Files:**
- Create: everything at the root level in the file map, plus `docs/*`,
  `writing/`, `scripts/verify.mjs`, `tests/privacy.test.mjs`,
  `tests/pages.test.mjs`, `src/lib/site.ts`, `src/app/layout.tsx`,
  `src/app/globals.css`, `src/components/letter-footer.tsx`, and a
  temporary `src/app/page.tsx` (`<h1>{site.name}</h1>` only)

**Interfaces:**
- Produces, in `src/lib/site.ts` (every later task reads only from here):
  - `site: { name: "House Full Of Love"; url: string; description: string; email: "hello@housefulloflove.com"; legalEmail: "legal@housefulloflove.com"; locale: "en_IN"; language: "en" }`
    - `description` is Naman's line with the name swapped: "House Full Of
      Love believes in doing things where everybody wins. We run multiple
      ventures spanning events and experiences, software products, and
      direct services."
  - `version = "2026.002"`
  - `author`, `linkedin`, `instagram` copied from P's `site.ts`
  - `location = "Indore, Madhya Pradesh, India"`
  - `registrations` (`as const`):
    - `gumasta: { label: "Shops and Establishments (Gumasta)"; act: "Madhya Pradesh Shops and Establishments Act, 1958"; masked: "INDO26••••••••1267"; office: "District Labour Office, Indore"; firstRegistered: "2026-10-07"; amended: "2026-10-22"; activities: readonly string[] }`
      - `activities` is P's three activities
    - `udyam: { label: "Udyam (MSME)"; masked: "UDYAM-MP-23-•••8816"; enterpriseType: "Micro"; registered: "2026-10-23"; incorporated: "2026-10-07"; nic: readonly { code: string; label: string }[] }`
      - `nic` is `93290`, `85499` and `63119` with the labels from the spec
  - `ventures` and `areas`, moved verbatim from P's `src/app/page.tsx`
    arrays (same field names)
  - `ids: { organization; website; person }`, as in P
- Produces `LetterFooter()`, a plain links line used by `layout.tsx` on
  every page:
  - links: Contact `/contact` · Terms `/terms` · Privacy `/privacy` ·
    Refunds `/refunds` · Business info `/business-info`
  - then `site.email` as a `mailto:` link, all in fine print
- Produces the test helpers `tests/pages.test.mjs` uses:
  - `BASE = process.env.BASE_URL ?? "http://localhost:3123"`
  - `async get(path) → { status, headers, text }`, which uses
    `redirect: "manual"`
- Produces `pnpm verify`, which runs `scripts/verify.mjs`:
  1. `next build`
  2. `next start -p 3123`, waiting until it answers
  3. `node --test tests/`
  4. kill the server and exit with the test status
- Produces `pnpm test`, which runs `node --test tests/` against an
  already-running server.

- [ ] **Step 1: Copy infrastructure from P**
  - Copy `package.json` (name `housefulloflove-lp`, version `2026.002`,
    add scripts `test` and `verify`), `tsconfig.json`, `biome.json`,
    `postcss.config.mjs`, `next.config.ts` and `AGENTS.md`.
  - Copy `docs/ai-policy.md` and `docs/how-we-build.md`.
  - Copy `CLAUDE.md`, replacing the project name only.
  - Create a fresh `docs/learnings.md` (heading plus "Entries newest
    first") and an empty `docs/future-changes.md`.
  - In `next.config.ts`, the only redirect is
    `www.housefulloflove.com/:path*` → `https://housefulloflove.com/:path*`,
    permanent.
  - Run `pnpm install`.

- [ ] **Step 2: Merge `writing/`**
  - Copy P's `writing/` whole.
  - For `2026-09-03-home-letter.txt`, which differs between the repos, also
    copy E's version as `writing/2026-09-03-home-letter.experiments-site.txt`.
    E's is the source of the letter that Task 4 carries over.
  - P's `2026-07-08-sincerity-over-seriousness.txt` supersedes E's (it adds
    the renumbering note).
  - Check that no `writing/` file contains a forbidden pattern (Step 3)
    before committing.

- [ ] **Step 3: Write `tests/privacy.test.mjs`. It must fail on a planted
  leak.**
  - Patterns are formats, never real values (the real values must not enter
    the repo):

```js
const FORBIDDEN = [
  [/INDO\d{6}SE\d{6}/, "full Gumasta number"],
  [/UDYAM-[A-Z]{2}-\d{2}-\d{7}/, "full Udyam number"],
  [/\b[A-Z]{5}\d{4}[A-Z]\b/, "PAN-shaped string"],
  [/(?<![\w.])[6-9]\d{9}(?!\w)/, "Indian mobile number"],
  [/@gmail\.com/i, "personal Gmail"],
  // (pattern removed from history)
  [/\bREDACTED\b/, "home PIN code"],
  // (pattern removed from history)
];
```

  - `test("tracked files carry no personal data")`
    - Scan the text files from `git ls-files` (skip images, fonts and
      `pnpm-lock.yaml`) and assert that no pattern matches.
  - `test("build output carries no personal data")`
    - Scan `.next/server` and `.next/static` (`.html`, `.rsc`, `.body`,
      `.js`, `.json`, `.txt`) the same way.
    - Skip with a message if `.next/` is missing.
  - Verify the test can fail: append `INDO123456SE123456` to a scratch
    tracked file, run `node --test tests/privacy.test.mjs`, see FAIL, then
    remove it.

- [ ] **Step 4: Write the failing shell tests in `tests/pages.test.mjs`**
  - `test("home serves the name, light-only")`
    - `GET /` returns status 200, and `text` includes `House Full Of Love`.
    - It matches `/<meta name="color-scheme" content="light"/`.
    - It contains no `prefers-color-scheme` (fetch the CSS files linked from
      the HTML and assert there too).
  - `test("every page has the footer")`
    - `GET /` includes `href="/business-info"`, `href="/terms"` and
      `mailto:hello@housefulloflove.com`.
  - `test("www redirects to apex")`
    - `get("/")` with header `host: www.housefulloflove.com` returns status
      308, and `location` is `https://housefulloflove.com/`.
  - Run `pnpm verify` and expect FAIL: the app is not built yet.

- [ ] **Step 5: Implement `site.ts`, `globals.css`, `layout.tsx` and
  `LetterFooter`, following the Global Constraints look**
  - `layout.tsx`:
    - The metadata template is `%s · House Full Of Love` (default
      `House Full Of Love`), with `metadataBase` from `site.url` and
      `other: { "color-scheme": "light" }`.
    - Export `viewport` with `colorScheme: "light"` and `themeColor:
      "#fdf3e7"`.
    - There is no nav bar, following sive.rs. Every page except `/` gets a
      single fine-print link to `/` showing `House Full Of Love` above
      `main`. Do this with a small client component using `usePathname`.
    - The main column gets `overflow-wrap: anywhere`.
  - Copy P's `icon.svg` as `src/app/icon.svg`.

- [ ] **Step 6: Run `pnpm verify` and `pnpm lint`; expect all PASS**

- [ ] **Step 7: Commit**: `feat: plain-letter shell, site identity and the test harness`

### Task 2: OG card, robots, sitemap, not-found

**Files:**
- Create: `assets/fonts/newsreader-400.woff`, `newsreader-600.woff`,
  `newsreader-400-italic.woff`; `src/lib/og/fonts.ts`;
  `src/lib/og/card.tsx`; `src/app/opengraph-image.tsx`;
  `src/app/robots.ts`; `src/app/sitemap.ts`; `src/app/not-found.tsx`

**Interfaces:**
- Consumes: `site` from Task 1.
- Produces the same API as P's `src/lib/og/card.tsx`, so P's per-route
  `opengraph-image.tsx` files copy over unchanged:
  - `ogImage(card: OgCard)`
  - `OG_SIZE`
  - `OG_CONTENT_TYPE`
  - `type OgCard = { eyebrow?; title; description?; meta?: string[] }`
- Produces `sitemap.ts` with a hand-kept `routes: string[]`. Later tasks
  append to it.

- [ ] **Step 1: Write failing tests**
  - `test("og image renders")`: `GET /opengraph-image` returns status 200,
    and `content-type` is `image/png`.
  - `test("robots and sitemap point at the apex")`
    - `/robots.txt` includes `Sitemap: https://housefulloflove.com/sitemap.xml`.
    - `/sitemap.xml` includes `<loc>https://housefulloflove.com` and no other host.
    - Run with `BASE_URL` default and no `NEXT_PUBLIC_SITE_URL`.
  - `test("unknown path is a plain 404")`: `GET /nope` returns status 404
    and includes a link to `/`.

- [ ] **Step 2: Run `pnpm verify`; expect the three new tests to FAIL**

- [ ] **Step 3: Implement**
  - Fonts: download the Latin `.woff` files from
    `@fontsource/newsreader`, pinned at `5.2.5` (or the newest 5.x older
    than two weeks), via `cdn.jsdelivr.net/npm/@fontsource/newsreader@<ver>/files/newsreader-latin-{400-normal,600-normal,400-italic}.woff`.
  - `card.tsx`: P's layout with the colours changed:
    - paper `#fdf3e7`, ink `#1a1917`, quiet `#8b8a83`, rule `#ecdcc7`,
      accent `#0b2bd6`
    - Newsreader 600 for the title, italic for the eyebrow, Newsreader 400
      for the rest
    - footer left `housefulloflove.com`
    - re-tune `titleSize` thresholds by eye
  - `not-found.tsx`: a heading `Not found` and a link `House Full Of Love`
    to `/`. These are labels, not prose.

- [ ] **Step 4: Run `pnpm verify`; expect PASS. Also open
  `/opengraph-image` and check it by eye.**

- [ ] **Step 5: Commit**: `feat: OG card in the plain-letter look, robots, sitemap, 404`

### Task 3: Home page

**Files:**
- Modify: `src/app/page.tsx` (replace the stub)

**Interfaces:**
- Consumes: `site`, `author`, `location`, `ventures`, `areas`, `ids`,
  `linkedin` and `instagram` from `site.ts`.

- [ ] **Step 1: Write failing tests**
  - `test("home answers the four questions in order")`
    - In `text`, `indexOf` must increase across `House Full Of Love` (h1),
      `Naman Hajela`, `everybody wins`, `Happy Mornings Club`,
      `Abandon Adulting Club`, `href="/blog"`, `href="/core"`.
  - `test("home JSON-LD names the business but no registration numbers")`
    - Parse the `application/ld+json` script.
    - The Organization `name` is `House Full Of Love`.
    - `address.addressLocality` is `Indore`.
    - It has no `identifier` key, and the JSON contains no `•`, `INDO` or
      `UDYAM`.

- [ ] **Step 2: Run `pnpm verify`; expect FAIL**

- [ ] **Step 3: Implement the letter, following the mockup's order**
  - `<h1>House Full Of Love</h1>`.
  - An italic byline with the facts only: `Run by <a href={author.url}>Naman
    Hajela</a>, {location}.`
  - Naman's two paragraphs from P's home, verbatim with the name swapped.
  - **What we do** (h2):
    - each venture as `<a>{name}</a>. {description}` plus its Instagram
      link
    - then `areas` as a plain list of `name`, with `detail` after it
  - **Everything else** (h2): a list of labelled links:
    - Blog `/blog`
    - The Core `/core`
    - Team `/team`
    - Business info `/business-info`
  - If the opening reads wrong without the old hero sentence, put
    `[Placeholder — opening line for House Full Of Love]` above the
    paragraphs and do not invent one.
  - JSON-LD:
    - P's graph with `name`, `legalName`, `email` and the `sameAs` updated.
    - `identifier` removed.
    - `address` is city, region and country only.
    - `subOrganization` comes from `ventures`.

- [ ] **Step 4: Run `pnpm verify`; expect PASS. Check by eye at 375px and
  320px.**

- [ ] **Step 5: Commit**: `feat: home page as a plain letter`

### Task 4: The Core and the blog

**Files:**
- Create:
  - `src/app/core/page.mdx`: from **P** (the copy with "8. Love before
    all."), with `canonical: "/core"`
  - `src/app/core/opengraph-image.tsx`
  - `src/app/core.md/route.ts`
  - `src/lib/mdx-to-md.ts`: from E, unchanged
  - `src/mdx-components.tsx`
  - `src/components/post-frame.tsx`
  - `src/app/blog/page.tsx`, `posts.ts`, `opengraph-image.tsx`,
    `[file]/route.ts`
  - `src/app/blog/abandon-adulting-club/*`
  - `src/app/feed.xml/route.ts`
- Modify: `src/app/sitemap.ts` (add `/core`, `/blog`, each post path)

**Interfaces:**
- Consumes: `ogImage` from Task 2; `site`, `author`, `ids`.
- `PostFacts`, `postMetadata(post)`, `<PostFrame post cover?>`: same
  signatures as E's `post-frame.tsx`.
- `posts: readonly PostFacts[]` in `src/app/blog/posts.ts`.

- [ ] **Step 1: Write failing tests**
  - `test("core carries all eight, ending in Love before all")`
    - `GET /core` returns status 200 and includes `Love before all.`
    - `GET /core.md` returns status 200, has a `text/markdown` content
      type, and includes `## 8. Love before all.`
  - `test("blog home: letter, eight principles, posts, in order")`
    - `GET /blog` returns status 200.
    - `indexOf` increases across `running experiments with fundamentals`,
      `Play positive sum games.`, `Love before all.`, `href="/core"`,
      `href="/blog/abandon-adulting-club"`.
    - The eight principles render as an `<ol>` with exactly 8 `<li>`.
  - `test("post and its data views")`
    - `GET /blog/abandon-adulting-club` returns status 200 and includes
      `When we were kids, we had a lot of fundamentals right`.
    - `.md` returns status 200 with front matter `url:
      https://housefulloflove.com/blog/abandon-adulting-club`.
    - `.json` returns status 200, and `title` is `Experiment 1: Abandon
      Adulting Club`.
  - `test("feed lists the post on the new domain")`
    - `GET /feed.xml` returns status 200 and includes
      `<link>https://housefulloflove.com/blog/abandon-adulting-club</link>`
      and `House Full Of Love`.

- [ ] **Step 2: Run `pnpm verify`; expect FAIL**

- [ ] **Step 3: Implement**
  - Copy the routes and post files from E, apart from the Core (from P).
  - Restyle everything in the plain letter:
    - `mdx-components.tsx` maps `h2` to the small-caps heading, `p` to
      body, `a` to the blue link, and lists to plain lists.
    - `post-frame.tsx` drops the hand and mark components. It shows the
      eyebrow (italic, muted), the h1 heading, then `dateLabel` in fine
      print, the cover image full column width, the writing, and a footer
      link `← Blog`.
  - Post `page.mdx`:
    - Keep every word, with the JSX wrappers simplified to plain
      `<p>`/`<ul>`/`<li>`.
    - Drop the `font-hand` aside's styling but keep its text in
      parentheses, as it already reads.
    - Remove marigold, red-pen and `font-display` classes.
  - `blog/page.tsx`, in order:
    1. E's home letter, verbatim. "Positive Sum Experiments" does not
       appear in it, so nothing is renamed. It is signed `~ Nmn` in italic.
    2. h2 **The Core**, then an `<ol>` of E's seven `corePrinciples`
       followed by `Love before all.`, then the link `Read the Core` →
       `/core` (a label).
    3. h2 **Posts**, then for each post `<a>{title}</a>` with `dateLabel`
       in fine print.
  - Blog JSON-LD as in E, with the new name.
  - Feed `<title>`: `House Full Of Love — Blog`.

- [ ] **Step 4: Run `pnpm verify`; expect PASS. Check `/blog` and the post
  by eye at 375px.**

- [ ] **Step 5: Commit**: `feat: the Core and the blog, restyled as letters`

### Task 5: Business info and llms.txt

**Files:**
- Create: `src/app/business-info/{page.tsx,opengraph-image.tsx}`,
  `src/app/llms.txt/route.ts`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `registrations`, `site`, `author` and `location`.

- [ ] **Step 1: Write failing tests**
  - `test("business info shows both registrations, masked")`
    - `GET /business-info` returns status 200.
    - It includes `House Full Of Love`, `Sole proprietorship`,
      `Naman Hajela`, `INDO26••••••••1267`, `UDYAM-MP-23-•••8816`,
      `District Labour Office, Indore`, `Micro`, `93290`, `85499`, `63119`
      and `Indore, Madhya Pradesh, India`.
    - It includes a `[Placeholder` for the on-request line, until Naman
      writes it.
  - `test("llms.txt names registrations without numbers")`
    - `GET /llms.txt` returns status 200 and includes
      `Udyam (MSME)` and `Gumasta`.
    - It does not match `/INDO|UDYAM-|•/`.
    - It includes `https://housefulloflove.com/blog`.

- [ ] **Step 2: Run `pnpm verify`; expect FAIL**

- [ ] **Step 3: Implement**
  - `/business-info` is a letter:
    - h1 `Business info`.
    - Naman's intro from P, verbatim ("Yes we're real…").
    - **Details** (h2): one fact per line as `<p><span class="fine">Label</span><br>value</p>`
      (no grid). It covers the business name, entity type, proprietor,
      location, operations ("Online, and in multiple cities across India",
      from P), email, legal email and website.
    - **Registrations** (h2): each registration's masked number, act or
      enterprise type, office, dates and activities or NIC codes.
    - The placeholder `[Placeholder — line saying full certificates are
      available to verifying partners on request]`.
    - **Ventures** (h2): P's per-venture contact, legal and privacy links.
  - `llms.txt`: P's structure with:
    - the new name and the blog and Core on this domain
    - registrations listed by name, act, office and dates only
    - the Team line kept

- [ ] **Step 4: Run `pnpm verify`; expect PASS. Check at 320px: no
  horizontal scroll (`document.documentElement.scrollWidth <= 320`).**

- [ ] **Step 5: Commit**: `feat: business info with masked registrations, llms.txt`

### Task 6: Contact, terms, privacy, refunds, team

**Files:**
- Create: `src/app/{contact,terms,privacy,refunds,team}/{page.tsx,opengraph-image.tsx}`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Write a failing test**
  - `test("legal and team pages carry over")`
    - For each of `/contact`, `/terms`, `/privacy`, `/refunds` and `/team`:
      status 200, includes `House Full Of Love`, and does not include
      `Positive Sum Company`.
    - `/team` includes `Simran Khanduja` and `Founding Member`.
    - `/contact` includes `mailto:hello@housefulloflove.com`.

- [ ] **Step 2: Run `pnpm verify`; expect FAIL**

- [ ] **Step 3: Implement**
  - Port each page from P, keeping every sentence verbatim with the name
    swapped.
  - Restyle as letters, in the same pattern as Task 5's fact lines.
  - Where a sentence only makes sense for the old split (for example
    "the experiments site is the documentation"), replace it with a
    `[Placeholder — …]` naming what is needed.
  - `/team` descriptions get a placeholder only where P had none.

- [ ] **Step 4: Run `pnpm verify`; expect PASS**

- [ ] **Step 5: Commit**: `feat: contact, terms, privacy, refunds and team as letters`

### Task 7: Whole-site sweep

- [ ] **Step 1: Write failing tests**
  - `test("no page names the old companies")`
    - `GET` every `<loc>` in `/sitemap.xml`.
    - None includes `Positive Sum Company`, `positivesumcompany.com` or
      `positivesumexperiments.com`.
    - Positive-sum as a philosophy is fine, for example "positive sum
      philosophy" in the letter.
  - `test("every sitemap route has an OG image")`
    - For each route, the HTML has `<meta property="og:image"` and
      fetching that URL returns status 200.

- [ ] **Step 2: Run `pnpm verify`. Fix what fails, keeping copy verbatim
  (use a placeholder if a fix needs new words). Run again until PASS.**

- [ ] **Step 3: Commit**: `fix: sweep old names and missing OG images`

### Task 8: README and learnings

**Files:**
- Create: `README.md`; append to `docs/learnings.md`

- [ ] **Step 1: Write `README.md`**
  - Follow P's README shape: stack, develop (`pnpm dev`, `pnpm verify`),
    the routes table and adding a blog post (from E).
  - Add a **Launch checklist** for Naman:
    1. Create Vercel project `housefulloflove-lp` and add
       `housefulloflove.com` plus `www`.
    2. Set DNS at the registrar as Vercel shows.
    3. Set up the inbox for `hello@` and `legal@`.
    4. Check `https://housefulloflove.com/business-info` on a phone.
    5. Tell Claude it's live, so the redirect branches in the old repos get
       merged and pushed (Task 9).
    6. Update Meta and payment gateway business profiles to the new URL.
    7. Let positivesumcompany.com expire when ready.
  - List the remaining placeholders: the output of
    `git grep -n "\[Placeholder"`.

- [ ] **Step 2: Add a dated entry to `docs/learnings.md`** in the source
  repos' format.

- [ ] **Step 3: Run `pnpm verify` and `pnpm lint`; expect PASS.
  Commit**: `docs: README with launch checklist, first learnings entry`

### Task 9: Redirects in the old repos (on branches, never pushed)

**Files:**
- Modify: `../positivesumexperiments-lp/next.config.ts`, `README.md`
- Modify: `../pscompany-lp/next.config.ts`, `README.md`

- [ ] **Step 1: In each old repo, create branch `redirect-to-housefulloflove`
  from its `main`. Check `git status` is clean first; stop and report if
  not.**

- [ ] **Step 2: Write the expected-redirect table as a test,
  `tests/old-redirects.test.mjs` in housefulloflove-lp**
  - It is driven by `OLD_BASE` and skipped when unset:

    | Request | `location` (308) |
    | --- | --- |
    | experiments `/` | `https://housefulloflove.com/blog` |
    | experiments `/blog/abandon-adulting-club` | same path on housefulloflove.com |
    | experiments `/core.md` | `https://housefulloflove.com/core.md` |
    | experiments `/feed.xml` | `https://housefulloflove.com/feed.xml` |
    | company `/` | `https://housefulloflove.com/` |
    | company `/terms` | `https://housefulloflove.com/terms` |
    | company `/business-info` | `https://housefulloflove.com/business-info` |

  - Use a `SITE` env (`experiments` | `company`) to pick rows.
  - Commit this test in housefulloflove-lp.

- [ ] **Step 3: Implement `redirects()` in each old `next.config.ts`**
  - These are unconditional, with no host match, so every domain and the
    preview URL redirect. All are `permanent: true`, and order matters.
  - **experiments:**
    - `{ source: "/", destination: "https://housefulloflove.com/blog" }`
    - then `{ source: "/:path*", destination: "https://housefulloflove.com/:path*" }`
  - **company:** only the `/:path*` catch-all. Replace P's existing www
    rule.
  - Add a two-line README note at the top of each: "This site now
    redirects to housefulloflove.com; see housefulloflove-lp."

- [ ] **Step 4: Verify each old repo**
  - Run `pnpm build && pnpm start -p 3124`.
  - Run `OLD_BASE=http://localhost:3124 SITE=<x> node --test
    tests/old-redirects.test.mjs` from housefulloflove-lp.
  - Expect PASS, then stop the server.

- [ ] **Step 5: Commit on the branch in each old repo**: `redirect
  everything to housefulloflove.com`
  - **Do not merge, do not push.** Going live waits for checklist item 5.

### Task 10: Publish the repo (needs Naman's go-ahead)

- [ ] **Step 1: Ask Naman whether `Nhajela/housefulloflove-lp` should be
  public or private.** E is public and P is private. Wait for the answer.
- [ ] **Step 2: Run `gh repo create Nhajela/housefulloflove-lp
  --<visibility> --source . --push`.** Report the URL and the README launch
  checklist.
