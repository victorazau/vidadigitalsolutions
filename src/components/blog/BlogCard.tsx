"use client"

import Link from "next/link"
import type { PostMeta } from "@/lib/posts"
import { Clock, User } from "lucide-react"

const categoryColors: Record<string, string> = {
  GoHighLevel: "bg-[#1B2F5E]",
  CRM: "bg-[#4B6CB7]",
  Cases: "bg-[#00C4A0]",
  "Automação": "bg-[#EA4B71]",
  Automation: "bg-[#EA4B71]",
  RevOps: "bg-[#FF6A00]",
  "IA para Negócios": "bg-[#7C3AED]",
  AI: "bg-[#7C3AED]",
}

export function BlogCard({ post }: { post: PostMeta }) {
  const colorClass = categoryColors[post.category] || "bg-[#1B2F5E]"

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group rounded-2xl border border-[#E2E8F0] overflow-hidden hover:border-[#1B2F5E]/30 hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
    >
      {/* Category header */}
      <div className="relative h-36 bg-[#0D1B3E] flex items-center justify-center overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-6 w-14 h-14 rounded-full border border-white/20" />
          <div className="absolute bottom-3 right-5 w-20 h-20 rounded-full border border-white/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-dashed border-white/10" />
        </div>

        <span className={`relative z-10 text-[10px] font-medium tracking-[0.1em] uppercase text-white px-3 py-1.5 rounded-full ${colorClass}`}>
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-[15px] font-medium tracking-[-0.02em] text-[#0A0A0F] leading-snug line-clamp-2 group-hover:text-[#1B2F5E] transition-colors">
          {post.title}
        </h3>

        <p className="text-[13px] text-[#94A3B8] leading-relaxed line-clamp-2">
          {post.description}
        </p>

        <div className="flex items-center gap-3 pt-2 border-t border-[#E2E8F0] text-[11px] text-[#94A3B8]">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {post.author}
          </span>
          <span>·</span>
          <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  )
}
