"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";

type FullpageContextType = {
  activeSection: number;
  goTo: (index: number) => void;
  totalSections: number;
};

const FullpageContext = createContext<FullpageContextType>({
  activeSection: 0,
  goTo: () => {},
  totalSections: 0,
});

export function useFullpage() {
  return useContext(FullpageContext);
}

export default function FullpageWrapper({
  children,
}: {
  children: React.ReactNode[];
}) {
  const [activeSection, setActiveSection] = useState(0);
  const [direction, setDirection] = useState(1);
  const cooldown = useRef(false);
  const touchStart = useRef(0);
  const totalSections = children.length;

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSections || cooldown.current) return;
      cooldown.current = true;
      setDirection(index > activeSection ? 1 : -1);
      setActiveSection(index);
      setTimeout(() => {
        cooldown.current = false;
      }, 1000);
    },
    [totalSections, activeSection],
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (cooldown.current) return;

      if (e.deltaY > 0) {
        goTo(activeSection + 1);
      } else if (e.deltaY < 0) {
        goTo(activeSection - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeSection, goTo]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (cooldown.current) return;
      const delta = touchStart.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;

      if (delta > 0) {
        goTo(activeSection + 1);
      } else {
        goTo(activeSection - 1);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSection, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(activeSection + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(activeSection - 1);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeSection, goTo]);

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? "40%" : "-40%",
    }),
    center: {
      opacity: 1,
      y: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? "-40%" : "40%",
    }),
  };

  return (
    <FullpageContext.Provider value={{ activeSection, goTo, totalSections }}>
      <div
        className="relative h-screen w-screen overflow-hidden"
        style={{ backgroundColor: "#000b34" }}
      >
        <Navbar />
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeSection}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            {children[activeSection]}
          </motion.div>
        </AnimatePresence>

        <div className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex">
          {children.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full transition-all duration-500 md:h-2.5 md:w-2.5 ${
                i === activeSection
                  ? "scale-150 bg-secondary shadow-[0_0_8px_rgba(252,229,0,0.5)]"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </FullpageContext.Provider>
  );
}
