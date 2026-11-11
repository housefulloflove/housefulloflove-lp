import assert from "node:assert/strict";
import { request } from "node:http";
import test from "node:test";

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

const get = (path) =>
  new Promise((resolve, reject) => {
    request(new URL(path, OLD_BASE), (res) => {
      res.resume();
      res.on("end", () =>
        resolve({ status: res.statusCode, location: res.headers.location }),
      );
    })
      .on("error", reject)
      .end();
  });

test("old site redirects to housefulloflove.com", {
  skip: !OLD_BASE || !rows,
}, async () => {
  for (const [path, location] of rows) {
    const res = await get(path);
    assert.deepEqual(res, { status: 308, location }, path);
  }
});
