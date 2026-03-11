"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    name: "Essentiel",
    price: "250",
    period: "/mois",
    description: "Diagnostic initial et protocole de base pour découvrir la médecine esthétique de précision.",
    features: [
      "Bilan cutané annuel",
      "2 séances mensuelles",
      "Protocole skincare personnalisé",
      "Accès à l'app de suivi",
      "Support par messagerie",
    ],
    cta: "Commencer",
    featured: false,
  },
  {
    name: "Performance",
    price: "590",
    period: "/mois",
    description: "Protocole complet avec suivi épigénétique et accès prioritaire à nos technologies.",
    features: [
      "Diagnostic épigénétique complet",
      "4 séances mensuelles",
      "Injections et traitements laser",
      "Suivi biologique trimestriel",
      "Consultation vidéo illimitée",
      "Accès prioritaire nouveaux soins",
    ],
    cta: "S'inscrire",
    featured: true,
  },
  {
    name: "Élite",
    price: "1 200",
    period: "/mois",
    description: "Programme sur mesure avec votre médecin dédié et accès exclusif à tous nos protocoles.",
    features: [
      "Tout le plan Performance",
      "Médecin référent dédié",
      "Séances illimitées",
      "Protocoles régénératifs avancés",
      "Conciergerie santé 24/7",
      "Événements privés et avant-premières",
    ],
    cta: "Nous contacter",
    featured: false,
  },
];

export default function Membership() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".pricing-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.12,
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
    <section id="membership" ref={sectionRef} className="section-padding bg-cream-light">
      <div className="container-site">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-20">
          <span className="section-label">Adhésion</span>
          <h2 className="mt-3 sm:mt-4 mx-auto max-w-xl text-charcoal">
            Investissez dans votre{" "}
            <span className="font-organic">biologie</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-stone max-w-md mx-auto">
            Trois programmes conçus pour chaque étape de votre parcours esthétique.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 max-w-[1100px] mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card rounded-[2rem] p-6 sm:p-7 lg:p-8 flex flex-col transition-all duration-300 ${
                tier.featured
                  ? "bg-charcoal text-white shadow-[0_16px_60px_rgba(26,26,26,0.25)] md:-translate-y-3"
                  : "bg-white border border-stone-light/20"
              }`}
            >
              {/* Badge */}
              {tier.featured && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[11px] font-medium tracking-wide uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose" />
                    Recommandé
                  </span>
                </div>
              )}

              <h3 className={`text-xl font-bold ${tier.featured ? "text-white" : "text-charcoal"}`}>
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mt-4 mb-2 flex items-baseline gap-1">
                <span className={`text-4xl sm:text-5xl font-bold tracking-tight ${
                  tier.featured ? "text-white" : "text-charcoal"
                }`}>
                  {tier.price}€
                </span>
                <span className={`text-sm ${tier.featured ? "text-white/50" : "text-stone"}`}>
                  {tier.period}
                </span>
              </div>

              <p className={`text-sm leading-relaxed mb-6 ${
                tier.featured ? "text-white/60" : "text-stone"
              }`}>
                {tier.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      tier.featured ? "text-rose-light" : "text-rose"
                    }`} />
                    <span className={`text-sm ${
                      tier.featured ? "text-white/80" : "text-charcoal/80"
                    }`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium transition-all duration-300 group ${
                  tier.featured
                    ? "bg-rose text-white hover:bg-rose-dark hover:scale-[1.02]"
                    : "bg-charcoal text-white hover:bg-charcoal-light hover:scale-[1.02]"
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <p className="text-center mt-8 sm:mt-10 text-stone text-xs sm:text-sm">
          Sans engagement. Annulation à tout moment. Première consultation offerte.
        </p>
      </div>
    </section>
  );
}
