# Learnings

Entries newest first.

---

## 2026-11-12 — spacing and hierarchy pass on the short pages

**Result:** home, blog, team and the footer re-set so names and section
labels read apart from the text under them. On home the belief line is a
larger lede, each venture and area is a name on its own line with its
description below, and "Run by Naman Hajela, Indore…" moved from line two to
an italic sign-off at the bottom. No words changed, only order and setting.

### What would have made it better

1. **A test pinned the old reading order.** "home answers the four questions
   in order" asserted the author straight after the h1, so the reorder Naman
   asked for failed it. Order tests encode a design call; say which call in
   the test name so it's obvious when the call changes.
2. **`pnpm verify` never returned here.** With `shell: true`, `server.kill()`
   stops the shell and leaves `next-server` on port 3123, so on Linux the
   script hangs after the tests. Worked around by running
   `node --test tests/*.test.mjs` against the left-over server and killing
   it by hand. Worth fixing in `scripts/verify.mjs`.
3. **`next dev` rewrites `AGENTS.md`.** Starting the dev server left an
   uncommitted change to the Next agent-rules block; it is committed now.
4. **Push was refused (403):** the Claude GitHub App has no access to this
   repo for the organisation, so the commits stayed local in the session.

### What went right, keep doing

- **Two fresh readers, one per viewport, given screenshots and the
  constraints (no rewording, no new colours).** They agreed without seeing
  each other: byline before belief, run-in names ("Events and experiences.
  Events, experiences, and clubs."), and section labels weaker than the body.
- **Quiet label, loud name.** The uppercase h2 got smaller and grey with 56px
  above it; the semibold names inside carry the hierarchy.
- **`--muted` darkened** from #8b8a83 (about 3.2:1 on the paper) to #6b6a64.

### Open threads

- Blog order (letter, the Core, then posts) was left as his letter describes
  it, though both readers wanted the posts higher.
- Business info and contact were left alone apart from the shared label and
  footer styles; the registration numbers could take semibold.

---

## 2026-11-11 — housefulloflove.com built from two sites

**Result:** a new site merged from pscompany-lp and positivesumexperiments-lp
in a plain-letter look: home, core, blog, six legal/contact/team pages,
feed, `llms.txt`, OG cards, a privacy scan and a redirect test; redirect
branches prepared (not pushed) in both old repos.

### What would have made it better

1. **The privacy scan scanned its own source.** The test contains the
   patterns it forbids, and the plan quoted a literal full-format number.
   Decide scan exclusions (`tests/privacy.test.mjs`, `docs/superpowers/`) up
   front, and have plans describe formats, never examples.
2. **A dropped file type made a scan vacuous.** Review caught `.js` missing
   from the build scan and a CSS check that could never fail. Make each new
   check fail once on purpose before trusting it.
3. **Line endings.** With `core.autocrlf=true`, worktrees got CRLF and Biome
   rejected every file; copied configs were also reformatted. Put
   `.gitattributes` (`* text=auto eol=lf`) in the first commit.
4. **Parallel worktrees and one fixed verify port.** Tasks 4-6 ran side by
   side, so each used its own port (3204-3206) and its own test file with a
   copied `get()` helper; `tests/helpers.mjs` came later. Give `verify` a
   port override from the start.
5. **Platform surprises, each cost a round trip.** Next drops the trailing
   slash on bare-root redirects; `fetch` cannot set `Host`, so old-domain
   tests need a raw `http` request; Node 24 `node --test dir/` treats the
   directory as a module, so the glob is `tests/*.test.mjs`.
6. **The plan assumed `main`.** The experiments repo's default branch is
   `master`. Check default branches before branching.

### What went right, keep doing

- **Masking from day one.** Only masked registration numbers exist in the
  repo, only on `/business-info`; the full numbers, address, PAN and phone
  were never written anywhere, including plans and commits. A test enforces it.
- **Never draft copy.** New sentences became visible `[Placeholder — …]`
  markers instead of guesses; Naman's home, core and blog text was carried
  verbatim. The contact, terms, privacy and refunds pages are plumbing copied
  from the old site, still DRAFT until he has read them (each says so in a
  comment).
- **Redirects last and unpushed.** Old sites keep working until the new one
  is confirmed live; the redirect branches have their own test.
- **Small tasks, a review each, and a ledger** of rulings and deferred minors.

### Open threads

- The launch checklist (README) is Naman's; step 5 is the merge of the
  redirect branches.
- The README placeholders need Naman's words.
- Deferred minors and the logo/favicon are in `docs/future-changes.md`.
