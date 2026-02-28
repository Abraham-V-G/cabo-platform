"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/70 backdrop-blur-md text-white px-6 md:px-20 py-5 flex justify-between items-center">

      <Link href="/" className="font-bold text-lg">
        TerraNova
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex gap-10">
        <Link href="/">Home</Link>
        <Link href="#experiences">Experiences</Link>
        <Link href="#contact">Contact</Link>
      </div>

      {/* Mobile */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {open && (
        <div className="absolute top-20 left-0 w-full bg-black flex flex-col items-center gap-8 py-10 md:hidden">
          <Link href="/">Home</Link>
          <Link href="#experiences">Experiences</Link>
          <Link href="#contact">Contact</Link>
        </div>
      )}
    </nav>
  );
}