"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GallerySlider, { Slide } from "@/components/GallerySlider";
import { useProjectToggle } from "@/components/ProjectNav";

const SLIDES: Slide[] = [
  { src: "/images/tbmat_1.webp", alt: "The Best Mirrors Are Those 1" },
  { src: "/images/tbmat_2.webp", alt: "The Best Mirrors Are Those 2" },
  { src: "/images/tbmat_3.webp", alt: "The Best Mirrors Are Those 3" },
  { src: "/images/tbmat_4.webp", alt: "The Best Mirrors Are Those 4" },
];

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
const fadeTransition = { duration: 0.4 };

export default function TheBestMirrorsAreThose() {
  const [revealed, setRevealed] = useState(false);
  useProjectToggle(useCallback(() => setRevealed((r) => !r), []));

  return (
    <>
      <GallerySlider slides={SLIDES} />

      <AnimatePresence>
        {revealed && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            {...fade}
            transition={fadeTransition}
            onClick={() => setRevealed(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {revealed && (
          <motion.div
            className="fixed top-40 bottom-16 left-0 right-0 z-50 flex items-center justify-center overflow-y-auto px-[8vw] py-8 pointer-events-none"
            {...fade}
            transition={fadeTransition}
          >
            <div
              className="pointer-events-auto text-left font-display text-white text-[1.75rem] sm:text-[clamp(0.875rem,1.32vw,1.5rem)] leading-relaxed space-y-6 max-w-4xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <p>
                Performance/Installation that I presented at Mahalla during
                Berlin Art Week 2023.
              </p>
              <p>
                The work explored the idea of mirrors and masks through
                different perspectives, always in relation to a fundamental
                concept: that there exists a kind of universal collective
                consciousness, one that communicates through logics other
                than the rational.
              </p>
              <p>
                This culminated in a dreamlike narrative, rich in symbolism
                signified by and significant to the group of people who
                performed it.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
