"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { tours } from "@/lib/tours";

export default function Experiences() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Slugs destacados (featured)
  const featuredSlugs = [
    "snorkeling",
    "luxury-yacht",
    "atv-desert-adventure",
    "sunset-cruise",
    "camel-ride",
    "whale-watching",
  ];

  // Tours destacados (mismo tipo Tour)
  const featuredTours = tours.filter((tour) =>
    featuredSlugs.includes(tour.slug)
  );

  // Si hay búsqueda → filtra TODOS los tours
  // Si no hay búsqueda → muestra featured
  const dataToShow =
    search.length > 0
      ? tours.filter((tour) =>
          tour.name.toLowerCase().includes(search.toLowerCase())
        )
      : featuredTours;

  return (
    <section className="bg-black text-white py-24 px-6 md:px-20">
      
      {/* SEARCH */}
      <div className="flex justify-center mb-16">
        <input
          type="text"
          placeholder="Search experiences..."
          className="bg-transparent border-b border-gray-600 px-4 py-2 w-72 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8">
        {dataToShow.map((tour) => (
          <div
            key={tour.slug}
            className="relative group overflow-hidden rounded-2xl cursor-pointer"
          >
            {/* IMAGE */}
            <img
              src={tour.image}
              alt={tour.name}
              className="w-full h-[350px] object-cover transition duration-700 group-hover:scale-110"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-center items-center text-center px-6">

              <h3 className="text-xl font-semibold mb-3">
                {tour.name}
              </h3>

              <p className="text-sm opacity-80 mb-6">
                {tour.description}
              </p>

              <button
                onClick={() => router.push(`/book/${tour.slug}`)}
                className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition"
              >
                Book Now
              </button>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}