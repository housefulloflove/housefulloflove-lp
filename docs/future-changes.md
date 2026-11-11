# Future changes

Open threads, none urgent.

- **Per-post custom design.** Naman: "for now" every post uses the same
  plain-letter style. Posts are hardcoded folders, so a post can take its own
  design later without touching the others.
- **Logo and favicon.** House Full Of Love has no logo yet; `src/app/icon.svg`
  is a stand-in.
- **Placeholders.** See the README; each needs Naman's own words.
- **Deferred minors** (from the build review):
  - `scripts/verify.mjs`: the busy-port check has no fetch timeout, and on
    non-Windows the kill can orphan the next start.
  - `tests/privacy.test.mjs` uses cwd-relative paths.
  - `@next/mdx` `^16.2.10` resolves to 16.4.6 while `next` is pinned 16.2.10.
  - OG card: `COLOR.accent` is unused; `titleSize` thresholds were not re-tuned
    for Newsreader (check long titles).
  - Home: areas and links are `<p>`/`<br>`, not lists (a11y); home metadata
    inherits the layout description.
  - `/business-info`: "Sole proprietorship" is repeated as a literal; the
    connective words around certificate facts may need Naman's reading;
    `llms.txt` dates are ISO.
  - `/refunds` hardcodes the Happy Mornings link.
  - No test that `/core` canonical is `/core`.
  - Old repos' redirect configs: comment the explicit `/` rules; a `SITE`
    typo in the test skips silently.
