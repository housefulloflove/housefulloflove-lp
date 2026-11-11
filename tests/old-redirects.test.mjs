import assert from "node:assert/strict";
import test from "node:test";
import { get } from "./helpers.mjs";

// Run against an old site: OLD_BASE=http://localhost:3124 SITE=experiments|company
const { OLD_BASE, SITE } = process.env;
const NEW = "https://housefulloflove.com";
const rows = {
  experiments: [
    ["/", `${NEW}/blog`],
    ["/blog/abandon-adulting-club", `${NEW}/blog/abandon-adulting-club`],
    ["/core.md", `${NEW}/core.md`],
    ["/feed.xml", `${NEW}/feed.xml`],
  ],
  company: [
    ["/", `${NEW}/`],
    ["/terms", `${NEW}/terms`],
    ["/business-info", `${NEW}/business-info`],
  ],
}[SITE ?? ""];

// helpers.get takes an absolute URL too, so it can hit the old site.
const getOld = async (path) => {
  const res = await get(new URL(path, OLD_BASE).href);
  return { status: res.status, location: res.headers.location };
};

test(
  "old site redirects to housefulloflove.com",
  {
    skip: !OLD_BASE,
  },
  async () => {
    assert.ok(rows, "OLD_BASE is set, so SITE must be experiments or company");
    for (const [path, location] of rows) {
      const res = await getOld(path);
      assert.deepEqual(res, { status: 308, location }, path);
    }
  },
);
