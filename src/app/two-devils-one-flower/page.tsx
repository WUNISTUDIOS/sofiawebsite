"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GallerySlider, { Slide } from "@/components/GallerySlider";
import { useProjectToggle } from "@/components/ProjectNav";

const SLIDES: Slide[] = [
  { src: "/images/horizontal_opcion3-Recovered.webp", alt: "Two Devils One Flower 1" },
  { src: "/images/horizontal_opcion4-Recovered.webp", alt: "Two Devils One Flower 2" },
];

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
const fadeTransition = { duration: 0.4 };

export default function TwoDevilsOneFlower() {
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
              className="pointer-events-auto text-left font-display text-white text-[clamp(0.875rem,1.32vw,1.5rem)] leading-relaxed space-y-4 max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p>
                Masks for the photographic project &ldquo;Two Devils and a
                Flower&rdquo; of Cesarina Guerrero, a multidisciplinary artist
                from the Dominican Republic whose tender and truthful storytelling
                I deeply appreciate. The devils represent her and her brother. I
                took pictures of my masks and then played with different
                backgrounds for them with Photoshop. These were the results. The
                masks remained untouched in the editing.
              </p>
              <p>
                <a
                  href="https://ww.afroamericanafilms.com/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  About Cesarina Guerrero
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
