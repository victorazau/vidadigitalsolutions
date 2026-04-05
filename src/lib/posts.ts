import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  category: string;
  slug: string;
  lang: string;
  keywords: string[];
  readTime: string;
  author: string;
}

export interface Post extends PostMeta {
  content: string;
}

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts(lang: string = "en"): PostMeta[] {
  const langDir = path.join(postsDirectory, lang);

  if (!fs.existsSync(langDir)) return [];

  const filenames = fs.readdirSync(langDir).filter((f) => f.endsWith(".mdx"));

  const posts = filenames.map((filename) => {
    const filePath = path.join(langDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return data as PostMeta;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string, lang: string = "en"): Post | null {
  const langDir = path.join(postsDirectory, lang);

  if (!fs.existsSync(langDir)) return null;

  const filenames = fs.readdirSync(langDir).filter((f) => f.endsWith(".mdx"));

  for (const filename of filenames) {
    const filePath = path.join(langDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    if (data.slug === slug) {
      return { ...(data as PostMeta), content };
    }
  }

  return null;
}

export function getPostsByCategory(
  category: string,
  lang: string = "en"
): PostMeta[] {
  const posts = getAllPosts(lang);
  if (category === "All" || category === "Todos" || category === "Todos") {
    return posts;
  }
  return posts.filter((p) => p.category === category);
}

export function getAllSlugs(): { slug: string; lang: string }[] {
  const slugs: { slug: string; lang: string }[] = [];
  const langs = ["en", "pt", "es"];

  for (const lang of langs) {
    const langDir = path.join(postsDirectory, lang);
    if (!fs.existsSync(langDir)) continue;

    const filenames = fs.readdirSync(langDir).filter((f) => f.endsWith(".mdx"));

    for (const filename of filenames) {
      const filePath = path.join(langDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      slugs.push({ slug: data.slug, lang });
    }
  }

  return slugs;
}

export function getAdjacentPosts(
  slug: string,
  lang: string = "en"
): { prev: PostMeta | null; next: PostMeta | null } {
  const posts = getAllPosts(lang);
  const index = posts.findIndex((p) => p.slug === slug);

  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export function getRelatedPosts(
  slug: string,
  category: string,
  lang: string = "en",
  limit: number = 3
): PostMeta[] {
  const posts = getAllPosts(lang);
  return posts
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, limit);
}

export function getCategoryCounts(lang: string = "en"): Record<string, number> {
  const posts = getAllPosts(lang);
  const counts: Record<string, number> = {};

  for (const post of posts) {
    counts[post.category] = (counts[post.category] || 0) + 1;
  }

  return counts;
}
