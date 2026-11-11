# House Full Of Love — site

The public site for House Full Of Love (housefulloflove.com), Naman's sole
proprietorship in Indore, Madhya Pradesh, India. It replaces
positivesumcompany.com and positivesumexperiments.com, which will only
redirect here. The repo is public at `housefulloflove/housefulloflove-lp` on
GitHub (the `housefulloflove` org, display name "House Full Of Love").

Built from [pscompany-lp](https://github.com/Nhajela/pscompany-lp) and
[positivesumexperiments-lp](https://github.com/Nhajela/positivesumexperiments-lp),
in a new look: a plain letter (Newsreader, warm paper, blue links, light only).
The design is in `docs/superpowers/specs/2026-11-11-housefulloflove-site-design.md`.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, static-first) + React 19
- Tailwind CSS 4
- MDX via `@next/mdx` for the written pages
- Biome for lint + format
- Deployed on Vercel (project `housefulloflove-lp`)

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint       # biome check
pnpm build      # production build
pnpm verify     # build, start on 3123, run all tests, stop
pnpm test       # all tests against a server you already started
```

`pnpm verify` refuses to run if port 3123 is busy. `pnpm test` talks to
`http://localhost:3123` unless you set `BASE_URL`:

```bash
pnpm build && pnpm start -p 3200 &
BASE_URL=http://localhost:3200 pnpm test
```

`.gitattributes` forces LF line endings, so Biome passes on Windows
checkouts too.

### The privacy scan

`tests/privacy.test.mjs` scans every tracked file and the build output
(`.next/`) for the *formats* of things that must never ship: a full
registration number, the residential address, PAN, a phone number, a
personal email. Only the masked registration numbers, on `/business-info`
alone, are allowed. The full numbers, address, PAN and phone must never be
committed, not even in docs, comments or commit messages.

The scan has two exclusions, because they quote the patterns:
`tests/privacy.test.mjs` itself and `docs/superpowers/`. Real values were
never written in either; keep it that way.

## Routes

| Route | Source | What it is |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | The letter: who we are, ventures, areas |
| `/core` | `src/app/core/page.mdx` | The Core (canonical here now) |
| `/core.md` | `src/app/core.md/route.ts` | The Core as data |
| `/blog` | `src/app/blog/page.tsx` | Index, plus the 8 principles |
| `/blog/abandon-adulting-club` | `src/app/blog/abandon-adulting-club/page.mdx` | The first post |
| `/blog/<slug>.md`, `.json` | `src/app/blog/[file]/route.ts` | Every post as data |
| `/business-info` | `src/app/business-info/page.tsx` | Details for providers to verify the business (masked registration numbers live only here) |
| `/contact`, `/terms`, `/privacy`, `/refunds` | `src/app/<route>/page.tsx` | Policy pages |
| `/team` | `src/app/team/page.tsx` | Naman |
| `/feed.xml` | `src/app/feed.xml/route.ts` | RSS for the blog |
| `/llms.txt` | `src/app/llms.txt/route.ts` | Site summary for language models |

Site identity (name, canonical URL, registrations, ventures, areas) lives in
`src/lib/site.ts`; metadata, sitemap, robots and JSON-LD all read it. The
canonical URL is `https://housefulloflove.com` (no www); set
`NEXT_PUBLIC_SITE_URL` to override it for previews.

## Writing

All reader-facing prose is Naman's, written by hand; sources are logged in
`writing/`. Anything not yet written is a `[Placeholder — …]`. See
`docs/ai-policy.md`.

## Adding a blog post

Each post is its own folder under `src/app/blog/<slug>/`, deliberately
hardcoded:

- `page.mdx`: the writing. It exports `postMetadata(post)` and a default
  layout returning `<PostFrame post={post}>`
  (`src/components/post-frame.tsx`). Markdown gets the element mapping in
  `src/mdx-components.tsx`.
- `post.ts`: title, description, date (shared by the page, OG card, index
  and feed).
- `opengraph-image.tsx`: a few lines on top of `src/lib/og/card.tsx`; or a
  static `opengraph-image.jpg` (1200x630) plus `opengraph-image.alt.txt`.
- `cover.jpg`: optional, compressed to display size first (~100-200 KB).

Then list it at the top of `src/app/blog/posts.ts`. The index, feed, sitemap
and JSON-LD read that one list. Add the new route to `src/app/sitemap.ts` and
extend the tests.

## Launch checklist (Naman)

1. Create the Vercel project `housefulloflove-lp` from the GitHub repo and
   add the domains `housefulloflove.com` and `www.housefulloflove.com`.
2. Set DNS at the registrar as Vercel shows.
3. Set up the inbox for `hello@housefulloflove.com` and
   `legal@housefulloflove.com`.
4. Check `https://housefulloflove.com/business-info` on a phone.
5. Tell Claude it's live: it merges and pushes the `redirect-to-housefulloflove`
   branches in pscompany-lp (`main`) and positivesumexperiments-lp
   (`master`). Each old Vercel project then serves only redirects.
6. Update Meta and payment gateway business profiles to the new URL.
7. Let positivesumcompany.com expire when ready.

### Dry-running the old-site redirects

Before step 5, in each old repo on its `redirect-to-housefulloflove` branch,
build and start it on port 3124 (`pnpm build && pnpm start -p 3124`). Then,
from this repo:

```bash
OLD_BASE=http://localhost:3124 SITE=experiments node --test tests/old-redirects.test.mjs
OLD_BASE=http://localhost:3124 SITE=company node --test tests/old-redirects.test.mjs
```

Use `SITE=experiments` against the experiments repo and `SITE=company`
against pscompany. The test sets the Host header per path, since `fetch`
cannot.

## Remaining placeholders

Output of `git grep -n "\[Placeholder" -- src`:

```
src/app/business-info/page.tsx:97:        [Placeholder — line saying full certificates are available to verifying
```

## More

- `docs/how-we-build.md`: how we build
- `docs/learnings.md`: what each session taught us
- `docs/future-changes.md`: open threads
