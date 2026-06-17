import type { Metadata } from "next";
import ChampionsClient from "./ChampionsClient";

export const metadata: Metadata = {
  title: "Nos champions — Michelin Vélo",
  description:
    "Les meilleurs cyclistes du monde font confiance à Michelin. Découvrez nos ambassadeurs.",
};

export default function ChampionsPage() {
  return <ChampionsClient />;
}
