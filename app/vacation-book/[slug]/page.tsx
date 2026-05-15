"use client";

import { use, useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";

const countryCodes = [
  { code: "+1", country: "US / Canada" },
  { code: "+52", country: "Mexico" },
  { code: "+44", country: "United Kingdom" },
  { code: "+34", country: "Spain" },
  { code: "+33", country: "France" },
  { code: "+49", country: "Germany" },
  { code: "+54", country: "Argentina" },
  { code: "+57", country: "Colombia" },
  { code: "+55", country: "Brazil" },
];

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

export default function VacationBookingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [pkg, setPkg] = useState<VacationPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Estado local para la fecha de check-in (se inicializa desde URL o date actual)
  const [checkIn, setCheckIn] = useState<string>(() => {
    const fromUrl = searchParams.get("checkIn");
    if (fromUrl) return fromUrl;
    return new Date().toISOString().split("T")[0];
  });

  const guests = Number(searchParams.get("guests")) || 2;

  useEffect(() => {
    fetch(`/api/vacations/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Package not found");
        return res.json();
      })
      .then((data) => {
        setPkg(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        notFound();
      });
  }, [slug]);

  const checkOut = useMemo(() => {
    if (!pkg) return new Date();
    const date = new Date(checkIn);
    date.setDate(date.getDate() + pkg.days);
    return date;
  }, [checkIn, pkg]);

  // Actualizar URL cuando cambie la fecha (para mantener consistencia al recargar)
  const updateCheckInUrl = (newDate: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("checkIn", newDate);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setCheckIn(newDate);
    updateCheckInUrl(newDate);
  };

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!pkg) return;
    setCheckoutLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phoneCode: formData.get("phoneCode"),
      phone: formData.get("phone"),
      transportation: formData.get("transportation"),
      specialRequests: formData.get("specialRequests"),
      packageName: pkg.name,
      packageSlug: pkg.slug,
      location: pkg.location,
      resort: pkg.resort,
      days: pkg.days,
      guests,
      price: pkg.price,
      checkIn,
      checkOut: checkOut.toISOString(),
    };
    try {
      const res = await fetch("/api/vacation-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
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
        <p className="text-white/50">Loading package details...</p>
      </div>
    );
  }
  if (!pkg) return notFound();

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="relative h-[45vh] overflow-hidden">
        <img src={pkg.image} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 h-full flex items-end px-6 md:px-16 pb-14">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-white/60 mb-4">{pkg.location} • {pkg.category}</p>
            <h1 className="text-4xl md:text-6xl font-semibold max-w-3xl">{pkg.name}</h1>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="lg:col-span-2">
            <form onSubmit={handleCheckout} className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl">
              <div className="mb-10">
                <h2 className="text-3xl font-semibold mb-3">Complete your booking</h2>
                <p className="text-white/60">Secure your vacation package in just a few steps.</p>
              </div>

              {/* Personal information */}
              <div className="mb-12">
                <h3 className="text-xl mb-6">Personal information</h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <input required name="firstName" placeholder="First name" className="bg-black border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-white transition" />
                  <input required name="lastName" placeholder="Last name" className="bg-black border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-white transition" />
                  <input required type="email" name="email" placeholder="Email address" className="md:col-span-2 bg-black border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-white transition" />
                  <div className="flex gap-3 md:col-span-2">
                    <select name="phoneCode" className="bg-black border border-white/10 rounded-xl px-4 py-4 outline-none">
                      {countryCodes.map((item) => (<option key={item.code} value={item.code} className="bg-black">{item.code} ({item.country})</option>))}
                    </select>
                    <input required name="phone" placeholder="Phone number" className="flex-1 bg-black border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-white transition" />
                  </div>
                </div>
              </div>

              {/* ✅ NUEVO: selector de fecha de check-in */}
              <div className="mb-12">
                <h3 className="text-xl mb-6">Select your check-in date</h3>
                <div className="grid md:grid-cols-1 gap-5">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="bg-black border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-white transition"
                  />
                  <p className="text-sm text-white/40 mt-1">
                    Check-out will be automatically set to {checkOut.toLocaleDateString()} ({pkg.days} days later).
                  </p>
                </div>
              </div>

              {/* Transportation */}
              <div className="mb-12">
                <h3 className="text-xl mb-6">Transportation</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-white transition flex items-center gap-4">
                    <input type="radio" name="transportation" value="yes" defaultChecked />
                    <div><p className="font-medium">Airport transportation</p><p className="text-sm text-white/50">Add transportation service</p></div>
                  </label>
                  <label className="border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-white transition flex items-center gap-4">
                    <input type="radio" name="transportation" value="no" />
                    <div><p className="font-medium">No transportation</p><p className="text-sm text-white/50">I’ll arrange transportation myself</p></div>
                  </label>
                </div>
              </div>

              {/* Special requests */}
              <div className="mb-12">
                <h3 className="text-xl mb-6">Special requests</h3>
                <textarea name="specialRequests" rows={5} placeholder="Any preferences, allergies, celebrations, etc." className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white transition resize-none" />
              </div>

              <button disabled={checkoutLoading} className="w-full bg-white text-black py-5 rounded-2xl font-semibold hover:opacity-90 transition text-lg">
                {checkoutLoading ? "Processing..." : "Continue to payment"}
              </button>
            </form>
          </motion.div>

          {/* Resumen - igual que antes, pero ahora la fecha se actualiza en vivo */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div className="sticky top-24 bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
              <div className="h-56 overflow-hidden"><img src={pkg.image} className="w-full h-full object-cover" /></div>
              <div className="p-7">
                <p className="text-sm uppercase tracking-[0.25em] text-white/50 mb-3">{pkg.location}</p>
                <h3 className="text-2xl font-semibold mb-8">{pkg.name}</h3>
                <div className="space-y-5 text-sm text-white/70">
                  <div className="flex justify-between"><span>Resort</span><span>{pkg.resort}</span></div>
                  <div className="flex justify-between"><span>Guests</span><span>{guests}</span></div>
                  <div className="flex justify-between"><span>Check-in</span><span>{new Date(checkIn).toLocaleDateString()}</span></div>
                  <div className="flex justify-between"><span>Check-out</span><span>{checkOut.toLocaleDateString()}</span></div>
                  <div className="flex justify-between"><span>Duration</span><span>{pkg.days} days</span></div>
                </div>
                <div className="border-t border-white/10 mt-8 pt-8">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-5">Included</p>
                  <div className="space-y-3">
                    {pkg.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-sm text-white/70">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/10 mt-8 pt-8 flex items-center justify-between">
                  <p className="text-white/60">Total</p>
                  <p className="text-3xl font-bold">${pkg.price} USD</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}