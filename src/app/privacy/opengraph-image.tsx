import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og/card";
import { site } from "@/lib/site";

export const alt = `Privacy — ${site.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Privacy",
    title: "Privacy",
    description:
      "What housefulloflove.com collects, and where to find the privacy page of each venture.",
  });
}
