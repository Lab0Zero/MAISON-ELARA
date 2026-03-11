"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ===== ARTIFACTS ===== */

function DoubleHelixGear() {
  return (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_20s_linear_infinite]">
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" className="text-moss/20" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-moss/15" />
        <g className="text-moss/40">
          {/* Strand 0 — thick lines at 30° intervals */}
          <line x1="135" y1="100" x2="175" y2="100" stroke="currentColor" strokeWidth="1.5" />
          <line x1="130" y1="117" x2="165" y2="137" stroke="currentColor" strokeWidth="1.5" />
          <line x1="117" y1="130" x2="137" y2="165" stroke="currentColor" strokeWidth="1.5" />
          <line x1="100" y1="135" x2="100" y2="175" stroke="currentColor" strokeWidth="1.5" />
          <line x1="83" y1="130" x2="63" y2="165" stroke="currentColor" strokeWidth="1.5" />
          <line x1="70" y1="117" x2="35" y2="137" stroke="currentColor" strokeWidth="1.5" />
          <line x1="65" y1="100" x2="25" y2="100" stroke="currentColor" strokeWidth="1.5" />
          <line x1="70" y1="83" x2="35" y2="63" stroke="currentColor" strokeWidth="1.5" />
          <line x1="83" y1="70" x2="63" y2="35" stroke="currentColor" strokeWidth="1.5" />
          <line x1="100" y1="65" x2="100" y2="25" stroke="currentColor" strokeWidth="1.5" />
          <line x1="117" y1="70" x2="137" y2="35" stroke="currentColor" strokeWidth="1.5" />
          <line x1="130" y1="83" x2="165" y2="63" stroke="currentColor" strokeWidth="1.5" />
          {/* Strand 1 — thin lines at 15° offset */}
          <line x1="134" y1="109" x2="172" y2="119" stroke="currentColor" strokeWidth="0.5" />
          <line x1="126" y1="123" x2="155" y2="150" stroke="currentColor" strokeWidth="0.5" />
          <line x1="109" y1="134" x2="119" y2="172" stroke="currentColor" strokeWidth="0.5" />
          <line x1="91" y1="134" x2="81" y2="172" stroke="currentColor" strokeWidth="0.5" />
          <line x1="74" y1="123" x2="45" y2="150" stroke="currentColor" strokeWidth="0.5" />
          <line x1="66" y1="109" x2="28" y2="119" stroke="currentColor" strokeWidth="0.5" />
          <line x1="66" y1="91" x2="28" y2="81" stroke="currentColor" strokeWidth="0.5" />
          <line x1="74" y1="77" x2="45" y2="50" stroke="currentColor" strokeWidth="0.5" />
          <line x1="91" y1="66" x2="81" y2="28" stroke="currentColor" strokeWidth="0.5" />
          <line x1="109" y1="66" x2="119" y2="28" stroke="currentColor" strokeWidth="0.5" />
          <line x1="126" y1="77" x2="155" y2="50" stroke="currentColor" strokeWidth="0.5" />
          <line x1="134" y1="91" x2="172" y2="81" stroke="currentColor" strokeWidth="0.5" />
        </g>
        <circle cx="100" cy="100" r="4" fill="currentColor" className="text-clay" />
        <circle cx="100" cy="100" r="12" fill="none" stroke="currentColor" strokeWidth="1" className="text-clay/30" />
      </svg>
    </div>
  );
}

function ScanningGrid() {
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-charcoal/5">
      {/* Grid cells */}
      <div className="absolute inset-2 grid grid-cols-6 grid-rows-4 gap-1">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="rounded-sm bg-moss/10 border border-moss/5" />
        ))}
      </div>
      {/* Scanning laser */}
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-clay to-transparent animate-scan opacity-60" />
      {/* Corner markers */}
      {["top-1 left-1", "top-1 right-1", "bottom-1 left-1", "bottom-1 right-1"].map((pos) => (
        <div key={pos} className={`absolute ${pos} w-3 h-3`}>
          <div className={`absolute ${pos.includes("left") ? "left-0" : "right-0"} ${pos.includes("top") ? "top-0" : "bottom-0"} w-3 h-[1px] bg-clay/40`} />
          <div className={`absolute ${pos.includes("left") ? "left-0" : "right-0"} ${pos.includes("top") ? "top-0" : "bottom-0"} w-[1px] h-3 bg-clay/40`} />
        </div>
      ))}
    </div>
  );
}

function EKGWaveform() {
  return (
    <div className="relative w-full aspect-[3/1] overflow-hidden">
      <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
        <path
          d="M0,40 L30,40 L40,40 L50,38 L60,42 L70,40 L80,40 L90,40 L100,40 L110,35 L115,50 L120,10 L125,65 L130,30 L135,40 L140,40 L170,40 L180,40 L190,38 L200,42 L210,40 L220,40 L230,40 L240,40 L250,35 L255,50 L260,10 L265,65 L270,30 L275,40 L280,40 L310,40 L320,40 L330,38 L340,42 L350,40 L360,40 L370,40 L380,40 L390,35 L395,50 L400,40"
          fill="none"
          stroke="#CC5833"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1000"
          className="animate-ekg"
        />
        {/* Baseline */}
        <line x1="0" y1="40" x2="400" y2="40" stroke="#2E4036" strokeWidth="0.5" opacity="0.2" />
      </svg>
      {/* Pulse dot */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-clay animate-pulse-slow" />
    </div>
  );
}

/* ===== PROTOCOL DATA ===== */
const protocols = [
  {
    number: "01",
    title: "Injections & Volumétrie",
    subtitle: "Acide hyaluronique & Botox",
    description:
      "Injections de précision guidées par imagerie 3D. Lèvres, pommettes, ovale du visage — chaque zone est traitée avec des produits premium pour un résultat naturel et harmonieux.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    artifact: "helix",
    stats: [
      { label: "Soins réalisés", value: "4,200+" },
      { label: "Naturalité", value: "100%" },
    ],
  },
  {
    number: "02",
    title: "Laser & Régénération",
    subtitle: "Technologies de pointe",
    description:
      "Laser fractionné, IPL et radiofréquence pour le rajeunissement cutané. Stimulation du collagène, traitement des taches, lissage des ridules — des résultats visibles dès la première séance.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    artifact: "grid",
    stats: [
      { label: "Renouvellement collagène", value: "+280%" },
      { label: "Séances moyennes", value: "3-5" },
    ],
  },
  {
    number: "03",
    title: "Skincare Médical",
    subtitle: "Peelings & Mésothérapie",
    description:
      "Peelings médicaux, skinboosters et mésothérapie pour une peau lumineuse et repulpée. Protocoles personnalisés selon votre type de peau et vos objectifs beauté.",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
    artifact: "ekg",
    stats: [
      { label: "Hydratation", value: "+92%" },
      { label: "Satisfaction", value: "98.7%" },
    ],
  },
];

export default function Protocols() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".protocol-card");

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Last card doesn't need effect

        ScrollTrigger.create({
          trigger: card,
          start: "top 10%",
          end: "bottom 10%",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(card, {
              scale: 1 - progress * 0.08,
              filter: `blur(${progress * 12}px)`,
              opacity: 1 - progress * 0.4,
              duration: 0.1,
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="protocols" ref={sectionRef} className="bg-cream">
      <div className="container-site">
        {/* Header */}
        <div className="section-padding pb-10 sm:pb-14">
          <span className="section-label">Protocoles</span>
          <h2 className="mt-3 sm:mt-4 max-w-xl text-charcoal">
            Trois actes.{" "}
            <span className="font-organic">Un seul objectif.</span>
          </h2>
        </div>

        {/* Stacking cards */}
        <div className="space-y-6 pb-20 sm:pb-28">
          {protocols.map((p, i) => (
            <div
              key={p.number}
              className="protocol-card sticky"
              style={{ top: `${60 + i * 20}px` }}
            >
              <div className="rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-white border border-stone-light/20 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]">
                  {/* Image side */}
                  <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                      <span className="font-telemetry text-white/60 text-[11px] bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                        Protocole {p.number}
                      </span>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <span className="font-telemetry text-rose text-[10px]">{p.subtitle}</span>
                      <h3 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-bold text-charcoal tracking-tight">
                        {p.title}
                      </h3>
                      <p className="mt-3 sm:mt-4 text-stone text-[15px] leading-relaxed">
                        {p.description}
                      </p>

                      {/* Stats */}
                      <div className="mt-5 sm:mt-6 flex gap-6 sm:gap-8">
                        {p.stats.map((s) => (
                          <div key={s.label}>
                            <p className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight">
                              {s.value}
                            </p>
                            <p className="font-telemetry text-stone text-[10px] mt-0.5">
                              {s.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Artifact */}
                    <div className="mt-6 sm:mt-8">
                      {p.artifact === "helix" && <DoubleHelixGear />}
                      {p.artifact === "grid" && <ScanningGrid />}
                      {p.artifact === "ekg" && <EKGWaveform />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
