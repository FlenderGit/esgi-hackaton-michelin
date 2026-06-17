"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { QuizMode } from "@/app/questionnaire/data";

interface QuizIntroProps {
  onStart: (mode: QuizMode) => void;
}

export default function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/background.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay — intentionally hardcoded so the text stays lisible en mode clair */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 w-full pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-secondary">
            Test de personnalité
          </p>

          <h1 className="text-4xl md:text-6xl font-black leading-tight text-white">
            Découvre ta
            <br />
            <span className="text-secondary">cyclo-personnalité</span>
          </h1>

          <p className="text-lg text-white/70 leading-relaxed max-w-lg">
            20 questions pour découvrir quel cycliste tu es vraiment. Sois
            honnête — ou pas, on jugera quand même.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => onStart("quick")}
            className="flex-1 flex flex-col items-start gap-2 p-5 rounded-2xl border-2 border-secondary/40 bg-secondary/5 hover:bg-secondary/10 hover:border-secondary/70 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span className="font-black text-white text-lg">Mode Rapide</span>
            </div>
            <p className="text-sm text-white/60">8 questions · ~2 minutes</p>
          </button>

          <button
            onClick={() => onStart("full")}
            className="flex-1 flex flex-col items-start gap-2 p-5 rounded-2xl border-2 border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🎯</span>
              <span className="font-black text-white text-lg">
                Mode Complet
              </span>
            </div>
            <p className="text-sm text-white/60">20 questions · ~5 minutes</p>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-xs text-white/40"
        >
          5 profils possibles · résultats instantanés · gratuit
        </motion.p>
      </div>
    </section>
  );
}
