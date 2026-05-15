"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface VacationPackage {
  id: string;
  slug: string;
  name: string;
  days: number;
  price: number;
  resort: string;
  location: string;
  category: string;
  features: string[];
  image: string;
}

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

type FilterKey = "resort" | "location" | "category";

function FilterPills({
  label, options, value, onChange,
}: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 shrink-0"
        style={{
          background: value !== "All" ? "white" : "rgba(255,255,255,0.06)",
          color: value !== "All" ? "black" : "rgba(255,255,255,0.5)",
          border: value !== "All" ? "none" : "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {label}{value !== "All" ? `: ${value}` : ""}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="absolute top-full mt-2 left-0 z-20 bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl min-w-[160px]"
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 flex items-center justify-between gap-6"
                  style={{ color: value === opt ? "white" : "rgba(255,255,255,0.4)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {opt}
                  {value === opt && <CheckIcon />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function VacationCard({ pkg }: { pkg: VacationPackage }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileTap={{ scale: 0.99 }}
    >
      <Link href={`/vacation-book/${pkg.slug}`} className="block">

        {/* Image */}
        <div className="relative h-72 overflow-hidden">
          <motion.img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)"
          }} />
          <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
            style={{ backgroundImage: GRAIN, backgroundSize: "200px" }} />

          {/* Days badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm">
            <span className="text-[9px] tracking-widest uppercase text-white/50">{pkg.days} days</span>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm">
            <span className="text-[9px] tracking-widest uppercase text-white/50">{pkg.category}</span>
          </div>

          {/* Image bottom content */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-[9px] tracking-[0.4em] uppercase text-white/35 mb-1">{pkg.location}</p>
            <h3 className="text-white font-semibold text-xl leading-tight">{pkg.name}</h3>
          </div>
        </div>

        {/* Card body */}
        <div
          className="p-5 border border-t-0 border-white/[0.07] rounded-b-2xl transition-colors duration-500"
          style={{ background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)" }}
        >
          {/* Resort */}
          <p className="text-white/30 text-xs mb-4 tracking-wide">{pkg.resort}</p>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {pkg.features.slice(0, 3).map((f, i) => (
              <li key={i} className="flex items-center gap-2.5 text-xs text-white/45">
                <div className="w-4 h-4 rounded-full border border-white/15 flex items-center justify-center shrink-0 text-white/30">
                  <CheckIcon />
                </div>
                {f}
              </li>
            ))}
          </ul>

          {/* Price + CTA */}
          <div className="flex items-end justify-between pt-4 border-t border-white/[0.07]">
            <div>
              <p className="text-white/25 text-[10px] tracking-widest uppercase mb-0.5">Starting from</p>
              <p className="text-2xl font-semibold text-white">
                ${pkg.price.toLocaleString()}
                <span className="text-white/30 text-sm font-light ml-1">USD</span>
              </p>
            </div>
            <motion.div
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm transition-all duration-300"
              animate={{
                borderColor: hovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.12)",
                color: hovered ? "white" : "rgba(255,255,255,0.45)",
              }}
            >
              Book now
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function VacationsPage() {
  const [packages, setPackages] = useState<VacationPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [resort, setResort] = useState("All");
  const [location, setLocation] = useState("All");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("/api/vacations")
      .then((r) => r.json())
      .then((data) => { setPackages(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const resorts = ["All", ...Array.from(new Set(packages.map((p) => p.resort)))];
  const locations = ["All", ...Array.from(new Set(packages.map((p) => p.location)))];
  const categories = ["All", ...Array.from(new Set(packages.map((p) => p.category)))];

  const filtered = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(search.toLowerCase()) &&
    (resort === "All" || pkg.resort === resort) &&
    (location === "All" || pkg.location === location) &&
    (category === "All" || pkg.category === category)
  );

  const activeFilters = [resort, location, category].filter((f) => f !== "All").length;

  if (loading) return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 rounded-full border border-white/10 border-t-white/50" />
        <p className="text-white/25 text-xs tracking-[0.35em] uppercase">Loading packages</p>
      </div>
    </main>
  );

  return (
    <main className="bg-black text-white min-h-screen pb-32">
      <div className="px-6 md:px-16 max-w-7xl mx-auto">

        {/* ── HEADER ─────────────────────────── */}
        <div className="pt-32 pb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[10px] tracking-[0.45em] uppercase text-white/30 mb-4">Luxury stays across México</p>
            <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-4">
              Vacation <span className="italic font-light text-white/50">packages</span>
            </h1>
            <p className="text-white/35 text-base font-light max-w-xl">
              Curated resorts, all-inclusive experiences and unforgettable escapes.
            </p>
          </motion.div>
        </div>

        {/* ── FILTERS ────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col md:flex-row gap-4 md:items-center justify-between border-t border-white/[0.07] pt-8 mb-16"
        >
          {/* Search */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"><SearchIcon /></div>
            <input type="text" placeholder="Search packages..."
              className="bg-white/[0.05] border border-white/[0.08] hover:border-white/20 focus:border-white/30 rounded-full pl-10 pr-10 py-2.5 w-64 outline-none text-sm text-white placeholder-white/20 transition-colors duration-300"
              value={search} onChange={(e) => setSearch(e.target.value)} />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 text-xs transition-colors">✕</button>
            )}
          </div>

          {/* Dropdown pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <FilterPills label="Resort" options={resorts} value={resort} onChange={setResort} />
            <FilterPills label="Destination" options={locations} value={location} onChange={setLocation} />
            <FilterPills label="Category" options={categories} value={category} onChange={setCategory} />

            {activeFilters > 0 && (
              <button
                onClick={() => { setResort("All"); setLocation("All"); setCategory("All"); }}
                className="px-3 py-2 text-xs text-white/30 hover:text-white/60 transition-colors underline underline-offset-4"
              >
                Clear all
              </button>
            )}
          </div>
        </motion.div>

        {/* ── RESULTS COUNT ──────────────────── */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-white/20 text-xs tracking-widest uppercase mb-8">
                {filtered.length} {filtered.length === 1 ? "package" : "packages"} found
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((pkg) => (
                  <VacationCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center">
              <p className="text-white/35 text-sm mb-3">
                No packages found{search ? ` for "${search}"` : ""}
              </p>
              <button
                onClick={() => { setSearch(""); setResort("All"); setLocation("All"); setCategory("All"); }}
                className="text-xs text-white/25 hover:text-white/50 underline underline-offset-4 transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}