"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, Brain, Calendar } from "lucide-react";

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
   CARD 2 — Telemetry Typewriter
   ============================== */
function TelemetryTypewriter() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const messages = [
    "Analyse morphologique 3D en cours...",
    "Cartographie des volumes faciaux...",
    "Calibration du protocole acide hyaluronique...",
    "Évaluation de la qualité cutanée...",
    "Planification des points d'injection...",
    "Simulation du résultat post-traitement...",
  ];

  useEffect(() => {
    const msg = messages[currentMessage];
    let charIndex = 0;
    setIsTyping(true);
    setDisplayText("");

    const typeInterval = setInterval(() => {
      if (charIndex <= msg.length) {
        setDisplayText(msg.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          setCurrentMessage((prev) => (prev + 1) % messages.length);
        }, 2000);
      }
    }, 45);

    return () => clearInterval(typeInterval);
  }, [currentMessage]);

  return (
    <div className="space-y-4">
      {/* Live feed header */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose" />
        </span>
        <span className="font-telemetry text-rose text-[10px]">Analyse en cours</span>
      </div>

      {/* Terminal */}
      <div className="bg-charcoal rounded-xl p-4 sm:p-5 font-mono text-sm">
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-rose/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-stone/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-stone/40" />
          <span className="ml-auto font-telemetry text-white/20 text-[9px]">clinique_v3.2</span>
        </div>

        {/* Past messages */}
        <div className="space-y-1.5 mb-2">
          {messages
            .slice(Math.max(0, currentMessage - 2), currentMessage)
            .map((msg, i) => (
              <p key={i} className="text-white/20 text-xs">
                <span className="text-rose-dark/40 mr-2">$</span>
                {msg}
                <span className="text-rose-dark/30 ml-2">✓</span>
              </p>
            ))}
        </div>

        {/* Current message */}
        <p className="text-white/80 text-xs">
          <span className="text-rose-dark mr-2">$</span>
          {displayText}
          {isTyping && (
            <span className="inline-block w-[6px] h-[14px] bg-rose ml-0.5 animate-blink align-middle" />
          )}
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Latence", value: "0.3ms" },
          { label: "Précision", value: "99.2%" },
          { label: "Protocoles", value: "147" },
        ].map((m) => (
          <div key={m.label} className="text-center p-2 rounded-lg bg-cream-dark/50">
            <p className="font-telemetry text-stone text-[9px]">{m.label}</p>
            <p className="text-sm font-semibold text-charcoal mt-0.5">{m.value}</p>
          </div>
        ))}
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

          {/* Card 2 — Telemetry Typewriter */}
          <div className="feature-card rounded-[2rem] bg-white border border-stone-light/20 p-5 sm:p-6 lg:p-7 overflow-hidden">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="w-10 h-10 rounded-xl bg-rose/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-rose" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-charcoal">Suivi Traitement</h3>
                <p className="text-xs text-stone mt-0.5">Monitoring continu</p>
              </div>
            </div>
            <TelemetryTypewriter />
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
