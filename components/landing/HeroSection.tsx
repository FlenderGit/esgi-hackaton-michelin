"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useFullpage } from "./FullpageWrapper";

export default function HeroSection() {
  const { goTo } = useFullpage();

  return (
    <section
      className="relative flex h-screen w-full items-center overflow-hidden"
      style={{ backgroundColor: "#000b34" }}
    >
      <div className="animate-ken-burns absolute inset-0">
        <Image
          src="/images/background.jpg"
          alt="Cycliste professionnel en action"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-b from-transparent to-neutral" />

      <div className="relative z-[1] px-6 md:px-8 lg:px-16">
        <motion.p
          className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-secondary md:mb-4 md:text-sm"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Depuis 1891
        </motion.p>

        <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Michelin
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            au service
          </motion.span>
          <motion.span
            className="block text-secondary"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            des champions
          </motion.span>
        </h1>

        <motion.div
          className="mt-3 h-1 w-16 bg-secondary md:w-24"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ originX: 0 }}
        />
      </div>

      <motion.button
        onClick={() => goTo(1)}
        className="animate-bounce-down absolute bottom-8 left-1/2 z-[1] flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/50 md:bottom-10 md:gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[10px] uppercase tracking-widest md:text-xs">
          Découvrir
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="md:h-5 md:w-5"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.button>
    </section>
  );
}
