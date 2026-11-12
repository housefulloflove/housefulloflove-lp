import Link from "next/link";

// Replaces Next's default 404, which ships a dark-mode media query.
// Words and design by Claude at Naman's request (2026-11-12, launch board:
// "Make a funky 404 page that matches our ethos."). Typography only.
export default function NotFound() {
  return (
    <div className="nf">
      <p className="nf-code">
        <span>4</span>
        <span className="nf-zero">0</span>
        <span>4</span>
      </p>
      <h1>This room is empty.</h1>
      <p>The rest of the house is full. Nobody loses here, so pick a door.</p>
      <ul className="nf-doors">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/core">The Core</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
}
