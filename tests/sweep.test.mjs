import assert from "node:assert/strict";
import test from "node:test";
import { get } from "./helpers.mjs";

async function routes() {
  const { text } = await get("/sitemap.xml");
  return [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

test("no page names the old companies", async () => {
  const locs = await routes();
  assert.ok(locs.length > 5);
  for (const loc of locs) {
    const { status, text } = await get(new URL(loc).pathname);
    assert.equal(status, 200, loc);
    assert.doesNotMatch(
      text,
      /Positive Sum Company|positivesumcompany\.com|positivesumexperiments\.com/i,
      loc,
    );
  }
});

test("every sitemap route has an OG image", async () => {
  for (const loc of await routes()) {
    const { text } = await get(new URL(loc).pathname);
    const m = text.match(/<meta property="og:image" content="([^"]+)"/);
    assert.ok(m, `no og:image on ${loc}`);
    const img = await get(new URL(m[1]).pathname);
    assert.equal(img.status, 200, `${loc} -> ${m[1]}`);
  }
});
