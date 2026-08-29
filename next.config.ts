import type { NextConfig } from "next";

// Set by the GitHub Actions workflow so the site works at the default
// project-pages subpath (wunistudios.github.io/sofiawebsite/). Leave unset
// (e.g. for local dev, or once a custom domain is wired up) to serve from
// the root instead.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages — no Node server available at runtime.
  output: "export",
  // GH Pages has no server-side routing, so every route needs its own
  // index.html directory (e.g. /about/index.html instead of about.html).
  trailingSlash: true,
  basePath,
  images: {
    // No image-optimization server on static hosting — serve files as-is.
    unoptimized: true,
  },
};

export default nextConfig;
