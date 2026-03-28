"use client";

import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

/**
 * Shared scroll animation hook.
 * Returns a sectionRef to attach to the scroll container,
 * and a progressRef that holds the current 0→1 scroll progress
 * (updated without triggering re-renders).
 */
export function useScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  return { sectionRef, progressRef, scrollYProgress };
}
