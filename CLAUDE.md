# Sofia Website — Claude Context

## Project
Portfolio website for **Sofía Loose Martínez de Castro** (@rustcakes), a multidisciplinary artist (photography, set design, performance art, illustration).

**Stack:** Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · App Router

---

## Figma Source
- **File key:** `y13NJsxqZoKRsowbXgexQ6` (file name: "Sofia")
- **Figma token:** regenerate at figma.com → Settings → Security → Personal access tokens (expires each session)
- **API pattern:** `curl -H "X-Figma-Token: <token>" "https://api.figma.com/v1/files/<key>/nodes?ids=<node-id>"`
- **Image fills:** fetch URLs from `/v1/files/<key>/images` — returns imageRef → S3 URL map

## Design Tokens (Tailwind v4 — defined in `src/app/globals.css`)
| Token | Value | Usage |
|-------|-------|-------|
| `near-black` | `#191919` | Nav bar background |
| `charcoal` | `#303030` | Dark sections |
| `sage` | `#b3cac5` | Secondary accent |
| `pink` | `#ff3366` | Available but NOT used on nav links — all links stay white |
| `font-display` | Instrument Serif 400 | All text: headings, body, gallery counter, nav |
| `font-sans` | Inter 400/600/700 | Available but currently unused |

## Routes
| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Minimal placeholder ("coming soon") |
| `/about` | `src/app/about/page.tsx` | Full-bleed photo (`IMG_0532.webp`) + name header |
| `/descent` | `src/app/descent/page.tsx` | 5-slide gallery + click-to-reveal text overlay |
| `/two-devils-one-flower` | `src/app/two-devils-one-flower/page.tsx` | 4-slide gallery + click-to-reveal text overlay |

## Key Components

### `src/components/GallerySlider.tsx`
Accepts `slides: { src: string; alt: string }[]` as prop. Intercepts `wheel` events (passive: false), accumulates `deltaY` against 50px threshold, Framer Motion vertical slide between images. Animation lock 850ms. Slide counter bottom-right in `font-display`.

### `src/components/ProjectNav.tsx`
Persistent bottom nav, lives in `layout.tsx`. Exports:
- `ProjectNavProvider` — wraps `<body>`, holds ref to current page's toggle fn
- `useProjectToggle(fn)` — hook project pages call on mount to register their overlay toggle
- `ProjectNav({ projects })` — renders project labels fixed at bottom; active page → button (fires toggle); other pages → Link (navigates)

**Adding a new project page:** add one entry to `PROJECTS` in `src/app/layout.tsx`, create the page using the pattern below.

### Project page pattern
Every project page (`/descent`, `/two-devils-one-flower`, etc.) follows this structure:
```tsx
"use client"
// 1. useState(revealed)
// 2. useProjectToggle(useCallback(() => setRevealed(r => !r), []))
// 3. Fixed header: name → /about
// 4. <GallerySlider slides={SLIDES} />
// 5. AnimatePresence overlay: bg-black/40 z-40, onClick dismiss
// 6. AnimatePresence text panel: fixed top-16 bottom-16, overflow-y-auto z-50
//    Text: font-display, clamp(0.875rem,1.32vw,1.5rem), text-center, white
//    stopPropagation on text div
```

## Images
- **55 WebP images** in `public/images/`, converted with `cwebp -q 70`
- Descent slides (5): `38_DSC02518_1.webp`, `42_DSC02594-Avec_accentuation-Bruit_1.webp`, `46_DSC02634_1.webp`, `48_edit_1.webp`, `47_DSC02661-Avec_accentuation-Bruit_1.webp`
- Two Devils slides (4): `tdof_1.webp` – `tdof_4.webp` (Figma frames 49:264/357/442/526)
- About page: `IMG_0532.webp` (source: `/Users/cgimac/Documents/clientwork/sofiaWebsite/WEBPAGE/aboutMe/`)
- ~44 remaining images available for future project pages

## Preferences
- **Tailwind only** — all styling via Tailwind utility classes; `globals.css` contains only the Tailwind import and `@theme` token definitions — no hand-written CSS
- **No Python** — use `node -e` for any terminal scripting/JSON parsing
- **Images → WebP** — always convert with `cwebp -q 70` before adding to `public/images/`; never commit raw Figma exports
- **No dev server commands** — user runs `npm run dev` themselves
- **No footer** — the `ProjectNav` at the bottom IS the only persistent footer; no separate site footer
- **Instrument Serif everywhere** — all text uses `font-display`; no hover color on any nav/project links

## What's Not Built Yet
- Home page (`/`) content — currently a placeholder
- About page content beyond the photo
- Mobile touch/swipe support on galleries
- Keyboard arrow navigation for galleries
- More project pages (Figma has: Devil Tarot, illustrations, photography series, and more)

## Dev
```bash
npm run dev      # start dev server (user does this themselves)
npm run build    # production build
npx tsc --noEmit # type check
```
