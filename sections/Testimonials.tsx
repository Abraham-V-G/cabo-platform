"use client";

import { useState } from "react";

const testimonials = [
  {
    name: "Michael R.",
    review: "Absolutely unforgettable experience. Highly recommended!",
  },
  {
    name: "Sarah L.",
    review: "The best tour we had in Los Cabos. 10/10 service.",
  },
  {
    name: "Daniel K.",
    review: "Professional guides and amazing views.",
  },
  {
    name: "Jessica M.",
    review: "Would book again without hesitation.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const getIndex = (index: number) => {
    const diff = index - current;
    if (diff === 0) return "active";
    if (diff === -1 || diff === testimonials.length - 1) return "left";
    if (diff === 1 || diff === -(testimonials.length - 1)) return "right";
    return "hidden";
  };

  return (
    <section className="bg-black text-white py-28 overflow-hidden">
      <h2 className="text-3xl text-center mb-20">
        What travelers say about us
      </h2>

      <div className="relative flex justify-center items-center h-[300px]">

        {testimonials.map((item, index) => {
          const position = getIndex(index);

          return (
            <div
              key={index}
              className={`
                absolute transition-all duration-700 ease-in-out
                w-[350px] md:w-[450px] p-8 rounded-2xl border border-gray-800
                bg-[#151515]
                ${position === "active" && "scale-100 opacity-100 z-20"}
                ${position === "left" && "scale-90 opacity-40 -translate-x-72 z-10"}
                ${position === "right" && "scale-90 opacity-40 translate-x-72 z-10"}
                ${position === "hidden" && "opacity-0 scale-75"}
              `}
            >
              <p className="opacity-80 mb-6 text-lg">
                "{item.review}"
              </p>
              <span className="font-semibold">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-16">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
}