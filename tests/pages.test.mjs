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

test("home answers the four questions in order", async () => {
  const { text: page } = await get("/");
  // head meta also names the author and says "everybody wins"; order the body
  const text = page.slice(page.indexOf("<h1>"));
  const at = [
    "<h1>House Full Of Love",
    "everybody wins",
    "Happy Mornings Club",
    "Abandon Adulting Club",
    'href="/blog"',
    'href="/core"',
    // who runs it and where is the sign-off, after everything else
    "Naman Hajela",
  ].map((s) => text.indexOf(s));
  assert.ok(
    at.every((i) => i >= 0),
    `missing: ${at}`,
  );
  assert.deepEqual(
    at,
    [...at].sort((a, b) => a - b),
  );
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

test("home lists education among what we do", async () => {
  const { text } = await get("/");
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
