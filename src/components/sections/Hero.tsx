"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          line1Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          line2Ref.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] min-h-[600px] flex items-end overflow-hidden"
    >
      {/* Background video — luxury aesthetic clinic */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1920&q=80"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://assets.mixkit.co/videos/52152/52152-1080.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlays — warm noir/rose tones */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/70 to-[#C4A4A0]/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container-site pb-16 sm:pb-20 md:pb-24 lg:pb-28">
        <div className="max-w-3xl">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm mb-6 sm:mb-8 opacity-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose animate-pulse-slow" />
            <span className="font-telemetry text-white/60 text-[10px] sm:text-[11px]">
              Paris VIII — Avenue Montaigne
            </span>
          </div>

          <h1 className="text-white">
            <span ref={line1Ref} className="block opacity-0">
              L&apos;art de révéler
            </span>
            <span ref={line2Ref} className="block font-organic-display text-rose-light/90 opacity-0">
              votre éclat.
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-5 sm:mt-6 md:mt-8 text-white/50 text-base sm:text-lg max-w-lg leading-relaxed opacity-0"
          >
            Médecine esthétique d&apos;exception. Injections de précision,
            traitements laser et soins régénératifs. Des résultats naturels,
            signés par l&apos;excellence.
          </p>

          <div
            ref={ctaRef}
            className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 opacity-0"
          >
            <Link href="#membership" className="btn-primary w-full sm:w-auto">
              Prendre rendez-vous
            </Link>
            <Link
              href="#protocols"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 text-white/80 font-medium min-h-[48px] px-6 text-[15px] backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white w-full sm:w-auto"
            >
              Nos soins
            </Link>
          </div>

          {/* Telemetry bar */}
          <div className="mt-12 sm:mt-16 flex items-center gap-6 sm:gap-10">
            {[
              { value: "2,400+", label: "Patientes" },
              { value: "98.7%", label: "Satisfaction" },
              { value: "15+", label: "Années" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-telemetry text-white/30 text-[10px] mb-1">
                  {stat.label}
                </p>
                <p className="text-white text-lg sm:text-xl font-semibold tracking-tight">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-telemetry text-white/20 text-[9px]">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
