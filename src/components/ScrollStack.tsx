"use client";

import { useState, useRef, useEffect, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Same wheel-driven, snap-to-slide mechanic as GallerySlider — accumulated
// deltaY against a threshold, one vertical slide transition at a time, with
// an animation lock — generalized to arbitrary slide content instead of
// just gallery images.

const variants = {
  enter: (dir: number) => ({ y: `${dir * 100}vh` }),
  center: { y: "0vh" },
  exit: (dir: number) => ({ y: `${dir * -100}vh` }),
};

const TRANSITION = { duration: 0.75, ease: [0.76, 0, 0.24, 1] as const };
const THRESHOLD = 50;
const LOCK_MS = 850;

export default function ScrollStack({ slides }: { slides: ReactNode[] }) {
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
          {slides[current]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
