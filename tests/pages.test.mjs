import assert from "node:assert/strict";
import test from "node:test";

export const BASE = process.env.BASE_URL ?? "http://localhost:3123";

// redirect: "manual" so redirects can be asserted. A "host" header needs
// undici's fetch, which Node's global fetch forbids, so use http for that.
export async function get(path, headers = {}) {
  const url = new URL(path, BASE);
  const { request } = await import("node:http");
  return new Promise((resolve, reject) => {
    request(url, { headers }, (res) => {
      let text = "";
      res.setEncoding("utf8");
      res.on("data", (c) => {
        text += c;
      });
      res.on("end", () =>
        resolve({ status: res.statusCode, headers: res.headers, text }),
      );
    })
      .on("error", reject)
      .end();
  });
}

test("home serves the name, light-only", async () => {
  const { status, text } = await get("/");
  assert.equal(status, 200);
  assert.ok(text.includes("House Full Of Love"));
  assert.match(text, /<meta name="color-scheme" content="light"/);
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
