"use client";

// Replaces Next's default error page, which ships a dark-mode media query.
export default function GlobalError() {
  return (
    <html lang="en">
      <body style={{ background: "#fdf3e7", color: "#1a1917", padding: 22 }}>
        <h1>Something went wrong.</h1>
      </body>
    </html>
  );
}
