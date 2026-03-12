"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ===== ARTIFACTS ===== */

/* Protocole 01 — Seringue stylisée avec points d'injection */
function SyringeDroplet() {
  return (
    <div className="relative w-full aspect-[5/2] max-w-[320px] mx-auto overflow-hidden">
      <svg viewBox="0 0 320 120" className="w-full h-full">
        {/* Seringue stylisée */}
        <g className="text-charcoal/75">
          {/* Corps de la seringue */}
          <rect x="60" y="48" width="140" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {/* Piston */}
          <line x1="60" y1="52" x2="60" y2="68" stroke="currentColor" strokeWidth="1.5" />
          <line x1="30" y1="60" x2="60" y2="60" stroke="currentColor" strokeWidth="1.8" />
          <rect x="26" y="54" width="8" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Graduations */}
          {[80, 100, 120, 140, 160, 180].map((x) => (
            <line key={x} x1={x} y1="48" x2={x} y2="52" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
          ))}
          {/* Aiguille */}
          <line x1="200" y1="60" x2="250" y2="60" stroke="currentColor" strokeWidth="1.2" />
          <path d="M248,60 L260,60" stroke="currentColor" strokeWidth="0.8" />
        </g>
        {/* Liquide dans la seringue — animé */}
        <rect x="62" y="50" width="100" height="20" rx="2" className="animate-[syringe-fill_3s_ease-in-out_infinite]" fill="var(--color-rose)" opacity="0.28" />
        {/* Goutte à la pointe */}
        <circle cx="264" cy="60" r="4" fill="var(--color-rose)" opacity="0.75" className="animate-[droplet_2s_ease-in-out_infinite]" />
        <circle cx="264" cy="60" r="7" fill="none" stroke="var(--color-rose)" strokeWidth="0.7" opacity="0.45" className="animate-[droplet-ring_2s_ease-in-out_infinite]" />
        {/* Points d'injection sur visage stylisé */}
        <g>
          {[
            { cx: 280, cy: 30, delay: "0s" },
            { cx: 295, cy: 50, delay: "0.4s" },
            { cx: 290, cy: 75, delay: "0.8s" },
            { cx: 275, cy: 95, delay: "1.2s" },
          ].map((pt, i) => (
            <g key={i}>
              <circle cx={pt.cx} cy={pt.cy} r="2.5" fill="var(--color-rose)" opacity="0.65" className="animate-pulse-slow" style={{ animationDelay: pt.delay }} />
              <circle cx={pt.cx} cy={pt.cy} r="6" fill="none" stroke="var(--color-rose)" strokeWidth="0.7" opacity="0.35" className="animate-[injection-ring_2.5s_ease-out_infinite]" style={{ animationDelay: pt.delay }} />
            </g>
          ))}
          {/* Ligne de contour visage (abstrait) */}
          <path d="M270,20 Q300,25 305,50 Q308,75 295,95 Q285,108 270,110" fill="none" stroke="var(--color-charcoal)" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 3" />
        </g>
      </svg>
    </div>
  );
}

/* Protocole 02 — Faisceau laser avec grille de régénération */
function LaserBeam() {
  return (
    <div className="relative w-full aspect-[5/2] max-w-[320px] mx-auto overflow-hidden">
      <svg viewBox="0 0 320 120" className="w-full h-full">
        {/* Grille cutanée — cellules qui s'illuminent */}
        <g>
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => {
              const x = 120 + col * 24;
              const y = 8 + row * 24;
              const delay = (row * 0.15 + col * 0.1).toFixed(2);
              return (
                <rect
                  key={`${row}-${col}`}
                  x={x} y={y} width="20" height="20" rx="3"
                  fill="var(--color-rose)"
                  opacity="0.1"
                  stroke="var(--color-rose)"
                  strokeWidth="0.5"
                  strokeOpacity="0.25"
                  className="animate-[cell-glow_3s_ease-in-out_infinite]"
                  style={{ animationDelay: `${delay}s` }}
                />
              );
            })
          )}
        </g>
        {/* Appareil laser (gauche) */}
        <g className="text-charcoal/65">
          <rect x="10" y="35" width="80" height="50" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <rect x="18" y="43" width="30" height="34" rx="4" fill="var(--color-charcoal)" opacity="0.08" />
          <circle cx="33" cy="60" r="8" fill="none" stroke="var(--color-rose)" strokeWidth="1.2" opacity="0.55" />
          <circle cx="33" cy="60" r="3" fill="var(--color-rose)" opacity="0.45" className="animate-pulse-slow" />
          {/* Écran indicateur */}
          <rect x="56" y="46" width="26" height="14" rx="2" fill="var(--color-charcoal)" opacity="0.1" />
          <line x1="58" y1="53" x2="68" y2="49" stroke="var(--color-rose)" strokeWidth="1" opacity="0.65" />
          <line x1="68" y1="49" x2="72" y2="55" stroke="var(--color-rose)" strokeWidth="1" opacity="0.65" />
          <line x1="72" y1="55" x2="80" y2="51" stroke="var(--color-rose)" strokeWidth="1" opacity="0.65" />
        </g>
        {/* Faisceau laser — ligne animée */}
        <line x1="90" y1="60" x2="120" y2="60" stroke="var(--color-rose)" strokeWidth="2.5" opacity="0.75" className="animate-[laser-pulse_1.5s_ease-in-out_infinite]" />
        <line x1="90" y1="60" x2="120" y2="60" stroke="var(--color-rose)" strokeWidth="8" opacity="0.12" className="animate-[laser-pulse_1.5s_ease-in-out_infinite]" />
        {/* Ligne de scan verticale */}
        <line x1="160" y1="4" x2="160" y2="116" stroke="var(--color-rose)" strokeWidth="1.2" opacity="0.35" className="animate-[laser-scan_4s_ease-in-out_infinite]" />
      </svg>
    </div>
  );
}

/* Protocole 03 — Molécules pénétrant les couches de peau */
function MoleculeAbsorption() {
  return (
    <div className="relative w-full aspect-[5/2] max-w-[320px] mx-auto overflow-hidden">
      <svg viewBox="0 0 320 120" className="w-full h-full">
        {/* Couches de peau — lignes horizontales ondulées */}
        {[
          { y: 35, label: "Épiderme", opacity: 0.45 },
          { y: 60, label: "Derme", opacity: 0.32 },
          { y: 85, label: "Hypoderme", opacity: 0.22 },
        ].map((layer, i) => (
          <g key={i}>
            <path
              d={`M40,${layer.y} Q100,${layer.y - 4} 160,${layer.y} Q220,${layer.y + 4} 280,${layer.y}`}
              fill="none"
              stroke="var(--color-rose)"
              strokeWidth="1"
              opacity={layer.opacity}
            />
            <text x="286" y={layer.y + 3} fill="var(--color-charcoal)" opacity="0.25" fontSize="6" fontFamily="var(--font-mono)">{layer.label}</text>
          </g>
        ))}
        {/* Molécules / sérums qui descendent */}
        {[
          { cx: 80, startY: 8, delay: "0s" },
          { cx: 120, startY: 5, delay: "0.5s" },
          { cx: 160, startY: 10, delay: "0.2s" },
          { cx: 200, startY: 6, delay: "0.8s" },
          { cx: 240, startY: 12, delay: "0.4s" },
        ].map((mol, i) => (
          <g key={i} className="animate-[molecule-drop_4s_ease-in-out_infinite]" style={{ animationDelay: mol.delay }}>
            {/* Molécule principale */}
            <circle cx={mol.cx} cy={mol.startY} r="5" fill="var(--color-rose)" opacity="0.5" />
            <circle cx={mol.cx} cy={mol.startY} r="5" fill="none" stroke="var(--color-rose)" strokeWidth="0.8" opacity="0.65" />
            {/* Petites particules satellites */}
            <circle cx={mol.cx - 7} cy={mol.startY + 3} r="2" fill="var(--color-rose)" opacity="0.35" />
            <circle cx={mol.cx + 6} cy={mol.startY - 2} r="1.5" fill="var(--color-rose)" opacity="0.28" />
          </g>
        ))}
        {/* Flacon / pipette stylisée en haut à gauche */}
        <g className="text-charcoal/55">
          <rect x="10" y="15" width="20" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="14" y="8" width="12" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="12" y="20" width="16" height="25" rx="2" fill="var(--color-rose)" opacity="0.2" />
          {/* Gouttes tombant du flacon */}
          <circle cx="20" cy="58" r="2.5" fill="var(--color-rose)" opacity="0.45" className="animate-[droplet_2.5s_ease-in-out_infinite]" />
        </g>
        {/* Indicateur d'hydratation */}
        <g>
          <rect x="40" y="100" width="200" height="4" rx="2" fill="var(--color-charcoal)" opacity="0.08" />
          <rect x="40" y="100" width="160" height="4" rx="2" fill="var(--color-rose)" opacity="0.35" className="animate-[hydration-bar_3s_ease-in-out_infinite]" />
          <text x="40" y="115" fill="var(--color-charcoal)" opacity="0.25" fontSize="6" fontFamily="var(--font-mono)">ABSORPTION</text>
        </g>
      </svg>
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
    image: "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=800",
    artifact: "syringe",
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
    image: "https://images.pexels.com/photos/5069612/pexels-photo-5069612.jpeg?auto=compress&cs=tinysrgb&w=800",
    artifact: "laser",
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
    image: "https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=800",
    artifact: "molecule",
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
                      {p.artifact === "syringe" && <SyringeDroplet />}
                      {p.artifact === "laser" && <LaserBeam />}
                      {p.artifact === "molecule" && <MoleculeAbsorption />}
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
