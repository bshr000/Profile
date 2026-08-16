import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BaseContent, ContentKind } from "@/types/content";

const root = path.join(process.cwd(), "content");

export function getAllContent(kind: ContentKind): BaseContent[] {
  const directory = path.join(root, kind);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const parsed = matter(fs.readFileSync(path.join(directory, file), "utf8"));
      return {
        slug,
        title: parsed.data.title ?? "Untitled",
        description: parsed.data.description ?? "",
        tags: parsed.data.tags ?? [],
        ...parsed.data,
        body: parsed.content,
      } as BaseContent;
    })
    .filter((item) => !item.draft)
    .sort((a, b) => (b.date ?? b.year ?? "").localeCompare(a.date ?? a.year ?? ""));
}

export function getContent(kind: ContentKind, slug: string) {
  return getAllContent(kind).find((item) => item.slug === slug);
}
