import assert from "node:assert/strict";
import test from "node:test";
import { get } from "./helpers.mjs";

test("core carries all eight, ending in Love before all", async () => {
  const page = await get("/core");
  assert.equal(page.status, 200);
  assert.ok(page.text.includes("Love before all."));
  const md = await get("/core.md");
  assert.equal(md.status, 200);
  assert.match(md.headers["content-type"], /text\/markdown/);
  assert.ok(md.text.includes("## 8. Love before all."));
});

test("blog home lists the posts", async () => {
  const { status, text } = await get("/blog");
  assert.equal(status, 200);
  assert.ok(text.includes("<h1>Blog</h1>"));
  assert.ok(text.includes('href="/blog/abandon-adulting-club"'));
});

test("post and its data views", async () => {
  const page = await get("/blog/abandon-adulting-club");
  assert.equal(page.status, 200);
  assert.ok(
    page.text.includes("When we were kids, we had a lot of fundamentals right"),
  );
  const md = await get("/blog/abandon-adulting-club.md");
  assert.equal(md.status, 200);
  assert.ok(
    md.text.includes(
      "url: https://housefulloflove.com/blog/abandon-adulting-club",
    ),
  );
  const json = await get("/blog/abandon-adulting-club.json");
  assert.equal(json.status, 200);
  assert.equal(
    JSON.parse(json.text).title,
    "Experiment 1: Abandon Adulting Club",
  );
});

test("feed lists the post on the new domain", async () => {
  const { status, text } = await get("/feed.xml");
  assert.equal(status, 200);
  assert.ok(
    text.includes(
      "<link>https://housefulloflove.com/blog/abandon-adulting-club</link>",
    ),
  );
  assert.ok(text.includes("House Full Of Love"));
});
