import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface LegalPage {
  title: string;
  description: string;
  date: string;
  content: string;
}

export function getLegalPage(filename: string): LegalPage {
  const filePath = path.join(process.cwd(), "content", filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  return { ...(data as Omit<LegalPage, "content">), content };
}
