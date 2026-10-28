"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Bio", href: "/bio" },
  { label: "Servizi", href: "/servizi" },
];

const projectLinks = [
  { label: "Artemis II", href: "/portfolio/artemis-ii" },
  {
    label: "ReFrame Showreel — The Movie",
    href: "/portfolio/reframe-showreel-the-movie",
  },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
    setPortfolioOpen(false);
  }

  function handleHomeClick(event) {
    closeMenu();

    if (pathname === "/") {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent("artemis:go-start"));
    }
  }

  function handleNavClick(event, href) {
    closeMenu();

    if (href === "/" && pathname === "/") {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent("artemis:go-start"));
    }
  }

  function togglePortfolio(event) {
    event.preventDefault();
    event.stopPropagation();
    setPortfolioOpen((value) => !value);
  }

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full px-5 py-4 md:px-8 md:py-5">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            onClick={handleHomeClick}
            className="max-w-[190px] text-[10px] uppercase tracking-[0.28em] text-[#e8e3d6]/80 transition hover:text-[#e8e3d6] md:max-w-none md:text-xs md:tracking-[0.32em]"
          >
            Exploring Space
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.24em] text-[#e8e3d6]/45 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="transition hover:text-[#e8e3d6]"
              >
                {link.label}
              </Link>
            ))}

            <div className="group relative">
              <div className="flex items-center gap-2">
                <Link
                  href="/portfolio"
                  className="transition hover:text-[#e8e3d6]"
                >
                  Portfolio
                </Link>

                <span className="translate-y-[-1px] text-[10px] text-[#e8e3d6]/38 transition group-hover:text-[#e8e3d6]/75">
                  ▾
                </span>
              </div>

              <div className="pointer-events-none absolute right-0 top-full pt-5 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="min-w-[340px] border border-[#e8e3d6]/12 bg-[#11100d]/94 p-2 backdrop-blur-xl">
                  {projectLinks.map((project) => (
                    <Link
                      key={project.href}
                      href={project.href}
                      className="block px-4 py-3 text-[10px] uppercase tracking-[0.24em] text-[#e8e3d6]/62 transition hover:bg-[#e8e3d6] hover:text-[#11100d]"
                    >
                      {project.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen((value) => !value)}
            className="relative z-[90] flex h-10 shrink-0 items-center gap-3 border border-[#e8e3d6]/20 bg-[#11100d]/85 px-3 text-[#e8e3d6] backdrop-blur-md md:hidden"
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
            type="button"
          >
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#e8e3d6]/55">
              {menuOpen ? "Chiudi" : "Menu"}
            </span>

            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-1/2 h-px w-5 bg-[#e8e3d6] transition ${
                  menuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />

              <span
                className={`absolute left-0 top-1/2 h-px w-5 bg-[#e8e3d6] transition ${
                  menuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[70] bg-[#11100d]/97 text-[#e8e3d6] backdrop-blur-xl transition duration-300 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-[100dvh] flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-[calc(env(safe-area-inset-top)+88px)]">
          <div className="mb-3 flex shrink-0 items-center justify-between border-b border-[#e8e3d6]/10 pb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] text-[#e8e3d6]/40">
                Navigazione
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.22em] text-[#e8e3d6]/24">
                Exploring Space
              </p>
            </div>

            <button
              onClick={closeMenu}
              className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#e8e3d6]/22 bg-[#e8e3d6]/5 text-2xl leading-none text-[#e8e3d6]/75 transition active:bg-[#e8e3d6] active:text-[#11100d]"
              aria-label="Chiudi menu"
              type="button"
            >
              ×
            </button>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-1">
            <div className="flex min-h-full flex-col justify-center gap-0">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className="group grid grid-cols-[44px_1fr] items-baseline border-b border-[#e8e3d6]/10 py-3"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#e8e3d6]/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-[clamp(28px,8vw,42px)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#e8e3d6]/88 transition group-active:text-[#e8e3d6]">
                    {link.label}
                  </span>
                </Link>
              ))}

              <div className="border-b border-[#e8e3d6]/10">
                <div className="grid grid-cols-[44px_1fr_44px] items-center py-3">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#e8e3d6]/35">
                    04
                  </span>

                  <Link
                    href="/portfolio"
                    onClick={closeMenu}
                    className="text-[clamp(28px,8vw,42px)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#e8e3d6]/88 transition active:text-[#e8e3d6]"
                  >
                    Portfolio
                  </Link>

                  <button
                    onClick={togglePortfolio}
                    className="flex h-10 w-10 items-center justify-center border border-[#e8e3d6]/14 bg-[#e8e3d6]/[0.03] text-[#e8e3d6]/62 transition active:bg-[#e8e3d6] active:text-[#11100d]"
                    type="button"
                    aria-label={
                      portfolioOpen
                        ? "Chiudi progetti portfolio"
                        : "Apri progetti portfolio"
                    }
                    aria-expanded={portfolioOpen}
                  >
                    <span
                      className={`block text-sm transition-transform duration-300 ${
                        portfolioOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    portfolioOpen
                      ? "max-h-80 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-3 pl-[44px]">
                    {projectLinks.map((project) => (
                      <Link
                        key={project.href}
                        href={project.href}
                        onClick={closeMenu}
                        className="block border-l border-[#e8e3d6]/14 px-4 py-3 text-xs uppercase tracking-[0.22em] text-[#e8e3d6]/70 transition active:bg-[#e8e3d6] active:text-[#11100d]"
                      >
                        {project.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="mt-3 shrink-0 border-t border-[#e8e3d6]/10 pt-4">
            <a
              href="mailto:andreacastellazzo@gmail.com"
              onClick={closeMenu}
              className="block border border-[#e8e3d6]/25 bg-[#e8e3d6]/5 px-5 py-3 text-center text-[10px] uppercase tracking-[0.26em] text-[#e8e3d6]/80 transition active:bg-[#e8e3d6] active:text-[#11100d]"
            >
              Scrivimi
            </a>

            <p className="mt-3 text-center text-[8px] uppercase tracking-[0.16em] text-[#e8e3d6]/32">
              Visual Designer · Photographer · 3D Artist
            </p>
          </div>
        </div>
      </div>
    </>
  );
}