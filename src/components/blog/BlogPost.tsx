"use client"

import { useState } from "react"
import Link from "next/link"
import { useLocale } from "@/lib/locale-context"
import type { Post, PostMeta } from "@/lib/posts"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, User, ChevronDown, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"
import { ReadingProgress } from "./ReadingProgress"
import { ShareButtons } from "./ShareButtons"

const categoryColors: Record<string, string> = {
  GoHighLevel: "bg-[#1B2F5E]",
  CRM: "bg-[#4B6CB7]",
  Cases: "bg-[#00C4A0]",
  Automation: "bg-[#EA4B71]",
  RevOps: "bg-[#FF6A00]",
}

function VidaLogoSmall() {
  return (
    <svg width="24" height="24" viewBox="0 0 44 44" fill="none" className="shrink-0">
      <polygon points="22,3 13,22 31,22" fill="#1B2F5E" />
      <polygon points="4,41 22,41 13,22" fill="#00C4A0" />
      <polygon points="40,41 31,22 22,41" fill="#4B6CB7" />
    </svg>
  )
}

// Simple MDX-like renderer for our content
function RenderContent({ content }: { content: string }) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-[22px] font-extrabold text-[#1B2F5E] tracking-[-0.02em] mt-10 mb-4">
          {line.replace("## ", "")}
        </h2>
      )
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-[18px] font-medium text-[#0A0A0F] mt-6 mb-3">
          {line.replace("### ", "")}
        </h3>
      )
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="border-l-[3px] border-[#00C4A0] bg-[#F0FDF9] p-4 my-4 text-[15px] text-[#475569] italic rounded-r-lg">
          {line.replace("> ", "")}
        </blockquote>
      )
    } else if (line.startsWith("- ")) {
      const listItems: string[] = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].replace("- ", ""))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2 pl-5">
          {listItems.map((item, j) => (
            <li key={j} className="text-[16px] text-[#374151] leading-[1.8] list-disc marker:text-[#00C4A0]">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      )
      continue
    } else if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ")) {
      const listItems: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\. /, ""))
        i++
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-4 space-y-2 pl-5">
          {listItems.map((item, j) => (
            <li key={j} className="text-[16px] text-[#374151] leading-[1.8] list-decimal marker:text-[#1B2F5E]">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      )
      continue
    } else if (line.trim() === "") {
      // skip empty lines
    } else {
      elements.push(
        <p key={i} className="text-[16px] text-[#374151] leading-[1.8] my-3">
          {renderInline(line)}
        </p>
      )
    }
    i++
  }

  return <>{elements}</>
}

function renderInline(text: string): React.ReactNode {
  // Handle **bold**, [links](url), `code`
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    // Link
    const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/)
    // Code
    const codeMatch = remaining.match(/`(.+?)`/)

    const matches = [
      boldMatch ? { type: "bold", index: boldMatch.index!, match: boldMatch } : null,
      linkMatch ? { type: "link", index: linkMatch.index!, match: linkMatch } : null,
      codeMatch ? { type: "code", index: codeMatch.index!, match: codeMatch } : null,
    ].filter(Boolean).sort((a, b) => a!.index - b!.index)

    if (matches.length === 0) {
      parts.push(remaining)
      break
    }

    const first = matches[0]!
    if (first.index > 0) {
      parts.push(remaining.slice(0, first.index))
    }

    if (first.type === "bold") {
      parts.push(<strong key={key++} className="text-[#1B2F5E] font-extrabold">{first.match[1]}</strong>)
      remaining = remaining.slice(first.index + first.match[0].length)
    } else if (first.type === "link") {
      parts.push(
        <Link key={key++} href={first.match[2]} className="text-[#4B6CB7] hover:text-[#1B2F5E] underline underline-offset-2">
          {first.match[1]}
        </Link>
      )
      remaining = remaining.slice(first.index + first.match[0].length)
    } else if (first.type === "code") {
      parts.push(
        <code key={key++} className="bg-[#F1F5F9] font-mono text-[14px] px-1.5 py-0.5 rounded">
          {first.match[1]}
        </code>
      )
      remaining = remaining.slice(first.index + first.match[0].length)
    }
  }

  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : <>{parts}</>
}

interface BlogPostProps {
  post: Post
  relatedPosts: PostMeta[]
  categoryCounts: Record<string, number>
  prevPost: PostMeta | null
  nextPost: PostMeta | null
}

export function BlogPostView({ post, relatedPosts, categoryCounts, prevPost, nextPost }: BlogPostProps) {
  const { locale } = useLocale()
  const colorClass = categoryColors[post.category] || "bg-[#1B2F5E]"

  const labels = {
    en: { home: "Home", blog: "Blog", about: "About Vida Digital Solutions", aboutDesc: "We implement GoHighLevel, automate business processes and integrate any system via API.", whatsapp: "Talk on WhatsApp", related: "Related articles", categories: "Categories", prev: "Previous", next: "Next" },
    pt: { home: "Home", blog: "Blog", about: "Sobre a Vida Digital Solutions", aboutDesc: "Implementamos GoHighLevel, automatizamos processos e integramos qualquer sistema via API.", whatsapp: "Falar no WhatsApp", related: "Artigos relacionados", categories: "Categorias", prev: "Anterior", next: "Próximo" },
    es: { home: "Home", blog: "Blog", about: "Sobre Vida Digital Solutions", aboutDesc: "Implementamos GoHighLevel, automatizamos procesos e integramos cualquier sistema vía API.", whatsapp: "Hablar por WhatsApp", related: "Artículos relacionados", categories: "Categorías", prev: "Anterior", next: "Siguiente" },
  }
  const l = labels[locale]

  return (
    <div className="bg-white">
      <ReadingProgress />
      {/* Breadcrumb */}
      <div className="bg-[#F5F7FA] border-b border-[#E2E8F0] px-6 pt-20 pb-4">
        <div className="mx-auto max-w-6xl">
          <nav className="flex items-center gap-2 text-[12px] text-[#94A3B8]">
            <Link href="/" className="hover:text-[#1B2F5E]">{l.home}</Link>
            <span>→</span>
            <Link href="/blog" className="hover:text-[#1B2F5E]">{l.blog}</Link>
            <span>→</span>
            <span className="text-[#475569]">{post.category}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <article className="flex-1 min-w-0 lg:max-w-[70%]">
            {/* Category badge */}
            <span className={`inline-block text-[10px] font-medium tracking-[0.1em] uppercase text-white px-3 py-1.5 rounded-full mb-4 ${colorClass}`}>
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-[-0.04em] text-[#0A0A0F] leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 mt-4 text-[13px] text-[#94A3B8]">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
              <span>·</span>
              <span>{new Date(post.date).toLocaleDateString(locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            {/* Share + Divider */}
            <div className="flex items-center justify-between my-6">
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
            <div className="h-px bg-[#E2E8F0] mb-8" />

            {/* Content */}
            <div className="prose-vida">
              <RenderContent content={post.content} />
            </div>

            {/* CTA box */}
            <div className="mt-12 rounded-2xl bg-[#0D1B3E] border border-[#1B2F5E] p-8 text-center">
              <p className="text-white text-[18px] font-extrabold tracking-[-0.02em] mb-4">
                {locale === "pt" ? "Quer implementar isso no seu negócio?" : locale === "es" ? "¿Quieres implementar esto en tu negocio?" : "Want to implement this in your business?"}
              </p>
              <a
                href="https://wa.me/14382985740"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00C4A0] hover:bg-[#00C4A0]/90 text-[#060D1C] font-extrabold rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {l.whatsapp}
              </a>
            </div>

            {/* Prev/Next nav */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#E2E8F0]">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="flex items-center gap-2 text-[13px] text-[#475569] hover:text-[#1B2F5E] transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                  <div>
                    <p className="text-[11px] text-[#94A3B8]">{l.prev}</p>
                    <p className="font-medium line-clamp-1">{prevPost.title}</p>
                  </div>
                </Link>
              ) : <div />}
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="flex items-center gap-2 text-right text-[13px] text-[#475569] hover:text-[#1B2F5E] transition-colors">
                  <div>
                    <p className="text-[11px] text-[#94A3B8]">{l.next}</p>
                    <p className="font-medium line-clamp-1">{nextPost.title}</p>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : <div />}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-[30%] flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            {/* About card */}
            <div className="rounded-2xl border border-[#E2E8F0] p-6">
              <div className="flex items-center gap-3 mb-3">
                <VidaLogoSmall />
                <span className="text-[14px] font-extrabold text-[#0A0A0F]">Vida Digital Solutions</span>
              </div>
              <p className="text-[13px] text-[#475569] leading-relaxed mb-4">
                {l.aboutDesc}
              </p>
              <a
                href="https://wa.me/14382985740"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#00C4A0] hover:bg-[#00C4A0]/90 text-[#060D1C] text-[13px] font-extrabold rounded-lg transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                {l.whatsapp}
              </a>
            </div>

            {/* Related articles */}
            {relatedPosts.length > 0 && (
              <div className="rounded-2xl border border-[#E2E8F0] p-6">
                <h3 className="text-[13px] font-extrabold text-[#0A0A0F] mb-4">{l.related}</h3>
                <div className="flex flex-col gap-3">
                  {relatedPosts.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/blog/${rp.slug}`}
                      className="text-[13px] text-[#475569] hover:text-[#1B2F5E] leading-snug transition-colors"
                    >
                      {rp.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="rounded-2xl border border-[#E2E8F0] p-6">
              <h3 className="text-[13px] font-extrabold text-[#0A0A0F] mb-4">{l.categories}</h3>
              <div className="flex flex-col gap-2">
                {Object.entries(categoryCounts).map(([cat, count]) => (
                  <Link
                    key={cat}
                    href="/blog"
                    className="flex items-center justify-between text-[13px] text-[#475569] hover:text-[#1B2F5E] transition-colors"
                  >
                    <span>{cat}</span>
                    <span className="text-[11px] text-[#94A3B8] bg-[#F5F7FA] px-2 py-0.5 rounded-full">{count}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
