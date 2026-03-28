"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Silk from "./Silk";

export default function VisitUsCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden mx-4 md:mx-8 my-8 rounded-2xl h-[300px] md:h-[350px]">
      {/* Silk background — golden yellow */}
      <div className="absolute inset-0">
        <Silk
          speed={4}
          scale={1}
          color="#D4Af37"
          noiseIntensity={0.8}
          rotation={0}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/30 mb-4"
        >
          <Image
            src="/logo.jpg"
            alt="Vision 21 Logo"
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white text-3xl md:text-5xl font-bold tracking-tight"
        >
          Vision 21
        </motion.h2>
      </div>
    </section>
  );
}
