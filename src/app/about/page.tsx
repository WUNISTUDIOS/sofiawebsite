import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <main className="h-screen bg-black overflow-hidden relative">
      <header className="relative z-20 flex items-center justify-center py-4 px-8">
        <Link
          href="/"
          className="font-display text-white text-[clamp(1rem,3vw,2.25rem)] tracking-tight"
        >
          Sofía Loose Martínez de Castro
        </Link>
      </header>

      <div className="absolute inset-0 z-0">
        <Image
          src="/images/IMG_0532.webp"
          alt="Sofía Loose Martínez de Castro"
          fill
          className="object-cover"
          priority
        />
      </div>
    </main>
  );
}
