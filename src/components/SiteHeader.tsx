"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Header/nav text should read bigger than body copy. The clamp()s' vw term
// is negligible on phone widths, so below `sm` each floors out — bump those
// floors here so nav text stays clearly bigger than the (unboosted) body
// text at every width, not just on wider screens where the vw term kicks in.
const nameClass =
  "font-display text-white text-[2rem] sm:text-[clamp(1rem,3vw,2.25rem)] tracking-tight";
const aboutClass =
  "font-display text-white text-[1.75rem] sm:text-[clamp(0.875rem,2.5vw,1.75rem)] tracking-tight";

export function SiteHeader() {
  const pathname = usePathname();
  const isAbout = pathname === "/about";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-4 px-8">
      <Link href="/" className={nameClass}>
        Sofía Loose Martínez de Castro
      </Link>

      {isAbout ? (
        <span className={aboutClass}>About</span>
      ) : (
        <Link href="/about" className={aboutClass}>
          About
        </Link>
      )}
    </header>
  );
}
