# 🧠 CLAUDE.md — Vida Digital Solutions Website

> Contexto permanente do projeto para Claude Code.
> Atualizar sempre que houver mudanças arquiteturais relevantes.

---

## 🏢 Sobre o Projeto

**Empresa:** Vida Digital Solutions LLC (Miami, FL)  
**Fundador:** Victor Melo  
**Site:** [vidadigitalsolutions.com](https://vidadigitalsolutions.com)  
**Repo:** `victorazau/vidadigitalsolutions`  
**Deploy:** Cloudflare Pages (auto-deploy em push na `main`)

**O que é este projeto:**  
Site institucional em Next.js com blog multilíngue (PT/EN/ES) totalmente automatizado via n8n + Claude AI. Cada artigo é gerado, traduzido e publicado automaticamente em 3 idiomas.

---

## 🛠️ Stack Técnica

- **Framework:** Next.js (App Router)
- **Blog:** MDX com frontmatter via `gray-matter`
- **i18n:** Toggle de idioma client-side (React state via `useLocale()`)
- **Deploy:** Cloudflare Pages (branch `main`)
- **Automação de conteúdo:** n8n + Claude AI + GitHub API
- **CRM/Comunicação:** GoHighLevel (GHL)
- **Idiomas:** PT-BR, EN-US, ES-LATAM

---

## 📁 Estrutura de Pastas

```
/
├── CLAUDE.md                    ← Este arquivo
├── content/
│   ├── strategy/
│   │   └── blog-strategy.md    ← Estratégia editorial mensal (lida pelo n8n toda segunda)
│   └── posts/
│       ├── pt/                 ← Artigos em Português (*.mdx)
│       ├── en/                 ← Artigos em Inglês (*.mdx)
│       └── es/                 ← Artigos em Espanhol (*.mdx)
├── app/
│   └── blog/
│       └── [slug]/
│           └── page.tsx        ← Rota dinâmica do blog
└── components/
```

---

## 📝 Sistema de Blog

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
# ✅ CORRETO — mesmo slug nos 3 arquivos
slug: "how-to-automate-whatsapp-medical-clinics"

# ❌ ERRADO — slugs diferentes quebram o toggle de idioma
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
lang: "pt"  # ou "en" ou "es"
keywords: ["kw1", "kw2", "kw3", "kw4", "kw5"]
readTime: "X min"
author: "Vida Digital Solutions"
---
```

---

## 🤖 Automação de Conteúdo (n8n)

### Workflows no n8n (`n8n.srv862416.hstgr.cloud`)

| Workflow | ID | Trigger | Função |
|---|---|---|---|
| VDS Blog \| Semanal Automático | `ExsuOy3VlL6tswfS` | Cron: seg 12h UTC (8h BRT) | Gera + publica artigo automaticamente |
| VDS Blog \| Aprovação WhatsApp | `K42F9QibcF87ACFv` | Webhook POST | Gera artigo com aprovação via formulário |

### Fluxo do Workflow A (Semanal)
1. Lê `content/strategy/blog-strategy.md` via GitHub raw URL
2. Claude gera artigo PT baseado na estratégia
3. Claude traduz para EN e ES
4. Todos os 3 MDX usam o slug EN como slug compartilhado
5. Commit nos 3 idiomas via GitHub API
6. SMS de notificação enviado

### Webhook do Workflow B
```
POST https://n8n.srv862416.hstgr.cloud/webhook/vds-blog-aprovacao
Body: { "message": "BLOG: [tema]", "contactId": "...", "locationId": "..." }
```

Comandos aceitos: `BLOG: [tema]` → `PUBLICAR` → `EDITAR: [feedback]`

---

## 📅 Estratégia Editorial

A estratégia mensal fica em `content/strategy/blog-strategy.md`.  
**Para mudar o foco do mês:** edite esse arquivo e faça commit — o n8n lê automaticamente na próxima execução.

Campos principais do arquivo de estratégia:
- ICP do mês (quem queremos atrair)
- Calendário editorial (temas por semana)
- Tópicos a evitar
- Regras permanentes de conteúdo
- Ofertas e CTAs do mês

---

## 🔑 Credenciais (ambiente)

Nunca commitar credenciais. As chaves ficam configuradas diretamente nos nós do n8n:
- **Anthropic API:** configurada no n8n
- **GitHub Token:** configurada no n8n (fine-grained, repositório `vidadigitalsolutions`, permissão `Contents: Read and write`)
- **GHL Token:** configurada no n8n
- **GHL Location ID:** `bvXQZ1UUmgHH9wgr73sa`

---

## ✅ Regras de Desenvolvimento

1. **Nunca alterar o sistema de slug** sem atualizar os 3 arquivos de idioma correspondentes
2. **Deploy é automático** — qualquer push na `main` faz deploy via Cloudflare
3. **Para adicionar artigo manualmente:** criar os 3 arquivos MDX com o mesmo slug EN
4. **Ao corrigir artigos existentes:** verificar se PT, EN e ES têm o mesmo `slug:` no frontmatter
5. **Linguagem:** código em EN, conteúdo do blog em PT/EN/ES conforme o idioma

