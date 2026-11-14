import { NextBand, next } from "@/components/next-band";

// Long-form reading scale (see `.prose` in globals.css), then the hand-off.
export default function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="prose">
      {children}
      <NextBand panels={[next.blog, next.team]} />
    </div>
  );
}
