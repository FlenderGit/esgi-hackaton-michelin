"use client";

import { useState } from "react";
import {
  ALL_QUESTIONS,
  QUICK_MODE_QUESTION_IDS,
  PROFILES,
  calculateResult,
  type AnswerKey,
} from "../data";
import ModeSelector from "./ModeSelector";
import QuestionCard from "./QuestionCard";
import ResultCard from "./ResultCard";
import ProgressBar from "./ProgressBar";
import MichelinLogo from "./MichelinLogo";
import ThemeToggle from "./ThemeToggle";

type Step = "intro" | "quiz" | "result";
type Mode = "quick" | "full";

export default function QuestionnaireClient() {
  const [step, setStep] = useState<Step>("intro");
  const [mode, setMode] = useState<Mode | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerKey>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerKey | null>(null);

  const activeQuestions =
    mode === "quick"
      ? ALL_QUESTIONS.filter((q) => QUICK_MODE_QUESTION_IDS.includes(q.id))
      : ALL_QUESTIONS;

  const currentQuestion = activeQuestions[currentIndex];
  const totalQuestions = activeQuestions.length;

  function handleModeSelect(selectedMode: Mode) {
    setMode(selectedMode);
    setStep("quiz");
    setCurrentIndex(0);
    setAnswers({});
    setSelectedAnswer(null);
  }

  function handleAnswer(key: AnswerKey) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(key);

    setTimeout(() => {
      const newAnswers = { ...answers, [currentQuestion.id]: key };
      setAnswers(newAnswers);

      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
      } else {
        setStep("result");
      }
    }, 600);
  }

  function handleBack() {
    if (currentIndex === 0) {
      handleRestart();
      return;
    }
    const prevQuestion = activeQuestions[currentIndex - 1];
    const newAnswers = { ...answers };
    delete newAnswers[prevQuestion.id];
    setAnswers(newAnswers);
    setCurrentIndex(currentIndex - 1);
    setSelectedAnswer(null);
  }

  function handleRestart() {
    setStep("intro");
    setMode(null);
    setCurrentIndex(0);
    setAnswers({});
    setSelectedAnswer(null);
  }

  if (step === "intro") {
    return <ModeSelector onSelect={handleModeSelect} />;
  }

  if (step === "result") {
    const profileId = calculateResult(answers);
    const profile = PROFILES[profileId];
    return (
      <ResultCard
        profile={profile}
        answers={answers}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-q-bg flex flex-col">
      <header className="px-6 py-5 border-b border-q-border-sub">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <MichelinLogo />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={handleRestart}
              className="text-q-text-muted text-sm hover:text-q-text transition-colors"
            >
              Questionnaire
            </button>
          </div>
        </div>
      </header>

      <div className="px-6 pt-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <ProgressBar
            current={currentIndex + 1}
            total={totalQuestions}
            mode={mode!}
          />
        </div>
      </div>

      <main className="flex-1 flex items-start justify-center px-6 py-8">
        <div className="w-full max-w-3xl">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
          />

          {currentIndex > 0 && !selectedAnswer && (
            <div
              className="mt-8"
              style={{ animation: "fadeSlideIn 0.3s ease-out both" }}
            >
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-q-text-muted text-sm hover:text-q-text-sub transition-colors"
              >
                <span>←</span>
                Question précédente
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
