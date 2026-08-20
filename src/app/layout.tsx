import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { ProjectNavProvider, ProjectNav, Project } from "@/components/ProjectNav";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sofía Loose Martínez de Castro",
  description: "Multidisciplinary artist — photography, set design, performance",
};

const PROJECTS: Project[] = [
  { label: "Descent", href: "/descent" },
  { label: "Two Devils One Flower", href: "/two-devils-one-flower" },
  { label: "The Best Mirrors Are Those", href: "/the-best-mirrors-are-those" },
  { label: "Acid Lake", href: "/acid-lake" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">
        <ProjectNavProvider>
          <ProjectNav projects={PROJECTS} />
          {children}
        </ProjectNavProvider>
      </body>
    </html>
  );
}
