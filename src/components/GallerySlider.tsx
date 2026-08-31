"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import { useIsMobile } from "@/lib/useIsMobile";

export interface Slide {
  src: string;
  alt: string;
  objectFit?: "cover" | "contain";
  type?: "image" | "video";
}

const variants = {
  enter: (dir: number) => ({ y: `${dir * 100}vh` }),
  center: { y: "0vh" },
  exit: (dir: number) => ({ y: `${dir * -100}vh` }),
};

const TRANSITION = { duration: 0.75, ease: [0.76, 0, 0.24, 1] as const };
const THRESHOLD = 50;
const LOCK_MS = 850;

export default function GallerySlider({ slides }: { slides: Slide[] }) {
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const currentRef = useRef(0);
  const isAnimating = useRef(false);
  const accumulated = useRef(0);

  const goNext = useCallback(() => {
    if (isAnimating.current || currentRef.current >= slides.length - 1) return;
    isAnimating.current = true;
    setDirection(1);
    currentRef.current += 1;
    setCurrent(currentRef.current);
    setTimeout(() => { isAnimating.current = false; }, LOCK_MS);
  }, [slides.length]);

  const goPrev = useCallback(() => {
    if (isAnimating.current || currentRef.current <= 0) return;
    isAnimating.current = true;
    setDirection(-1);
    currentRef.current -= 1;
    setCurrent(currentRef.current);
    setTimeout(() => { isAnimating.current = false; }, LOCK_MS);
  }, []);

  useEffect(() => {
    // Mobile renders every slide stacked in normal document flow (see
    // below) rather than one fixed full-screen slide at a time, so there's
    // no wheel-driven paging to intercept — let the page scroll normally.
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isAnimating.current) {
        accumulated.current = 0;
        return;
      }

      accumulated.current += e.deltaY;

      if (accumulated.current > THRESHOLD) {
        accumulated.current = 0;
        goNext();
      } else if (accumulated.current < -THRESHOLD) {
        accumulated.current = 0;
        goPrev();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [goNext, goPrev, isMobile]);

  if (isMobile) {
    // Mobile: every slide stacked in normal page flow, each sized to the
    // display's width with natural height — no cropping, no fixed
    // full-screen paging, just one long scrollable page.
    return (
      <div className="bg-black">
        {slides.map((slide, i) =>
          slide.type === "video" ? (
            <video
              key={slide.src}
              src={withBasePath(slide.src)}
              className="block w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              key={slide.src}
              src={withBasePath(slide.src)}
              alt={slide.alt}
              className="block w-full h-auto"
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          )
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={TRANSITION}
          className="absolute inset-0"
        >
          {slides[current].type === "video" ? (
            <video
              src={withBasePath(slides[current].src)}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (slides[current].objectFit ?? "cover") === "contain" ? (
            <>
              <Image
                src={withBasePath(slides[current].src)}
                alt=""
                fill
                aria-hidden
                className="object-cover scale-110 blur-3xl brightness-50"
                sizes="100vw"
              />
              <Image
                src={withBasePath(slides[current].src)}
                alt={slides[current].alt}
                fill
                className="object-contain"
                priority={current === 0}
                sizes="100vw"
              />
            </>
          ) : (
            <Image
              src={withBasePath(slides[current].src)}
              alt={slides[current].alt}
              fill
              className="object-cover"
              priority={current === 0}
              sizes="100vw"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 right-8 z-10 font-display text-white/50 text-sm tabular-nums select-none">
        {current + 1} / {slides.length}
      </div>
    </div>
  );
}
