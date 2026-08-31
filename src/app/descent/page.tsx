"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GallerySlider, { Slide } from "@/components/GallerySlider";
import { useProjectToggle } from "@/components/ProjectNav";

const SLIDES: Slide[] = [
  { src: "/images/38_DSC02518_1.webp", alt: "DSC02518" },
  { src: "/images/42_DSC02594-Avec_accentuation-Bruit_1.webp", alt: "DSC02594" },
  { src: "/images/46_DSC02634_1.webp", alt: "DSC02634" },
  { src: "/images/48_edit_1.webp", alt: "edit" },
  { src: "/images/47_DSC02661-Avec_accentuation-Bruit_1.webp", alt: "DSC02661" },
];

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
const fadeTransition = { duration: 0.4 };

export default function Descent() {
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
                I designed and crafted the set and the antlers headpiece for
                &ldquo;Descent,&rdquo; a ritual performance on grief directed by
                Riley Davidson, which offers a contemporary interpretation of the
                Sumerian myth of Inanna&rsquo;s descent into the underworld, in
                which the goddess Inanna travels to the realm of the
                dead&mdash;ruled by the sister Ereshkigal&mdash;to expand in
                power. At seven gates, the divine powers are stripped away;
                Inanna is killed and hung up as a corpse.
              </p>
              <p>
                The anger, grief, loss, and power of the Sumerian myth were
                translated into our present.
              </p>
              <p>
                Inanna adores wine, so we placed glasses as offerings on the
                different sand altars, which symbolized the different gates
                where Inanna must surrender one power. For the days of the
                performance, they were of course filled with wine.
              </p>
              <p>
                In Riley&rsquo;s adaptation of the myth, Inanna is not rescued and
                brought back to life, but rather buried. We thought of the
                underworld as a dry, dark, otherworldly space, so we worked with
                sand to help set the burial scene and create a dusty landscape.
                Special objects I had found and collected from the streets were
                suspended or lying on the floor. Guts were everywhere,
                heightening the viscerality of grief and alluding to the
                rotting, hanging corpse of Inanna.
              </p>
              <p>
                <a
                  href="https://www.playfulmag.com/post/descent-at-ho%C5%A1ek-contemporary-ritual-grief-in-the-age-of-scrolling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  Link to Playful Mag article on the piece
                </a>
              </p>
              <p>
                <a
                  href="https://www.siegessaeule.de/magazin/descent-ein-ritueller-abstieg-in-menschliche-abgruende/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  Link to Siegels&auml;ule&rsquo;s article on the piece
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
