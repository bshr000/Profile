import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BaseContent, ContentKind } from "@/types/content";

const root = path.join(process.cwd(), "content");

const journeyDatePattern = /^(\d{4})(?:[-./](\d{1,2}|x{1,2}))?(?:[-./](\d{1,2}|x{1,2}))?$/i;

function toUtcTimestamp(year: number, month = 1, day = 1) {
  const timestamp = Date.UTC(year, month - 1, day);
  const parsed = new Date(timestamp);

  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return undefined;
  }

  return timestamp;
}

function parseSortDate(value?: string) {
  if (!value) return undefined;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return undefined;

  return toUtcTimestamp(Number(match[1]), Number(match[2]), Number(match[3]));
}

function parseDisplayDate(value?: string) {
  if (!value) return undefined;
  const normalized = value.trim();
  const match = journeyDatePattern.exec(normalized);

  if (match) {
    const month = !match[2] || /^x+$/i.test(match[2]) ? 1 : Number(match[2]);
    const day = !match[3] || /^x+$/i.test(match[3]) ? 1 : Number(match[3]);
    return toUtcTimestamp(Number(match[1]), month, day);
  }

  const year = normalized.match(/\b(19|20)\d{2}\b/);
  return year ? toUtcTimestamp(Number(year[0])) : undefined;
}

function getJourneyTimestamp(item: BaseContent) {
  const isCurrent = /^(now|current)$/i.test((item.date ?? item.year ?? "").trim()) ||
    item.tags.some((tag) => /^(now|current)$/i.test(tag));

  if (isCurrent) return Number.POSITIVE_INFINITY;

  const explicitTimestamp = parseSortDate(item.sortDate);
  if (explicitTimestamp !== undefined) return explicitTimestamp;

  if (item.sortDate && process.env.NODE_ENV !== "production") {
    console.warn(
      `[content/journey] "${item.slug}" has an invalid sortDate. Use YYYY-MM-DD.`,
    );
  }

  const fallbackTimestamp = parseDisplayDate(item.date) ?? parseDisplayDate(item.year);
  if (fallbackTimestamp !== undefined) return fallbackTimestamp;

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[content/journey] "${item.slug}" has no sortable date and will appear last.`,
    );
  }

  return Number.NEGATIVE_INFINITY;
}

export function sortJourneyContent(items: BaseContent[]) {
  return items
    .map((item) => ({ item, timestamp: getJourneyTimestamp(item) }))
    .sort((a, b) => {
      if (a.timestamp !== b.timestamp) {
        return a.timestamp > b.timestamp ? -1 : 1;
      }

      return a.item.slug.localeCompare(b.item.slug, "en", { numeric: true });
    })
    .map(({ item }) => item);
}

export function getAllContent(kind: ContentKind): BaseContent[] {
  const directory = path.join(root, kind);
  if (!fs.existsSync(directory)) return [];
  const items = fs.readdirSync(directory)
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
    .filter((item) => !item.draft);

  if (kind === "journey") return sortJourneyContent(items);

  return items.sort((a, b) => {
    const aOrder = Number(a.order);
    const bOrder = Number(b.order);
    const hasAOrder = a.order !== undefined && Number.isFinite(aOrder);
    const hasBOrder = b.order !== undefined && Number.isFinite(bOrder);

    if (hasAOrder && hasBOrder) return aOrder - bOrder;
    if (hasAOrder) return -1;
    if (hasBOrder) return 1;

    return (b.date ?? b.year ?? "").localeCompare(a.date ?? a.year ?? "");
  });
}

export function getContent(kind: ContentKind, slug: string) {
  return getAllContent(kind).find((item) => item.slug === slug);
}
