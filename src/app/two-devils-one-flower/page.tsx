"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectToggle } from "@/components/ProjectNav";

const IMAGES = [
  { src: "/images/tdof_2.webp", alt: "Two Devils One Flower 2" },
  { src: "/images/tdof_4.webp", alt: "Two Devils One Flower 4" },
  { src: "/images/tdof_3.webp", alt: "Two Devils One Flower 3" },
];

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
const fadeTransition = { duration: 0.4 };

export default function TwoDevilsOneFlower() {
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

      <div className="fixed inset-0 flex bg-black">
        {IMAGES.map((img, i) => (
          <div key={i} className="relative flex-1 h-full">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="33vw"
            />
          </div>
        ))}
      </div>

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
            className="fixed top-16 bottom-16 left-0 right-0 z-50 flex items-center justify-center px-[8vw] pointer-events-none"
            {...fade}
            transition={fadeTransition}
          >
            <div
              className="pointer-events-auto text-center font-display text-white text-[clamp(0.875rem,1.32vw,1.5rem)] leading-relaxed space-y-4 max-w-3xl"
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
