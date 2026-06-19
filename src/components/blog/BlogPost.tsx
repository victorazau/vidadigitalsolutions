"use client"

import { useState } from "react"
import Link from "next/link"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"
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

// Conversion CTAs. Affiliate link lives here only — GHL changes these paths over
// time, so keep it in one place. `pro-trial` is the canonical path (`protrial` 301s to it).
const AFFILIATE_URL = "https://www.gohighlevel.com/pro-trial?fp_ref=vida-digital-solutions68"
const WHATSAPP_URL = "https://wa.me/14382985740"

// Posts about GHL itself (tutorials, comparisons, SaaS-mode, AI, workflows) target
// implementers/agencies → affiliate CTA. Service posts (cleaning, law firms, case
// studies) target potential VDS clients → WhatsApp CTA.
function getCtaType(post: { slug: string; category: string }): "service" | "affiliate" {
  const slug = post.slug.toLowerCase()
  const cat = post.category.toLowerCase()
  // Service verticals (small-biz owners who want it done for them) → WhatsApp.
  // GHL-as-a-tool content (features, tutorials, comparisons, agency/SaaS-mode) → affiliate.
  const isService =
    /clean|limp|law|legal|immigration|attorney|lawyer|advoca|abogad|medical|clinic|clinica|dental|dentist|accounting|contab|contad|real-estate|realtor|imobil|inmobil/.test(slug) ||
    cat.includes("case")
  return isService ? "service" : "affiliate"
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

// Markdown renderer (react-markdown + GFM) with VDS styling preserved 1:1.
// Replaces the old hand-rolled parser so every standard construct renders:
// tables, nested lists, horizontal rules, headings, code, etc.
const markdownComponents: Components = {
  h1: ({ children }) => (
    <h2 className="text-[26px] font-extrabold text-[#1B2F5E] tracking-[-0.02em] mt-10 mb-4">{children}</h2>
  ),
  h2: ({ children }) => (
    <h2 className="text-[22px] font-extrabold text-[#1B2F5E] tracking-[-0.02em] mt-10 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-[18px] font-medium text-[#0A0A0F] mt-6 mb-3">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-[16px] font-bold text-[#0A0A0F] mt-5 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-[16px] text-[#374151] leading-[1.8] my-3">{children}</p>
  ),
  a: ({ href, children }) => {
    const url = href || "#"
    if (/^https?:\/\//.test(url)) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#4B6CB7] hover:text-[#1B2F5E] underline underline-offset-2">
          {children}
        </a>
      )
    }
    return (
      <Link href={url} className="text-[#4B6CB7] hover:text-[#1B2F5E] underline underline-offset-2">
        {children}
      </Link>
    )
  },
  strong: ({ children }) => (
    <strong className="text-[#1B2F5E] font-extrabold">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => (
    <ul className="my-4 space-y-2 pl-5 list-disc marker:text-[#00C4A0]">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 space-y-2 pl-5 list-decimal marker:text-[#1B2F5E]">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-[16px] text-[#374151] leading-[1.8]">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-[3px] border-[#00C4A0] bg-[#F0FDF9] p-4 my-4 text-[15px] text-[#475569] italic rounded-r-lg">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-t border-[#E2E8F0]" />,
  code: ({ className, children }) => {
    const isBlock = /language-/.test(className || "")
    if (isBlock) {
      return <code className={`${className} font-mono text-[13px]`}>{children}</code>
    }
    return (
      <code className="bg-[#F1F5F9] font-mono text-[14px] px-1.5 py-0.5 rounded">{children}</code>
    )
  },
  pre: ({ children }) => (
    <pre className="my-4 overflow-x-auto rounded-lg bg-[#0D1B3E] p-4 text-[#E2E8F0]">{children}</pre>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-[#E2E8F0]">
      <table className="w-full border-collapse text-[14px] [&_tbody_tr:nth-child(even)]:bg-[#F5F7FA]">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="bg-[#1B2F5E] px-3 py-2.5 text-left font-extrabold text-white">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border-t border-[#E2E8F0] px-3 py-2.5 text-[#374151] align-top">{children}</td>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === "string" ? src : ""} alt={alt || ""} className="my-6 rounded-xl w-full" />
  ),
}

// The body of some posts repeats the title as a leading H1 (the page already
// renders the frontmatter title as the visible <h1>). Strip it to avoid a dupe.
function stripLeadingH1(content: string): string {
  return content.replace(/^\s*#\s+.*(\r?\n)+/, "")
}

function RenderContent({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {stripLeadingH1(content)}
    </ReactMarkdown>
  )
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

            {/* CTA box — segmented: affiliate for GHL-topic posts, WhatsApp for service posts */}
            {getCtaType(post) === "affiliate" ? (
              <div className="mt-12 rounded-2xl bg-[#0D1B3E] border border-[#1B2F5E] p-8 text-center">
                <p className="text-white text-[18px] font-extrabold tracking-[-0.02em] mb-1">
                  {locale === "pt" ? "Pronto para testar o GoHighLevel?" : locale === "es" ? "¿Listo para probar GoHighLevel?" : "Ready to try GoHighLevel?"}
                </p>
                <p className="text-[#94A3B8] text-[14px] mb-5">
                  {locale === "pt" ? "Comece com 30 dias grátis no plano SaaS Pro." : locale === "es" ? "Empieza con 30 días gratis en el plan SaaS Pro." : "Start with a 30-day free trial on the SaaS Pro plan."}
                </p>
                <a
                  href={AFFILIATE_URL}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00C4A0] hover:bg-[#00C4A0]/90 text-[#060D1C] font-extrabold rounded-lg transition-colors"
                >
                  {locale === "pt" ? "Começar teste grátis" : locale === "es" ? "Empezar prueba gratis" : "Start free trial"}
                </a>
                <p className="mt-5 text-[13px] text-[#94A3B8]">
                  {locale === "pt" ? "Prefere feito por nós? " : locale === "es" ? "¿Prefieres que lo hagamos por ti? " : "Prefer it done for you? "}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[#00C4A0] hover:underline font-medium">
                    {locale === "pt" ? "Fale com a Vida Digital no WhatsApp →" : locale === "es" ? "Habla con Vida Digital por WhatsApp →" : "Talk to Vida Digital on WhatsApp →"}
                  </a>
                </p>
                <p className="mt-2 text-[11px] text-[#475569]">
                  {locale === "pt" ? "Link de afiliado" : locale === "es" ? "Enlace de afiliado" : "Affiliate link"}
                </p>
              </div>
            ) : (
              <div className="mt-12 rounded-2xl bg-[#0D1B3E] border border-[#1B2F5E] p-8 text-center">
                <p className="text-white text-[18px] font-extrabold tracking-[-0.02em] mb-4">
                  {locale === "pt" ? "Quer implementar isso no seu negócio?" : locale === "es" ? "¿Quieres implementar esto en tu negocio?" : "Want to implement this in your business?"}
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00C4A0] hover:bg-[#00C4A0]/90 text-[#060D1C] font-extrabold rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {l.whatsapp}
                </a>
                <p className="mt-5 text-[13px] text-[#94A3B8]">
                  {locale === "pt" ? "Prefere fazer você mesmo? " : locale === "es" ? "¿Prefieres hacerlo tú mismo? " : "Prefer the DIY route? "}
                  <a href={AFFILIATE_URL} target="_blank" rel="sponsored noopener noreferrer" className="text-[#00C4A0] hover:underline font-medium">
                    {locale === "pt" ? "Teste o GoHighLevel →" : locale === "es" ? "Prueba GoHighLevel →" : "Try GoHighLevel →"}
                  </a>
                </p>
              </div>
            )}

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
