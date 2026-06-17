import type { Metadata } from "next";
import QuestionnaireClient from "./QuestionnaireClient";

export const metadata: Metadata = {
  title: "Ma cyclo-personnalité — Michelin",
  description: "Découvre ton profil de cycliste en 8 ou 20 questions. Pédale Douce, Grosse Pédale, Tryharder, Rondelle Gourmande ou Cyclo-Fürher ?",
};

export default function QuestionnairePage() {
  return <QuestionnaireClient />;
}
