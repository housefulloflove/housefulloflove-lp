import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

// Formats, never real values: the real values must not enter the repo.
const FORBIDDEN = [
  [/INDO\d{6}SE\d{6}/, "full Gumasta number"],
  [/UDYAM-[A-Z]{2}-\d{2}-\d{7}/, "full Udyam number"],
  [/\b[A-Z]{5}\d{4}[A-Z]\b/, "PAN-shaped string"],
  [/(?<![\w.])[6-9]\d{9}(?!\w)/, "Indian mobile number"],
  [/@gmail\.com/i, "personal Gmail"],
  [/\b[A-Z]{4}0[A-Z0-9]{6}\b/, "bank IFSC-shaped string"],
];

// Optional, untracked: one case-insensitive regex per line.
const PRIVATE = ".superpowers/private-patterns.txt";
if (existsSync(PRIVATE)) {
  for (const l of readFileSync(PRIVATE, "utf8").split(/\r?\n/)) {
    if (l.trim())
      FORBIDDEN.push([new RegExp(l.trim(), "i"), "private pattern"]);
  }
} else {
  console.log(`note: ${PRIVATE} absent, only generic patterns scanned`);
}

const SKIP_TRACKED =
  /(\.(png|jpe?g|gif|webp|ico|woff2?|otf|ttf|pdf)$|(^|\/)pnpm-lock\.yaml$|^tests\/privacy\.test\.mjs$|^docs\/superpowers\/)/i;
const BUILD_EXT = /\.(html|rsc|body|js|json|txt)$/;

function hits(file) {
  const text = readFileSync(file, "utf8");
  return FORBIDDEN.filter(([re]) => re.test(text)).map(
    ([, why]) => `${file}: ${why}`,
  );
}

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

test("tracked files carry no personal data", () => {
  const files = execFileSync("git", ["ls-files", "-co", "--exclude-standard"], {
    encoding: "utf8",
  })
    .split("\n")
    .filter((f) => f && !SKIP_TRACKED.test(f) && existsSync(f));
  assert.deepEqual(files.flatMap(hits), []);
});

test("build output carries no personal data", (t) => {
  if (!existsSync(".next")) return t.skip(".next/ missing, run a build first");
  const files = [".next/server", ".next/static"]
    .filter(existsSync)
    .flatMap(walk)
    .filter((f) => BUILD_EXT.test(f));
  assert.deepEqual(files.flatMap(hits), []);
});
