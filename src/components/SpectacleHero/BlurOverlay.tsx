"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface BlurOverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function BlurOverlay({ scrollYProgress }: BlurOverlayProps) {
  // Blur: 0→0 at 0.3, peaks at 24px at 0.7, back to 0 at 1.0
  const blur = useTransform(scrollYProgress, [0.3, 0.7, 1.0], [0, 24, 0]);
  // Mobile cap handled via CSS max() isn't needed — we keep it simple
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.7, 1.0],
    [0, 0.15, 0.15, 0]
  );
  // Vignette intensity peaks at blur peak
  const vignetteOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.7, 1.0],
    [0, 0.6, 0]
  );
  // Chromatic aberration intensity (subtle box-shadow offsets)
  const aberration = useTransform(
    scrollYProgress,
    [0.4, 0.65, 0.85],
    [0, 3, 0]
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{
        backdropFilter: useTransform(blur, (b) => `blur(${b}px)`),
        WebkitBackdropFilter: useTransform(blur, (b) => `blur(${b}px)`),
      }}
    >
      {/* White overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: useTransform(
            overlayOpacity,
            (o) => `rgba(255,255,255,${o})`
          ),
        }}
      />
      {/* Vignette */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: vignetteOpacity,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />
      {/* Chromatic aberration */}
      <motion.div
        className="absolute inset-0"
        style={{
          boxShadow: useTransform(
            aberration,
            (a) =>
              `inset ${a}px 0 ${a * 2}px rgba(255,0,0,0.08), inset -${a}px 0 ${a * 2}px rgba(0,0,255,0.08)`
          ),
        }}
      />
    </motion.div>
  );
}
