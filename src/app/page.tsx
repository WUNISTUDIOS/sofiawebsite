import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-4 px-8">
        <Link
          href="/about"
          className="font-display text-white text-[clamp(1rem,3vw,2.25rem)] tracking-tight"
        >
          Sofía Loose Martínez de Castro
        </Link>
      </header>
    </main>
  );
}
