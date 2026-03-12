import Link from "next/link";

const footerLinks = {
  Protocoles: [
    { label: "Injections & Volumétrie", href: "#protocols" },
    { label: "Laser & Régénération", href: "#protocols" },
    { label: "Skincare Médical", href: "#protocols" },
    { label: "Peelings & Mésothérapie", href: "#protocols" },
  ],
  Clinique: [
    { label: "Notre Philosophie", href: "#philosophy" },
    { label: "L'Équipe Médicale", href: "#" },
    { label: "Technologies", href: "#" },
    { label: "Résultats Cliniques", href: "#" },
  ],
  Informations: [
    { label: "Adhésion", href: "#membership" },
    { label: "Journal", href: "#" },
    { label: "Carrières", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="bg-charcoal text-white"
      style={{ borderRadius: "4rem 4rem 0 0" }}
    >
      <div className="container-site pt-14 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 mb-14 sm:mb-16 md:mb-20">
          {/* Left — Brand */}
          <div>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight">Clinique Élara</p>
            <p className="mt-3 text-white/40 text-sm sm:text-[15px] max-w-sm leading-relaxed">
              Médecine esthétique de précision. Où la science rencontre la beauté
              dans sa forme la plus pure.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="#membership"
                className="inline-flex items-center gap-2 rounded-full bg-rose px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-rose-dark hover:scale-[1.02]"
              >
                Prendre rendez-vous
              </Link>
            </div>
          </div>

          {/* Right — Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {Object.entries(footerLinks).map(([cat, links]) => (
              <div key={cat}>
                <p className="font-telemetry text-white/30 text-[10px] mb-4 sm:mb-5">
                  {cat}
                </p>
                <ul className="space-y-2.5">
                  {links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/50 hover:text-white transition-colors duration-200 inline-block py-0.5"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/10" />

        {/* Bottom bar */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* System operational indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="font-telemetry text-white/40 text-[9px]">
                Système opérationnel
              </span>
            </div>
          </div>

          <p className="text-xs text-white/25 text-center sm:text-left">
            © {new Date().getFullYear()} Clinique Élara. Tous droits réservés.
            Paris, France.
          </p>

          <div className="flex gap-5">
            <Link
              href="#"
              className="text-xs text-white/30 hover:text-white/60 transition-colors py-1"
            >
              Mentions légales
            </Link>
            <Link
              href="#"
              className="text-xs text-white/30 hover:text-white/60 transition-colors py-1"
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
