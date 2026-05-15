"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";


interface Tour {
  slug: string;
  name: string;
  description: string;
  image: string;
  location: string;
  category: string;
}

interface VacationPackage {
  slug: string;
  name: string;
  description: string;
  image: string;
  location: string;
  category: string;
  resort: string;
}

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const ArrowIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

export default function ExperienceSelector() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/vacations").then(res => res.json()),
      fetch("/api/tours").then(res => res.json())
    ])
      .then(([vacations, tours]) => {
        // Datos de la API (solo para obtener textos, no imágenes)
        const vacationData = vacations.length > 0 ? vacations[0] : null;
        const tourData = tours.length > 0 ? tours[0] : null;

        const dynamicItems = [];

        // Ítem de Vacaciones – con IMAGEN ESTÁTICA
        dynamicItems.push({
          number: "01",
          title: "Vacations",
          subtitle: "Escape the ordinary",
          href: "/vacations",
          image: "/vacations.jpg", // ✅ imagen estática local
          tag: vacationData
            ? `${vacationData.location} · ${vacationData.resort} · Getaways`
            : "Beach · Resorts · Getaways",
          description: vacationData?.description || "Hand-picked resorts and private getaways across Mexico's most stunning coastlines.",
        });

        // Ítem de Tours – con IMAGEN ESTÁTICA
        dynamicItems.push({
          number: "02",
          title: "Our Tours",
          subtitle: "Guided adventures",
          href: "/tours",
          image: "/tours.jpg", // ✅ imagen estática local
          tag: tourData
            ? `${tourData.location} · ${tourData.category} · Discovery`
            : "Culture · Nature · Discovery",
          description: tourData?.description || "Expert-led experiences designed to take you deeper into every destination.",
        });

        setItems(dynamicItems);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data for ExperienceSelector:", err);
        // Fallback estático también con imágenes locales
        setItems([
          {
            number: "01",
            title: "Vacations",
            subtitle: "Escape the ordinary",
            href: "/vacations",
            image: "/images/vacations-hero.jpg",
            tag: "Beach · Resorts · Getaways",
            description: "Hand-picked resorts and private getaways across Mexico's most stunning coastlines.",
          },
          {
            number: "02",
            title: "Our Tours",
            subtitle: "Guided adventures",
            href: "/tours",
            image: "/images/tours-hero.jpg",
            tag: "Culture · Nature · Discovery",
            description: "Expert-led experiences designed to take you deeper into every destination.",
          }
        ]);
        setLoading(false);
      });
  }, []);


  const active = hovered !== null ? hovered : null;

  if (loading) {
    return (
      <section className="bg-black py-20">
        <div className="text-center text-white/50">Loading experiences...</div>
      </section>
    );
  }

  return (
    <section className="bg-black overflow-hidden">

      {/* ── DESKTOP ──────────────────────────────────── */}
      <div className="hidden md:block">

        {/* Header */}
        <div className="flex items-end justify-between px-16 pt-16 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] tracking-[0.45em] uppercase text-white/30 mb-3">
              Discover with us
            </p>
            <h2 className="text-white text-4xl font-semibold">
              Choose your{" "}
              <span className="text-white/50 font-light italic">experience</span>
            </h2>
          </motion.div>

          {/* Counter */}
          <div className="flex items-center gap-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={active ?? "none"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-xs text-white/20 tracking-widest tabular-nums"
              >
                {active !== null ? items[active]?.number : "——"} / {String(items.length).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <div className="h-px w-16 bg-white/10" />
          </div>
        </div>

        {/* Cards */}
        <div className="flex h-[72vh] mx-16 mb-16 gap-2 rounded-2xl overflow-hidden">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl cursor-pointer"
              style={{
                flex: hovered === index ? "1.65" : hovered !== null ? "0.72" : "1",
                transition: "flex 0.75s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link href={item.href} className="absolute inset-0 z-20" />

              {/* Image */}
              <motion.img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ scale: hovered === index ? 1.07 : 1.02 }}
                transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* Gradient */}
              <div
                className="absolute inset-0 transition-all duration-700"
                style={{
                  background: hovered === index
                    ? "linear-gradient(160deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.9) 100%)"
                    : "linear-gradient(160deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.82) 100%)",
                }}
              />

              {/* Grain */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.18] mix-blend-overlay"
                style={{ backgroundImage: GRAIN, backgroundSize: "200px" }}
              />

              {/* Ghost number */}
              <motion.div
                className="absolute top-7 left-8 select-none leading-none text-[9rem] font-bold text-white"
                animate={{ opacity: hovered === index ? 0.12 : 0.04 }}
                transition={{ duration: 0.6 }}
              >
                {item.number}
              </motion.div>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 p-10">

                <motion.p
                  className="text-[10px] tracking-[0.4em] uppercase text-white mb-3"
                  animate={{ opacity: hovered === index ? 0.55 : 0.2 }}
                  transition={{ duration: 0.4 }}
                >
                  {item.tag}
                </motion.p>

                {/* Description — only visible on hover */}
                <motion.p
                  className="text-sm font-light text-white/60 leading-relaxed mb-3 max-w-xs overflow-hidden"
                  animate={{
                    opacity: hovered === index ? 1 : 0,
                    height: hovered === index ? "auto" : 0,
                    marginBottom: hovered === index ? 12 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {item.description}
                </motion.p>

                <motion.p
                  className="text-sm font-light tracking-wide mb-1 text-white"
                  animate={{ opacity: hovered === index ? 0.6 : 0.28 }}
                  transition={{ duration: 0.4 }}
                >
                  {item.subtitle}
                </motion.p>

                <div className="flex items-end justify-between">
                  <motion.h2
                    className="text-white leading-none font-semibold"
                    animate={{ fontSize: hovered === index ? "4rem" : "3rem" }}
                    transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {item.title}
                  </motion.h2>

                  <motion.div
                    className="flex items-center justify-center w-11 h-11 rounded-full border border-white/25 text-white mb-1 shrink-0 ml-4"
                    animate={{
                      opacity: hovered === index ? 1 : 0,
                      x: hovered === index ? 0 : 16,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <ArrowIcon size={17} />
                  </motion.div>
                </div>

                <motion.div
                  className="h-px bg-white/20 mt-5 origin-left"
                  animate={{ scaleX: hovered === index ? 1 : 0 }}
                  transition={{ duration: 0.55, delay: 0.06 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── MOBILE ───────────────────────────────────── */}
      <div className="md:hidden pt-10 pb-12">

        {/* Header */}
        <div className="mb-8 px-6">
          <p className="text-[10px] tracking-[0.45em] uppercase text-white/30 mb-2">
            Discover with us
          </p>
          <h2 className="text-white text-3xl font-semibold leading-snug">
            Choose your{" "}
            <span className="text-white/50 font-light italic">experience</span>
          </h2>
        </div>

        {/* Horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto px-6 pb-2 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="shrink-0 snap-center"
              style={{ width: "calc(85vw)" }}
            >
              <motion.div
                whileTap={{ scale: 0.975 }}
                className="relative h-[460px] rounded-2xl overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
                  }}
                />

                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.18] mix-blend-overlay"
                  style={{ backgroundImage: GRAIN, backgroundSize: "200px" }}
                />

                {/* Ghost number */}
                <div className="absolute top-5 left-6 select-none leading-none text-[7rem] font-bold text-white opacity-[0.07]">
                  {item.number}
                </div>

                {/* Tag top-right */}
                <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-black/30 border border-white/10 backdrop-blur-sm">
                  <span className="text-[9px] tracking-widest uppercase text-white/40">
                    {item.tag.split(" · ")[0]}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-white/35 mb-1">
                    {item.subtitle}
                  </p>
                  <p className="text-white/40 text-xs font-light leading-relaxed mb-4 max-w-[240px]">
                    {item.description}
                  </p>
                  <div className="flex items-end justify-between">
                    <h2 className="text-white text-[2.4rem] leading-none font-semibold">
                      {item.title}
                    </h2>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/25 text-white mb-0.5 shrink-0 ml-3">
                      <ArrowIcon size={15} />
                    </div>
                  </div>
                  <div className="h-px bg-white/15 mt-4" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Scroll hint dots */}
        <div className="flex justify-center gap-1.5 mt-5">
          {items.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/20"
            />
          ))}
        </div>

      </div>

    </section>
  );
}
