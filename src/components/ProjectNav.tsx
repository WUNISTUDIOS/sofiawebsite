"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ToggleCtxValue {
  register: (fn: () => void) => void;
  unregister: () => void;
  fire: () => void;
}

const ToggleCtx = createContext<ToggleCtxValue>({
  register: () => {},
  unregister: () => {},
  fire: () => {},
});

export function ProjectNavProvider({ children }: { children: React.ReactNode }) {
  const toggleRef = useRef<(() => void) | null>(null);
  const value = useMemo<ToggleCtxValue>(
    () => ({
      register: (fn) => { toggleRef.current = fn; },
      unregister: () => { toggleRef.current = null; },
      fire: () => { toggleRef.current?.(); },
    }),
    []
  );
  return <ToggleCtx.Provider value={value}>{children}</ToggleCtx.Provider>;
}

export function useProjectToggle(fn: () => void) {
  const { register, unregister } = useContext(ToggleCtx);
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => {
    register(() => fnRef.current());
    return () => unregister();
  }, [register, unregister]);
}

export interface Project {
  label: string;
  href: string;
}

export function ProjectNav({ projects }: { projects: Project[] }) {
  const pathname = usePathname();
  const { fire } = useContext(ToggleCtx);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-12 py-4 px-8">
      {projects.map(({ label, href }) =>
        pathname === href ? (
          <button
            key={href}
            onClick={fire}
            className="font-display text-white text-[clamp(0.875rem,2.5vw,1.75rem)] tracking-tight underline underline-offset-4 decoration-1"
          >
            {label}
          </button>
        ) : (
          <Link
            key={href}
            href={href}
            className="font-display text-white text-[clamp(0.875rem,2.5vw,1.75rem)] tracking-tight"
          >
            {label}
          </Link>
        )
      )}
    </footer>
  );
}
