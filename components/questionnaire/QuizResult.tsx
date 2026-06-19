"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Profile } from "@/app/questionnaire/data";

interface QuizResultProps {
  profile: Profile;
  onRestart: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function QuizResult({ profile, onRestart }: QuizResultProps) {
  const accent = profile.accentColor;

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-6 py-16">
      <motion.div
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        animate="show"
        className="grid w-full max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16"
      >
        {/* ── Texte ───────────────────────────────────────────────── */}
        <div className="order-2 md:order-1">
          <motion.div variants={fade} className="flex items-center gap-3">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-q-text-muted">
              Ta cyclo-personnalité
            </span>
          </motion.div>

          <motion.h1
            variants={fade}
            className="mt-6 text-4xl md:text-5xl font-black tracking-tight text-q-text"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={fade}
            className="mt-2 text-base font-medium"
            style={{ color: accent }}
          >
            {profile.tagline}
          </motion.p>

          <motion.p
            variants={fade}
            className="mt-6 text-base leading-relaxed text-q-text-sub"
          >
            {profile.description}
          </motion.p>

          <motion.div
            variants={fade}
            className="mt-8 h-px w-full bg-q-border/50"
          />

          <motion.div
            variants={fade}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/configurateur"
              className="group flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-q-yellow px-6 py-3.5 text-sm font-bold text-q-bg transition-all hover:brightness-105"
            >
              Trouver mon pneu
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <button
              onClick={onRestart}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-q-border px-6 py-3.5 text-sm font-bold text-q-text-muted transition-all hover:border-q-text-muted hover:text-q-text cursor-pointer"
            >
              Refaire le test
            </button>
          </motion.div>
        </div>

        {/* ── Bibendum ────────────────────────────────────────────── */}
        <motion.div
          variants={fade}
          className="order-1 md:order-2 relative flex justify-center"
        >
          <Image
            src="/images/bibendum-hello.png"
            alt="Bibendum Michelin"
            width={420}
            height={400}
            priority
            className="relative w-64 md:w-80 h-auto drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
