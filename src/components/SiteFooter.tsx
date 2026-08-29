const smallText =
  "font-display text-white text-[clamp(0.7rem,1.2vw,0.9rem)] tracking-tight";

export function SiteFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between py-4 px-8">
      <a
        href="https://www.instagram.com/diablo_con_vestido/"
        target="_blank"
        rel="noopener noreferrer"
        className={smallText}
      >
        @diablo_con_vestido
      </a>

      <a href="mailto:loose.sofia@gmail.com" className={smallText}>
        loose.sofia@gmail.com
      </a>
    </footer>
  );
}
