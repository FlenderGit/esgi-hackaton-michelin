"use client";

import { useState, useEffect } from "react";
import type { Profile, AnswerKey } from "../data";
import MichelinLogo from "./MichelinLogo";
import ThemeToggle from "./ThemeToggle";

interface ResultCardProps {
  profile: Profile;
  answers: Record<number, AnswerKey>;
  onRestart: () => void;
}

const ANSWER_LABELS: Record<AnswerKey, string> = {
  a: "Pédale Douce",
  b: "Grosse Pédale",
  c: "Tryharder",
  d: "Cyclo-Führer",
};

const ANSWER_COLORS: Record<AnswerKey, string> = {
  a: "#10B981",
  b: "#EF4444",
  c: "#3B82F6",
  d: "#8B5CF6",
};

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function ResultCard({
  profile,
  answers,
  onRestart,
}: ResultCardProps) {
  const [animated, setAnimated] = useState(false);
  const [instaCopied, setInstaCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  const answerValues = Object.values(answers);
  const total = answerValues.length;
  const counts: Record<AnswerKey, number> = { a: 0, b: 0, c: 0, d: 0 };
  answerValues.forEach((k) => counts[k]++);

  const shareText = `Je suis "${profile.name}" — ${profile.tagline} ! Découvre ton profil cycliste Michelin 🚲 #Michelin #Cyclisme`;
  const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(shareText)}`;

  async function handleInstagram() {
    try {
      await navigator.clipboard.writeText(shareText);
      setInstaCopied(true);
      setTimeout(() => setInstaCopied(false), 3000);
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className="min-h-screen bg-q-bg flex flex-col">
      <header className="px-6 py-5 border-b border-q-border-sub">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <MichelinLogo />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={onRestart}
              className="text-q-text-muted text-sm hover:text-q-text transition-colors"
            >
              Recommencer
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div
          className="w-full max-w-2xl mx-auto space-y-6"
          style={{ animation: "fadeSlideIn 0.45s ease-out both" }}
        >
          <p className="text-center text-q-text-muted text-xs uppercase tracking-widest">
            Ton profil est…
          </p>

          <div
            className="rounded-3xl border p-8 sm:p-10 text-center space-y-5"
            style={{
              borderColor: `${profile.accentColor}30`,
              backgroundColor: profile.bgColor,
            }}
          >
            <div
              className="text-6xl sm:text-7xl"
              style={{ animation: "scaleIn 0.5s ease-out both 0.2s" }}
            >
              {profile.emoji}
            </div>

            <div className="space-y-1">
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: profile.accentColor }}
              >
                {profile.tagline}
              </p>
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {profile.name}
              </h1>
            </div>

            <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
              {profile.description}
            </p>

            <div
              className="inline-block w-16 h-1 rounded-full"
              style={{ backgroundColor: profile.accentColor }}
            />
          </div>

          <div className="bg-q-card border border-q-border rounded-2xl p-6 space-y-4">
            <h3 className="text-q-text-dim text-xs uppercase tracking-widest">
              Répartition de tes réponses
            </h3>
            <div className="space-y-3">
              {(Object.keys(counts) as AnswerKey[]).map((key, i) => {
                const count = counts[key];
                const pct = total > 0 ? (count / total) * 100 : 0;
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-q-text-muted">
                        {ANSWER_LABELS[key]}
                      </span>
                      <span className="text-q-text-dim tabular-nums">
                        {count} / {total}
                      </span>
                    </div>
                    <div className="h-1 bg-q-border-track rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: animated ? `${pct}%` : "0%",
                          backgroundColor: ANSWER_COLORS[key],
                          transitionDelay: `${i * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={onRestart}
              className="w-full py-4 rounded-xl bg-q-yellow text-black font-bold text-base hover:bg-[#FFE033] active:scale-95 transition-all duration-150 cursor-pointer"
            >
              Rejouer
            </button>

            <div className="bg-q-card border border-q-border rounded-2xl p-5 space-y-4">
              <p className="text-q-text-dim text-xs uppercase tracking-widest text-center">
                Partager mon profil
              </p>

              <div className="flex items-center justify-center gap-3">
                <a
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2"
                  aria-label="Partager sur X"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-2xl border border-q-border bg-q-bg text-q-text-muted group-hover:border-white/30 group-hover:text-white group-hover:bg-white/5 transition-all duration-200">
                    <XIcon />
                  </span>
                  <span className="text-[10px] text-q-text-dim group-hover:text-q-text-muted transition-colors">
                    X
                  </span>
                </a>

                <a
                  href={fbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2"
                  aria-label="Partager sur Facebook"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-2xl border border-q-border bg-q-bg text-q-text-muted group-hover:border-[#1877F2]/40 group-hover:text-[#1877F2] group-hover:bg-[#1877F2]/5 transition-all duration-200">
                    <FacebookIcon />
                  </span>
                  <span className="text-[10px] text-q-text-dim group-hover:text-q-text-muted transition-colors">
                    Facebook
                  </span>
                </a>

                <button
                  onClick={handleInstagram}
                  className="group flex flex-col items-center gap-2 cursor-pointer"
                  aria-label="Copier pour Instagram"
                >
                  <span
                    className={[
                      "flex items-center justify-center w-12 h-12 rounded-2xl border transition-all duration-200",
                      instaCopied
                        ? "border-[#E1306C]/40 text-[#E1306C] bg-[#E1306C]/5"
                        : "border-q-border bg-q-bg text-q-text-muted group-hover:border-[#E1306C]/40 group-hover:text-[#E1306C] group-hover:bg-[#E1306C]/5",
                    ].join(" ")}
                  >
                    <InstagramIcon />
                  </span>
                  <span className="text-[10px] text-q-text-dim group-hover:text-q-text-muted transition-colors">
                    Instagram
                  </span>
                </button>
              </div>

              {instaCopied && (
                <p
                  className="text-center text-xs text-q-text-muted"
                  style={{ animation: "fadeSlideIn 0.25s ease-out both" }}
                >
                  Texte copié — colle-le dans ta story Instagram ✓
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
