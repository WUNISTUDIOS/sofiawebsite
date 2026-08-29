import Link from "next/link";
import Image from "next/image";
import ScrollStack from "@/components/ScrollStack";
import { withBasePath } from "@/lib/basePath";

const IMAGES = [
  { src: "/images/43_DSC02606_1.webp", alt: "Descent", href: "/descent" },
  { src: "/images/AcidLakeHome.webp", alt: "Two figures in white beneath a tree", href: "/acid-lake" },
  { src: "/images/5_DSC_7641_1_1.webp", alt: "Two Devils One Flower", href: "/two-devils-one-flower" },
  { src: "/images/33_IMG_9459_1.webp", alt: "The Best Mirrors Are Those", href: "/the-best-mirrors-are-those" },
];

function HomeNav() {
  return (
    <div className="flex h-full w-full bg-black">
      {IMAGES.map((img, i) => (
        <Link key={img.src} href={img.href} className="relative block flex-1 h-full">
          <Image
            src={withBasePath(img.src)}
            alt={img.alt}
            fill
            className="object-cover brightness-[0.8]"
            priority={i === 0}
            sizes="25vw"
          />
        </Link>
      ))}
    </div>
  );
}

function HomeVideo() {
  return (
    <video
      src={withBasePath("/video/hookuppostapocaliptico%20final.webm")}
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
    />
  );
}

export default function Home() {
  return (
    <>
      <ScrollStack slides={[<HomeNav key="nav" />, <HomeVideo key="video" />]} />
    </>
  );
}
