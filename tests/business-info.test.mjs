import assert from "node:assert/strict";
import { request } from "node:http";
import test from "node:test";

const BASE = process.env.BASE_URL ?? "http://localhost:3123";

function get(path) {
  return new Promise((resolve, reject) => {
    request(new URL(path, BASE), (res) => {
      let text = "";
      res.setEncoding("utf8");
      res.on("data", (c) => {
        text += c;
      });
      res.on("end", () => resolve({ status: res.statusCode, text }));
    })
      .on("error", reject)
      .end();
  });
}

test("business info shows both registrations, masked", async () => {
  const { status, text } = await get("/business-info");
  assert.equal(status, 200);
  for (const s of [
    "House Full Of Love",
    "Sole proprietorship",
    "Naman Hajela",
    "INDO26••••••••1267",
    "UDYAM-MP-23-•••8816",
    "District Labour Office, Indore",
    "Micro",
    "93290",
    "85499",
    "63119",
    "Indore, Madhya Pradesh, India",
    "[Placeholder",
  ]) {
    assert.ok(text.includes(s), `missing: ${s}`);
  }
});

test("llms.txt names registrations without numbers", async () => {
  const { status, text } = await get("/llms.txt");
  assert.equal(status, 200);
  assert.ok(text.includes("Udyam (MSME)"));
  assert.ok(text.includes("Gumasta"));
  assert.ok(!/INDO|UDYAM-|•/.test(text));
  assert.ok(text.includes("https://housefulloflove.com/blog"));
});
