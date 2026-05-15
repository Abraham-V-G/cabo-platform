"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const perks = [
  { label: "Up to 30% hotel discounts", detail: "Direct deals, no middlemen" },
  { label: "24/7 availability", detail: "Always here when you need us" },
  { label: "Exclusive inventory", detail: "Access others don't have" },
  { label: "Flexible travel options", detail: "Tailored to your schedule" },
  { label: "Wholesale pricing", detail: "Best rates, guaranteed" },
];

const logos = ["tripadvisor-icon", "secure-payment", "IATA", "SECTUR"];

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5.14v14l11-7-11-7z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function WhyUs() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="bg-black text-white py-28 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-20 items-center">

        {/* ── LEFT ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] tracking-[0.45em] uppercase text-white/30 mb-4">
            Why choose us
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            Travel smarter,
            <br />
            <span className="text-white/50 font-light italic">experience better</span>
          </h2>

          {/* Divider */}
          <div className="w-12 h-px bg-white/20 mb-8" />

          {/* Perks */}
          <ul className="space-y-0">
            {perks.map((perk, i) => (
              <motion.li
                key={perk.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 py-4 border-b border-white/[0.06] last:border-0 group"
              >
                <div className="mt-0.5 w-6 h-6 rounded-full border border-white/15 flex items-center justify-center shrink-0 text-white/40 group-hover:border-white/30 group-hover:text-white/70 transition-colors duration-300">
                  <CheckIcon />
                </div>
                <div>
                  <p className="text-white/90 font-medium text-sm">{perk.label}</p>
                  <p className="text-white/35 text-xs mt-0.5">{perk.detail}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* ── VIDEO ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow detrás */}
          <div
            className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl"
            style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.15), transparent 70%)" }}
          />

          <div
            className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setOpen(true)}
          >
            {!loaded && (
              <img
                src="/video-preview.jpg"
                alt="preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setLoaded(true)}
            >
              <source src="/videos/videoAboutUs.mp4" type="video/mp4" />
            </video>

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

            {/* Grain */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
              style={{ backgroundImage: GRAIN, backgroundSize: "200px" }}
            />

            {/* Border sutil */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.25 }}
                className="relative flex items-center justify-center w-16 h-16"
              >
                {/* Pulse ring */}
                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-white/20"
                />
                <div className="relative w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-xl pl-1">
                  <PlayIcon />
                </div>
              </motion.div>
            </div>

            {/* Label bottom */}
            <div className="absolute bottom-5 left-5">
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/40">Watch our story</p>
            </div>

          </div>
        </motion.div>
      </div>

      {/* ── TRUSTED BY ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mt-24 border-t border-white/[0.07] pt-14"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16">

          <p className="text-center text-[10px] tracking-[0.45em] uppercase text-white/25 mb-10">
            Trusted by
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 items-center">
            {logos.map((logo, i) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center opacity-30 hover:opacity-70 transition-opacity duration-300"
              >
                <img
                  src={`/${logo}.png`}
                  alt={logo}
                  className="h-8 object-contain brightness-0 invert"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>

      {/* ── MODAL ────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <video className="w-full h-full object-cover" controls autoPlay>
                <source src="/videoAboutUs.mp4" type="video/mp4" />
              </video>

              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-colors duration-200"
              >
                <CloseIcon />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}