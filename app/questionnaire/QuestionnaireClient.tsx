"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/landing/Navbar";
import QuizIntro from "@/components/questionnaire/QuizIntro";
import QuizQuestion from "@/components/questionnaire/QuizQuestion";
import QuizResult from "@/components/questionnaire/QuizResult";
import {
  ALL_QUESTIONS,
  QUICK_MODE_QUESTION_IDS,
  PROFILES,
  calculateResult,
  type AnswerKey,
  type QuizMode,
  type ProfileId,
} from "./data";

type Phase = "intro" | "quiz" | "result";

const ADVANCE_DELAY_MS = 420;

export default function QuestionnaireClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [mode, setMode] = useState<QuizMode>("full");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerKey>>({});
  const [direction, setDirection] = useState(1);
  const [resultId, setResultId] = useState<ProfileId | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeQuestions =
    mode === "quick"
      ? ALL_QUESTIONS.filter((q) => QUICK_MODE_QUESTION_IDS.includes(q.id))
      : ALL_QUESTIONS;

  const currentQuestion = activeQuestions[currentIndex];

  useEffect(() => {
    if (phase === "result") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [phase]);

  function handleStart(selectedMode: QuizMode) {
    setMode(selectedMode);
    setCurrentIndex(0);
    setAnswers({});
    setDirection(1);
    setPhase("quiz");
  }

  function handleSelect(key: AnswerKey) {
    const nextAnswers = { ...answers, [currentQuestion.id]: key };
    setAnswers(nextAnswers);

    const isLast = currentIndex >= activeQuestions.length - 1;

    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      if (isLast) {
        setResultId(calculateResult(nextAnswers));
        setPhase("result");
      } else {
        setDirection(1);
        setCurrentIndex((i) => i + 1);
      }
    }, ADVANCE_DELAY_MS);
  }

  function handleBack() {
    if (currentIndex === 0) {
      setPhase("intro");
      return;
    }
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setDirection(-1);
    setCurrentIndex((i) => i - 1);
  }

  function handleRestart() {
    setAnswers({});
    setCurrentIndex(0);
    setDirection(-1);
    setResultId(null);
    setPhase("intro");
  }

  return (
    <div className="min-h-screen bg-q-bg text-q-text">
      <Navbar />

      <div className="pt-[68px] md:pt-24">
        {phase === "intro" && <QuizIntro onStart={handleStart} />}

        {phase === "quiz" && currentQuestion && (
          <QuizQuestion
            question={currentQuestion}
            questionIndex={currentIndex}
            totalQuestions={activeQuestions.length}
            selectedAnswer={answers[currentQuestion.id]}
            onSelect={handleSelect}
            onBack={handleBack}
            direction={direction}
          />
        )}

        {phase === "result" && resultId && (
          <QuizResult profile={PROFILES[resultId]} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}
