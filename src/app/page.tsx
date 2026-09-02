"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollStack from "@/components/ScrollStack";
import { withBasePath } from "@/lib/basePath";
import { useIsMobile } from "@/lib/useIsMobile";

const IMAGES = [
  {
    src: "/images/Boheme/DSC_8456.webp",
    alt: "La Boheme",
    href: "/boheme",
    title: "La Boheme",
  },
  {
    src: "/images/housekeys/DSC00649.webp",
    alt: "House Keys",
    href: "/house-keys",
    title: "House Keys",
  },
  { src: "/images/43_DSC02606_1.webp", alt: "Descent", href: "/descent", title: "Descent" },
  {
    src: "/images/AcidLakeHome.webp",
    alt: "Two figures in white beneath a tree",
    href: "/acid-lake",
    title: "El Diablo",
  },
  {
    src: "/images/5_DSC_7641_1_1.webp",
    alt: "Two Devils One Flower",
    href: "/two-devils-one-flower",
    title: "Two Devils One Flower",
  },
  {
    src: "/images/33_IMG_9459_1.webp",
    alt: "The Best Mirrors Are Those",
    href: "/the-best-mirrors-are-those",
    title: "The Best Mirrors Are Those",
  },
];

// Each thumbnail keeps a fixed width (vs. dividing evenly by count), so
// adding more projects doesn't keep squeezing them narrower — instead, only
// VISIBLE_COUNT are ever on screen at once (100vw / THUMB_VW), and the < >
// buttons page through the rest by shifting the strip one thumbnail at a
// time.
const THUMB_VW = 25;
const N = IMAGES.length;

// The strip loops: rather than clamping `step` (which would force the x
// animation to jump backward at the ends) or wrapping it with a modulo
// (same jump, just at a different point), IMAGES is tiled several times and
// `step` is left free to grow in whichever direction is being clicked — the
// strip always keeps moving the way you're pressing. Once `step` drifts a
// full loop (N) away from center, it's snapped back by exactly N with the
// transition disabled for that one update; since the tiled content repeats
// every N thumbnails, the frame before and after the snap is pixel-identical,
// so the reset is invisible and motion never visibly reverses.
const TILES = 5;
const CENTER = Math.floor(TILES / 2) * N;
const TILED_IMAGES = Array.from({ length: TILES }, () => IMAGES).flat();

function HomeNav({
  step,
  instant,
  onSwipe,
}: {
  step: number;
  instant: boolean;
  onSwipe: (dir: 1 | -1) => void;
}) {
  return (
    <div className="h-full w-full overflow-hidden bg-black">
      <motion.div
        className="flex h-full"
        animate={{ x: `-${(CENTER + step) * THUMB_VW}vw` }}
        transition={instant ? { duration: 0 } : { duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDragEnd={(_, info) => {
          const THRESHOLD = 40;
          if (info.offset.x < -THRESHOLD) onSwipe(1);
          else if (info.offset.x > THRESHOLD) onSwipe(-1);
        }}
      >
        {TILED_IMAGES.map((img, i) => (
          <Link
            key={`${img.href}-${i}`}
            href={img.href}
            className="relative block h-full shrink-0"
            style={{ width: `${THUMB_VW}vw` }}
          >
            <Image
              src={withBasePath(img.src)}
              alt={img.alt}
              fill
              className="object-cover brightness-[0.8]"
              // All copies within one loop's reach are eagerly loaded —
              // otherwise a thumbnail scrolled into view mid-slide pops in
              // instead of already being loaded.
              priority
              sizes={`${THUMB_VW}vw`}
            />
            {/* Lives inside the same Link as its thumbnail, so it's carried
                along by the strip's animation and never drifts from its own
                image — including mid-slide when the < > buttons fire. The
                gradient runs all the way to the image's true bottom edge;
                only the text itself sits higher (pb-16), clear of the fixed
                footer. */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent pt-16 pb-16 px-3">
              <span className="font-display text-white text-[clamp(0.7rem,1.4vw,1.1rem)] tracking-tight">
                {img.title}
              </span>
            </div>
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
  // ScrollStack's paging (below) only responds to wheel events, which touch
  // scrolling doesn't fire — on mobile there was no way to ever reach the
  // video section. Stack both sections in normal scrollable page flow there
  // instead, same as GallerySlider already does on mobile.
  const isMobile = useIsMobile();

  const [step, setStep] = useState(0);
  const [instant, setInstant] = useState(false);
  const recenterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The < > arrows only apply to the thumbnail strip, so they're hidden once
  // the video is in view — desktop learns this from ScrollStack's slide
  // index, mobile (stacked in normal scroll flow) from scroll position.
  const [onNav, setOnNav] = useState(true);
  const handleSlideChange = useCallback((index: number) => setOnNav(index === 0), []);

  useEffect(() => {
    if (!isMobile) return;
    const handleScroll = () => setOnNav(window.scrollY < window.innerHeight / 2);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const go = useCallback((dir: 1 | -1) => {
    if (recenterTimer.current) clearTimeout(recenterTimer.current);
    setInstant(false);
    setStep((s) => s + dir);
  }, []);

  // Once the strip has drifted a full loop from center, snap it back by one
  // loop right after the click's own animation finishes — invisibly, since
  // the tiled content repeats every N thumbnails.
  useEffect(() => {
    if (Math.abs(step) < N) return;
    recenterTimer.current = setTimeout(() => {
      setInstant(true);
      setStep((s) => s - Math.sign(s) * N);
    }, 800);
    return () => {
      if (recenterTimer.current) clearTimeout(recenterTimer.current);
    };
  }, [step]);

  return (
    <>
      {onNav && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="fixed left-4 top-1/2 -translate-y-1/2 z-50 text-white"
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
            onClick={() => go(1)}
            aria-label="Next"
            className="fixed right-4 top-1/2 -translate-y-1/2 z-50 text-white"
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
        </>
      )}
      {isMobile ? (
        <div className="bg-black">
          <div className="h-screen">
            <HomeNav step={step} instant={instant} onSwipe={go} />
          </div>
          <div className="h-screen">
            <HomeVideo />
          </div>
        </div>
      ) : (
        <ScrollStack
          onSlideChange={handleSlideChange}
          slides={[
            <HomeNav key="nav" step={step} instant={instant} onSwipe={go} />,
            <HomeVideo key="video" />,
          ]}
        />
      )}
    </>
  );
}
