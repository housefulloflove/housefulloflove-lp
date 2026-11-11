import Link from "next/link";

// Replaces Next's default 404, which ships a dark-mode media query.
export default function NotFound() {
  return (
    <>
      <h1>Not found</h1>
      <p>
        <Link href="/">House Full Of Love</Link>
      </p>
    </>
  );
}
