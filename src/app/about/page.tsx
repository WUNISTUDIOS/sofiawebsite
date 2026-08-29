import Image from "next/image";
import { withBasePath } from "@/lib/basePath";

export default function About() {
  return (
    <main className="h-screen bg-black overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <Image
          src={withBasePath("/images/IMG_0532.webp")}
          alt="Sofía Loose Martínez de Castro"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 z-10 bg-black/50" />

      <div className="absolute inset-0 z-20 flex items-center justify-center overflow-y-auto px-[8vw] py-24">
        <div className="mx-auto max-w-3xl space-y-6 text-center font-display text-white text-[clamp(0.875rem,1.32vw,1.5rem)] leading-relaxed">
          <p>
            This webpage is coming out right after the first solar eclipse in
            Leo of 2026, in the month of my 30th birthday. And I would like to
            share with you how much of an achievement this was. Those who know
            me will know how hard it is to keep all the things I do
            documented and especially well organized, hehe. Big hug coming to
            all my ADHD buddies! But yea, the organization was a challenge —
            ask Denzel Arthur, the big talent behind this cool ass website,
            who patiently walked me through this! Bless you, Denzel, I will
            be forever grateful for this page.
          </p>
          <p>
            Anyways, I&rsquo;m super excited to show some of my work with you
            here — click yourself around. But yea, about me&hellip; I do
            stage and costume, I tattoo, I edit, I write? Sometimes I direct.
            I have been dedicating a big part of my life to performative
            arts. I am crafty, love building with my hands.
          </p>
        </div>
      </div>
    </main>
  );
}
