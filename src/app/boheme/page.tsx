"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GallerySlider, { Slide } from "@/components/GallerySlider";
import { useProjectToggle } from "@/components/ProjectNav";

const SLIDES: Slide[] = [
  { src: "/images/Boheme/DSC_8420.webp", alt: "Boheme 1" },
  { src: "/images/Boheme/DSC_8421.webp", alt: "Boheme 2" },
  { src: "/images/Boheme/DSC_8431.webp", alt: "Boheme 3" },
  { src: "/images/Boheme/DSC_8456.webp", alt: "Boheme 4" },
  { src: "/images/Boheme/DSC_8484.webp", alt: "Boheme 5" },
  { src: "/images/Boheme/DSC_8574.webp", alt: "Boheme 6" },
  { src: "/images/Boheme/DSC_8588.webp", alt: "Boheme 7" },
  { src: "/images/Boheme/DSC_8599.webp", alt: "Boheme 8" },
  { src: "/images/Boheme/DSC_8617.webp", alt: "Boheme 9" },
  { src: "/images/Boheme/DSC_8640.webp", alt: "Boheme 10" },
  { src: "/images/Boheme/DSC_8647.webp", alt: "Boheme 11" },
  { src: "/images/Boheme/DSC_8651.webp", alt: "Boheme 12" },
  { src: "/images/Boheme/DSC_8659.webp", alt: "Boheme 13" },
  { src: "/images/Boheme/DSC_8666.webp", alt: "Boheme 14" },
];

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
const fadeTransition = { duration: 0.4 };

export default function Boheme() {
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
                During the COVID-19 pandemic, a group of female artists from
                various countries participating in an international artist
                residency face increasingly strict lockdown measures.
              </p>
              <p>
                Isolation, uncertainty, and differing social circumstances
                transform their relationships and put their notions of
                freedom, responsibility, and solidarity to the test.
              </p>
              <p>
                In Jun Tao Je&rsquo;s production, Puccini&rsquo;s La Bohème
                becomes a contemporary narrative about closeness and
                distance, memory, and loss. After the third act, the story
                branches out into various possible endings and raises the
                question of what future remains for the characters.
              </p>
              <p>I designed the stage and the costumes.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
