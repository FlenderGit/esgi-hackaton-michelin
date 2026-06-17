"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Profile } from "@/app/questionnaire/data";

interface QuizResultProps {
  profile: Profile;
  onRestart: () => void;
}

export default function QuizResult({ profile, onRestart }: QuizResultProps) {
  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Profile card — fond sombre fixe pour que le texte reste lisible */}
          <div
            className="rounded-3xl border-2 overflow-hidden"
            style={{ borderColor: profile.accentColor + "50", backgroundColor: profile.bgColor }}
          >
            <div
              className="h-2 w-full"
              style={{ backgroundColor: profile.accentColor }}
            />

            <div className="p-8 md:p-10 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-[0.3em] mb-2"
                    style={{ color: profile.accentColor }}
                  >
                    Ton profil
                  </p>
                  <h1
                    className="text-4xl md:text-5xl font-black"
                    style={{ color: profile.accentColor }}
                  >
                    {profile.name}
                  </h1>
                  <p className="mt-1 text-sm font-semibold text-white/50">
                    {profile.tagline}
                  </p>
                </div>
                <motion.span
                  className="text-6xl"
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  {profile.emoji}
                </motion.span>
              </div>

              <p className="text-white/70 leading-relaxed text-base">
                {profile.description}
              </p>

              <div className="border-t border-white/10" />

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/configurateur"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-neutral transition-all hover:brightness-110"
                  style={{ backgroundColor: profile.accentColor }}
                >
                  Trouver mon pneu →
                </Link>
                <button
                  onClick={onRestart}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white/60 border border-white/20 hover:text-white hover:border-white/40 transition-all cursor-pointer"
                >
                  ↻ Recommencer
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-q-text-dim mt-6">
            5 profils possibles — et toi, t'es lequel ?
          </p>
        </motion.div>
      </div>
    </div>
  );
}
