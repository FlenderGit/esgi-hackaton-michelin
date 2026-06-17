"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";

const FEATURES = [
  {
    icon: "🎯",
    title: "Personnalisé",
    desc: "Recommandations basées sur ton profil et ta pratique",
  },
  {
    icon: "⚡",
    title: "Rapide",
    desc: "5 étapes simples, résultats instantanés",
  },
  {
    icon: "🏆",
    title: "Expert",
    desc: "Données réelles des gammes Michelin 2025-2026",
  },
];

export default function IntroClient() {
  // Reset de la progression à chaque accès au configurateur (page d'intro)
  // pour s'assurer qu'on reparte toujours de zéro si on avait déjà fait le parcours.
  useEffect(() => {
    try {
      localStorage.removeItem("michelin-configurateur");
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="min-h-screen bg-q-bg text-q-text">
      <Navbar />

      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/background.jpg"
            alt="Cycliste en action"
            fill
            className="object-cover animate-ken-burns"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-q-bg via-q-bg/70 to-q-bg/30" />
        <div className="absolute inset-0 bg-linear-to-r from-q-bg/80 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 w-full pt-24 pb-16">
          <div className="flex items-center gap-8">
            <div className="max-w-2xl flex-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-4">
                  Configurateur de pneus
                </p>
                <h1 className="text-4xl md:text-6xl font-black leading-tight">
                  Trouve ton pneu
                  <br />
                  <span className="text-secondary">idéal.</span>
                </h1>
                <p className="mt-6 text-q-text-sub text-lg leading-relaxed max-w-lg">
                  Réponds à quelques questions sur ta pratique du vélo — profil,
                  terrain, priorités — et notre algorithme te recommande les
                  pneus Michelin les mieux adaptés.
                </p>
              </motion.div>

              <motion.div
                className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {FEATURES.map((f) => (
                  <div
                    key={f.title}
                    className="flex items-start gap-3 p-4 rounded-xl bg-q-card/40 backdrop-blur-sm border border-q-border/20"
                  >
                    <span className="text-2xl shrink-0">{f.icon}</span>
                    <div>
                      <p className="font-bold text-sm text-q-text">{f.title}</p>
                      <p className="text-xs text-q-text-muted mt-0.5 leading-snug">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Link
                  href="/configurateur/questionnaire"
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-secondary text-neutral font-bold text-lg transition-all hover:brightness-110 cursor-pointer"
                >
                  Commencer
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    width="18"
                    height="18"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <p className="text-xs text-q-text-dim mt-4">
                  Gratuit · 2 minutes · résultats instantanés
                </p>
              </motion.div>
            </div>

            <motion.div
              className="hidden lg:block shrink-0"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Image
                src="/images/bibendoum_run.webp"
                alt="Bibendum Michelin"
                width={340}
                height={340}
                className="drop-shadow-2xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
