import assert from "node:assert/strict";
import test from "node:test";
import { get } from "./helpers.mjs";

test("legal and team pages carry over", async () => {
  for (const path of ["/contact", "/terms", "/privacy", "/refunds", "/team"]) {
    const { status, text } = await get(path);
    assert.equal(status, 200, path);
    assert.ok(text.includes("House Full Of Love"), `${path} name`);
    assert.ok(!text.includes("Positive Sum Company"), `${path} old name`);
  }
  const team = await get("/team");
  assert.ok(team.text.includes("Simran Khanduja"));
  assert.ok(team.text.includes("Founding Member"));
  const contact = await get("/contact");
  assert.ok(contact.text.includes("mailto:hello@housefulloflove.com"));
});
