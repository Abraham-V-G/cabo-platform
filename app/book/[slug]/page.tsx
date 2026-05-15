"use client";

import { use, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";

const countryCodes = [
  { code: "+1", country: "US / Canada" },
  { code: "+52", country: "Mexico" },
  { code: "+44", country: "United Kingdom" },
  { code: "+34", country: "Spain" },
  { code: "+33", country: "France" },
  { code: "+49", country: "Germany" },
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

export default function BookingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const searchParams = useSearchParams();

  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tours/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Tour not found");
        return res.json();
      })
      .then((data) => {
        setTour(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        notFound();
      });
  }, [slug]);

  const [people, setPeople] = useState(Number(searchParams.get("people")) || 1);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const total = useMemo(() => (tour ? tour.price * people : 0), [tour, people]);

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!tour) return;
    setCheckoutLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = {
      tourName: tour.name,
      slug: tour.slug,
      location: tour.location,
      category: tour.category,
      people,
      price: tour.price,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phoneCode") + " " + formData.get("phone"),
      transportation: formData.get("transportation"),
      date: formData.get("date"),
      time: formData.get("time"),
      specialRequests: formData.get("specialRequests"),
    };
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.url) window.location.href = result.url;
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setCheckoutLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-white/50">Loading tour details...</p>
      </div>
    );
  }
  if (!tour) return notFound();

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="relative h-[45vh] overflow-hidden">
        <img src={tour.image} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 h-full flex items-end px-6 md:px-16 pb-14">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-white/60 mb-4">
              {tour.location} • {tour.category}
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold max-w-4xl">{tour.name}</h1>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleCheckout} className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl">
              {/* ... resto del formulario, igual que antes ... */}
              <div className="mb-10">
                <h2 className="text-3xl font-semibold mb-3">Complete your reservation</h2>
                <p className="text-white/60">Secure your experience in just a few steps.</p>
              </div>
              <div className="mb-12">
                <h3 className="text-xl mb-6">Personal information</h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <input required name="firstName" placeholder="First name" className="bg-black border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-white transition" />
                  <input required name="lastName" placeholder="Last name" className="bg-black border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-white transition" />
                  <input required type="email" name="email" placeholder="Email address" className="md:col-span-2 bg-black border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-white transition" />
                  <div className="md:col-span-2 flex gap-3">
                    <select name="phoneCode" className="bg-black border border-white/10 rounded-xl px-4 py-4 outline-none">
                      {countryCodes.map((item) => (
                        <option key={item.code} value={item.code} className="bg-black">
                          {item.code} ({item.country})
                        </option>
                      ))}
                    </select>
                    <input required type="tel" name="phone" placeholder="Phone number" className="flex-1 bg-black border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-white transition" />
                  </div>
                </div>
              </div>
              <div className="mb-12">
                <h3 className="text-xl mb-6">Tour details</h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <input required type="date" name="date" className="bg-black border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-white transition" />
                  <select required name="time" className="bg-black border border-white/10 rounded-xl px-5 py-4 outline-none">
                    {tour.times.map((time) => (
                      <option key={time} value={time} className="bg-black">
                        {time}
                      </option>
                    ))}
                  </select>
                  <div className="md:col-span-2">
                    <label className="block mb-4 text-white/70">Number of guests</label>
                    <div className="flex items-center gap-5">
                      <button type="button" onClick={() => setPeople((prev) => Math.max(1, prev - 1))} className="w-12 h-12 rounded-full border border-white/10 hover:border-white transition">−</button>
                      <span className="text-2xl font-semibold w-10 text-center">{people}</span>
                      <button type="button" onClick={() => setPeople((prev) => prev + 1)} className="w-12 h-12 rounded-full border border-white/10 hover:border-white transition">+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-12">
                <h3 className="text-xl mb-6">Transportation</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-white transition flex items-center gap-4">
                    <input type="radio" name="transportation" value="yes" defaultChecked />
                    <div><p className="font-medium">Include transportation</p><p className="text-sm text-white/50">Round-trip transportation service</p></div>
                  </label>
                  <label className="border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-white transition flex items-center gap-4">
                    <input type="radio" name="transportation" value="no" />
                    <div><p className="font-medium">No transportation</p><p className="text-sm text-white/50">I’ll arrive on my own</p></div>
                  </label>
                </div>
              </div>
              <div className="mb-12">
                <h3 className="text-xl mb-6">Special requests</h3>
                <textarea rows={5} name="specialRequests" placeholder="Dietary restrictions, celebrations, accessibility, etc." className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white transition resize-none" />
              </div>
              <button disabled={checkoutLoading} className="w-full bg-white text-black py-5 rounded-2xl font-semibold hover:opacity-90 transition text-lg">
                {checkoutLoading ? "Processing..." : "Continue to secure payment"}
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div className="sticky top-24 bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
              <div className="h-56 overflow-hidden"><img src={tour.image} className="w-full h-full object-cover" /></div>
              <div className="p-7">
                <p className="text-sm uppercase tracking-[0.25em] text-white/50 mb-3">{tour.location}</p>
                <h3 className="text-2xl font-semibold mb-8">{tour.name}</h3>
                <div className="space-y-5 text-sm text-white/70">
                  <div className="flex justify-between"><span>Category</span><span>{tour.category}</span></div>
                  <div className="flex justify-between"><span>Guests</span><span>{people}</span></div>
                  <div className="flex justify-between"><span>Price per person</span><span>${tour.price}</span></div>
                </div>
                <div className="border-t border-white/10 mt-8 pt-8">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-4">Experience</p>
                  <p className="text-sm text-white/70 leading-relaxed">{tour.description}</p>
                </div>
                <div className="border-t border-white/10 mt-8 pt-8 flex items-center justify-between">
                  <p className="text-white/60">Total</p>
                  <p className="text-3xl font-bold">${total} USD</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}