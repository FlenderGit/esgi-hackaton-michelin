"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Header from "@/components/shared/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";

type Milestone = {
  year: string;
  title: string;
  description: string;
  image: string;
};

const milestones: Milestone[] = [
  {
    year: "1891",
    title: "Le pneu démontable",
    description:
      "Charles et André Michelin inventent le pneu démontable pour bicyclette. Une révolution qui marque la naissance de l'industrie moderne du pneumatique.",
    image: "/images/legende/1891.jpg",
  },
  {
    year: "1946",
    title: "Le pneu radial",
    description:
      "Michelin invente le pneu radial, une avancée technologique majeure qui transforme l'industrie mondiale et offre une adhérence et une longévité inédites.",
    image: "/images/legende/1946.jpg",
  },
  {
    year: "1952",
    title: "Radial poids lourds",
    description:
      "La technologie radiale s'étend au transport routier, transformant le secteur du poids lourd et réduisant durablement la consommation de carburant.",
    image: "/images/legende/1952.jpg",
  },
  {
    year: "1978",
    title: "Radial agricole",
    description:
      "Michelin révolutionne l'agriculture mécanisée : meilleure traction, réduction du tassement des sols et respect des cultures.",
    image: "/images/legende/1978.jpg",
  },
  {
    year: "2017",
    title: "Vision Concept",
    description:
      "Un pneu connecté, rechargeable, imprimé en 3D et 100% durable. Avec Vision, le futur de la mobilité prend forme.",
    image: "/images/legende/2017.jpg",
  },
];

function Chapter({ m, index }: { m: Milestone; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.25, 1.1, 1.2],
  );
  const yearX = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["40%", "-20%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Fond parallaxe — img natif, pas de -z-10 */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={m.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading={index === 0 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-linear-to-r from-q-bg via-q-bg/70 to-q-bg/20" />
        <div className="absolute inset-0 bg-linear-to-t from-q-bg via-transparent to-q-bg/40" />
      </motion.div>

      {/* Année filigrane */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[28vw] font-black leading-none text-white/6"
        style={{ x: yearX }}
      >
        {m.year}
      </motion.span>

      <motion.div
        className="relative mx-auto w-full max-w-6xl px-6 md:px-8"
        style={{ y: textY }}
      >
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-sm font-bold uppercase tracking-[0.4em] text-secondary">
            {String(index + 1).padStart(2, "0")} — Chapitre
          </span>
          <h2 className="mt-4 bg-linear-to-br from-white to-white/60 bg-clip-text text-7xl font-black leading-none text-transparent md:text-9xl">
            {m.year}
          </h2>
          <h3 className="mt-4 text-2xl font-bold text-secondary md:text-4xl">
            {m.title}
          </h3>
          <p className="mt-6 text-lg leading-relaxed text-white/70">
            {m.description}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function LegendeClient() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroImageScale = useTransform(heroScroll, [0, 1], [1, 1.2]);
  const heroContentY = useTransform(heroScroll, [0, 1], ["0%", "60%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <div className="relative bg-q-bg text-white">
      {/* Barre de progression */}
      <motion.div
        className="fixed left-0 top-0 z-60 h-1 w-full origin-left bg-secondary"
        style={{ scaleX: progress }}
      />

      <Header />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex h-screen items-center overflow-hidden"
      >
        {/* Fond hero — image statique + vidéo par dessus quand disponible, pas de -z-10 */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroImageY, scale: heroImageScale }}
        >
          {/* Image de fallback toujours visible */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/background.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          {/* Vidéo par dessus — cache l'image quand elle joue */}
          <video
            src="/videos/background_2.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-q-bg via-q-bg/20 to-q-bg/30" />
          <div className="absolute inset-0 bg-linear-to-r from-q-bg/60 to-transparent" />
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-6xl px-6 md:px-8"
          style={{ y: heroContentY, opacity: heroOpacity }}
        >
          <motion.span
            className="inline-block rounded-full border border-secondary/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Innovation
          </motion.span>
          <motion.h1
            className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] md:text-8xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            Les innovations qui font
            <br />
            <span className="bg-linear-to-r from-secondary to-yellow-200 bg-clip-text text-transparent">
              la légende Michelin
            </span>
          </motion.h1>
          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            Depuis 1891, Michelin améliore la performance des cyclistes.
            Remontez le fil de plus de 130 ans d&apos;innovation.
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{ opacity: heroOpacity }}
        >
          <FontAwesomeIcon icon={faChevronDown} className="h-6 w-6" />
        </motion.div>
      </section>

      {/* Manifeste */}
      <section className="relative py-32 md:py-48">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
          <Reveal>
            <p className="text-3xl font-bold leading-tight md:text-5xl md:leading-tight">
              Depuis l&apos;invention du{" "}
              <span className="text-secondary">premier pneu démontable</span> en
              1891, Michelin n&apos;a jamais cessé de repousser les limites de
              la performance.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 text-lg uppercase tracking-[0.4em] text-white/40">
              #RideOnMichelin
            </p>
          </Reveal>
        </div>
      </section>

      {/* Chapitres / Timeline cinématique */}
      {milestones.map((m, i) => (
        <Chapter key={m.year} m={m} index={i} />
      ))}

      {/* Section gammes */}
      <section className="relative py-32 md:py-48">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <Reveal className="text-center">
            <h2 className="text-4xl font-black leading-tight md:text-6xl">
              Quel que soit
              <br />
              <span className="text-secondary">votre univers</span>
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-white/60">
              Route, gravel, VTT ou trajets quotidiens — il existe un pneu
              Michelin conçu pour repousser vos limites.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden border-t border-white/10 py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/background-noschampions.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-q-bg via-q-bg/80 to-q-bg" />
        </div>
        <Reveal className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-black md:text-5xl">
            Roulez avec la <span className="text-secondary">légende</span>
          </h2>
          <p className="mt-4 text-white/60">
            Découvrez quel pneu Michelin correspond à votre pratique.
          </p>
          <Link
            href="/configurateur"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-secondary px-8 py-4 font-bold text-neutral transition-all hover:gap-4 hover:brightness-110"
          >
            Trouver mon pneu
            <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
