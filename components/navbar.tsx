"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Tourism News", href: "/cabo-news" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "#contact" },
];

const mobileLinks = [
  { label: "Home", href: "/" },
  { label: "Tourism News", href: "/cabo-news" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "#contact" },
];

// Icono de tarjeta (inclinado 30°)
const MembershipIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: "rotate(30deg)" }}
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
    <path d="M7 15h4" />
    <circle cx="18" cy="15" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed w-full z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(0,0,0,0.85)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-16 py-5">

          {/* LOGO */}
          <Link
            href="/"
            className="text-white font-bold text-lg tracking-wide z-10"
          >
            TerraNova
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-sm text-white/70 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white/50 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            {/* BOTÓN MEMBRESÍA - MÁS ALARGADO (px-7 en lugar de px-5) */}
            <Link
              href="#membership"
              className="px-7 py-2 rounded-full transition-all duration-300 flex items-center justify-center"
              style={{
                backgroundColor: "#d4af37",
                color: "white",
                border: "none",
              }}
            >
              <motion.span
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center justify-center"
              >
                <MembershipIcon size={22} />
              </motion.span>
            </Link>
          </div>

          {/* HAMBURGER */}
          <button
            className="md:hidden z-10 flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-px bg-white origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px bg-white origin-center"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-px bg-white origin-center"
            />
          </button>

        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 h-full w-3/4 max-w-xs z-50 md:hidden flex flex-col"
              style={{
                background: "rgba(8,8,8,0.97)",
                borderLeft: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-center justify-between px-7 pt-6 pb-8 border-b border-white/[0.06]">
                <span className="text-white font-bold tracking-wide">TerraNova</span>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col px-7 pt-6 gap-1 flex-1">
                {mobileLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-3.5 text-white/60 hover:text-white text-base font-light border-b border-white/[0.05] transition-colors duration-200 last:border-0"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA móvil: botón más alargado también (px-7 se traduce a padding horizontal, pero en móvil el ancho es completo) */}
              <div className="px-7 pb-10">
                <Link
                  href="#membership"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center py-3.5 rounded-full transition-all duration-300 w-full"
                  style={{
                    backgroundColor: "#d4af37",
                    color: "white",
                  }}
                >
                  <MembershipIcon size={24} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}