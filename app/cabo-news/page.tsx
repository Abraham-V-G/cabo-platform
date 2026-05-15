"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import FadeInSection from "@/components/FadeInSection";

interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  region: string;
  description: string;
  image: string;
  content: string;
  date: string;
}

export default function TravelNewsMexico() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const regions = articles.length ? ["All", ...new Set(articles.map((a) => a.region))] : ["All"];

  const filtered = articles.filter((article) => {
    const matchesRegion = region === "All" || article.region === region;
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.description.toLowerCase().includes(search.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  if (loading) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-white/50">Loading articles...</p>
      </main>
    );
  }

  return (
    <main className="bg-black text-white">
      {featured && (
        <section className="relative h-[80vh]">
          <img src={featured.image} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute bottom-16 left-6 md:left-16 max-w-2xl">
            <p className="text-sm text-gray-300 mb-3">
              {featured.region} • {featured.category} • {featured.date}
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold mb-6">{featured.title}</h1>
            <p className="text-gray-300 mb-6">{featured.description}</p>
            <Link href={`/cabo-news/${featured.slug}`}>
              <button className="bg-white text-black px-6 py-3 rounded-xl hover:scale-105 transition">Leer artículo</button>
            </Link>
          </div>
        </section>
      )}

      <section className="py-10 px-6 md:px-16 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center">
          <input
            type="text"
            placeholder="Buscar noticias..."
            className="bg-transparent border-b border-white/30 px-4 py-2 outline-none w-72 text-white placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-6 overflow-x-auto">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`text-sm whitespace-nowrap pb-2 transition ${
                  region === r ? "text-white border-b border-white" : "text-gray-500 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-20 px-6 md:px-0 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          {rest.map((article) => (
            <FadeInSection key={article.id}>
              <Link href={`/cabo-news/${article.slug}`}>
                <div className="group grid md:grid-cols-2 gap-6 items-center border-b border-white/10 pb-10 cursor-pointer">
                  <div className="h-52 overflow-hidden rounded-xl">
                    <img src={article.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase mb-2">{article.region} • {article.category}</p>
                    <h2 className="text-2xl font-semibold mb-3 group-hover:text-gray-300 transition">{article.title}</h2>
                    <p className="text-gray-400 text-sm">{article.description}</p>
                  </div>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>

        <div className="space-y-10">
          <h3 className="text-lg text-gray-400">Últimas noticias</h3>
          {articles.slice(0, 5).map((article) => (
            <Link key={article.id} href={`/cabo-news/${article.slug}`}>
              <div className="group flex gap-4 cursor-pointer">
                <div className="w-20 h-20 overflow-hidden rounded-lg">
                  <img src={article.image} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{article.region}</p>
                  <p className="text-sm group-hover:text-gray-300 transition">{article.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}