// Mirrors the `basePath` in next.config.ts. next/link and next/image apply
// the configured basePath to their `href`/`src` automatically, but plain
// <video> tags (and any other raw root-relative URL) don't — use this to
// prefix those manually so they still resolve under a GitHub Pages subpath.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}
