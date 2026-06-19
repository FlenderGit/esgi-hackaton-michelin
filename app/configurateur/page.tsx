import type { Metadata } from "next";
import IntroClient from "./IntroClient";

export const metadata: Metadata = {
  title: "Trouve ton pneu idéal  Michelin",
  description:
    "Réponds à quelques questions sur ta pratique et on te recommande les pneus parfaits pour ton vélo.",
};

export default function ConfigurateurPage() {
  return <IntroClient />;
}
