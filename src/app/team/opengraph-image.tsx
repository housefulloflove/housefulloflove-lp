import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og/card";
import { site } from "@/lib/site";

export const alt = `Team — ${site.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Team",
    title: "Team",
    description: "The people who run House Full Of Love.",
  });
}
