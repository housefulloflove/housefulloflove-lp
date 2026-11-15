import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const www = [{ type: "host" as const, value: "www.housefulloflove.com" }];

const nextConfig: NextConfig = {
  // Let .mdx files act as pages so /fundamentals and the blog post stay plain markdown.
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Pin the workspace root so a stray lockfile in the home directory does not
  // make Next infer the wrong one.
  turbopack: {
    root: __dirname,
  },
  // housefulloflove.com (no www) is canonical; www 308s to it.
  async redirects() {
    return [
      // The Core was renamed Fundamentals (15 Nov 2026); old links and the
      // old sites' redirects still arrive at /core.
      { source: "/core", destination: "/fundamentals", permanent: true },
      { source: "/core.md", destination: "/fundamentals.md", permanent: true },
      // Next drops the slash on the bare root, so spell it out.
      {
        source: "/",
        has: www,
        destination: "https://housefulloflove.com/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: www,
        destination: "https://housefulloflove.com/:path*",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
