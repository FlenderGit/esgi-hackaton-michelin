"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type {
  WizardAnswers,
  RiderProfile,
  TerrainType,
  WeatherType,
  PriorityKey,
  WizardBikeType,
  BudgetRange,
} from "./data";
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

const EMPTY_ANSWERS: WizardAnswers = {
  terrain: [],
  weather: [],
  priorities: [],
};

type Section =
  | "profile"
  | "terrain"
  | "priorities"
  | "technical"
  | "advanced"
  | "results";

function sectionReady(section: Section, a: WizardAnswers): boolean {
  if (section === "profile") return true;
  if (section === "terrain") return !!a.profile;
  if (section === "priorities") return !!a.profile && a.terrain.length > 0;
  if (section === "technical")
    return !!a.profile && a.terrain.length > 0 && a.priorities.length >= 1;
  if (section === "advanced")
    return (
      !!a.profile &&
      a.terrain.length > 0 &&
      a.priorities.length >= 1 &&
      !!a.bikeType
    );
  if (section === "results")
    return (
      !!a.profile &&
      a.terrain.length > 0 &&
      a.priorities.length >= 1 &&
      !!a.bikeType
    );
  return false;
}

export default function WizardClient() {
  const router = useRouter();
  const [answers, setAnswers] = useState<WizardAnswers>(EMPTY_ANSWERS);
  const [showResults, setShowResults] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [navSolid, setNavSolid] = useState(false);

  const terrainRef = useRef<HTMLDivElement>(null);
  const prioritiesRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);
  const advancedRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function update(patch: Partial<WizardAnswers>) {
    setAnswers((prev) => ({ ...prev, ...patch }));
    if (showResults) setShowResults(false);
  }

  const scrollTo = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>) => {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    },
    [],
  );

  function handleProfileChange(p: RiderProfile) {
    update({ profile: p });
    scrollTo(terrainRef);
  }

  function handleTerrainChange(terrain: TerrainType[]) {
    update({ terrain });
  }
  function handleWeatherChange(weather: WeatherType[]) {
    update({ weather });
  }
  function handlePrioritiesChange(priorities: PriorityKey[]) {
    update({ priorities });
    if (priorities.length === 3) scrollTo(technicalRef);
  }
  function handleBikeTypeChange(bikeType: WizardBikeType) {
    update({ bikeType, width: undefined });
  }
  function handleWidthChange(width: string) {
    update({ width: width || undefined });
  }

  function handleShowResults() {
    setShowResults(true);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
  }

  function handleReset() {
    setAnswers(EMPTY_ANSWERS);
    setShowResults(false);
    setShowAdvanced(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const canShowResults = sectionReady("results", answers);

  return (
    <div className="min-h-screen bg-q-bg text-q-text">
      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navSolid ? "bg-q-bg/90 backdrop-blur-md border-b border-q-border/30" : ""}`}
      >
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
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer border border-q-border/50 text-q-text-muted hover:border-q-yellow/40 hover:text-q-text bg-q-card/40 backdrop-blur-sm"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" />
            Retour
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/background.jpg"
            alt="Cycliste en action"
            fill
            className="object-cover animate-ken-burns"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-q-bg via-q-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-q-bg/60 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-4">
              Configurateur de pneus
            </p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Trouve ton pneu
              <br />
              <span className="text-secondary">idéal.</span>
            </h1>
            <p className="mt-4 text-q-text-sub max-w-md text-lg leading-relaxed">
              Réponds à quelques questions sur ta pratique, et on te recommande
              les meilleurs pneus.
            </p>
          </motion.div>

          <motion.div
            className="flex items-center gap-6 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              {[
                { icon: "🎯", label: "Grip adapté" },
                { icon: "🛡️", label: "Anti-crevaison" },
                { icon: "⚡", label: "Performance" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-q-card/60 backdrop-blur-sm border border-q-border/30 text-xs font-medium text-q-text-sub"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce-down"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-q-text-muted"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </section>

      {/* ── Form Sections ── */}
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Section 1: Profile */}
        <SectionWrapper id="profile" ready>
          <Step1Profile answers={answers} onChange={handleProfileChange} />
        </SectionWrapper>

        {/* Section 2: Terrain */}
        <div ref={terrainRef} className="scroll-mt-24">
          <SectionWrapper id="terrain" ready={sectionReady("terrain", answers)}>
            <Step2Terrain
              answers={answers}
              onTerrainChange={handleTerrainChange}
              onWeatherChange={handleWeatherChange}
            />
          </SectionWrapper>
        </div>

        {/* Section 3: Priorities */}
        <div ref={prioritiesRef} className="scroll-mt-24">
          <SectionWrapper
            id="priorities"
            ready={sectionReady("priorities", answers)}
          >
            <Step3Priorities
              answers={answers}
              onChange={handlePrioritiesChange}
            />
          </SectionWrapper>
        </div>

        {/* Section 4: Technical */}
        <div ref={technicalRef} className="scroll-mt-24">
          <SectionWrapper
            id="technical"
            ready={sectionReady("technical", answers)}
          >
            <Step4Technical
              answers={answers}
              onBikeTypeChange={handleBikeTypeChange}
              onWidthChange={handleWidthChange}
            />
          </SectionWrapper>
        </div>

        {/* Advanced toggle */}
        {sectionReady("advanced", answers) && (
          <motion.div
            ref={advancedRef}
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="py-8">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 backdrop-blur-sm cursor-pointer transition-all group ${
                  showAdvanced
                    ? "border-q-yellow/40 bg-q-yellow/5"
                    : "border-q-border/50 bg-q-card/40 hover:border-q-yellow/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                      showAdvanced
                        ? "bg-q-yellow/15 text-q-yellow"
                        : "bg-q-border/15 text-q-text-muted group-hover:text-q-yellow group-hover:bg-q-yellow/10"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <p className="font-bold text-q-text">
                      Affiner les réglages
                    </p>
                    <p className="text-sm text-q-text-muted">
                      Montage, budget, pneu AV/AR
                    </p>
                  </div>
                </div>
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                    showAdvanced
                      ? "bg-q-yellow/15 text-q-yellow"
                      : "bg-q-border/15 text-q-text-muted"
                  }`}
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    width="16"
                    height="16"
                    className={`transition-transform duration-300 ${showAdvanced ? "rotate-180" : ""}`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 rounded-2xl border border-q-border/30 bg-q-card/20 backdrop-blur-sm overflow-hidden">
                      <div className="p-6 sm:p-8 space-y-10">
                        <StepAdvMount
                          answers={answers}
                          onChange={(mounting) => update({ mounting })}
                        />
                        <div className="border-t border-q-border/15" />
                        <StepAdvBudget
                          answers={answers}
                          onChange={(budget: BudgetRange) => update({ budget })}
                        />
                        <div className="border-t border-q-border/15" />
                        <StepAdvAxle
                          answers={answers}
                          onChange={(axle) => update({ axle })}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* CTA — Voir résultats */}
        {canShowResults && !showResults && (
          <motion.div
            className="py-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={handleShowResults}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-secondary text-neutral font-bold text-lg transition-all hover:opacity-90 cursor-pointer animate-pulse-glow"
            >
              Voir mes recommandations
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                width="18"
                height="18"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <p className="text-xs text-q-text-dim mt-3">
              Gratuit · résultats instantanés
            </p>
          </motion.div>
        )}

        {/* Results */}
        <div ref={resultsRef} className="scroll-mt-24">
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="pb-16"
              >
                <Step6Results answers={answers} onRefine={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SectionWrapper({
  children,
  ready,
  id,
}: {
  children: React.ReactNode;
  ready: boolean;
  id: string;
}) {
  if (!ready) return null;

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="py-12 sm:py-16"
    >
      {children}
    </motion.section>
  );
}
