"use client";

import { motion } from "framer-motion";
import Button from "./Button";

export default function CtaSection() {
  return (
    <section
      className="relative flex h-screen w-full flex-col overflow-hidden"
      style={{ backgroundColor: "#000b34" }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/background_2.mp4"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(39, 80, 155, 0.3) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-[#000b34]/70" />

      <div className="relative z-[1] flex flex-1 flex-col items-center justify-center px-6 text-center md:px-8">
        <motion.span
          className="text-xs font-bold uppercase tracking-widest text-secondary md:text-sm"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Trouvez votre pneu idéal
        </motion.span>

        <motion.h2
          className="mt-4 max-w-3xl text-2xl font-bold leading-tight text-white md:mt-6 md:text-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Le bon pneu pour
          <br />
          <span
            className="animate-gradient-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #fce500, #fff, #fce500)",
              backgroundSize: "200% 200%",
            }}
          >
            chaque cycliste
          </span>
        </motion.h2>

        <motion.p
          className="mt-3 max-w-xl text-sm text-white/60 md:mt-4 md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Route, gravel ou VTT, notre application analyse votre profil et vous
          recommande le pneumatique Michelin parfaitement adapté à votre
          pratique.
        </motion.p>

        <motion.div
          className="mt-6 md:mt-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="rounded-full">
            <Button
              href="/configurateur"
              variant="secondary"
              className="px-6 py-3 text-sm md:px-8 md:py-4 md:text-base"
            >
              Trouver mon pneu
            </Button>
          </div>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(252, 229, 0, 0.3), transparent)",
        }}
      />
    </section>
  );
}
