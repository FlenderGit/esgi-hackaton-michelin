"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { Question, AnswerKey } from "@/app/questionnaire/data";

const ANSWER_LABELS: Record<AnswerKey, string> = {
  a: "A",
  b: "B",
  c: "C",
  d: "D",
};

interface QuizQuestionProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: AnswerKey | undefined;
  onSelect: (key: AnswerKey) => void;
  onBack: () => void;
  direction: number;
}

export default function QuizQuestion({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onSelect,
  onBack,
  direction,
}: QuizQuestionProps) {
  const fillPercent = (questionIndex / totalQuestions) * 100;
  const hasSelected = useRef(false);

  useEffect(() => {
    hasSelected.current = false;
  }, [question.id]);

  function handleSelect(key: AnswerKey) {
    if (hasSelected.current) return;
    hasSelected.current = true;
    onSelect(key);
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-72px)]">
      {/* ── Barre de progression ───────────────────────────────── */}
      <div className="border-b border-q-border/10 px-6 md:px-8 py-4">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-q-text-muted uppercase tracking-[0.15em]">
              Question {questionIndex + 1} sur {totalQuestions}
            </span>
            <span className="text-xs font-black text-secondary tabular-nums">
              {Math.round(fillPercent)}%
            </span>
          </div>
          <div className="w-full h-2 bg-q-border/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-secondary rounded-full"
              initial={false}
              animate={{ width: `${fillPercent}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* ── Contenu ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-6 md:px-8 py-8">
        {/* Navigation */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 text-sm font-semibold transition-all cursor-pointer ${
              questionIndex === 0
                ? "opacity-0 pointer-events-none"
                : "text-q-text-muted hover:text-q-text"
            }`}
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            Précédent
          </button>
        </div>

        {/* Question + réponses */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={question.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col gap-8"
          >
            <h2 className="text-2xl md:text-3xl font-black text-q-text leading-snug">
              {question.text}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.answers.map((answer) => {
                const isSelected = selectedAnswer === answer.key;
                return (
                  <button
                    key={answer.key}
                    onClick={() => handleSelect(answer.key)}
                    className={`group text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-secondary bg-secondary/10 shadow-[0_0_20px_rgba(252,229,0,0.08)]"
                        : "border-q-border/30 bg-q-card/40 hover:border-q-border/60 hover:bg-q-card/70"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                          isSelected
                            ? "bg-secondary text-neutral"
                            : "bg-q-border/20 text-q-text-dim group-hover:bg-q-border/40"
                        }`}
                      >
                        {ANSWER_LABELS[answer.key]}
                      </span>
                      <span
                        className={`text-sm leading-relaxed transition-colors ${
                          isSelected
                            ? "text-q-text"
                            : "text-q-text-muted group-hover:text-q-text-sub"
                        }`}
                      >
                        {answer.text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
