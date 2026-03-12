"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Brain, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ============================
   CARD 1 — Diagnostic Shuffler
   ============================ */
function DiagnosticShuffler() {
  const [order, setOrder] = useState([0, 1, 2]);
  const containerRef = useRef<HTMLDivElement>(null);

  const cards = [
    { label: "Élasticité Cutanée", value: "92", unit: "/100", delta: "+18 post-soin" },
    { label: "Hydratation Profonde", value: "87", unit: "%", delta: "+24 ce mois" },
    { label: "Densité Collagène", value: "3.8", unit: "g/cm²", delta: "Zone optimale" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        const last = next.pop()!;
        next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[220px] sm:h-[240px]">
      {order.map((cardIndex, stackIndex) => {
        const card = cards[cardIndex];
        const offset = stackIndex * 14;
        const scale = 1 - stackIndex * 0.04;
        const opacity = 1 - stackIndex * 0.2;
        const zIndex = 3 - stackIndex;

        return (
          <div
            key={cardIndex}
            className="absolute left-0 right-0 mx-3 sm:mx-4 rounded-2xl bg-white border border-stone-light/20 p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            style={{
              top: `${offset}px`,
              transform: `scale(${scale})`,
              opacity,
              zIndex,
              transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-telemetry text-stone text-[10px]">{card.label}</span>
              <span className="font-telemetry text-rose-dark text-[10px] bg-charcoal/10 px-2 py-0.5 rounded-full">
                {card.delta}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
                {card.value}
              </span>
              <span className="text-sm text-stone">{card.unit}</span>
            </div>
            <div className="mt-3 h-1 bg-cream rounded-full overflow-hidden">
              <div
                className="h-full bg-charcoal rounded-full transition-all duration-1000"
                style={{ width: `${60 + cardIndex * 15}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ==============================
   CARD 2 — Parcours Beauté (Treatment Journey)
   ============================== */
function TreatmentJourney() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { icon: "consult", label: "Consultation", detail: "Bilan personnalisé", duration: "30 min" },
    { icon: "care", label: "Soin", detail: "Protocole sur mesure", duration: "45 min" },
    { icon: "glow", label: "Résultat", detail: "Éclat naturel", duration: "Immédiat" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-5">
      {/* Steps timeline */}
      <div className="relative">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-4 relative">
            {/* Vertical line */}
            {i < steps.length - 1 && (
              <div className="absolute left-[17px] top-[36px] w-[2px] h-[calc(100%-8px)]">
                <div className="w-full h-full bg-stone-light/40 rounded-full" />
                <div
                  className="absolute top-0 left-0 w-full bg-rose/60 rounded-full transition-all duration-1000 ease-out"
                  style={{ height: activeStep > i ? "100%" : "0%" }}
                />
              </div>
            )}

            {/* Step circle */}
            <div className={`relative z-10 w-[34px] h-[34px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-700 ${
              activeStep >= i
                ? "bg-rose/15 border-2 border-rose/40"
                : "bg-cream-dark border-2 border-stone-light/30"
            }`}>
              {step.icon === "consult" && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`transition-colors duration-500 ${activeStep >= i ? "text-rose-dark" : "text-stone"}`}>
                  <circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M2.5 12.5c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              )}
              {step.icon === "care" && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`transition-colors duration-500 ${activeStep >= i ? "text-rose-dark" : "text-stone"}`}>
                  <path d="M7 2.5c1.5-2 4.5-1 4.5 1.5S9 7.5 7 10.5C5 7.5 2 6 2 4s3-3.5 4.5-1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {step.icon === "glow" && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`transition-colors duration-500 ${activeStep >= i ? "text-rose-dark" : "text-stone"}`}>
                  <path d="M7 1v2M7 11v2M1 7h2M11 7h2M3 3l1.5 1.5M9.5 9.5L11 11M11 3l-1.5 1.5M4.5 9.5L3 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              )}
            </div>

            {/* Step content */}
            <div className={`pb-6 transition-all duration-500 ${activeStep >= i ? "opacity-100" : "opacity-40"}`}>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-charcoal">{step.label}</p>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full transition-all duration-500 ${
                  activeStep === i
                    ? "bg-rose/15 text-rose-dark"
                    : "bg-cream-dark text-stone"
                }`}>{step.duration}</span>
              </div>
              <p className="text-xs text-stone mt-0.5">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom result preview */}
      <div className={`rounded-xl bg-gradient-to-r from-rose/8 to-rose-pale/30 border border-rose/10 p-3.5 transition-all duration-700 ${
        activeStep === 2 ? "opacity-100 translate-y-0" : "opacity-50 translate-y-1"
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-charcoal">Satisfaction patientes</p>
            <p className="text-[10px] text-stone mt-0.5">Résultats vérifiés à 3 mois</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-charcoal tracking-tight">98.7%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================================
   CARD 3 — Mock Cursor Scheduler
   ================================== */
function CursorScheduler() {
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const [activeDays, setActiveDays] = useState<number[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: -20, y: -20 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorClicking, setCursorClicking] = useState(false);
  const [saved, setSaved] = useState(false);
  const cycleRef = useRef(0);

  useEffect(() => {
    const runCycle = () => {
      setActiveDays([]);
      setSaved(false);
      setCursorVisible(true);
      setCursorPos({ x: -20, y: -20 });

      const sequence = [1, 3, 5]; // Mar, Jeu, Sam
      let step = 0;

      const moveToDay = () => {
        if (step < sequence.length) {
          const dayIndex = sequence[step];
          const xPos = 18 + dayIndex * 38;
          setCursorPos({ x: xPos, y: 48 });

          setTimeout(() => {
            setCursorClicking(true);
            setTimeout(() => {
              setCursorClicking(false);
              setActiveDays((prev) => [...prev, dayIndex]);
              step++;
              setTimeout(moveToDay, 500);
            }, 150);
          }, 400);
        } else {
          // Move to save button
          setTimeout(() => {
            setCursorPos({ x: 120, y: 130 });
            setTimeout(() => {
              setCursorClicking(true);
              setTimeout(() => {
                setCursorClicking(false);
                setSaved(true);
                setTimeout(() => {
                  setCursorVisible(false);
                  cycleRef.current++;
                  setTimeout(runCycle, 2000);
                }, 1500);
              }, 150);
            }, 500);
          }, 300);
        }
      };

      setTimeout(moveToDay, 600);
    };

    runCycle();
    return () => { cycleRef.current = -1; };
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <span className="font-telemetry text-stone text-[10px]">Programme hebdomadaire</span>
        <span className="font-telemetry text-rose-dark text-[10px]">
          {activeDays.length}/3 séances
        </span>
      </div>

      {/* Week grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-5">
        {days.map((day, i) => (
          <button
            key={i}
            className={`relative aspect-square rounded-xl text-xs font-medium transition-all duration-300 ${
              activeDays.includes(i)
                ? "bg-charcoal text-white shadow-[0_2px_12px_rgba(46,64,54,0.3)]"
                : "bg-cream-dark/60 text-stone hover:bg-cream-dark"
            }`}
          >
            {day}
            {activeDays.includes(i) && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose rounded-full border-2 border-white" />
            )}
          </button>
        ))}
      </div>

      {/* Protocols */}
      <div className="space-y-2 mb-5">
        {[
          { time: "09:00", name: "Injections lèvres", dur: "30 min" },
          { time: "11:00", name: "Skinbooster visage", dur: "45 min" },
          { time: "15:00", name: "Laser fractionné", dur: "40 min" },
        ].map((proto, i) => (
          <div
            key={i}
            className={`flex items-center justify-between py-2 px-3 rounded-lg text-xs transition-all duration-500 ${
              activeDays.length > i
                ? "bg-charcoal/10 border border-moss/20"
                : "bg-cream-dark/30"
            }`}
          >
            <span className="font-telemetry text-stone text-[10px]">{proto.time}</span>
            <span className="font-medium text-charcoal">{proto.name}</span>
            <span className="font-telemetry text-stone text-[10px]">{proto.dur}</span>
          </div>
        ))}
      </div>

      {/* Save button */}
      <button
        className={`w-full py-2.5 rounded-full text-xs font-medium transition-all duration-300 ${
          saved
            ? "bg-charcoal text-white"
            : "bg-cream-dark text-stone hover:bg-cream-dark/80"
        }`}
      >
        {saved ? "✓ Programme enregistré" : "Enregistrer le programme"}
      </button>

      {/* Animated cursor */}
      {cursorVisible && (
        <svg
          className="absolute pointer-events-none z-20 transition-all duration-500 ease-out"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: cursorClicking ? "scale(0.8)" : "scale(1)",
          }}
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
        >
          <path
            d="M1 1L1 17L5.5 13L9.5 21L12.5 19.5L8.5 11.5L14 11L1 1Z"
            fill="#1A1A1A"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </div>
  );
}

/* ===================
   FEATURES SECTION
   =================== */
export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="section-padding bg-cream">
      <div className="container-site">
        {/* Header */}
        <div className="mb-10 sm:mb-14 md:mb-20">
          <span className="section-label">Technologie & Précision</span>
          <h2 className="mt-3 sm:mt-4 max-w-2xl text-charcoal">
            Une approche{" "}
            <span className="font-organic">sur mesure</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-stone max-w-lg">
            Diagnostic avancé, suivi personnalisé et technologies de pointe
            pour des résultats à la hauteur de vos attentes.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {/* Card 1 — Diagnostic Shuffler */}
          <div className="feature-card rounded-[2rem] bg-white border border-stone-light/20 p-5 sm:p-6 lg:p-7 overflow-hidden">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="w-10 h-10 rounded-xl bg-charcoal/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-rose-dark" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-charcoal">Analyse Cutanée</h3>
                <p className="text-xs text-stone mt-0.5">Diagnostic en temps réel</p>
              </div>
            </div>
            <DiagnosticShuffler />
          </div>

          {/* Card 2 — Treatment Journey */}
          <div className="feature-card rounded-[2rem] bg-white border border-stone-light/20 p-5 sm:p-6 lg:p-7 overflow-hidden">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="w-10 h-10 rounded-xl bg-rose/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-charcoal">Votre Parcours</h3>
                <p className="text-xs text-stone mt-0.5">Du diagnostic au résultat</p>
              </div>
            </div>
            <TreatmentJourney />
          </div>

          {/* Card 3 — Cursor Scheduler */}
          <div className="feature-card rounded-[2rem] bg-white border border-stone-light/20 p-5 sm:p-6 lg:p-7 overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="w-10 h-10 rounded-xl bg-charcoal/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-rose-dark" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-charcoal">Votre Planning</h3>
                <p className="text-xs text-stone mt-0.5">Planification des soins</p>
              </div>
            </div>
            <CursorScheduler />
          </div>
        </div>
      </div>
    </section>
  );
}
