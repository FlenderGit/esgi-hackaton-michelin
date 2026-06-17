"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type {
  WizardAnswers,
  RiderProfile,
  TerrainType,
  WeatherType,
  PriorityKey,
  WizardBikeType,
  BudgetRange,
} from "../data";
import Step1Profile from "@/components/configurateur/Step1Profile";
import Step2Terrain from "@/components/configurateur/Step2Terrain";
import Step3Priorities from "@/components/configurateur/Step3Priorities";
import Step4Technical from "@/components/configurateur/Step4Technical";
import {
  StepAdvMount,
  StepAdvBudget,
  StepAdvAxle,
} from "@/components/configurateur/StepAdvanced";
import Step6Results from "@/components/configurateur/Step6Results";
import CyclistProgressBar from "@/components/configurateur/CyclistProgressBar";

const EMPTY_ANSWERS: WizardAnswers = {
  terrain: [],
  weather: [],
  priorities: [],
};

const TOTAL_STEPS = 5;

function canGoNext(step: number, a: WizardAnswers): boolean {
  if (step === 1) return !!a.profile;
  if (step === 2) return a.terrain.length > 0;
  if (step === 3) return a.priorities.length >= 1;
  if (step === 4) return !!a.bikeType;
  if (step === 5) return true;
  return false;
}

export default function QuestionnaireClient() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<WizardAnswers>(EMPTY_ANSWERS);
  const [direction, setDirection] = useState(1);
  const [showResults, setShowResults] = useState(false);

  const update = useCallback((patch: Partial<WizardAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...patch }));
  }, []);

  function goNext() {
    if (step < TOTAL_STEPS) {
      setDirection(1);
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  }

  function goBack() {
    if (showResults) {
      setShowResults(false);
      return;
    }
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  }

  function handleReset() {
    setAnswers(EMPTY_ANSWERS);
    setShowResults(false);
    setStep(1);
    setDirection(-1);
  }

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  function renderStep() {
    if (showResults) {
      return <Step6Results answers={answers} onRefine={handleReset} />;
    }

    switch (step) {
      case 1:
        return (
          <Step1Profile
            answers={answers}
            onChange={(p: RiderProfile) => update({ profile: p })}
          />
        );
      case 2:
        return (
          <Step2Terrain
            answers={answers}
            onTerrainChange={(terrain: TerrainType[]) => update({ terrain })}
            onWeatherChange={(weather: WeatherType[]) => update({ weather })}
          />
        );
      case 3:
        return (
          <Step3Priorities
            answers={answers}
            onChange={(priorities: PriorityKey[]) => update({ priorities })}
          />
        );
      case 4:
        return (
          <Step4Technical
            answers={answers}
            onBikeTypeChange={(bikeType: WizardBikeType) =>
              update({ bikeType, width: undefined })
            }
            onWidthChange={(width: string) =>
              update({ width: width || undefined })
            }
          />
        );
      case 5:
        return (
          <div className="space-y-12">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                Étape 5
              </p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-q-text">
                Réglages avancés
              </h2>
              <p className="text-q-text-muted">
                Optionnel — affine tes résultats.
              </p>
            </div>
            <StepAdvMount
              answers={answers}
              onChange={(mounting) => update({ mounting })}
            />
            <div className="border-t border-q-border/20" />
            <StepAdvBudget
              answers={answers}
              onChange={(budget: BudgetRange) => update({ budget })}
            />
            <div className="border-t border-q-border/20" />
            <StepAdvAxle
              answers={answers}
              onChange={(axle) => update({ axle })}
            />
          </div>
        );
      default:
        return null;
    }
  }

  const isNextDisabled = !showResults && !canGoNext(step, answers);

  return (
    <div className="min-h-screen bg-q-bg text-q-text flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-q-bg/90 backdrop-blur-md border-b border-q-border/20">
        <div className="max-w-6xl mx-auto px-6 md:px-8 h-[68px] flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Michelin"
              width={90}
              height={36}
              priority
            />
          </Link>
          <Link
            href="/configurateur"
            className="text-sm font-medium text-q-text-muted hover:text-q-text transition-colors"
          >
            &larr; Retour
          </Link>
        </div>
      </nav>

      {/* Progress bar */}
      {!showResults && (
        <div className="fixed top-[68px] left-0 right-0 z-40 bg-q-bg/80 backdrop-blur-sm py-4 border-b border-q-border/10">
          <CyclistProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
        </div>
      )}

      {/* Content */}
      <main className="flex-1 pt-[160px] pb-32 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={showResults ? "results" : step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer navigation */}
      {!showResults && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-q-bg/90 backdrop-blur-md border-t border-q-border/20">
          <div className="max-w-4xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
            <button
              onClick={goBack}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all cursor-pointer border-2 ${
                step === 1
                  ? "border-q-border/20 text-q-text-dim cursor-not-allowed opacity-40"
                  : "border-q-border/50 text-q-text-sub hover:border-q-yellow/30 hover:text-q-text"
              }`}
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                width="16"
                height="16"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Précédent
            </button>

            <button
              onClick={goNext}
              disabled={isNextDisabled}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all cursor-pointer ${
                isNextDisabled
                  ? "bg-q-border/30 text-q-text-dim cursor-not-allowed"
                  : "bg-secondary text-neutral hover:brightness-110"
              }`}
            >
              {step === TOTAL_STEPS ? "Voir les résultats" : "Suivant"}
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                width="16"
                height="16"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
