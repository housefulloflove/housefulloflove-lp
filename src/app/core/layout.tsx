// Long-form reading scale (see `.prose` in globals.css).
export default function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="prose">{children}</div>;
}
