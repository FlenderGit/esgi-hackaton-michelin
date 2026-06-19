"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "La légende", href: "/legende" },
  { label: "Nos champions", href: "/champions" },
  { label: "Innovations", href: "/innovations" },
  { label: "Nos partenaires", href: "/nos-partenaires" },
  { label: "Carte", href: "/map" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <nav
        className={`fixed  top-0 left-0 z-999 flex w-full items-center justify-between px-6 py-4 md:px-8 md:py-6 lg:px-16 ${isHome ? "bg-transparent" : "bg-q-bg"}`}
      >
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Michelin"
            width={90}
            height={36}
            className="md:h-12 md:w-30"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`group relative text-sm font-medium transition-colors ${isActive ? "text-secondary" : "text-q-text"}`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/questionnaire"
            className="inline-flex items-center justify-center rounded-full border border-secondary/60 px-6 py-3 text-sm font-bold text-secondary transition-all hover:bg-secondary/10"
          >
            Ma cyclo-personnalité
          </Link>
          <Link
            href="/configurateur"
            className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-bold text-neutral transition-opacity hover:opacity-90"
          >
            Trouver mon pneu
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span
            className={`h-0.5 w-6 bg-q-text transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
          />
          <span
            className={`h-0.5 w-6 bg-q-text transition-all duration-300 ${menuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`h-0.5 w-6 bg-q-text transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-q-bg/95 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/questionnaire"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center rounded-full border border-secondary/60 px-6 py-3 text-sm font-bold text-secondary"
            >
              Ma cyclo-personnalité
            </Link>
            <Link
              href="/configurateur"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-bold text-neutral"
            >
              Trouver mon pneu
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
