"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faUser,
  faMountainSun,
  faListCheck,
  faBicycle,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import {
  type WizardAnswers,
  type RiderProfile,
  type TerrainType,
  type WeatherType,
  type PriorityKey,
  type WizardBikeType,
  type BudgetRange,
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
import Navbar from "@/components/landing/Navbar";
import StepSidebar from "@/components/configurateur/StepSidebar";

const EMPTY_ANSWERS: WizardAnswers = {
  terrain: [],
  weather: [],
  priorities: [],
};

const TOTAL_STEPS = 5;
const STORAGE_KEY = "michelin-configurateur";

const STEP_TITLES = ["Profil", "Terrain", "Priorités", "Vélo", "Réglages"];
const STEP_ICONS = [faUser, faMountainSun, faListCheck, faBicycle, faGear];

function canGoNext(step: number, a: WizardAnswers): boolean {
  if (step === 1) return !!a.profile;
  if (step === 2) return a.terrain.length > 0;
  if (step === 3) return a.priorities.length >= 1;
  if (step === 4) return !!a.bikeType;
  if (step === 5) return true;
  return false;
}

type Phase = "form" | "results";

export default function QuestionnaireClient() {
  // Toujours repartir de zéro à chaque accès au configurateur (pas de restauration de progression précédente)
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<WizardAnswers>(EMPTY_ANSWERS);
  const [direction, setDirection] = useState(1);
  const [phase, setPhase] = useState<Phase>("form");
  const autoAdvance = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll en haut à l'arrivée sur les résultats
  useEffect(() => {
    if (phase === "results") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [phase]);

  const update = useCallback((patch: Partial<WizardAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...patch }));
  }, []);

  const goNext = useCallback(() => {
    if (step < TOTAL_STEPS) {
      setDirection(1);
      setStep(step + 1);
    } else {
      setDirection(1);
      // On arrive à la fin du parcours → on nettoie toute progression sauvegardée
      // pour que le prochain accès au configurateur reparte de zéro.
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      setPhase("results");
    }
  }, [step]);

  const goBack = useCallback(() => {
    if (phase === "results") {
      setPhase("form");
      setStep(TOTAL_STEPS);
      return;
    }
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  }, [phase, step]);

  function handleReset() {
    setAnswers(EMPTY_ANSWERS);
    setPhase("form");
    setStep(1);
    setDirection(-1);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  function goToStep(target: number) {
    setDirection(target < step ? -1 : 1);
    setPhase("form");
    setStep(target);
  }

  // Auto-avance après sélection du profil
  function handleProfileChange(p: RiderProfile) {
    update({ profile: p });
    if (autoAdvance.current) clearTimeout(autoAdvance.current);
    autoAdvance.current = setTimeout(() => goNext(), 450);
  }

  const isNextDisabled = phase === "form" && !canGoNext(step, answers);

  // Navigation clavier
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (phase === "results") return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === "ArrowRight") {
        if (!isNextDisabled) goNext();
      } else if (e.key === "ArrowLeft") {
        goBack();
      } else if (e.key === "Enter" && tag !== "BUTTON" && tag !== "A") {
        if (!isNextDisabled) goNext();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, isNextDisabled, goNext, goBack]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  function renderStep() {
    switch (step) {
      case 1:
        return (
          <Step1Profile answers={answers} onChange={handleProfileChange} />
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
                Optionnel  affine tes résultats.
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

  return (
    <div className="min-h-screen bg-q-bg text-q-text">
      <Navbar />

      <div className="flex pt-17">
        {/* Sidebar verticale (desktop) */}
        {phase === "form" && (
          <StepSidebar
            labels={STEP_TITLES}
            icons={STEP_ICONS}
            currentStep={step}
            onStepClick={goToStep}
          />
        )}

        {/* Content */}
        <main className="flex-1 min-w-0 pb-32">
          {/* Barre de progression horizontale (mobile) */}
          {phase === "form" && (
            <div className="lg:hidden sticky top-17 z-30 bg-q-bg/90 backdrop-blur-sm py-3 border-b border-q-border/10">
              <CyclistProgressBar
                currentStep={step}
                totalSteps={TOTAL_STEPS}
                labels={STEP_TITLES}
              />
            </div>
          )}

          <div className="max-w-4xl mx-auto px-6 md:px-8 pt-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={phase === "form" ? `step-${step}` : phase}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {phase === "form" ? (
                  renderStep()
                ) : (
                  <Step6Results answers={answers} onRefine={handleReset} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Footer navigation */}
      {phase === "form" && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-q-bg/90 backdrop-blur-md border-t border-q-border/20 lg:pl-72">
          <div className="max-w-4xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between gap-4">
            <button
              onClick={goBack}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all cursor-pointer border-2 ${step === 1
                  ? "border-q-border/20 text-q-text-dim cursor-not-allowed opacity-40"
                  : "border-q-border/50 text-q-text-sub hover:border-q-yellow/30 hover:text-q-text"
                }`}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" />
              Précédent
            </button>

            <button
              onClick={goNext}
              disabled={isNextDisabled}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all cursor-pointer ${isNextDisabled
                  ? "bg-q-border/30 text-q-text-dim cursor-not-allowed"
                  : "bg-secondary text-neutral hover:brightness-110"
                }`}
            >
              {step === TOTAL_STEPS ? "Voir mes recommandations" : "Suivant"}
              <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
