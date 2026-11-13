import assert from "node:assert/strict";
import test from "node:test";
import { get } from "./helpers.mjs";

test("home serves the name, light-only", async () => {
  const { status, text } = await get("/");
  assert.equal(status, 200);
  assert.ok(text.includes("House Full Of Love"));
  assert.equal(
    text.match(/<meta name="color-scheme" content="only light"/g)?.length,
    1,
  );
  assert.ok(!text.includes("prefers-color-scheme"));
  const sheets = [...text.matchAll(/href="([^"]+\.css[^"]*)"/g)];
  assert.ok(sheets.length > 0, "no stylesheet linked from /");
  for (const [, href] of sheets) {
    const css = await get(href);
    assert.equal(css.status, 200, href);
    assert.ok(!css.text.includes("prefers-color-scheme"), href);
  }
});

test("every page has the footer", async () => {
  const { text } = await get("/");
  for (const s of [
    'href="/business-info"',
    'href="/terms"',
    "mailto:hello@housefulloflove.com",
  ])
    assert.ok(text.includes(s), s);
});

test("www redirects to apex", async () => {
  const { status, headers } = await get("/", {
    host: "www.housefulloflove.com",
  });
  assert.equal(status, 308);
  assert.equal(headers.location, "https://housefulloflove.com/");
});

test("og image renders", async () => {
  const { status, headers } = await get("/opengraph-image");
  assert.equal(status, 200);
  assert.match(headers["content-type"], /image\/png/);
});

test("robots and sitemap point at the apex", async () => {
  const robots = await get("/robots.txt");
  assert.ok(
    robots.text.includes("Sitemap: https://housefulloflove.com/sitemap.xml"),
  );
  const { text } = await get("/sitemap.xml");
  assert.ok(text.includes("<loc>https://housefulloflove.com"));
  const hosts = [...text.matchAll(/<loc>https?:\/\/([^/<]+)/g)].map(
    (m) => m[1],
  );
  assert.deepEqual([...new Set(hosts)], ["housefulloflove.com"]);
});

test("unknown path is a plain 404", async () => {
  const { status, text } = await get("/nope");
  assert.equal(status, 404);
  assert.match(text, /href="\/"/);
});

test("home: letterhead, belief, letter, the eight, ventures, in order", async () => {
  const { text: page } = await get("/");
  const text = page.slice(page.indexOf("<h1>"));
  const at = [
    "<h1>House Full Of Love",
    'href="/business-info"',
    "no one has to lose.",
    "running experiments with fundamentals",
    "Click on any one to read more about it.",
    'href="/core#1-play-positive-sum-games"',
    'href="/core#8-love-before-all"',
    "What we do",
    "Abandon Adulting Club",
    'href="/blog/abandon-adulting-club"',
    "Happy Mornings Club",
  ].map((s) => text.indexOf(s));
  assert.ok(
    at.every((i) => i >= 0),
    `missing: ${at}`,
  );
  assert.deepEqual(
    at,
    [...at].sort((a, b) => a - b),
  );
  const ol = text.match(/<ol[^>]*>([\s\S]*?)<\/ol>/);
  assert.ok(ol, "no <ol>");
  assert.equal((ol[1].match(/<li[ >]/g) ?? []).length, 8);
});

test("core headings carry the ids the home page links to", async () => {
  const { text } = await get("/core");
  assert.ok(text.includes('id="1-play-positive-sum-games"'));
  assert.ok(text.includes('id="8-love-before-all"'));
});

test("home JSON-LD names the business but no registration numbers", async () => {
  const { text } = await get("/");
  const raw = text.match(
    /<script type="application\/ld\+json">(.*?)<\/script>/s,
  )[1];
  const org = JSON.parse(raw)["@graph"].find(
    (n) => n["@type"] === "Organization",
  );
  assert.equal(org.name, "House Full Of Love");
  assert.equal(org.address.addressLocality, "Indore");
  assert.ok(!("identifier" in org));
  assert.ok(!/•|INDO|UDYAM/.test(raw));
});

test("business info lists education among what we do", async () => {
  const { text } = await get("/business-info");
  assert.ok(text.includes("Educational workshops and courses"));
});

test("social metadata: site_name, url, large twitter card, real JSON-LD image", async () => {
  for (const p of [
    "/",
    "/blog",
    "/core",
    "/team",
    "/blog/abandon-adulting-club",
  ]) {
    const { text } = await get(p);
    assert.match(
      text,
      /<meta property="og:site_name" content="House Full Of Love"/,
      p,
    );
    assert.match(text, /<meta property="og:url" content="https:\/\/[^"]+"/, p);
    assert.match(
      text,
      /<meta name="twitter:card" content="summary_large_image"/,
      p,
    );
  }
  const post = await get("/blog/abandon-adulting-club");
  const img = post.text.match(/"image":"([^"]+)"/)?.[1];
  assert.ok(img, "no JSON-LD image");
  const res = await get(new URL(img).pathname);
  assert.equal(res.status, 200, img);
});

test("fine-print links get a 24px tap area", async () => {
  const { text } = await get("/");
  let css = "";
  for (const [, href] of text.matchAll(/href="([^"]+\.css[^"]*)"/g))
    css += (await get(href)).text;
  assert.ok(/\.fine a\{[^}]*padding:5px 0/.test(css), "no tap-area rule");
});
