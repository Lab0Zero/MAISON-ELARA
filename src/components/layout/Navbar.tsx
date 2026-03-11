"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const navLinks = [
  { label: "Protocoles", href: "#protocols" },
  { label: "Expertise", href: "#features" },
  { label: "Philosophie", href: "#philosophy" },
  { label: "Adhésion", href: "#membership" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      const links = mobileMenuRef.current.querySelectorAll("a, button");
      gsap.fromTo(links,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: "power3.out", delay: 0.15 }
      );
    }
  }, [mobileOpen]);

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out"
        style={{
          width: scrolled ? "min(92%, 900px)" : "min(95%, 1100px)",
        }}
      >
        <div
          className={`flex h-14 md:h-16 items-center justify-between px-5 md:px-7 transition-all duration-500 ${
            scrolled || mobileOpen
              ? "bg-white/70 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] border border-stone-light/30"
              : "bg-transparent"
          }`}
          style={{ borderRadius: "9999px" }}
        >
          <Link
            href="/"
            className={`relative z-50 font-semibold tracking-tight text-lg transition-colors duration-500 ${
              scrolled || mobileOpen ? "text-charcoal" : "text-white"
            }`}
          >
            Maison Élara
          </Link>

          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[13px] font-medium tracking-wide uppercase transition-colors duration-300 ${
                  scrolled
                    ? "text-stone hover:text-charcoal"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="#membership"
              className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[13px] font-medium tracking-wide transition-all duration-300 ${
                scrolled
                  ? "bg-charcoal text-white hover:bg-charcoal-light"
                  : "bg-white/15 text-white backdrop-blur-sm hover:bg-white/25 border border-white/20"
              }`}
            >
              Consultation
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex md:hidden items-center justify-center w-11 h-11"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <div className="flex flex-col justify-center items-center w-6 h-6">
              <span
                className={`block h-[1.5px] w-5 rounded-full transition-all duration-300 ${
                  scrolled || mobileOpen ? "bg-charcoal" : "bg-white"
                } ${mobileOpen ? "rotate-45 translate-y-[4px]" : ""}`}
              />
              <span
                className={`block h-[1.5px] w-5 rounded-full transition-all duration-300 mt-[6px] ${
                  scrolled || mobileOpen ? "bg-charcoal" : "bg-white"
                } ${mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""}`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-cream md:hidden flex flex-col items-center justify-center"
        >
          <nav className="flex flex-col items-center gap-7">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-charcoal tracking-tight"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="#membership"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-4 px-8"
            >
              Consultation
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
