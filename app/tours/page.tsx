"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
  featured: boolean;
}

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);

const ArrowIcon = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {dir === "left" ? <path d="M19 12H5M5 12l7-7M5 12l7 7" /> : <path d="M5 12h14M14 5l7 7-7 7" />}
  </svg>
);

function TourCard({ tour }: { tour: Tour }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/book/${tour.slug}`}>
      <motion.div
        className="relative shrink-0 w-[300px] h-[380px] rounded-2xl overflow-hidden cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.98 }}
      >
        <motion.img
          src={tour.image}
          alt={tour.name}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        />

        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
          }}
        />

        <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
          style={{ backgroundImage: GRAIN, backgroundSize: "200px" }} />

        {/* Price badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm">
          <span className="text-xs font-medium text-white">${tour.price} <span className="text-white/35 font-light">USD</span></span>
        </div>

        {/* Featured badge */}
        {tour.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
            <span className="text-[9px] tracking-widest uppercase text-white/60">Featured</span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-[9px] tracking-[0.4em] uppercase text-white/35 mb-1.5">{tour.location}</p>
          <h3 className="text-white font-semibold text-lg leading-tight mb-2">{tour.name}</h3>

          <motion.p
            className="text-white/40 text-xs font-light leading-relaxed overflow-hidden"
            animate={{ opacity: hovered ? 1 : 0, height: hovered ? "auto" : 0, marginBottom: hovered ? 10 : 0 }}
            transition={{ duration: 0.35 }}
          >
            {tour.description}
          </motion.p>

          <div className="flex items-center justify-between">
            <div className="flex gap-1.5 flex-wrap">
              {tour.times.slice(0, 2).map((t) => (
                <span key={t} className="text-[9px] tracking-wide text-white/25 border border-white/10 rounded-full px-2 py-0.5">{t}</span>
              ))}
            </div>
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 shrink-0"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </motion.div>
          </div>

          <motion.div
            className="h-px bg-white/15 mt-4 origin-left"
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </motion.div>
    </Link>
  );
}

function CategoryCarousel({ items, index }: { items: Tour[]; index: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });

  return (
    <div className="relative">
      <AnimatePresence>
        {canLeft && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black border border-white/15 text-white/50 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors duration-200 shadow-xl"
          ><ArrowIcon dir="left" /></motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {canRight && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black border border-white/15 text-white/50 hover:text-white hover:border-white/30 flex items-center justify-center transition-colors duration-200 shadow-xl"
          ><ArrowIcon dir="right" /></motion.button>
        )}
      </AnimatePresence>

      <div ref={scrollRef} onScroll={updateArrows}
        className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {items.map((tour, i) => (
          <motion.div key={tour.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            viewport={{ once: true }}
          >
            <TourCard tour={tour} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");

  useEffect(() => {
    fetch("/api/tours")
      .then((r) => r.json())
      .then((data) => { setTours(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const locations = tours.length ? ["All", ...Array.from(new Set(tours.map((t) => t.location)))] : ["All"];
  const filteredTours = tours.filter((t) =>
    (location === "All" || t.location === location) &&
    t.name.toLowerCase().includes(search.toLowerCase())
  );
  const grouped = filteredTours.reduce<Record<string, Tour[]>>((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {});

  if (loading) return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 rounded-full border border-white/10 border-t-white/50" />
        <p className="text-white/25 text-xs tracking-[0.35em] uppercase">Loading experiences</p>
      </div>
    </main>
  );

  return (
    <main className="bg-black text-white min-h-screen pb-32">
      <div className="px-6 md:px-16 max-w-7xl mx-auto pt-32 pb-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-[10px] tracking-[0.45em] uppercase text-white/30 mb-4">What we offer</p>
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-16">
            Our <span className="italic font-light text-white/50">tours</span>
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col md:flex-row gap-5 md:items-center justify-between border-t border-white/[0.07] pt-8"
        >
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"><SearchIcon /></div>
            <input type="text" placeholder="Search tours..."
              className="bg-white/[0.05] border border-white/[0.08] hover:border-white/20 focus:border-white/30 rounded-full pl-10 pr-10 py-2.5 w-64 outline-none text-sm text-white placeholder-white/20 transition-colors duration-300"
              value={search} onChange={(e) => setSearch(e.target.value)} />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 text-xs transition-colors">✕</button>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {locations.map((loc) => (
              <button key={loc} onClick={() => setLocation(loc)}
                className="whitespace-nowrap px-4 py-2 rounded-full text-sm transition-all duration-300 shrink-0"
                style={{
                  background: location === loc ? "white" : "rgba(255,255,255,0.06)",
                  color: location === loc ? "black" : "rgba(255,255,255,0.5)",
                  border: location === loc ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}
              >{loc}</button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {Object.entries(grouped).length > 0 ? (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-20">
              {Object.entries(grouped).map(([category, items], i) => (
                <motion.div key={category} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }} viewport={{ once: true }}>
                  <div className="flex items-center gap-5 mb-8">
                    <span className="text-white/15 text-sm tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="text-2xl font-semibold">{category}</h2>
                    <div className="flex-1 h-px bg-white/[0.07]" />
                    <span className="text-white/20 text-xs tracking-widest">{items.length} {items.length === 1 ? "tour" : "tours"}</span>
                  </div>
                  <CategoryCarousel items={items} index={i} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center">
              <p className="text-white/35 text-sm mb-3">No tours found{search ? ` for "${search}"` : ""}</p>
              <button onClick={() => { setSearch(""); setLocation("All"); }}
                className="text-xs text-white/25 hover:text-white/50 underline underline-offset-4 transition-colors">
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}