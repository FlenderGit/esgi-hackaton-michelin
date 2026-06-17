"use client";

import { motion } from "framer-motion";

interface CyclistProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function CyclistProgressBar({
  currentStep,
  totalSteps,
}: CyclistProgressBarProps) {
  const progress = currentStep / totalSteps;

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="relative h-12">
        {/* Route */}
        <div className="absolute bottom-2 left-0 right-0 h-2 rounded-full bg-q-border/30 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-q-yellow/80 to-q-yellow rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Marqueurs d'étapes */}
        {Array.from({ length: totalSteps + 1 }).map((_, i) => {
          const x = (i / totalSteps) * 100;
          const done = i <= currentStep;
          return (
            <div
              key={i}
              className="absolute bottom-0.5"
              style={{ left: `${x}%`, transform: "translateX(-50%)" }}
            >
              <div
                className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                  done
                    ? "bg-q-yellow border-q-yellow"
                    : "bg-q-bg border-q-border/50"
                }`}
              />
            </div>
          );
        })}

        {/* Cycliste */}
        <motion.div
          className="absolute bottom-4"
          initial={{ left: "0%" }}
          animate={{ left: `${progress * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transform: "translateX(-50%)" }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Roue arrière */}
            <circle
              cx="18"
              cy="46"
              r="10"
              stroke="var(--color-q-yellow)"
              strokeWidth="2.5"
              fill="none"
            />
            <circle cx="18" cy="46" r="2" fill="var(--color-q-yellow)" />
            {/* Roue avant */}
            <circle
              cx="46"
              cy="46"
              r="10"
              stroke="var(--color-q-yellow)"
              strokeWidth="2.5"
              fill="none"
            />
            <circle cx="46" cy="46" r="2" fill="var(--color-q-yellow)" />
            {/* Cadre */}
            <path
              d="M18 46 L30 30 L46 46 M30 30 L30 46 M30 30 L40 30 L46 46"
              stroke="var(--color-q-text)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Guidon */}
            <path
              d="M40 30 L44 26 L48 28"
              stroke="var(--color-q-text)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Selle */}
            <path
              d="M26 29 L34 29"
              stroke="var(--color-q-text)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Cycliste corps */}
            <path
              d="M30 30 L36 18"
              stroke="var(--color-q-text-sub)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Tête */}
            <circle cx="36" cy="14" r="4" fill="var(--color-q-text-sub)" />
            {/* Bras */}
            <path
              d="M34 20 L42 26"
              stroke="var(--color-q-text-sub)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Jambes */}
            <path
              d="M30 30 L24 40 L18 46"
              stroke="var(--color-q-text-sub)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M30 30 L34 40 L30 46"
              stroke="var(--color-q-text-sub)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* Label */}
      <p className="text-center text-xs text-q-text-muted mt-2">
        Étape {currentStep} sur {totalSteps}
      </p>
    </div>
  );
}
