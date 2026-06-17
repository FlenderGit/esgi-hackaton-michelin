"use client";

import Image from "next/image";
import type { RiderProfile, WizardAnswers } from "@/app/configurateur/data";
import { RIDER_PROFILES } from "@/app/configurateur/data";

const PROFILE_META: Record<
  RiderProfile,
  { emoji: string; gradient: string; image?: string }
> = {
  grand_rouleur: {
    emoji: "🚴",
    gradient: "from-blue-600/20 to-primary/10",
    image: "/images/victorlafay.jpg",
  },
  reprise_vtt: {
    emoji: "🏔️",
    gradient: "from-green-600/20 to-emerald-500/10",
    image: "/images/Jeromeclmentz.jpg",
  },
  debutant: { emoji: "🌟", gradient: "from-yellow-500/20 to-amber-400/10" },
  competiteur: {
    emoji: "🏆",
    gradient: "from-red-600/20 to-rose-500/10",
    image: "/images/juliebresset.jpg",
  },
  balades: { emoji: "🌿", gradient: "from-purple-600/20 to-violet-500/10" },
  velotaf: { emoji: "🏙️", gradient: "from-teal-600/20 to-cyan-500/10" },
};

interface Step1ProfileProps {
  answers: WizardAnswers;
  onChange: (profile: RiderProfile) => void;
}

export default function Step1Profile({ answers, onChange }: Step1ProfileProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          Étape 1
        </p>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-q-text">
          Quel rouleur es-tu ?
        </h2>
        <p className="text-q-text-muted">
          On adapte tout à ton profil.{" "}
          <span className="text-q-yellow">Tu pourras affiner ensuite.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RIDER_PROFILES.map((p) => {
          const sel = answers.profile === p.id;
          const meta = PROFILE_META[p.id];
          return (
            <button
              key={p.id}
              onClick={() => onChange(p.id)}
              aria-pressed={sel}
              className={`group relative flex flex-col overflow-hidden rounded-2xl text-left transition-all duration-300 cursor-pointer border-2 ${
                sel
                  ? "border-q-yellow shadow-[0_0_24px_rgba(252,229,0,0.15)]"
                  : "border-q-border/50 hover:border-q-yellow/30 hover:shadow-lg hover:shadow-q-yellow/5"
              }`}
            >
              {meta.image && (
                <div className="relative h-28 overflow-hidden">
                  <Image
                    src={meta.image}
                    alt={p.label}
                    fill
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${sel ? "brightness-110" : "brightness-75"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-q-bg to-transparent" />
                </div>
              )}

              {!meta.image && (
                <div
                  className={`h-20 bg-gradient-to-br ${meta.gradient} flex items-center justify-center`}
                >
                  <span className="text-3xl">{meta.emoji}</span>
                </div>
              )}

              <div className="p-4 bg-q-card/60 backdrop-blur-sm flex-1 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-bold text-[15px] ${sel ? "text-q-yellow" : "text-q-text"}`}
                  >
                    {p.label}
                  </p>
                  <p className="text-sm text-q-text-muted mt-0.5 leading-snug">
                    {p.desc}
                  </p>
                </div>

                <span
                  className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all mt-0.5 ${
                    sel
                      ? "border-q-yellow bg-q-yellow"
                      : "border-q-border/60 group-hover:border-q-text-dim"
                  }`}
                >
                  {sel && (
                    <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="#000C34"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
