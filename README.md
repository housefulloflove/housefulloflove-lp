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
- Hosted on Cloudflare Workers through the OpenNext adapter
  (`@opennextjs/cloudflare`); config in `wrangler.jsonc` and
  `open-next.config.ts`

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

### Cloudflare build and preview

```bash
pnpm preview   # opennextjs-cloudflare build + preview in the Workers runtime (port 8787)
pnpm deploy    # build + deploy to your Cloudflare account; normally Workers Builds does this
```

`pnpm verify` stays on `next build` + `next start`, so the tests do not depend
on the Workers runtime. To run them against the Worker, start `pnpm preview`
and then `BASE_URL=http://127.0.0.1:8787 pnpm test`.

Notes:

- OpenNext warns that Windows is not fully supported. It builds and previews
  here, but only with `node-linker=hoisted` (see `.npmrc`): with pnpm's default
  symlinked `node_modules`, the OpenNext copy step fails with "Access is
  denied". Linux/WSL work either way.
- Every route is prerendered, and the Worker cannot read repo files at request
  time, so `open-next.config.ts` serves the prerendered output from Workers
  Static Assets (read-only, no R2 or KV). If you add ISR later, switch to the
  R2 incremental cache.
- `@opennextjs/cloudflare` and `wrangler` are pinned exactly. The adapter's
  `next` peer range moves quickly, so bump Next and the adapter together.

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

For facts the generic formats cannot catch (the address, a PIN, a bank
name), keep your own patterns in `.superpowers/private-patterns.txt`: one
case-insensitive regex per line. The file is gitignored and optional; when
it is absent the test logs a note and scans the generic formats only.

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

1. Push to GitHub.
2. Cloudflare dashboard, Workers & Pages, create from the Git repo
   `housefulloflove/housefulloflove-lp`. Build command
   `pnpm exec opennextjs-cloudflare build`, deploy command
   `pnpm exec opennextjs-cloudflare deploy`, production branch `main`.
3. Attach custom domains `housefulloflove.com` and `www.housefulloflove.com`
   to the Worker (proxied DNS records). The app redirects www to the apex
   itself.
4. Fill every placeholder (`git grep -n "\[Placeholder" -- src` prints
   nothing) and read the four legal pages (contact, terms, privacy,
   refunds) plus the certificate wording on /business-info. This blocks
   going live.
5. Set up the inbox for `hello@housefulloflove.com` and
   `legal@housefulloflove.com`.
6. Check `https://housefulloflove.com/business-info` on a phone.
7. Add the old-domain redirect rules from `docs/cloudflare-redirects.md`.
8. Run the live redirect tests listed in that file.
9. Update Meta and payment gateway business profiles to the new URL.
10. Remove the old Vercel projects.
11. Let positivesumcompany.com expire when ready.

The `redirect-to-housefulloflove` branches in pscompany-lp and
positivesumexperiments-lp are no longer used (Cloudflare rules do the
redirecting). Leave them unmerged; delete them when you decide to.

## Remaining placeholders

Output of `git grep -n "\[Placeholder" -- src`:

```
src/app/business-info/page.tsx:97:        [Placeholder — line saying full certificates are available to verifying
```

## More

- `docs/how-we-build.md`: how we build
- `docs/learnings.md`: what each session taught us
- `docs/future-changes.md`: open threads
