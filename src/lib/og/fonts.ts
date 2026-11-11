// Satori (behind next/og) needs raw font bytes and reads only ttf/otf/woff,
// so Newsreader is vendored in assets/fonts/ (build input, not public).

import { readFile } from "node:fs/promises";
import path from "node:path";

export const OG_FONT = { serif: "Newsreader" } as const;

type LoadedFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 600;
  style: "normal" | "italic";
};

const FACES = [
  { file: "newsreader-400.woff", weight: 400, style: "normal" },
  { file: "newsreader-600.woff", weight: 600, style: "normal" },
  { file: "newsreader-400-italic.woff", weight: 400, style: "italic" },
] as const;

async function load(): Promise<LoadedFont[]> {
  const dir = path.join(process.cwd(), "assets", "fonts");
  return Promise.all(
    FACES.map(async (face) => {
      const buffer = await readFile(path.join(dir, face.file));
      return {
        name: OG_FONT.serif,
        // Slice out this file's own bytes from the shared pool.
        data: buffer.buffer.slice(
          buffer.byteOffset,
          buffer.byteOffset + buffer.byteLength,
        ) as ArrayBuffer,
        weight: face.weight,
        style: face.style,
      };
    }),
  );
}

let cached: Promise<LoadedFont[]> | null = null;

/** Read once per process; a build renders one image per route. */
export function ogFonts(): Promise<LoadedFont[]> {
  cached ??= load();
  return cached;
}
