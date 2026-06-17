import type { Metadata } from "next";
import InnovationsClient from "./InnovationsClient";

export const metadata: Metadata = {
  title: "Innovations — Michelin Vélo",
  description:
    "Découvrez les technologies Michelin qui améliorent la performance des cyclistes depuis 1891.",
};

export default function InnovationsPage() {
  return <InnovationsClient />;
}
