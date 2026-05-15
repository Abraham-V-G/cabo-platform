"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

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

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/articles/${slug}`).then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      }),
      fetch("/api/articles").then((res) => res.json()),
    ])
      .then(([articleData, articlesData]) => {
        setArticle(articleData);
        setAllArticles(articlesData);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        notFound();
      });
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-white/50">Loading article...</p>
      </main>
    );
  }
  if (!article) return notFound();

  return (
    <main className="bg-black text-white">
      <div className="h-[70vh] relative">
        <img src={article.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute bottom-16 left-6 md:left-16 max-w-3xl">
          <p className="text-sm text-gray-300 mb-3">{article.category} • {article.date}</p>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">{article.title}</h1>
        </div>
      </div>

      <article className="max-w-3xl mx-auto py-20 px-6 md:px-0">
        <p className="text-gray-500 mb-10">5 min read</p>
        <div className="text-gray-300 leading-relaxed space-y-8 text-lg whitespace-pre-line">{article.content}</div>
      </article>

      <section className="max-w-6xl mx-auto px-6 md:px-0 pb-24">
        <h3 className="text-2xl mb-10">Related Articles</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {allArticles
            .filter((a) => a.slug !== article.slug)
            .slice(0, 3)
            .map((a) => (
              <div key={a.id} className="group">
                <img src={a.image} className="h-40 w-full object-cover rounded-xl mb-4 group-hover:opacity-80 transition" />
                <p className="text-sm text-gray-400">{a.category}</p>
                <p className="group-hover:text-gray-300 transition">{a.title}</p>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}