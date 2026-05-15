"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import FadeIn from "@/components/FadeIn";

const values = [
  {
    number: "01",
    title: "Precision",
    description: "Every detail is carefully curated — from the first click to the last sunset.",
  },
  {
    number: "02",
    title: "Experience",
    description: "We prioritize moments over transactions. Travel should feel like a story.",
  },
  {
    number: "03",
    title: "Innovation",
    description: "Built with modern technology so booking feels as good as the trip itself.",
  },
];

const stats = [
  { value: "500+", label: "Experiences" },
  { value: "12K+", label: "Travelers" },
  { value: "4.9", label: "Avg. rating" },
  { value: "5+", label: "Destinations" },
];

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function AboutPage() {
  const router = useRouter();
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <main className="bg-black text-white overflow-hidden">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255,255,255,0.04), transparent)",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[10px] tracking-[0.45em] uppercase text-white/30 mb-6"
        >
          About us
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="text-5xl md:text-7xl font-semibold leading-tight max-w-4xl"
        >
          We don't just sell trips.
          <br />
          <span className="italic font-light text-white/50">We craft experiences.</span>
        </motion.h1>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── BIG STATEMENT ────────────────────────────── */}
      <section className="py-32 px-6 md:px-16 border-t border-white/[0.06]">
        <FadeIn>
          <p className="text-3xl md:text-5xl font-light text-white/60 max-w-4xl mx-auto leading-relaxed text-center">
            A new way to explore México —
            designed for those who{" "}
            <em className="text-white not-italic font-semibold">expect more.</em>
          </p>
        </FadeIn>
      </section>

      {/* ── STATS ────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06]">
          {stats.map((s, i) => (
            <FadeIn key={s.label}>
              <div className="bg-black flex flex-col items-center justify-center py-12 px-6 text-center">
                <span className="text-4xl md:text-5xl font-semibold mb-2">{s.value}</span>
                <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">{s.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── WHO WE ARE + PARALLAX IMAGE ──────────────── */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 px-6 md:px-16 py-32 items-center">

        <FadeIn>
          <div>
            <p className="text-[10px] tracking-[0.45em] uppercase text-white/30 mb-4">Our story</p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight">
              Who we are
            </h2>
            <div className="w-10 h-px bg-white/20 mb-6" />
            <p className="text-white/50 leading-relaxed text-base mb-5">
              We are a premium travel platform focused on delivering curated
              experiences across México's most breathtaking destinations.
            </p>
            <p className="text-white/50 leading-relaxed text-base">
              Our goal is simple — remove friction, elevate quality, and give
              you access to the best each destination has to offer.
            </p>
          </div>
        </FadeIn>

        {/* Parallax image */}
        <div ref={parallaxRef} className="relative h-[420px] rounded-2xl overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070"
            alt="Cabo"
            style={{ y: imgY }}
            className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
            style={{ backgroundImage: GRAIN, backgroundSize: "200px" }}
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
        </div>

      </section>

      {/* ── MISSION ──────────────────────────────────── */}
      <section className="border-t border-white/[0.06] py-28 px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-32 items-start">
          <FadeIn>
            <p className="text-[10px] tracking-[0.45em] uppercase text-white/30 md:w-40 shrink-0 mt-1">
              Our mission
            </p>
          </FadeIn>
          <FadeIn>
            <p className="text-2xl md:text-3xl font-light text-white/70 leading-relaxed max-w-2xl">
              To redefine how people book and experience travel through{" "}
              <span className="text-white font-semibold">simplicity</span>,{" "}
              <span className="text-white font-semibold">design</span> and{" "}
              <span className="text-white font-semibold">technology</span>.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────── */}
      <section className="py-28 px-6 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">

          <FadeIn>
            <div className="mb-16">
              <p className="text-[10px] tracking-[0.45em] uppercase text-white/30 mb-3">What drives us</p>
              <h2 className="text-4xl md:text-5xl font-semibold">
                Our{" "}
                <span className="italic font-light text-white/50">values</span>
              </h2>
            </div>
          </FadeIn>

          <div className="divide-y divide-white/[0.06]">
            {values.map((v, i) => (
              <FadeIn key={v.title}>
                <div className="flex items-start gap-8 py-8 group">
                  <span className="text-white/15 text-sm font-light shrink-0 mt-1 w-8">
                    {v.number}
                  </span>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-16 flex-1">
                    <h3 className="text-xl font-semibold md:w-40 shrink-0 group-hover:text-white/80 transition-colors duration-300">
                      {v.title}
                    </h3>
                    <p className="text-white/40 font-light leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-32 text-center px-6 border-t border-white/[0.06]">
        <FadeIn>
          <p className="text-[10px] tracking-[0.45em] uppercase text-white/30 mb-5">
            Start your journey
          </p>
          <h2 className="text-4xl md:text-6xl font-semibold mb-10 leading-tight">
            Ready to explore{" "}
            <span className="italic font-light text-white/50">Cabo?</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push("/tours")}
              className="px-8 py-3.5 bg-white text-black text-sm font-medium tracking-wide rounded-full hover:bg-white/90 transition-colors duration-300"
            >
              View Experiences
            </button>
            <button
              onClick={() => router.push("#contact")}
              className="px-8 py-3.5 border border-white/25 text-white/70 hover:text-white hover:border-white/40 text-sm font-light tracking-wide rounded-full transition-all duration-300"
            >
              Get in touch
            </button>
          </div>
        </FadeIn>
      </section>

    </main>
  );
}