"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const featuredSlugs = [
  "snorkeling-cabo",
  "luxury-yacht-cabo",
  "atv-cabo",
  "whale-watching-cabo",
  "cabo-pulmo-snorkel",
  "chichen-itza-tour",
];

interface Tour {
  id: string;
  slug: string;
  name: string;
  price: number;
  times: string[];
  description: string;
  image: string;
  category: string;
  location: string;
}

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function Experiences() {
  const [allTours, setAllTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/tours")
      .then((res) => res.json())
      .then((data) => {
        setAllTours(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const featuredTours = allTours.filter((t) => featuredSlugs.includes(t.slug));
  const isSearching = search.length > 0;
  const dataToShow = isSearching
    ? allTours.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
    : featuredTours;

  if (loading) {
    return (
      <section className="bg-black text-white py-28">
        <div className="text-center text-white/50">Loading experiences...</div>
      </section>
    );
  }

  return (
    <section className="bg-black text-white py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] tracking-[0.45em] uppercase text-white/30 mb-3">What we offer</p>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
              Featured <span className="text-white/50 font-light italic">experiences</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search experiences..."
              className="bg-white/[0.05] border border-white/[0.09] hover:border-white/20 focus:border-white/30 rounded-full pl-10 pr-5 py-2.5 w-64 outline-none text-sm text-white placeholder-white/25 transition-colors duration-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {isSearching && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors text-xs"
              >
                ✕
              </button>
            )}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {dataToShow.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-3 gap-4"
            >
              {dataToShow.map((tour, i) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  onClick={() => router.push(`/book/${tour.slug}`)}
                  className="relative group overflow-hidden rounded-2xl cursor-pointer h-[380px]"
                >
                  <motion.img
                    src={tour.image}
                    alt={tour.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)" }} />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "200px" }} />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10px] tracking-[0.35em] uppercase text-white/35 mb-1.5">Los Cabos</p>
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-white font-semibold text-lg leading-tight mb-1">{tour.name}</h3>
                        <p className="text-white/40 text-xs font-light line-clamp-1 max-w-[220px]">{tour.description}</p>
                      </div>
                      <motion.div
                        className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white/60 shrink-0 ml-3 mb-0.5"
                        animate={{ opacity: 1 }}
                        whileHover={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowIcon />
                      </motion.div>
                    </div>
                    <motion.div className="h-px bg-white/20 mt-4 origin-left" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.4 }} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <p className="text-white/20 text-5xl mb-4">·</p>
              <p className="text-white/40 text-sm">No experiences found for "{search}"</p>
              <button onClick={() => setSearch("")} className="mt-4 text-xs text-white/30 hover:text-white/60 underline underline-offset-4 transition-colors">
                Clear search
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {!isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <button onClick={() => router.push("/tours")} className="px-8 py-3 rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/35 text-sm font-light tracking-wide transition-all duration-300">
              View all experiences
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}