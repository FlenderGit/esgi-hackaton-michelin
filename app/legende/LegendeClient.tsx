"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/shared/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const milestones = [
  {
    year: "1891",
    title: "Pneu démontable",
    description:
      "Charles et André Michelin inventent le pneu démontable pour bicyclette. C'est le début de l'industrie moderne du pneumatique et une révolution pour les cyclistes.",
    image: "/images/timeline/1891.svg",
  },
  {
    year: "1946",
    title: "Pneu radial",
    description:
      "Michelin invente le pneu radial, une avancée technologique majeure qui transforme l'industrie automobile mondiale et offre une meilleure adhérence et longévité.",
    image: "/images/timeline/1946.svg",
  },
  {
    year: "1952",
    title: "Radial poids lourds",
    description:
      "La technologie radiale s'étend au transport routier, transformant le secteur du poids lourd et réduisant la consommation de carburant.",
    image: "/images/timeline/1952.svg",
  },
  {
    year: "1978",
    title: "Radial agricole",
    description:
      "Michelin révolutionne l'agriculture mécanisée avec le pneu radial agricole, permettant une meilleure traction et une réduction du tassement des sols.",
    image: "/images/timeline/1978.svg",
  },
  {
    year: "2017",
    title: "Vision Concept",
    description:
      "Michelin présente le Vision Concept : un pneu connecté, rechargeable, imprimé en 3D et 100% durable. Le futur de la mobilité prend forme.",
    image: "/images/timeline/2017.svg",
  },
];

export default function LegendeClient() {
  return (
    <div className="min-h-screen bg-q-bg text-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-3">
              Notre histoire
            </p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              La légende Michelin
              <br />
              <span className="text-secondary">
                un siècle d&apos;innovations
              </span>
            </h1>
            <p className="mt-6 text-white/50 text-lg max-w-2xl">
              De l&apos;invention du pneu démontable en 1891 au concept
              révolutionnaire de 2017, retracez les grandes étapes qui ont fait
              de Michelin un leader mondial.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="space-y-16 md:space-y-24">
            {milestones.map((m, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-16 ${
                    !isEven ? "md:flex-row-reverse" : ""
                  }`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <div className="md:w-1/2">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                      <Image
                        src={m.image}
                        alt={m.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="md:w-1/2">
                    <span className="text-7xl md:text-8xl font-bold text-secondary leading-none">
                      {m.year}
                    </span>
                    <h2 className="mt-4 text-2xl md:text-3xl font-bold">
                      {m.title}
                    </h2>
                    <div className="mt-3 h-0.5 w-16 bg-secondary" />
                    <p className="mt-4 text-white/60 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-q-border/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            130 ans d&apos;innovation au service du{" "}
            <span className="text-secondary">cyclisme</span>
          </h2>
          <p className="mt-4 text-white/50">
            Découvrez quel pneu Michelin correspond à votre pratique.
          </p>
          <Link
            href="/configurateur"
            className="mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-secondary text-neutral font-bold transition-all hover:brightness-110"
          >
            Trouver mon pneu
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
