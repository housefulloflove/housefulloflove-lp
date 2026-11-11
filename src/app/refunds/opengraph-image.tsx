import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og/card";
import { site } from "@/lib/site";

export const alt = `Refunds — ${site.name}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Refunds",
    title: "Refunds",
    description:
      "Cancellations and refunds at House Full Of Love, and each venture's refund policy.",
  });
}
