# CLAUDE.md — Vida Digital Solutions Website

> Contexto permanente do projeto para Claude Code.
> Atualizar sempre que houver mudanças arquiteturais relevantes.

---

## Sobre o Projeto

**Empresa:** Vida Digital Solutions LLC (Miami, FL)
**Fundador:** Victor Melo — Director & Technical Lead
**EIN:** 36-5068966 | **CNPJ:** 42.133.065/0001-55
**Endereço:** 28 W Flagler St SUITE 300-B, Miami, FL 33130
**Telefone:** +1 (438) 298-5740
**Email:** info@vidadigitalsolutions.com
**Site:** [vidadigitalsolutions.com](https://vidadigitalsolutions.com)
**Repo:** `victorazau/vidadigitalsolutions`
**Deploy:** Cloudflare Pages (auto-deploy em push na `main`)

**O que é este projeto:**
Site institucional em Next.js com blog multilíngue (PT/EN/ES) totalmente automatizado via n8n + Claude AI. Cada artigo é gerado, traduzido e publicado automaticamente em 3 idiomas com commit atômico.

---

## Stack Técnica

- **Framework:** Next.js 16 (App Router, Turbopack)
- **CSS:** Tailwind CSS v4
- **UI:** shadcn/ui + componentes custom (Aceternity UI adaptados)
- **Animações:** Framer Motion (scroll-driven, aurora, floating icons)
- **Blog:** MDX com frontmatter via `gray-matter`
- **i18n:** Toggle de idioma client-side (React state via `useLocale()`)
- **Detecção de idioma:** Middleware lê `CF-IPCountry` → cookie `vds_country` → `navigator.language`
- **Deploy:** Cloudflare Pages com `@opennextjs/cloudflare` + `@cloudflare/next-on-pages`
- **Build:** Preset Next.js no Cloudflare (comando: `npm run build:cloudflare`)
- **Automação de conteúdo:** n8n + Claude Sonnet 4 + GitHub API (commit atômico)
- **CRM/Comunicação:** GoHighLevel (GHL)
- **Idiomas:** PT-BR, EN-US, ES-LATAM (padrão: EN, detecta por IP)

---

## Estrutura de Pastas

```
/
├── CLAUDE.md                    ← Este arquivo
├── open-next.config.ts          ← Config OpenNext/Cloudflare
├── wrangler.jsonc               ← Config Wrangler
├── content/
│   ├── strategy/
│   │   └── blog-strategy.md    ← Estratégia editorial (lida pelo n8n)
│   ├── posts/
│   │   ├── pt/                 ← Artigos em Português (*.mdx)
│   │   ├── en/                 ← Artigos em Inglês (*.mdx)
│   │   └── es/                 ← Artigos em Espanhol (*.mdx)
│   ├── terms-of-service.mdx    ← Página legal
│   ├── privacy-policy.mdx      ← Página legal
│   └── cookie-policy.mdx       ← Página legal
├── public/
│   ├── icons/                  ← PNGs dos ícones do hero (18 ferramentas)
│   ├── logos/                  ← Logos dos clientes
│   ├── logo.png                ← Favicon/icon
│   ├── logo-h.png              ← Logo horizontal (header, fundo claro)
│   ├── logo-h-white.png        ← Logo horizontal branca (footer, 404, links)
│   ├── og-image.png            ← OpenGraph image (1200x630)
│   ├── robots.txt
│   └── llms.txt
├── src/
│   ├── app/
│   │   ├── page.tsx            ← Home (hero + todas as seções)
│   │   ├── layout.tsx          ← Layout global (metadata, JSON-LD, tracking)
│   │   ├── not-found.tsx       ← 404 customizada (space theme)
│   │   ├── sitemap.ts          ← Sitemap dinâmico (todas as páginas + artigos)
│   │   ├── middleware.ts       ← Locale detection + Meta CAPI PageView
│   │   ├── blog/               ← Listagem + artigos individuais
│   │   ├── book/               ← Página de agendamento (iframe GHL)
│   │   ├── links/              ← Bio links (aurora background)
│   │   ├── terms/              ← Terms of Service
│   │   ├── privacy/            ← Privacy Policy
│   │   ├── cookies/            ← Cookie Policy
│   │   └── api/
│   │       ├── track/          ← Meta CAPI server-side events
│   │       └── indexnow/       ← IndexNow (Bing/Yandex notification)
│   ├── components/
│   │   ├── header.tsx          ← Navbar (mobile hamburger + desktop)
│   │   ├── hero.tsx            ← Floating icons hero (18 PNG icons)
│   │   ├── language-toggle.tsx ← Bandeiras EN/PT/ES
│   │   ├── CookieBanner.tsx    ← GDPR/LGPD consent (GA4 + Pixel + Clarity)
│   │   ├── TrackingEvents.tsx  ← Page view + event tracking
│   │   ├── FloatingButtons.tsx ← WhatsApp button + Back to top
│   │   ├── AutoLocaleProvider  ← Reads vds_country cookie for auto-locale
│   │   ├── sections/           ← Seções da home page
│   │   │   ├── logo-bar.tsx    ← Marquee com logos de clientes
│   │   │   ├── benefits.tsx    ← ContainerScroll (tablet 3D com comparação)
│   │   │   ├── cases.tsx       ← Carousel scroll-driven (glassmorphism cards)
│   │   │   ├── services.tsx    ← 3 cards com spotlight glow effect
│   │   │   ├── process.tsx     ← Spaceship scroll animation (sticky 300vh)
│   │   │   ├── blog.tsx        ← 3 artigos trilíngues da home
│   │   │   ├── faq.tsx         ← Accordion animado (5 perguntas)
│   │   │   ├── cta-final.tsx   ← Aurora background + WhatsApp CTA
│   │   │   └── footer.tsx      ← Logo branca + nav + legal + copyright dinâmico
│   │   ├── blog/               ← BlogCard, BlogList, BlogPost, ReadingProgress, ShareButtons, LegalPageView
│   │   └── ui/                 ← Componentes base (button, container-scroll, aurora, floating-icons, etc)
│   └── lib/
│       ├── i18n.ts             ← Traduções nav/hero
│       ├── content.ts          ← Traduções de TODAS as seções (EN/PT/ES)
│       ├── locale-context.tsx  ← React context para idioma
│       ├── posts.ts            ← Funções de leitura MDX
│       ├── legal.ts            ← Parser de páginas legais
│       └── meta-capi.ts        ← Meta Conversions API (server-side)
```

---

## Seções da Home Page (em ordem)

1. **Header** — Logo horizontal + nav + toggle idioma + hamburger mobile + "Book a Call"
2. **Hero** — 18 floating PNG icons + "Vida Digital Solutions" + frase trilíngue
3. **Logo Bar** — Marquee infinito (5 clientes: Azul Viagens, Astride, Vieira, Avanti, APLAC)
4. **Benefits** — ContainerScroll (tablet 3D) com comparação bad/good + 6 benefit cards
5. **Cases** — Carousel scroll-driven (5 cases, glassmorphism, sticky scroll)
6. **Services** — 3 spotlight glow cards (GHL, Automação, Quasar CRM)
7. **Process** — Spaceship scroll animation (4 steps: Discovery → Architecture → Launch → Orbit)
8. **Blog** — 3 artigos recentes trilíngues com links para `/blog/[slug]`
9. **FAQ** — 5 perguntas com accordion animado (primeira aberta com destaque)
10. **CTA Final** — Aurora background + WhatsApp + Schedule a Call
11. **Footer** — Logo branca + nav + endereço + legal + Terms/Privacy/Cookies/Cookie Settings

---

## Páginas do Site

| Rota | Tipo | Descrição |
|---|---|---|
| `/` | Static | Home page com todas as seções |
| `/blog` | Static | Listagem de artigos com filtro por categoria |
| `/blog/[slug]` | SSG | Artigo individual (2 colunas + sidebar) |
| `/book` | Static | Calendário GHL (iframe) |
| `/links` | Static | Bio links com aurora background |
| `/terms` | Static | Terms of Service |
| `/privacy` | Static | Privacy Policy (GDPR/LGPD/CCPA) |
| `/cookies` | Static | Cookie Policy |
| `/api/track` | Edge | Meta CAPI events (POST) |
| `/api/indexnow` | Edge | IndexNow notification (POST) |

---

## Sistema de Blog

### Roteamento
- **URL única por artigo:** `/blog/[slug]` — um slug serve os 3 idiomas
- **Slug padrão:** sempre em inglês (EN), compartilhado nos 3 arquivos MDX
- **Toggle de idioma:** muda o conteúdo exibido sem mudar a URL

### Como funciona `getPostBySlug(slug, lang)`
- Varre a pasta `content/posts/[lang]/`
- Parseia frontmatter com `gray-matter`
- Retorna o arquivo onde `data.slug === slug`

### Regra crítica de slugs
**Todos os 3 arquivos MDX (pt/, en/, es/) devem ter o MESMO slug no frontmatter** (o slug EN).
O filename pode ser diferente, mas o campo `slug:` no frontmatter deve ser idêntico nos 3.

```yaml
# CORRETO — mesmo slug nos 3 arquivos
slug: "how-to-automate-whatsapp-medical-clinics"

# ERRADO — slugs diferentes quebram o toggle de idioma
# pt: slug: "como-automatizar-whatsapp-clinicas"
# en: slug: "how-to-automate-whatsapp-medical-clinics"
```

### Frontmatter obrigatório
```yaml
---
title: "Título do artigo"
description: "Meta description 150-160 chars"
date: "YYYY-MM-DD"
category: "GoHighLevel"
slug: "english-slug-shared-across-all-languages"
lang: "pt"
keywords: ["kw1", "kw2", "kw3", "kw4", "kw5"]
readTime: "X min"
author: "Vida Digital Solutions"
---
```

### SEO em artigos
- JSON-LD: Article + BreadcrumbList + FAQPage (automático se tiver Q:/A:)
- Metadata dinâmica por artigo
- Reading progress bar
- Share buttons (LinkedIn, WhatsApp, X)
- Canonical URL

---

## Tracking Completo

| Ferramenta | ID | Tipo | Consent |
|---|---|---|---|
| GA4 | `G-6L8QCB30PB` | Client-side | Analytics |
| Meta Pixel | `1241390329847733` | Client-side | Marketing |
| Meta CAPI | Token em `META_CAPI_TOKEN` env var | Server-side (middleware + /api/track) | Sempre |
| Microsoft Clarity | `w7qafbay73` | Client-side | Analytics |

### Eventos trackados
- **PageView** — todas as páginas (GA4 + Pixel + CAPI)
- **Lead** — /book, WhatsApp click (Pixel + CAPI + GA4)
- **Schedule** — /book (Pixel + CAPI)
- **ViewContent** — blog articles (Pixel + CAPI)
- **Contact** — WhatsApp click (Pixel + CAPI + GA4)

### Cookie Consent (GDPR/LGPD)
- Cookie: `vds_cookie_consent` (1 ano)
- Essential: sempre ativo
- Analytics: GA4 + Clarity (carrega após consent)
- Marketing: Meta Pixel (carrega após consent)
- CAPI: server-side, não depende de consent

---

## SEO Técnico

### Metadata
- Title com "Miami" + keywords
- 100+ keywords com city targeting (Miami, Orlando, Boston, NYC, Atlanta, Houston, etc)
- Geo meta tags: `25.7743, -80.1937` (Miami)
- Business contact data completo
- OpenGraph + Twitter cards

### JSON-LD Schemas
- **ProfessionalService** — nome, endereço, geo, rating, services, sameAs, areaServed (15 cidades)
- **Person** — Victor Melo, founder, knowsAbout
- **Article** — em cada artigo do blog
- **BreadcrumbList** — em cada artigo
- **FAQPage** — automático em artigos com Q:/A:

### GoogleBot Directives
- `max-video-preview: -1`
- `max-image-preview: large`
- `max-snippet: -1`

### IndexNow
- Key: `b4d7e2f1a3c5968e0d2b4f7a1c3e5d8f`
- API: `/api/indexnow` (POST com `{ urls: [...] }`)
- Notifica Bing + Yandex instantaneamente

### Outros
- `robots.txt` — Allow all + sitemap
- `llms.txt` — Para AI crawlers
- `sitemap.xml` — Dinâmico, inclui todas as páginas + artigos
- Google Search Console configurado (sitemap submetido)

---

## Automação de Conteúdo (n8n)

### Workflows no n8n (`n8n.srv862416.hstgr.cloud`)

| Workflow | ID | Trigger | Função |
|---|---|---|---|
| VDS Blog \| Semanal Automático | `ExsuOy3VlL6tswfS` | Cron: seg/qua/sex 12h UTC | Gera artigo baseado no tipo do dia |
| VDS Blog \| Aprovação WhatsApp | `K42F9QibcF87ACFv` | Webhook POST | Gera artigo com aprovação via WhatsApp |

### Estratégia 3x/semana

| Dia | Tipo | Objetivo |
|---|---|---|
| Segunda | Tutorial GHL | Atrair tráfego SEO ("como fazer X") |
| Quarta | Case / Dor | Converter visitante (problema → solução) |
| Sexta | Comparativo / Tendência | Capturar pesquisas de decisão (X vs Y) |

### Fluxo do Workflow Semanal
1. Cron dispara (seg/qua/sex 12h UTC)
2. Busca estratégia editorial do GitHub (`content/strategy/blog-strategy.md`)
3. Determina tipo de artigo baseado no dia da semana
4. Claude Sonnet 4 gera artigo PT com 1500-2500 palavras
5. Claude traduz para EN
6. Claude traduz para ES
7. Gera MDX com frontmatter (slug EN compartilhado nos 3)
8. **Commit atômico** via GitHub Trees API (3 arquivos em 1 commit = 1 deploy)
9. WhatsApp notifica Victor

### Commit Atômico (GitHub Trees API)
Os 3 arquivos MDX são commitados juntos via:
1. GET latest commit SHA
2. GET base tree SHA
3. POST create 3 blobs (PT, EN, ES)
4. POST create tree com os 3 blobs
5. POST create commit
6. PATCH update ref

Isso evita 3 deploys separados no Cloudflare (problema anterior).

### Webhook do Workflow B
```
POST https://n8n.srv862416.hstgr.cloud/webhook/vds-blog-aprovacao
Body: { "message": "BLOG: [tema]", "contactId": "...", "locationId": "..." }
```
Comandos aceitos: `BLOG: [tema]` → `PUBLICAR` → `EDITAR: [feedback]`

---

## Estratégia Editorial

A estratégia fica em `content/strategy/blog-strategy.md`.
**Para mudar o foco:** edite esse arquivo e faça commit — o n8n lê automaticamente.

O prompt inclui:
- ICP do mês
- Tipo de artigo do dia (Tutorial/Case/Comparativo)
- Lista de artigos existentes para internal linking (2-3 links por artigo)
- Tópicos recentes para não repetir

---

## Identidade Visual

### Paleta
- Navy (principal): `#1B2F5E`
- Digital Teal (acento): `#00C4A0`
- Signal Blue (secundário): `#4B6CB7`
- Void (fundos escuros): `#0D1B3E`
- Deep Void: `#060D1C`
- Off-white: `#F5F7FA`

### Logo
- `logo.png` — Ícone triangular (favicon)
- `logo-h.png` — Horizontal colorida (header)
- `logo-h-white.png` — Horizontal branca (footer, 404, links, fundos escuros)

### Fonte
- Inter — weights: 400 (body), 500 (medium), 800 (extrabold)
- Nunca usar 600 ou 700

### Tagline
> **"Built to Scale."** — sempre com ponto final

---

## Credenciais e Variáveis

### Cloudflare Pages (env vars)
- `META_CAPI_TOKEN` — Token do Meta Conversions API (segredo)
- `NODE_VERSION` — `22`

### n8n (configurado nos nós)
- **Anthropic API Key**
- **GitHub PAT** (fine-grained, repo `vidadigitalsolutions`, `Contents: Read and write`)
- **GHL API Token** (pit token)
- **GHL Location ID:** `bvXQZ1UUmgHH9wgr73sa`
- **GHL Contact ID (Victor):** `Uw6brVem1NJ74gdxDNup`

### LinkedIn App (pendente aprovação Community Management API)
- App: VDS Blog Publisher
- Client ID: `866ppcxlwnux43`
- Redirect URL: `https://n8n.srv862416.hstgr.cloud/rest/oauth2-credential/callback`

---

## Redes Sociais

- Instagram: [@vida.digital_solutions](https://www.instagram.com/vida.digital_solutions)
- Facebook: [Vida.Digital.Solutions](https://www.facebook.com/Vida.Digital.Solutions/)
- LinkedIn: [vidadigitalsolutions](https://www.linkedin.com/company/vidadigitalsolutions/)
- Google Reviews: [share.google/vSDDAaZ2UvIeabFaS](https://share.google/vSDDAaZ2UvIeabFaS)
- Bio links: [vidadigitalsolutions.com/links](https://vidadigitalsolutions.com/links)
- Subdomínio `bio.vidadigitalsolutions.com` → redirect 301 para `/links`

---

## Clientes (Cases no site)

1. **Azul Viagens** — Brasil · Aviação
2. **Astride US Inc.** — Miami, FL · Digital Accounting
3. **Souza Advogados + Marcos Assunção** — Brasil · Advocacia
4. **Vieira Cleaning Services** — USA · Cleaning
5. **APLAC Mais** — Brasil · Proteção Veicular

---

## Performance (PageSpeed Insights)

| Métrica | Mobile | Desktop |
|---|---|---|
| Performance | 87 | ~90+ |
| Accessibility | 96 | 96 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

### Otimizações implementadas
- Lazy load de 6 seções (dynamic imports)
- 8 ícones no mobile (18 no desktop)
- Icons com `loading="lazy"`
- Hero H1 sem delay de animação (LCP fix)
- Deterministic star positions (sem hydration mismatch)

---

## Regras de Desenvolvimento

1. **Nunca alterar o sistema de slug** sem atualizar os 3 arquivos de idioma correspondentes
2. **Deploy é automático** — qualquer push na `main` faz deploy via Cloudflare
3. **Para adicionar artigo manualmente:** criar os 3 arquivos MDX com o mesmo slug EN
4. **Ao corrigir artigos existentes:** verificar se PT, EN e ES têm o mesmo `slug:` no frontmatter
5. **Linguagem:** código em EN, conteúdo do blog em PT/EN/ES conforme o idioma
6. **API routes precisam de `export const runtime = "edge"`** para funcionar no Cloudflare
7. **Não usar `Math.random()` em componentes** — causa hydration mismatch. Usar posições fixas ou seed determinístico
8. **Logo branca:** usar `logo-h-white.png` em fundos escuros (não usar CSS `brightness-0 invert`)
9. **Font weights:** apenas 400, 500 e 800 (nunca 600 ou 700)
10. **Cookie banner:** GA4 e Clarity carregam com analytics consent. Meta Pixel com marketing consent. CAPI sempre.
