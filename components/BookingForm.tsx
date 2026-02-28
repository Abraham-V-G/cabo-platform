"use client";

import { useState } from "react";
import type { Tour } from "@/lib/tours";

interface Props {
  tour: Tour;
}

export default function BookingForm({ tour }: Props) {
  const [people, setPeople] = useState<number>(1);
  const [countryCode, setCountryCode] = useState<string>("+1");
  const [loading, setLoading] = useState<boolean>(false);

  const total = tour.price * people;

    const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const dataToSend = {
        tourName: tour.name,
        price: tour.price,
        people: people,
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone:
        countryCode + " " + formData.get("phone"),
        date: formData.get("date"),
        time: formData.get("time"),
    };

    try {
        const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
        });

        const result = await response.json();

        if (result.url) {
        window.location.href = result.url;
        } else {
        alert("Error creating checkout session");
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong");
    } finally {
        setLoading(false);
    }
    };

  return (
    <div className="w-full max-w-2xl bg-zinc-900 p-8 rounded-2xl shadow-2xl border border-zinc-800">
      <h2 className="text-3xl font-bold mb-2">{tour.name}</h2>
      <p className="text-zinc-400 mb-6">
        Complete your reservation below.
      </p>

      <form onSubmit={handleCheckout} className="space-y-5">

        {/* First + Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            className="p-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-white transition"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            className="p-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-white transition"
          />
        </div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-white transition"
        />

        {/* Phone */}
        <div className="grid grid-cols-3 gap-3">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required
            className="p-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-white transition"
          >
            <option value="+1">🇺🇸 +1 (US)</option>
            <option value="+52">🇲🇽 +52 (MX)</option>
            <option value="+44">🇬🇧 +44 (UK)</option>
            <option value="+33">🇫🇷 +33 (FR)</option>
            <option value="+49">🇩🇪 +49 (DE)</option>
            <option value="+61">🇦🇺 +61 (AU)</option>
            <option value="+34">🇪🇸 +34 (ES)</option>
          </select>

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            required
            className="col-span-2 p-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-white transition"
          />
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="date" type="date"
            required
            className="p-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-white transition"
          />

          <select
            required
            name="time"
            className="p-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-white transition"
          >
            {tour.times.map((time) => (
              <option key={time}>{time}</option>
            ))}
          </select>
        </div>

        {/* People */}
        <div>
          <label className="block mb-2 text-sm text-zinc-400">
            Number of People
          </label>
          <input
            type="number"
            name="pax"
            min={1}
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
            required
            className="w-full p-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-white transition"
          />
        </div>

        {/* Summary */}
        <div className="bg-black p-5 rounded-xl border border-zinc-800 space-y-2">
          <div className="flex justify-between text-zinc-400">
            <span>Price per person</span>
            <span>${tour.price}</span>
          </div>

          <div className="flex justify-between text-zinc-400">
            <span>People</span>
            <span>{people}</span>
          </div>

          <div className="border-t border-zinc-800 pt-3 flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-300 disabled:opacity-50"
        >
          {loading ? "Redirecting..." : "Proceed to Secure Payment"}
        </button>

      </form>
    </div>
  );
}