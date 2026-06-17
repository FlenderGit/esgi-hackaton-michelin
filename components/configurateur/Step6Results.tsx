"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { WizardAnswers } from "@/app/configurateur/data";
import { getWizardResults, getBrand } from "@/app/configurateur/data";

function TirePlaceholder({
  accent,
  size = 120,
}: {
  accent: string;
  size?: number;
}) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 120 120" width={size} height={size} fill="none">
        <circle
          cx="60"
          cy="60"
          r="56"
          stroke={accent}
          strokeWidth="8"
          opacity="0.15"
        />
        <circle
          cx="60"
          cy="60"
          r="48"
          stroke={accent}
          strokeWidth="3"
          opacity="0.3"
        />
        <circle
          cx="60"
          cy="60"
          r="38"
          stroke={accent}
          strokeWidth="1.5"
          opacity="0.2"
        />
        <circle cx="60" cy="60" r="18" fill={accent} opacity="0.1" />
        <circle cx="60" cy="60" r="10" fill={accent} opacity="0.25" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1={60 + 20 * Math.cos((angle * Math.PI) / 180)}
            y1={60 + 20 * Math.sin((angle * Math.PI) / 180)}
            x2={60 + 46 * Math.cos((angle * Math.PI) / 180)}
            y2={60 + 46 * Math.sin((angle * Math.PI) / 180)}
            stroke={accent}
            strokeWidth="2"
            opacity="0.15"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}

function StatBar({
  value,
  max = 5,
  color,
}: {
  value: number;
  max?: number;
  color: string;
}) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className="h-1.5 flex-1 rounded-full transition-all"
          style={{
            background: i < value ? color : "var(--color-q-border)",
            opacity: i < value ? 0.9 : 0.2,
          }}
        />
      ))}
    </div>
  );
}

function ScoreRing({ score, accent }: { score: number; accent: string }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-[72px] h-[72px]">
      <svg viewBox="0 0 64 64" width="72" height="72" className="-rotate-90">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="var(--color-q-border)"
          strokeWidth="4"
          opacity="0.2"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke={accent}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <span className="absolute text-sm font-black tabular-nums text-q-text">
        {score}%
      </span>
    </div>
  );
}

const RANK_LABELS = ["1er choix", "2e choix", "3e choix"];

interface Step6ResultsProps {
  answers: WizardAnswers;
  onRefine: () => void;
}

export default function Step6Results({ answers, onRefine }: Step6ResultsProps) {
  const results = getWizardResults(answers);
  const [expanded, setExpanded] = useState<string | null>(null);

  const topResults = results.filter((t) => t.match > 20).slice(0, 3);

  return (
    <div className="space-y-10">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-2">
          Résultats
        </p>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-q-text">
          Tes pneus recommandés
        </h2>
        <p className="text-sm mt-2 text-q-text-muted">
          Top {topResults.length} · scores basés sur ton profil
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3 items-stretch pt-12">
        {topResults.map((tire, i) => {
          const brand = getBrand(tire.brandId);
          const isExpanded = expanded === tire.id;
          const isTop = i === 0;

          return (
            <motion.div
              key={tire.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex flex-col transition-all duration-200"
            >
              {isTop && (
                <Image
                  src="/images/bibendoum.png"
                  alt="Bibendum Michelin"
                  width={90}
                  height={90}
                  className="absolute -top-11 left-3 z-10 drop-shadow-lg"
                />
              )}

              <div
                className={`relative flex flex-col flex-1 rounded-2xl overflow-hidden border-2 ${
                  isTop
                    ? "border-q-yellow/60 shadow-[0_0_40px_rgba(252,229,0,0.1)]"
                    : "border-q-border/40 hover:border-q-border/70"
                }`}
              >
                {isTop ? (
                  <div className="h-11 bg-q-yellow flex items-center">
                    <span className="ml-26 text-base font-black italic uppercase tracking-wide text-black">
                      Meilleur choix
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-2.5 bg-q-card/60 border-b border-q-border/20">
                    <span
                      className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{
                        background: brand.accent + "25",
                        color: brand.accent,
                      }}
                    >
                      {RANK_LABELS[i]}
                    </span>
                  </div>
                )}

                <div className="flex flex-col items-center pt-5 pb-4 px-5 bg-q-card/40">
                  <TirePlaceholder
                    accent={brand.accent}
                    size={isTop ? 130 : 110}
                  />

                  <div className="mt-4 text-center">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-md"
                      style={{
                        background: brand.accent + "20",
                        color: brand.accent,
                      }}
                    >
                      {brand.name}
                    </span>
                    <h3 className="font-black text-lg text-q-text mt-2 leading-tight">
                      {tire.model}
                    </h3>
                    <p className="text-xs mt-1 text-q-text-muted">
                      {tire.idealFor}
                    </p>
                  </div>

                  <div className="mt-4">
                    <ScoreRing
                      score={tire.match}
                      accent={isTop ? "var(--color-q-yellow)" : brand.accent}
                    />
                  </div>
                </div>

                <div className="px-5 py-4 bg-q-card/20 border-t border-q-border/20 space-y-3 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-q-text-muted">Prix</span>
                    <span className="font-bold text-q-text">
                      {tire.priceEur}€
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-q-text-muted">Poids</span>
                    <span className="font-bold text-q-text">
                      {tire.weightG}g
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-q-text-muted">Montage</span>
                    <span className="font-bold text-q-text text-right">
                      {tire.tubeless ? "Tubeless Ready" : "Tubetype"}
                    </span>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 bg-q-card/20">
                  <button
                    onClick={() => setExpanded(isExpanded ? null : tire.id)}
                    className="w-full py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer border"
                    style={{
                      background: isTop
                        ? "rgba(252,229,0,0.1)"
                        : brand.accent + "10",
                      color: isTop ? "var(--color-q-yellow)" : brand.accent,
                      borderColor: isTop
                        ? "rgba(252,229,0,0.2)"
                        : brand.accent + "25",
                    }}
                  >
                    {isExpanded ? "Masquer" : "Détails"}
                  </button>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-4 border-t border-q-border/20 bg-q-card/30">
                        <p className="text-sm pt-4 leading-relaxed text-q-text-sub">
                          {tire.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {tire.features.map((f) => (
                            <span
                              key={f}
                              className="text-[11px] px-2 py-0.5 rounded-full bg-q-border/15 text-q-text-muted border border-q-border/20"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                        <div className="space-y-2.5 pt-1">
                          {[
                            { label: "Roulement", val: tire.rollingScore },
                            { label: "Grip sec", val: tire.gripDry },
                            { label: "Grip mouillé", val: tire.gripWet },
                            {
                              label: "Protection",
                              val: tire.punctureProtection,
                            },
                          ].map((stat) => (
                            <div key={stat.label} className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-semibold uppercase tracking-wide text-q-text-dim">
                                  {stat.label}
                                </span>
                                <span className="text-[10px] font-bold text-q-text-muted">
                                  {stat.val}/5
                                </span>
                              </div>
                              <StatBar
                                value={stat.val}
                                color={
                                  isTop ? "var(--color-q-yellow)" : brand.accent
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Comparatif rapide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-2xl border border-q-border/30 overflow-hidden"
      >
        <div className="px-6 py-4 bg-q-card/40 border-b border-q-border/20">
          <h3 className="font-bold text-q-text">Comparatif rapide</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-q-border/20">
                <th className="text-left px-6 py-3 text-q-text-dim font-semibold text-xs uppercase tracking-wider">
                  Critère
                </th>
                {topResults.map((tire, i) => {
                  const brand = getBrand(tire.brandId);
                  return (
                    <th key={tire.id} className="px-4 py-3 text-center">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{
                          background: brand.accent + "20",
                          color: brand.accent,
                        }}
                      >
                        {tire.model}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Match", key: "match" as const, suffix: "%" },
                { label: "Prix", key: "priceEur" as const, suffix: "€" },
                { label: "Poids", key: "weightG" as const, suffix: "g" },
                {
                  label: "Roulement",
                  key: "rollingScore" as const,
                  suffix: "/5",
                },
                { label: "Grip sec", key: "gripDry" as const, suffix: "/5" },
                {
                  label: "Grip mouillé",
                  key: "gripWet" as const,
                  suffix: "/5",
                },
                {
                  label: "Protection",
                  key: "punctureProtection" as const,
                  suffix: "/5",
                },
              ].map((row, ri) => {
                const values = topResults.map((t) => t[row.key] as number);
                const best =
                  row.key === "priceEur" || row.key === "weightG"
                    ? Math.min(...values)
                    : Math.max(...values);

                return (
                  <tr
                    key={row.label}
                    className={ri % 2 === 0 ? "bg-q-card/20" : ""}
                  >
                    <td className="px-6 py-2.5 text-q-text-muted font-medium">
                      {row.label}
                    </td>
                    {topResults.map((tire) => {
                      const val = tire[row.key] as number;
                      const isBest = val === best;
                      return (
                        <td key={tire.id} className="px-4 py-2.5 text-center">
                          <span
                            className={`tabular-nums ${isBest ? "font-bold text-q-yellow" : "text-q-text-sub"}`}
                          >
                            {val}
                            {row.suffix}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="pt-4 flex flex-col items-center gap-3">
        <button
          onClick={onRefine}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition cursor-pointer border-2 border-q-border/50 text-q-text-muted hover:border-q-yellow/40 hover:text-q-text"
        >
          ↻ Recommencer la recherche
        </button>
        <p className="text-center text-xs text-q-text-dim/50">
          Données basées sur les gammes réelles 2025-2026.
        </p>
      </div>
    </div>
  );
}
