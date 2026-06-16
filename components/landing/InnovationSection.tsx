"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { value: "130+", label: "Années d'innovation" },
  { value: "100+", label: "Des centaines d'innovations brevetées" },
  { value: "1891", label: "Premier pneu vélo moderne Michelin" },
];

export default function InnovationSection() {
  return (
    <section
      className="relative flex h-screen w-full items-center overflow-hidden px-6 md:px-8 lg:px-16"
      style={{ backgroundColor: "#000b34" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(39, 80, 155, 0.25) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-8 md:flex-row md:gap-16">
        <motion.div
          className="perspective-container relative w-full md:w-5/12"
          initial={{ opacity: 0, x: -60, rotateY: 15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="animate-glow-ring relative aspect-[3/4] overflow-hidden rounded-2xl">
            <Image
              src="/images/innovation.png"
              alt="Innovation Michelin Vélo"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col md:w-7/12"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2
            className="text-2xl font-bold leading-tight text-white md:text-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Les innovations Michelin améliorent la{" "}
            <span
              className="animate-gradient-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #27509b, #4a8eff, #27509b)",
                backgroundSize: "200% 200%",
              }}
            >
              performance des cyclistes
            </span>
          </motion.h2>

          <motion.div
            className="mt-4 h-1 w-16 bg-secondary md:mt-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ originX: 0 }}
          />

          <motion.p
            className="mt-4 text-sm leading-relaxed text-white/70 md:mt-6 md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            En tant que pionnier dans le domaine du vélo, nous nous engageons à
            aider les cyclistes à atteindre leur meilleur potentiel. Nous avons
            une longue histoire et avons créé le premier pneu de bicyclette en
            1891.
          </motion.p>

          <motion.p
            className="mt-4 text-sm leading-relaxed text-white/70 md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Depuis plus de 130 ans, nous concevons des pneus de vélo prêts à
            affronter toutes les situations, que ce soit en ville, sur route ou
            même hors route.
          </motion.p>

          <motion.div
            className="mt-6 flex gap-6 md:mt-8 md:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-bold text-secondary md:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-[10px] uppercase tracking-wider text-white/40 md:text-xs">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
