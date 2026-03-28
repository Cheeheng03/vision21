"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// TODO: Replace with the actual brands Vision 21 carries
const brands = [
  { name: "Brand 1", desc: "Category", img: "/Brands/brand1.jpg" },
  { name: "Brand 2", desc: "Category", img: "/Brands/brand2.jpg" },
  { name: "Brand 3", desc: "Category", img: "/Brands/brand3.jpg" },
  { name: "Brand 4", desc: "Category", img: "/Brands/brand4.jpg" },
  { name: "Brand 5", desc: "Category", img: "/Brands/brand5.jpg" },
  { name: "Brand 6", desc: "Category", img: "/Brands/brand6.jpg" },
];

function BrandCard({
  name,
  desc,
  img,
  index,
}: {
  name: string;
  desc: string;
  img: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 2) * 0.15, ease: "easeOut" }}
      className="relative overflow-hidden border border-black/5 flex flex-col items-center justify-end aspect-[3/2] md:aspect-[4/3] p-8 md:p-12 text-center"
    >
      <Image src={img} alt={name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="relative z-10">
        <h3 className="text-white text-xl md:text-2xl font-bold tracking-wide">
          {name}
        </h3>
        <p className="text-white/60 text-xs md:text-sm mt-2 uppercase tracking-widest">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function BrandsSection() {
  return (
    <section className="bg-white">
      <div className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="border-t border-black mb-16" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-black text-xs uppercase tracking-[0.25em] mb-16 text-center"
          >
            Our Exclusive
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {brands.map((b, i) => (
              <BrandCard key={b.name} name={b.name} desc={b.desc} img={b.img} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
