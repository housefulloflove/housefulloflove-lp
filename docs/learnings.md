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

## 2026-11-13 — home page restructured into the letter with rooms

**What would have made it better**

- The first three mockups (A, B, C) were one page at three spacings. He
  rejected all of them in one line. When someone says "it doesn't feel
  right", vary the structure between options, not the margins.
- I answered "blob and too plain" with styling (D, E, F) before looking at
  what the site says across pages. The real problem was the content split:
  the company card on Home, his letter on Blog, the belief said three times.
  Read every page before proposing a design for one.
- I over-read "can the Core get expanded": added bold, then toggles. He
  meant a hint for the curious, and wrote the line himself ("Click on any
  one to read more about it."). Ask what a word means before building it.
- Two mockup versions were sent without a browser check. The audit that
  followed found the headline breaking as "no / one" and a zigzag
  two-column list. Screenshot before sending, every time.

**What went right**

- Artifact comments worked as a review channel: he selected text in the
  mockup and wrote "Not needed", and the cut was made from that.
- The verifier question ("what does this company do?") was solved with a
  letterhead: a grey line above the headline that a reader skips and a
  bank reads first. The areas and the company paragraph moved to
  /business-info.
- The full-width tinted band is three CSS lines on `.band`
  (box-shadow 100vmax + clip-path), no layout change.

**Open threads**

- The letterhead and "What we do" say nearly the same sentence. Slot for
  Naman: one short line for the letterhead.
- /blog is now a heading and one post. Slot: one line of his at the top.
- Old-site redirect still sends the old "/" to /blog
  (tests/old-redirects.test.mjs); the letter now lives on "/".
- Core, posts and Team still end without onward links.
- Push still fails with 403 until the Claude GitHub App has repo access.

### Later on 2026-11-13 — header, footer, Next band, image spotlight

- My first-session change made `.letter h2` grey, which silently greyed
  every heading on the Core and the post (`.prose h2` never set a colour).
  It was live in screenshots for a day before I saw it. After changing a
  base element style, screenshot every page type, not only the one being
  worked on.
- `.lbl` was sized by `.prose p` inside posts and the Core. A utility
  class used inside `.prose` needs a selector that outranks `.prose p`.
- Went right: `ZoomImage` wraps any image (post cover, MDX `img`) in a
  button plus a native `<dialog>`; wheel, pinch and drag are about 60
  lines with no library. Checked with Playwright: open, wheel, drag, Esc.
- Open: pinch was not exercised in the browser check, only wheel and drag.
  Blog opening line is a trim of his sentence; he may want his own.


### 2026-11-14 — Experiment 1 hidden

- "Hide" was read as unlist, not delete: `hidden: true` in the post's
  post.ts, and `listed` in posts.ts feeds the blog, feed and sitemap. To
  bring it back, remove the flag and restore the `thesis` entry in
  src/app/page.tsx. The reading was a guess; confirm with Naman.
- Open: the old-site redirect and anyone with the URL still reach the
  post. The empty Blog page has no "nothing here yet" line; that is his
  to write if wanted.

### 2026-11-14 — ElevenLabs grant prep (LinkedIn, application, site)

- The site was the reviewer's evidence: registrations, business email and
  "Software products" were already there. The one liability was the
  "Consultation and direct services" area, since the grant excludes
  consultancies; removed from `areas` in src/lib/site.ts.
- Went right: counting the form's limit from where his paste was cut off
  (750 chars) instead of guessing, and keeping the application's company
  story identical to what LinkedIn and the site show.
- Open: "direct services" still ends his company sentence (home letterhead,
  home "What we do", /business-info, site.description). Trimming it is a
  reword; ask him. Slots for him: one line under "Software products and
  services" about the unnamed new product; one line on /team that he is
  full-time.
- Later: Naman said "you can write on my behalf right now" for these
  passages. Cut "and direct services" in all four places, added the
  new-product sentence to the software area and "He works on House Full
  Of Love full-time." on /team; each marked in a comment as written by
  Claude at his request. Tests need `next start -p 3123` running first.

### 2026-11-15 — four look directions for the home page

- He still did not like the plain-letter look and asked for "crazy
  options" rooted in his philosophy. Answered with four structures, not
  four skins (the 13 Nov lesson): a cinema "House Full" board, a payoff
  table cut from his own letter, the eight compounding in size, and the
  house in plan. `docs/mockups/look-options.html`, published as an artifact.
- Went right: each idea came from a sentence or a name of his ("build this
  on top of" became the foundation; the four people he names became table
  rows), so no copy had to be written. The few labels of mine are listed
  under each mockup.
- Caught by the screenshot before sending: `.a .ticket .main p` outranked
  the belief's own class and shrank it to body size.
- Open: no direction is chosen. I did not ask what exactly he dislikes
  about the current look; if none of the four lands, ask that first.
  CSS shapes (roof, bricks, ticket notches) stand in for drawing; anything
  that should be drawn is his.

### Later on 2026-11-15 — round two: the hand comes back

- He rejected all four ("all of them are bad"). Asked why, with options:
  gimmicks, too loud, looks AI-made. About the live site: lifeless, and he
  misses the old hand. "Crazy options" did not mean costumes or metaphors;
  I should have asked what he disliked before drawing anything, which the
  13 Nov entry already said.
- Round two is one calm page at three settings of one dial, how much of
  his hand shows: pens on today's letter; the old Positive Sum look whole;
  his handwriting and drawing leading. Built only from things he made:
  his Excalidraw plus mark (positivesumexperiments-lp/logo-trial-1.svg),
  the Akriti font, the pens and wobbly frame, and his business-model
  drawing. Hand-set words are all existing lines of his.
- The old repos say font handwriting is a stand-in ("no Caveat in
  production"). Option 3 says so plainly and asks him for real handwriting.
- Open: no direction chosen. The round-two mockup is an artifact only (it
  embeds the font and drawing as base64, so it is not committed). The plus
  mark was Positive Sum's; whether it is House Full Of Love's is his call.

### Later on 2026-11-15 — he picked "the hand leads"

- Of round two he wanted the version where his hand leads. Thought it
  through as two levels (he writes the whole home page, about 110 words;
  or only the big lines, about 25) plus a writing sheet: copy asked by
  slot, with pen colour, line length and three ways to make it.
- The render caught `.phone p { margin: 0 }` outranking every single-class
  spacing rule in the mockup. Third time this session a reset beat a
  component class; scope resets with `:where()` next time.
- Open: which level (A or B), and his handwriting. Nothing is built in the
  site yet; Akriti is only a stand-in. Handwritten pieces must keep real
  text underneath (alt or visually hidden) for verifiers and the .md views.

### Later on 2026-11-15 — the direction he named himself

- After three rounds of my options, his own five lines settled it
  (writing/2026-11-15-look-direction.txt): his real hand for the home
  header and description, the old hand font (Akriti) elsewhere, plain like
  lossfunk.com, no peach paper, no narrow column, and new home text from
  him. A reference site and "what is hurting us" did more than fourteen
  mockup variants. Ask for a reference in the first message.
- Answered with one page, not options: the artifact itself is the home
  page at full width (white, black, blue links, default lists), then the
  start of the Core as the inner-page sample. Slots for new words are grey
  and in brackets.
- My reading, unconfirmed: "old hand font everywhere else" means headings
  and bylines in Akriti with the reading still in Newsreader, not body
  text in Akriti. Width is 64rem, left-aligned; lossfunk has no limit.
- Open: his new home text (asked by slot), his handwriting for the three
  top lines, then build it in the site (globals.css paper, width, Akriti
  from the old repo's public/fonts). The spec in docs/superpowers/specs
  still says peach paper and one narrow column; update it when he confirms.

### Later on 2026-11-15 — the lab home page, built

- He sent the whole home page as text (writing/2026-11-15-home-lab.txt):
  name, one line, six short paragraphs, four links, footer, "dead center of
  the screen, centered". Built in the site, not as another mockup: the
  Core list, the ventures and the letterhead left the home page.
- Site-wide: white paper, grey rule and band instead of peach and brown,
  column 34rem to 44rem, headings in Akriti (assets/fonts, `--hand`).
  The home name and line use the same font until his handwriting arrives.
- Went right: `:has(.home)` on the shared wrapper centres one page without
  touching the layout component; `text-wrap: balance` removed the one-word
  last lines; the page is exactly one screen at 1440x900. Screenshotted
  home, core, team, blog and business-info at two widths after the
  base-style change, as the 13 Nov entry asks.
- Mine to confirm with him: two spelling fixes ("documentation of our
  journey", "Welcome aboard"); "Fundamentals" renames only the home link,
  while the header, footer and page still say "The Core" / "Core";
  site.description, llms.txt and the OG card (still peach) are unchanged;
  Team and the ventures are no longer linked from the home body, only from
  the footer and business-info.
- The design spec (docs/superpowers/specs) still describes the peach
  letter; it is history now, this entry and globals.css are current.

### Later on 2026-11-15 — Fundamentals, and the box question

- "Rename everything to Fundamentals", then mid-task "but keep /core
  redirecting to there": the page moved to /fundamentals (folder, .md
  view, sitemap, llms.txt, OG eyebrow, header, footer, Next band, 404) and
  /core, /core.md answer 308 from next.config.ts, with a test. I had
  renamed only labels first; a rename request should prompt "the URL too?"
  before the first build. `tsc` fails on stale `.next/types` after moving
  a route folder until the next build.
- "How would the letter look left aligned within a box": answered with
  screenshots of the real page under injected CSS (no box, plain box, the
  old wobbly frame) at two widths, nothing committed. Cheaper than a
  mockup and truer. Open: his pick; in a box the name wraps to two lines
  on desktop unless the box is wider than 35rem.

### Later on 2026-11-15 — home settled: centred, pen notes, bold belief

- He chose the centred page as built. The hand-ruled frame is kept for
  "other places if required", not the home letter. On phones the home page
  is left-aligned with no box; the belief is bold, not italic.
- Pen notes on the home links: the old HandNote look (wobbly frame, Akriti,
  link blue, a degree off true), CSS only, `aria-describedby` on the link.
  Fundamentals and Blog use sentences he already wrote; Contact, Business
  Info and his own name show grey bracketed slots until he writes them.
- Phones have no hover, so the notes never show there. If he wants them on
  phones they need another form (a line under each link); not built.
- Three notes arrived while a build was running; batching them into one
  rebuild worked, but they went into one commit instead of one each.
