# Learnings

Entries newest first.

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
  markers instead of guesses; Naman's text was carried verbatim.
- **Redirects last and unpushed.** Old sites keep working until the new one
  is confirmed live; the redirect branches have their own test.
- **Small tasks, a review each, and a ledger** of rulings and deferred minors.

### Open threads

- The launch checklist (README) is Naman's; step 5 is the merge of the
  redirect branches.
- The README placeholders need Naman's words.
- Deferred minors and the logo/favicon are in `docs/future-changes.md`.
