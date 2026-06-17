import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "La légende", href: "/legende" },
  { label: "Nos champions", href: "#champions" },
];

const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "X (Twitter)", href: "#" },
  { label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral border-t border-white/10 px-8 py-16 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="flex flex-col gap-4">
            <Image
              src="/images/logo.png"
              alt="Michelin"
              width={100}
              height={40}
            />
            <p className="max-w-xs text-sm text-white/40">
              Au service des champions du cyclisme depuis 1891.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">
              Navigation
            </h4>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/40 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">
              Suivez-nous
            </h4>
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-white/40 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">
              Légal
            </h4>
            <Link
              href="#"
              className="text-sm text-white/40 transition-colors hover:text-white"
            >
              Mentions légales
            </Link>
            <Link
              href="#"
              className="text-sm text-white/40 transition-colors hover:text-white"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="#"
              className="text-sm text-white/40 transition-colors hover:text-white"
            >
              Cookies
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-8 md:flex-row md:justify-between">
          <p className="text-xs text-white/30">
            © 2026 Michelin. Tous droits réservés.
          </p>
          <p className="text-xs text-white/30">Une expérience Michelin Vélo</p>
        </div>
      </div>
    </footer>
  );
}
