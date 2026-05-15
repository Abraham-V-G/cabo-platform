"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Michael R.",
    location: "New York, USA",
    review: "Absolutely unforgettable experience. Every detail was taken care of — from the hotel to the excursions. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sarah L.",
    location: "Toronto, Canada",
    review: "The best tour we had in Los Cabos. The guide was knowledgeable, friendly, and made the whole trip feel personal. 10/10 service.",
    rating: 5,
  },
  {
    name: "Daniel K.",
    location: "London, UK",
    review: "Professional guides and amazing views. We felt safe and well-cared for the entire time. Already planning our next trip.",
    rating: 5,
  },
  {
    name: "Jessica M.",
    location: "Miami, USA",
    review: "Would book again without hesitation. Seamless booking, great communication, and an experience that exceeded all expectations.",
    rating: 5,
  },
];

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ArrowIcon = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {dir === "left"
      ? <path d="M19 12H5M5 12l7-7M5 12l7 7" />
      : <path d="M5 12h14M14 5l7 7-7 7" />}
  </svg>
);

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent((next + testimonials.length) % testimonials.length);
  };

  // Auto-advance
  useEffect(() => {
    const t = setTimeout(() => go(current + 1), 5000);
    return () => clearTimeout(t);
  }, [current]);

  const item = testimonials[current];

  return (
    <section className="bg-black text-white py-28 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase text-white/30 mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
            What travelers{" "}
            <span className="text-white/50 font-light italic">say about us</span>
          </h2>
        </motion.div>

        {/* Card */}
        <div className="relative h-[260px] md:h-[220px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={{
                enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
                center: { opacity: 1, x: 0 },
                exit: (d) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 flex flex-col items-center text-center px-4 md:px-16"
            >
              {/* Quote mark */}
              <div
                className="text-[5rem] leading-none text-white/[0.07] select-none font-serif mb-2"
                aria-hidden
              >
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 text-white/60 mb-5 -mt-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* Review */}
              <p className="text-white/75 text-base md:text-lg font-light leading-relaxed mb-6 max-w-2xl">
                {item.review}
              </p>

              {/* Author */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-white font-semibold text-sm">{item.name}</span>
                <span className="text-white/30 text-xs tracking-wide">{item.location}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">

          {/* Prev */}
          <button
            onClick={() => go(current - 1)}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/35 transition-colors duration-300"
          >
            <ArrowIcon dir="left" />
          </button>

          {/* Dots */}
          <div className="flex gap-2.5 items-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="transition-all duration-300"
                style={{
                  width: current === i ? "24px" : "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background: current === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => go(current + 1)}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/35 transition-colors duration-300"
          >
            <ArrowIcon dir="right" />
          </button>

        </div>

        {/* Progress bar */}
        <div className="mt-8 h-px bg-white/[0.07] relative overflow-hidden max-w-xs mx-auto rounded-full">
          <motion.div
            key={current}
            className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </div>

      </div>
    </section>
  );
}