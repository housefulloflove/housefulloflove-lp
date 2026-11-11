import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og/card";
import { location, site } from "@/lib/site";

export const alt = `Business info — ${site.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Business info",
    title: site.name,
    description: `Sole proprietorship of Naman Hajela, registered in ${location}.`,
  });
}
