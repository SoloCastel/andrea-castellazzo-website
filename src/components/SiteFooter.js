import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="hidden md:fixed md:bottom-0 md:left-0 md:z-50 md:block md:w-full md:px-8 md:pb-4 md:pt-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-[#e8e3d6]/10 pt-4 text-[9px] uppercase tracking-[0.16em] text-[#e8e3d6]/35 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-4">
        <span>© {new Date().getFullYear()} Andrea Castellazzo</span>

        <a
          href="mailto:andreacastellazzo@gmail.com"
          className="transition hover:text-[#e8e3d6]"
        >
          andreacastellazzo@gmail.com
        </a>

        <a href="tel:+393396448089" className="transition hover:text-[#e8e3d6]">
          +39 339 644 8089
        </a>

        <span>Visual Designer con Partita IVA 04301780989</span>

        <span>Brescia, Italy</span>

        <Link href="/privacy" className="transition hover:text-[#e8e3d6]">
          Privacy
        </Link>

        <Link href="/cookie" className="transition hover:text-[#e8e3d6]">
          Cookie
        </Link>

        <Link href="/note-legali" className="transition hover:text-[#e8e3d6]">
          Note legali
        </Link>
      </div>
    </footer>
  );
}