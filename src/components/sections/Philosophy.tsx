"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".philosophy-texture", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".philosophy-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".word-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0.15 },
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            delay: i * 0.05,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const question1Words = "L'esthétique conventionnelle demande :".split(" ");
  const answer1Words = "Que faut-il corriger ?".split(" ");
  const question2Words = "Nous demandons :".split(" ");
  const answer2Words = "Que faut-il sublimer ?".split(" ");

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative overflow-hidden bg-charcoal"
    >
      {/* Parallax texture — soft organic */}
      <div
        className="philosophy-texture absolute inset-0 opacity-[0.06] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1920&q=60)",
          height: "130%",
          top: "-15%",
        }}
      />

      <div className="relative z-10 section-padding">
        <div className="container-site">
          <span className="section-label text-stone-light/50 philosophy-reveal">
            Notre philosophie
          </span>

          <div className="mt-10 sm:mt-14 md:mt-20 max-w-4xl">
            <div className="philosophy-reveal">
              <p className="text-white/30 text-lg sm:text-xl md:text-2xl font-light leading-relaxed mb-2">
                {question1Words.map((word, i) => (
                  <span key={i} className="word-reveal inline-block mr-[0.3em]">
                    {word}
                  </span>
                ))}
              </p>
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                {answer1Words.map((word, i) => (
                  <span key={i} className="word-reveal inline-block mr-[0.25em]">
                    {word}
                  </span>
                ))}
              </h2>
            </div>

            <div className="my-10 sm:my-14 md:my-20 flex items-center gap-4 philosophy-reveal">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              <span className="font-telemetry text-rose/40 text-[10px]">VS</span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-white/10 to-transparent" />
            </div>

            <div className="philosophy-reveal">
              <p className="text-rose/50 text-lg sm:text-xl md:text-2xl font-light leading-relaxed mb-2">
                {question2Words.map((word, i) => (
                  <span key={i} className="word-reveal inline-block mr-[0.3em]">
                    {word}
                  </span>
                ))}
              </p>
              <h2 className="font-organic-display text-rose-light">
                {answer2Words.map((word, i) => (
                  <span key={i} className="word-reveal inline-block mr-[0.25em]">
                    {word}
                  </span>
                ))}
              </h2>
            </div>

            <div className="mt-12 sm:mt-16 md:mt-20 philosophy-reveal">
              <p className="text-white/30 text-base sm:text-lg max-w-xl leading-relaxed">
                Nous ne masquons pas. Nous ne figeons pas. Nous révélons la beauté
                naturelle de chaque visage. Chaque geste est mesuré, chaque injection
                est un acte de précision au service de votre harmonie.
              </p>
            </div>

            <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 philosophy-reveal">
              {[
                { number: "01", label: "L'écoute avant le geste" },
                { number: "02", label: "Des résultats naturels, jamais figés" },
                { number: "03", label: "Un suivi personnalisé dans le temps" },
              ].map((p) => (
                <div key={p.number} className="border-t border-white/10 pt-4 sm:pt-5">
                  <span className="font-telemetry text-rose text-[11px]">{p.number}</span>
                  <p className="mt-2 text-white/60 text-sm sm:text-[15px] font-medium">
                    {p.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
