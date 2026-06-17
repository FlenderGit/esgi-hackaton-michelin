import type { Metadata } from "next";
import LegendeClient from "./LegendeClient";

export const metadata: Metadata = {
  title: "La légende Michelin — Un siècle d'innovations",
  description:
    "Découvrez l'histoire de Michelin, du premier pneu démontable en 1891 au Vision Concept de 2017.",
};

export default function LegendePage() {
  return <LegendeClient />;
}
