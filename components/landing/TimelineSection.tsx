"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useFullpage } from "./FullpageWrapper";

const milestones = [
  {
    year: "1891",
    title: "Pneu démontable",
    description: "Début de l'industrie moderne du pneu",
    image: "/images/timeline/1891.svg",
  },
  {
    year: "1946",
    title: "Pneu radial",
    description: "Révolution mondiale du pneumatique",
    image: "/images/timeline/1946.svg",
  },
  {
    year: "1952",
    title: "Radial poids lourds",
    description: "Transformation du transport routier",
    image: "/images/timeline/1952.svg",
  },
  {
    year: "1978",
    title: "Radial agricole",
    description: "Révolution de l'agriculture mécanisée",
    image: "/images/timeline/1978.svg",
  },
  {
    year: "2017",
    title: "Vision Concept",
    description: "Pneu intelligent et durable du futur",
    image: "/images/timeline/2017.svg",
  },
];

function MobileTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.offsetWidth * 0.75 + 16;
      const index = Math.round(scrollLeft / cardWidth);
      setMobileIndex(Math.min(index, milestones.length - 1));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex flex-col items-center pt-20">
        <h2 className="text-center text-2xl font-bold text-white">
          La légende Michelin
          <br />
          <span className="text-secondary">un siècle d&apos;innovations</span>
        </h2>

        <div className="relative mt-4 h-0.5 w-48 bg-white/10">
          <motion.div
            className="absolute left-0 top-0 h-full bg-secondary"
            animate={{
              width: `${((mobileIndex + 1) / milestones.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-1 items-center gap-4 overflow-x-auto px-[12.5%] snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {milestones.map((m) => (
          <div
            key={m.year}
            className="flex w-[75vw] flex-shrink-0 snap-center flex-col items-center gap-4"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={m.image}
                alt={m.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/10" />
            </div>

            <span className="text-4xl font-bold leading-none text-secondary">
              {m.year}
            </span>

            <h3 className="text-lg font-bold text-white">{m.title}</h3>

            <div className="h-0.5 w-10 bg-secondary" />

            <p className="text-center text-sm text-white/60">{m.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 pb-6">
        {milestones.map((m, i) => (
          <div
            key={m.year}
            className={`h-2 w-2 rounded-full bg-secondary transition-all duration-300 ${
              i === mobileIndex ? "scale-150 opacity-100" : "opacity-30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function DesktopTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDir, setSlideDir] = useState(1);
  const cooldown = useRef(false);
  const { activeSection } = useFullpage();
  const isActive = activeSection === 1;

  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e: WheelEvent) => {
      if (cooldown.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;

      if (goingUp && activeIndex === 0) return;
      if (goingDown && activeIndex === milestones.length - 1) return;

      e.preventDefault();
      e.stopPropagation();
      cooldown.current = true;

      setSlideDir(goingDown ? 1 : -1);
      if (goingDown) {
        setActiveIndex((prev) => prev + 1);
      } else if (goingUp) {
        setActiveIndex((prev) => prev - 1);
      }

      setTimeout(() => {
        cooldown.current = false;
      }, 700);
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });
    return () =>
      window.removeEventListener("wheel", handleWheel, { capture: true });
  }, [isActive, activeIndex]);

  const milestone = milestones[activeIndex];

  const cardVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 120 : -120,
      scale: 0.95,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -120 : 120,
      scale: 0.95,
    }),
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex flex-col items-center pt-28">
        <h2 className="text-center text-5xl font-bold text-white">
          La légende Michelin
          <br />
          <span className="text-secondary">un siècle d&apos;innovations</span>
        </h2>

        <div className="relative mt-8 h-0.5 w-96 bg-white/10">
          <motion.div
            className="absolute left-0 top-0 h-full bg-secondary"
            animate={{
              width: `${((activeIndex + 1) / milestones.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        <motion.p
          className="mt-3 text-xs tracking-widest text-white/30"
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(milestones.length).padStart(2, "0")}
        </motion.p>
      </div>

      <div className="relative flex-1">
        <AnimatePresence mode="wait" custom={slideDir}>
          <motion.div
            key={milestone.year}
            custom={slideDir}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 flex items-center justify-center px-8 lg:px-24"
          >
            <div className="flex w-full max-w-6xl items-center gap-16">
              <div className="group relative aspect-[4/3] w-1/2 overflow-hidden rounded-2xl">
                <Image
                  src={milestone.image}
                  alt={milestone.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
              </div>

              <div className="flex w-1/2 flex-col">
                <span className="text-8xl font-bold leading-none text-secondary">
                  {milestone.year}
                </span>

                <h3 className="mt-4 text-3xl font-bold text-white">
                  {milestone.title}
                </h3>

                <div className="mt-3 h-0.5 w-16 bg-secondary" />

                <p className="mt-4 text-lg text-white/60">
                  {milestone.description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-3 pb-10">
        {milestones.map((m, i) => (
          <button
            key={m.year}
            onClick={() => {
              setSlideDir(i > activeIndex ? 1 : -1);
              setActiveIndex(i);
            }}
            className={`h-2 w-2 rounded-full bg-secondary transition-all duration-300 ${
              i === activeIndex
                ? "scale-150 opacity-100 shadow-[0_0_6px_rgba(252,229,0,0.4)]"
                : "opacity-30 hover:opacity-60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function TimelineSection() {
  return (
    <section
      id="legende"
      className="h-screen"
      style={{ backgroundColor: "#000b34" }}
    >
      <div className="block h-full md:hidden">
        <MobileTimeline />
      </div>
      <div className="hidden h-full md:block">
        <DesktopTimeline />
      </div>
    </section>
  );
}
