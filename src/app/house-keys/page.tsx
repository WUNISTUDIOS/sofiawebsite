"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GallerySlider, { Slide } from "@/components/GallerySlider";
import { useProjectToggle } from "@/components/ProjectNav";

const SLIDES: Slide[] = [{ src: "/video/vertical.webm", alt: "House Keys", type: "video" }];

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
const fadeTransition = { duration: 0.4 };

export default function HouseKeys() {
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
              className="pointer-events-auto text-left font-display text-white text-[clamp(0.875rem,1.32vw,1.5rem)] leading-relaxed space-y-6 max-w-4xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <p>
                I lost my house keys, so I built myself a body. This piece
                emerged as a collaboration with Linda Herrmann for
                UdK&rsquo;s &ldquo;room to expand&rdquo; series.
              </p>
              <p>
                With a track composed of our voices, a mix of sounds from the
                Internet, and some overlaid songs by different musicians, our
                collaboration took the form of a small staging that narrated
                the stories we found while exploring our bodies through our
                notions of home&mdash;and vice versa. Our stories and
                narratives, so different, yet always mirroring each other.
              </p>
              <p>
                I worked on a mask that echoed the idea of who Linda was for
                me, with its expression strongly centered on the feelings
                conveyed in the excerpt she wrote for this piece. I crafted
                the costume&mdash;the torso&mdash;as a sort of architectural
                armor that holds childhood memories of the house where I grew
                up.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
