"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface Slide {
  src: string;
  alt: string;
  objectFit?: "cover" | "contain";
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
  }, [goNext, goPrev]);

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
          {(slides[current].objectFit ?? "cover") === "contain" ? (
            <>
              <Image
                src={slides[current].src}
                alt=""
                fill
                aria-hidden
                className="object-cover scale-110 blur-3xl brightness-50"
                sizes="100vw"
              />
              <Image
                src={slides[current].src}
                alt={slides[current].alt}
                fill
                className="object-contain"
                priority={current === 0}
                sizes="100vw"
              />
            </>
          ) : (
            <Image
              src={slides[current].src}
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
