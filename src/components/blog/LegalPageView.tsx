"use client"

import Link from "next/link"
import { AutoLocaleProvider as LocaleProvider } from "@/components/AutoLocaleProvider"
import { Header } from "@/components/header"
import { Footer } from "@/components/sections/footer"

// Reuse the same inline renderer from BlogPost
function RenderContent({ content }: { content: string }) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-3xl md:text-4xl font-extrabold tracking-[-0.04em] text-[#0A0A0F] mt-4 mb-6">
          {line.replace("# ", "")}
        </h1>
      )
    } else if (line.startsWith("## ")) {
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
    } else if (line === "---") {
      elements.push(<hr key={i} className="my-8 border-[#E2E8F0]" />)
    } else if (line.trim() === "") {
      // skip
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
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    const italicMatch = remaining.match(/\*(.+?)\*/)
    const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/)

    const matches = [
      boldMatch ? { type: "bold", index: boldMatch.index!, match: boldMatch } : null,
      italicMatch && (!boldMatch || italicMatch.index! < boldMatch.index!) ? { type: "italic", index: italicMatch.index!, match: italicMatch } : null,
      linkMatch ? { type: "link", index: linkMatch.index!, match: linkMatch } : null,
    ].filter(Boolean).sort((a, b) => a!.index - b!.index)

    if (matches.length === 0) {
      parts.push(remaining)
      break
    }

    const first = matches[0]!
    if (first.index > 0) parts.push(remaining.slice(0, first.index))

    if (first.type === "bold") {
      parts.push(<strong key={key++} className="text-[#1B2F5E] font-extrabold">{first.match[1]}</strong>)
      remaining = remaining.slice(first.index + first.match[0].length)
    } else if (first.type === "italic") {
      parts.push(<em key={key++} className="text-[#475569]">{first.match[1]}</em>)
      remaining = remaining.slice(first.index + first.match[0].length)
    } else if (first.type === "link") {
      parts.push(
        <Link key={key++} href={first.match[2]} className="text-[#4B6CB7] hover:text-[#1B2F5E] underline underline-offset-2">
          {first.match[1]}
        </Link>
      )
      remaining = remaining.slice(first.index + first.match[0].length)
    }
  }

  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : <>{parts}</>
}

export function LegalPageView({ title, content }: { title: string; content: string }) {
  return (
    <LocaleProvider>
      <Header />
      <div className="bg-white pt-24 pb-16 px-6">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] text-[#94A3B8] mb-8">
            <Link href="/" className="hover:text-[#1B2F5E]">Home</Link>
            <span>→</span>
            <span className="text-[#475569]">{title}</span>
          </nav>

          {/* Content */}
          <RenderContent content={content} />
        </div>
      </div>
      <Footer />
    </LocaleProvider>
  )
}
