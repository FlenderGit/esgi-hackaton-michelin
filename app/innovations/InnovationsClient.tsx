"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/shared/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const stats = [
  { value: "130+", label: "Années d'innovation" },
  { value: "100+", label: "Innovations brevetées" },
  { value: "1891", label: "Premier pneu vélo" },
];

const technologies = [
  {
    name: "Gum-X",
    description:
      "Compound haute performance offrant un équilibre optimal entre grip, durabilité et résistance au roulement. Utilisé sur les gammes Power et Wild.",
  },
  {
    name: "Tubeless Shield",
    description:
      "Technologie de carcasse étanche permettant un montage tubeless fiable, réduisant le risque de crevaison et améliorant le confort.",
  },
  {
    name: "Protector+",
    description:
      "Couche de protection renforcée sous la bande de roulement, conçue pour les trajets urbains quotidiens et les conditions exigeantes.",
  },
  {
    name: "Carcasse 4x120 TPI",
    description:
      "Carcasse haute densité pour un feeling route exceptionnel, une souplesse maximale et un poids minimal sur les gammes compétition.",
  },
];

export default function InnovationsClient() {
  return (
    <div className="min-h-screen bg-q-bg text-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:gap-16">
            <motion.div
              className="md:w-7/12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-3">
                Technologies
              </p>
              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                Les innovations Michelin améliorent la{" "}
                <span className="text-secondary">
                  performance des cyclistes
                </span>
              </h1>
              <div className="mt-4 h-1 w-16 bg-secondary" />
              <p className="mt-6 text-white/60 leading-relaxed">
                En tant que pionnier dans le domaine du vélo, nous nous
                engageons à aider les cyclistes à atteindre leur meilleur
                potentiel. Nous avons créé le premier pneu de bicyclette en
                1891.
              </p>
              <p className="mt-4 text-white/60 leading-relaxed">
                Depuis plus de 130 ans, nous concevons des pneus prêts à
                affronter toutes les situations, que ce soit en ville, sur route
                ou même hors route.
              </p>

              <div className="mt-8 flex gap-8 md:gap-10">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-3xl font-bold text-secondary">
                      {stat.value}
                    </span>
                    <span className="mt-1 text-[10px] uppercase tracking-wider text-white/40 md:text-xs">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="mt-10 md:mt-0 md:w-5/12"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/images/innovation.png"
                  alt="Innovation Michelin Vélo"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 md:py-28 border-t border-q-border/10">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-2">
              Nos technologies
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Ce qui fait la <span className="text-secondary">différence</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {technologies.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="rounded-2xl border border-q-border/20 bg-q-card/20 p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="text-xl font-bold text-secondary">
                  {tech.name}
                </h3>
                <p className="mt-3 text-white/60 leading-relaxed">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-q-border/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            La technologie au service de{" "}
            <span className="text-secondary">votre pratique</span>
          </h2>
          <p className="mt-4 text-white/50">
            Trouvez le pneu Michelin qui intègre les technologies adaptées à
            votre style.
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
