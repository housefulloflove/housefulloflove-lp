import assert from "node:assert/strict";
import test from "node:test";
import { get } from "./helpers.mjs";

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

test("no portal lookup links next to masked registrations", async () => {
  for (const path of ["/llms.txt", "/business-info"]) {
    const { text } = await get(path);
    assert.ok(!/verifiable|mponline|udyamregistration/i.test(text), path);
  }
});
