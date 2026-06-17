"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const champions = [
  {
    name: "Victor Lafay",
    discipline: "ROUTE",
    description: "L'explosivité au service de la victoire.",
    image: "/images/victorlafay.jpg",
    imagePosition: "top",
  },
  {
    name: "Ion Izagirre",
    discipline: "ROUTE",
    description: "Le stratège des grands tours.",
    image: "/images/ionizagirre.jpg",
    imagePosition: "center",
  },
  {
    name: "Nicolas Vouilloz",
    discipline: "VTT DESCENTE",
    description: "La légende absolue du VTT.",
    image: "/images/A20425-NICOLAS-VOUILLOZ_e-copy.jpg",
    imagePosition: "top",
  },
  {
    name: "Jérôme Clementz",
    discipline: "ENDURO",
    description: "Le pionnier de l'enduro.",
    image: "/images/Jeromeclmentz.jpg",
    imagePosition: "center",
  },
  {
    name: "Julie Bresset",
    discipline: "CROSS-COUNTRY",
    description: "La reine du cross-country.",
    image: "/images/juliebresset.jpg",
    imagePosition: "top",
  },
  {
    name: "Guillaume Martin",
    discipline: "ROUTE",
    description: "Le grimpeur philosophe.",
    image: "/images/guillaumemartin.jpg",
    imagePosition: "center",
  },
];

function ChampionCard({
  champion,
  index,
}: {
  champion: (typeof champions)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="group relative h-full w-44 flex-shrink-0 overflow-hidden rounded-2xl border border-white/5 md:w-auto md:flex-1"
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.3s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, rotateY: -10 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <Image
        src={champion.image}
        alt={champion.name}
        fill
        className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
          champion.imagePosition === "top" ? "object-top" : "object-center"
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/95" />

      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 80%, rgba(39, 80, 155, 0.3) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 p-3 md:p-4"
        style={{ transform: "translateZ(30px)" }}
      >
        <span className="mb-1.5 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-primary shadow-[0_0_12px_rgba(252,229,0,0.3)] md:text-[11px]">
          {champion.discipline}
        </span>
        <h3 className="text-sm font-bold leading-tight text-white md:text-lg">
          {champion.name}
        </h3>
        <p className="mt-0.5 text-[10px] text-white/60 transition-colors duration-300 group-hover:text-white/80 md:text-xs">
          {champion.description}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/0 transition-all duration-500 group-hover:border-secondary/30 group-hover:shadow-[inset_0_0_30px_rgba(252,229,0,0.05)]" />
    </motion.div>
  );
}

const marqueeText = "L'INNOVATION AU SERVICE DE LA VICTOIRE.";

export default function ChampionsSection() {
  return (
    <section
      id="champions"
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#000b34" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(39, 80, 155, 0.4) 0%, transparent 60%)",
        }}
      />

      <div className="relative flex h-full flex-col pt-20 md:pt-24">
        <motion.div
          className="mb-4 flex flex-col items-center md:mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-center text-2xl font-bold text-white md:text-3xl lg:text-5xl">
            Ils nous font confiance
            <br />
            <span className="text-secondary">nos champions</span>
          </h2>
          <motion.div
            className="mt-4 h-0.5 w-48 bg-white/10 md:mt-6 md:w-96"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div
          className="flex min-h-0 flex-1 gap-3 overflow-x-auto px-4 pr-20 scrollbar-none md:gap-4 md:overflow-visible md:px-8 md:pr-32 lg:px-16 lg:pr-36"
          style={{ scrollbarWidth: "none" }}
        >
          {champions.map((champion, index) => (
            <ChampionCard
              key={champion.name}
              champion={champion}
              index={index}
            />
          ))}
        </div>

        <div className="overflow-hidden pb-6 pt-4 md:pb-10 md:pt-6">
          <div className="animate-marquee flex w-max whitespace-nowrap">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="px-8 text-6xl font-black italic text-white/[0.07] md:px-16 md:text-8xl lg:text-9xl"
              >
                {marqueeText} &nbsp;&nbsp; {marqueeText} &nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
