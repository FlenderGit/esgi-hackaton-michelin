import type { Metadata } from "next";
import QuestionnaireClient from "./QuestionnaireClient";

export const metadata: Metadata = {
  title: "Questionnaire  Michelin",
  description: "Configure ton pneu idéal en quelques étapes.",
};

export default function QuestionnairePage() {
  return <QuestionnaireClient />;
}
