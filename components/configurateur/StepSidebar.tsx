"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface StepSidebarProps {
  labels: string[];
  icons: IconDefinition[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export default function StepSidebar({
  labels,
  icons,
  currentStep,
  onStepClick,
}: StepSidebarProps) {
  const total = labels.length;
  const progress = (currentStep - 1) / (total - 1);

  return (
    <aside className="hidden lg:flex w-72 shrink-0 flex-col sticky top-[68px] h-[calc(100vh-68px)] border-r border-q-border/20 px-6 pt-10 pb-28">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-1">
        Configurateur
      </p>
      <h2 className="text-lg font-black text-q-text mb-8">Ta progression</h2>

      <div className="relative flex-1">
        {/* Ligne de fond */}
        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-q-border/30" />
        {/* Ligne remplie */}
        <motion.div
          className="absolute left-[15px] top-2 w-0.5 bg-gradient-to-b from-q-yellow/80 to-q-yellow origin-top"
          initial={false}
          animate={{ height: `calc(${progress} * (100% - 16px))` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        <ul className="relative space-y-7">
          {labels.map((label, i) => {
            const stepNum = i + 1;
            const done = stepNum < currentStep;
            const active = stepNum === currentStep;
            const clickable = stepNum <= currentStep;
            const filled = active || done;
            return (
              <li key={label}>
                <button
                  onClick={() => clickable && onStepClick(stepNum)}
                  disabled={!clickable}
                  className={`group flex items-center gap-4 w-full text-left rounded-xl px-2 py-2 -mx-2 transition-colors ${
                    clickable ? "cursor-pointer" : "cursor-default"
                  } ${
                    active
                      ? "bg-q-yellow/10"
                      : done
                        ? "hover:bg-q-yellow/5"
                        : ""
                  }`}
                >
                  <span
                    className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-xl border-2 transition-all ${
                      active
                        ? "border-q-yellow bg-q-yellow text-q-bg shadow-[0_0_16px_rgba(252,229,0,0.4)]"
                        : done
                          ? "border-q-yellow bg-q-yellow text-q-bg"
                          : "border-q-border/50 bg-q-bg text-q-text-dim"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={done ? faCheck : icons[i]}
                      className="w-4 h-4"
                    />
                  </span>
                  <span
                    className={`text-sm font-semibold transition-colors ${
                      filled
                        ? "text-q-text"
                        : "text-q-text-dim group-hover:text-q-text-sub"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="text-xs text-q-text-dim mt-6">
        Étape {currentStep} sur {total}
      </p>
    </aside>
  );
}
