"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollStack from "@/components/ScrollStack";
import { withBasePath } from "@/lib/basePath";
import { useIsMobile } from "@/lib/useIsMobile";

const IMAGES = [
  { src: "/images/43_DSC02606_1.webp", alt: "Descent", href: "/descent" },
  {
    src: "/images/AcidLakeHome.webp",
    alt: "Two figures in white beneath a tree",
    href: "/acid-lake",
  },
  {
    src: "/images/5_DSC_7641_1_1.webp",
    alt: "Two Devils One Flower",
    href: "/two-devils-one-flower",
  },
  {
    src: "/images/33_IMG_9459_1.webp",
    alt: "The Best Mirrors Are Those",
    href: "/the-best-mirrors-are-those",
  },
  { src: "/images/Boheme/DSC_8456.webp", alt: "La Boheme", href: "/boheme" },
  { src: "/images/housekeys/DSC00649.webp", alt: "House Keys", href: "/house-keys" },
];

// Each thumbnail keeps a fixed width (vs. dividing evenly by count), so
// adding more projects doesn't keep squeezing them narrower — instead, only
// VISIBLE_COUNT are ever on screen at once (100vw / THUMB_VW), and the < >
// buttons page through the rest by shifting the strip one thumbnail at a
// time. `offset` is how many thumbnails have been scrolled past; it's
// clamped so you can't page past either end.
const THUMB_VW = 25;
const VISIBLE_COUNT = Math.floor(100 / THUMB_VW);
const MAX_OFFSET = Math.max(0, IMAGES.length - VISIBLE_COUNT);

function HomeNav({ offset }: { offset: number }) {
  return (
    <div className="h-full w-full overflow-hidden bg-black">
      <motion.div
        className="flex h-full"
        animate={{ x: `-${offset * THUMB_VW}vw` }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        {IMAGES.map((img) => (
          <Link
            key={img.href}
            href={img.href}
            className="relative block h-full shrink-0"
            style={{ width: `${THUMB_VW}vw` }}
          >
            <Image
              src={withBasePath(img.src)}
              alt={img.alt}
              fill
              className="object-cover brightness-[0.8]"
              // All 6 are eagerly loaded (not just the first) — otherwise a
              // thumbnail past the initial 4 only starts fetching the moment
              // the < > buttons scroll it into view, popping in mid-slide
              // instead of sliding in smoothly already loaded.
              priority
              sizes={`${THUMB_VW}vw`}
            />
          </Link>
        ))}
      </motion.div>
    </div>
  );
}

function HomeVideo() {
  return (
    <video
      src={withBasePath("/video/hookuppostapocaliptico%20final.webm")}
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
    />
  );
}

export default function Home() {
  const [offset, setOffset] = useState(0);
  // ScrollStack's paging (below) only responds to wheel events, which touch
  // scrolling doesn't fire — on mobile there was no way to ever reach the
  // video section. Stack both sections in normal scrollable page flow there
  // instead, same as GallerySlider already does on mobile.
  const isMobile = useIsMobile();

  return (
    <>
      <button
        onClick={() => setOffset((o) => Math.max(0, o - 1))}
        disabled={offset === 0}
        aria-label="Previous"
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 text-white disabled:opacity-30"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 6 L9 12 L15 18"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={() => setOffset((o) => Math.min(MAX_OFFSET, o + 1))}
        disabled={offset === MAX_OFFSET}
        aria-label="Next"
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50 text-white disabled:opacity-30"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6 L15 12 L9 18"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isMobile ? (
        <div className="bg-black">
          <div className="h-screen">
            <HomeNav offset={offset} />
          </div>
          <div className="h-screen">
            <HomeVideo />
          </div>
        </div>
      ) : (
        <ScrollStack slides={[<HomeNav key="nav" offset={offset} />, <HomeVideo key="video" />]} />
      )}
    </>
  );
}
