"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
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
            className="fixed top-16 bottom-16 left-0 right-0 z-50 overflow-y-auto px-[8vw] py-8 pointer-events-none"
            {...fade}
            transition={fadeTransition}
          >
            <div
              className="pointer-events-auto text-center font-display text-white text-[clamp(0.875rem,1.32vw,1.5rem)] leading-relaxed space-y-6 max-w-4xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <p>
                I designed and crafted the set and the antlers headpiece for
                &ldquo;Descent,&rdquo; a ritual performance on grief directed by
                Riley Davidson, which offers a contemporary interpretation of the
                Sumerian myth of Inanna&rsquo;s descent into the underworld, in
                which the goddess Inanna travels to the realm of the
                dead&mdash;ruled by her sister Ereshkigal&mdash;to expand her
                power. At seven gates, her divine powers are stripped from her;
                she is killed and hung up as a corpse.
              </p>
              <p>
                The anger, grief, loss, and power of the Sumerian myth are
                translated into our present, into a global political situation in
                which we are losing our rights, our very humanity, and can witness
                this unfold directly on our screens.
              </p>
              <p>
                We wanted to create a ritual space for anger and loss, but also for
                shame and guilt; a cocoon of grief, because if we are not able to
                make room for it, we will not be able to keep on fighting. The
                stage was conceived as an intimate and comfortable space. There
                were carpets and cushions, to be able to hold each other close
                during the intensity of the ritual performance full of grief,
                anger, shame and rage.
              </p>
              <p>
                I hung branches from the ceiling because I wanted to visualize the
                descent into the underworld, so that some remains of the upper
                world would be suspended there. Inanna adores wine, so we placed
                them as offerings on the different sand altars, which symbolized
                the different gates where Inanna must surrender one of her powers.
                For the days of the performance, they were of course filled with
                wine. Guts were everywhere, serving to heighten the viscerality of
                grief and alluding to the rotting, hanging corpse of Inanna.
              </p>
              <p>
                In Riley&rsquo;s adaptation of the myth, Inanna is not rescued and
                brought back to life, but rather buried. We imagine the underworld
                as a dry, dark, otherworldly space, so we decided to work with
                sand to help set the burial scene and create a dusty landscape. Odd
                objects I had found and collected from the streets were suspended or
                laying on the floor.
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
