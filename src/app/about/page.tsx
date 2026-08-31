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
        <div className="mx-auto max-w-3xl space-y-6 text-left font-display text-white text-[clamp(0.875rem,1.32vw,1.5rem)] leading-relaxed">
          <p>
            I have dedicated a big part of my life to performative arts.
            Today I mostly do stage and costume, though I&rsquo;ve also
            directed, performed, written. I hold a degree in Theatre Studies
            and stage design. I&rsquo;m crafty, I build with my hands, I
            paint, I tattoo. I think of art as a sacred form of human ritual,
            and of rituals as inherently political.
          </p>
         <p>
            Creating with people I admire is my favorite way of experiencing
            power, this page is full of that. So, welcome {"<3"} please click
            yourself around.
          </p>
        </div>
      </div>
    </main>
  );
}
