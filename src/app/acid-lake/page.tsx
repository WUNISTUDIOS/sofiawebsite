"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import GallerySlider, { Slide } from "@/components/GallerySlider";
import { useProjectToggle } from "@/components/ProjectNav";

const SLIDES: Slide[] = [
  { src: "/images/acid_1.webp", alt: "Acid Lake 1" },
  { src: "/images/acid_2.webp", alt: "Acid Lake 2" },
  { src: "/images/acid_3.webp", alt: "Acid Lake 3" },
  { src: "/images/acid_4.webp", alt: "Acid Lake 4" },
];

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
const fadeTransition = { duration: 0.4 };

export default function AcidLake() {
  const [revealed, setRevealed] = useState(false);
  useProjectToggle(useCallback(() => setRevealed((r) => !r), []));

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-4 px-8">
        <Link
          href="/about"
          className="font-display text-white text-[clamp(1rem,3vw,2.25rem)] tracking-tight"
        >
          Sofía Loose Martínez de Castro
        </Link>
      </header>

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
            className="fixed top-16 bottom-16 left-0 right-0 z-50 flex items-center justify-center overflow-y-auto px-[8vw] py-8 pointer-events-none"
            {...fade}
            transition={fadeTransition}
          >
            <div
              className="pointer-events-auto text-center font-display text-white text-[clamp(0.875rem,1.32vw,1.5rem)] leading-relaxed space-y-6 max-w-4xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <p>
                This artwork rises as a collective interpretation of The Devil
                tarot card, drawing inspiration primarily from the Marseille and
                J. White decks. Reflecting the inherent energy of transition
                embodied by this card, the piece reveals multiple facets and is
                in a state of constant transformation. The work aims to encounter
                the power of transformation found in the very spots where
                dualities such as desire and addiction, kink and perversion,
                animal and human and good or bad converge and blur. It invites
                viewers to engage with and reflect upon these complex
                intersections.
              </p>
              <p>
                When not in performance, the two chained figures were replaced by
                two VR headsets — each fitted with small latex horns mirroring
                those of the creatures. Visitors could put them on and enter a
                360° video filmed in the woods, blurring the lines between
                reality and virtuality, between the physical presence of the
                artwork and an immersive elsewhere. The headsets themselves
                became part of the piece, extending its logic into a space where
                it was no longer clear where the performance ended and the
                digital world began, chaining the spectators into performers, as
                part of the artwork themselves.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
