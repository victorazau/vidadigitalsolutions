"use client"

import { useState } from "react"
import { useLocale } from "@/lib/locale-context"
import type { PostMeta } from "@/lib/posts"
import { BlogCard } from "./BlogCard"

const categoriesEN = ["All", "GoHighLevel", "CRM", "Cases", "Automation", "RevOps", "AI"]
const categoriesPT = ["Todos", "GoHighLevel", "CRM", "Cases", "Automação", "RevOps", "IA para Negócios"]
const categoriesES = ["Todos", "GoHighLevel", "CRM", "Cases", "Automatización", "RevOps", "IA"]

const categoryMap: Record<string, Record<string, string>> = {
  en: { All: "All", GoHighLevel: "GoHighLevel", CRM: "CRM", Cases: "Cases", Automation: "Automation", RevOps: "RevOps", AI: "AI" },
  pt: { Todos: "All", GoHighLevel: "GoHighLevel", CRM: "CRM", Cases: "Cases", "Automação": "Automation", RevOps: "RevOps", "IA para Negócios": "AI" },
  es: { Todos: "All", GoHighLevel: "GoHighLevel", CRM: "CRM", Cases: "Cases", "Automatización": "Automation", RevOps: "RevOps", IA: "AI" },
}

const headlines = {
  en: {
    label: "Blog",
    headline: "Insights on automation, CRM and GoHighLevel.",
    sub: "Weekly articles to help your business scale without hiring more staff.",
  },
  pt: {
    label: "Blog",
    headline: "Conteúdo sobre automação, CRM e GoHighLevel.",
    sub: "Artigos semanais para ajudar seu negócio a crescer sem contratar mais.",
  },
  es: {
    label: "Blog",
    headline: "Contenido sobre automatización, CRM y GoHighLevel.",
    sub: "Artículos semanales para ayudar a tu negocio a crecer sin contratar más.",
  },
}

export function BlogList({ posts }: { posts: PostMeta[] }) {
  const { locale } = useLocale()
  const [activeCategory, setActiveCategory] = useState("All")
  const text = headlines[locale]

  const categories = locale === "pt" ? categoriesPT : locale === "es" ? categoriesES : categoriesEN
  const map = categoryMap[locale]

  const filteredPosts = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Hero header */}
      <div className="relative bg-[#060D1C] pt-28 pb-16 px-6 overflow-hidden">
        {/* Static starfield — fixed positions */}
        <div className="absolute inset-0">
          {[
            { t: "5%", l: "12%", s: 1.5, o: 0.4 }, { t: "10%", l: "45%", s: 1, o: 0.3 },
            { t: "15%", l: "78%", s: 1.5, o: 0.25 }, { t: "22%", l: "30%", s: 1, o: 0.35 },
            { t: "28%", l: "88%", s: 1.5, o: 0.2 }, { t: "35%", l: "8%", s: 1, o: 0.4 },
            { t: "42%", l: "55%", s: 1.5, o: 0.3 }, { t: "50%", l: "92%", s: 1, o: 0.35 },
            { t: "58%", l: "20%", s: 1.5, o: 0.25 }, { t: "65%", l: "65%", s: 1, o: 0.4 },
            { t: "72%", l: "38%", s: 1.5, o: 0.3 }, { t: "80%", l: "82%", s: 1, o: 0.2 },
            { t: "88%", l: "15%", s: 1.5, o: 0.35 }, { t: "95%", l: "50%", s: 1, o: 0.3 },
          ].map((s, i) => (
            <div key={i} className="absolute rounded-full bg-white"
              style={{ top: s.t, left: s.l, width: s.s, height: s.s, opacity: s.o }} />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#4B6CB7] mb-4">
            {text.label}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.04em] text-white">
            {text.headline}
          </h1>
          <p className="mt-4 text-lg text-[#94A3B8] font-light max-w-2xl">
            {text.sub}
          </p>
        </div>
      </div>

      {/* Category filter + Grid */}
      <div className="bg-white py-12 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => {
              const normalizedCat = map[cat] || "All"
              const isActive = activeCategory === normalizedCat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(normalizedCat)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                    isActive
                      ? "bg-[#1B2F5E] text-white"
                      : "bg-transparent border border-[#E2E8F0] text-[#475569] hover:border-[#1B2F5E]/30"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className="text-center text-[#94A3B8] py-16">
              {locale === "pt" ? "Nenhum artigo nesta categoria ainda." : locale === "es" ? "Ningún artículo en esta categoría aún." : "No articles in this category yet."}
            </p>
          )}
        </div>
      </div>
    </>
  )
}
