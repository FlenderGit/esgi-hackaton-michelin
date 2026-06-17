"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/shared/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const champions = [
  {
    name: "Victor Lafay",
    discipline: "ROUTE",
    description:
      "L'explosivité au service de la victoire. Victor Lafay est un coureur français connu pour ses attaques décisives et ses victoires d'étape sur les plus grands tours.",
    image: "/images/victorlafay.jpg",
    pos: "object-top",
  },
  {
    name: "Ion Izagirre",
    discipline: "ROUTE",
    description:
      "Le stratège des grands tours. Ce coureur basque excelle dans les courses par étapes où sa régularité et son intelligence tactique font la différence.",
    image: "/images/ionizagirre.jpg",
    pos: "object-center",
  },
  {
    name: "Nicolas Vouilloz",
    discipline: "VTT DESCENTE",
    description:
      "La légende absolue du VTT. Avec 10 titres de champion du monde, Nicolas Vouilloz est considéré comme le plus grand descendeur de tous les temps.",
    image: "/images/A20425-NICOLAS-VOUILLOZ_e-copy.jpg",
    pos: "object-top",
  },
  {
    name: "Jérôme Clementz",
    discipline: "ENDURO",
    description:
      "Le pionnier de l'enduro. Triple champion du monde, Jérôme Clementz a contribué à définir la discipline et continue d'inspirer une génération de riders.",
    image: "/images/Jeromeclmentz.jpg",
    pos: "object-center",
  },
  {
    name: "Julie Bresset",
    discipline: "CROSS-COUNTRY",
    description:
      "La reine du cross-country. Championne olympique à Londres en 2012, Julie Bresset a dominé le VTT cross-country avec une détermination exemplaire.",
    image: "/images/juliebresset.jpg",
    pos: "object-top",
  },
  {
    name: "Guillaume Martin",
    discipline: "ROUTE",
    description:
      "Le grimpeur philosophe. Écrivain et coureur, Guillaume Martin allie performance sportive et réflexion intellectuelle, un parcours unique dans le peloton.",
    image: "/images/guillaumemartin.jpg",
    pos: "object-center",
  },
];

export default function ChampionsClient() {
  return (
    <div className="min-h-screen bg-q-bg text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/background-noschampions.jpg"
            alt="Champions Michelin"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-q-bg/50 to-q-bg" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-3">
              Ils nous font confiance
            </p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Nos <span className="text-secondary">champions</span>
            </h1>
            <p className="mt-6 text-white/50 text-lg max-w-2xl">
              Route, VTT, enduro, cross-country — les meilleurs cyclistes du
              monde choisissent Michelin pour repousser leurs limites.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Champions grid */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {champions.map((c, i) => (
              <motion.div
                key={c.name}
                className="group relative rounded-2xl overflow-hidden border border-white/5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${c.pos}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6">
                  <span className="inline-block rounded-full bg-secondary px-3 py-1 text-[11px] font-bold tracking-wider text-primary mb-2">
                    {c.discipline}
                  </span>
                  <h3 className="text-xl font-bold">{c.name}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="overflow-hidden py-8 border-t border-q-border/10">
        <div className="animate-marquee flex w-max whitespace-nowrap">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="px-16 text-7xl md:text-9xl font-black italic text-white/15"
            >
              L&apos;INNOVATION AU SERVICE DE LA VICTOIRE. &nbsp;&nbsp;
              L&apos;INNOVATION AU SERVICE DE LA VICTOIRE. &nbsp;&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-q-border/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Roulez comme les <span className="text-secondary">champions</span>
          </h2>
          <p className="mt-4 text-white/50">
            Trouvez le pneu Michelin adapté à votre discipline.
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
